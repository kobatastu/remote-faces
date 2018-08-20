// utils ---------------------------

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const hash = x => x && CryptoJS.MD5(x).toString().slice(0, 16);

const showError = (mesg) => {
  const ele = document.getElementById('error');
  ele.innerHTML = mesg;
  ele.style.display = 'block';
};

// params --------------------------

const params = Qs.parse(window.location.hash.slice(1));
if (!Array.isArray(params.members)) params.members = [];

const updateParams = () => {
  window.location.hash = '#' + Qs.stringify(params);
};

const updateRoomid = (roomid) => {
  params.roomid = roomid;
  updateParams();
};

const updateMyself = (myself) => {
  params.myself = myself;
  updateParams();
};

const mergeMembers = (members) => {
  let updated = false;
  members.forEach((member) => {
    if (member === params.myself) return;
    if (params.members.includes(member)) return;
    params.members.push(member);
    updated = true;
  });
  if (updated) {
    updateParams();
  }
  return updated;
};

// photo ---------------------------

const takePhoto = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  const track = stream.getVideoTracks()[0];
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const dstW = canvas.width = 72;
  const dstH = canvas.height = 72;
  let srcImg;
  let srcW;
  let srcH;
  if (typeof ImageCapture !== 'undefined') {
    const imageCapture = new ImageCapture(track);
    await sleep(2000);
    const blob = await imageCapture.takePhoto();
    srcImg = await createImageBitmap(blob);
    srcW = srcImg.width;
    srcH = srcImg.height;
  } else {
    const video = document.querySelector('video');
    video.style.display = 'block';
    video.srcObject = stream;
    await sleep(2000);
    srcImg = video;
    srcW = video.videoWidth;
    srcH = video.videoHeight;
  }
  const ratio = Math.max(dstW / srcW, dstH / srcH);
  const width = Math.min(srcW, dstW / ratio);
  const height = Math.min(srcH, dstH / ratio);
  const x = (srcW - width) / 2;
  const y = (srcH - height) / 2;
  ctx.drawImage(srcImg, x, y, width, height, 0, 0, dstW, dstH);
  track.stop();
  return canvas.toDataURL('image/png');
};

const getImageEle = (id) => {
  const ele = document.getElementById(id);
  if (ele) return ele;
  const newEle = document.getElementById('base').cloneNode(true);
  newEle.id = id;
  document.getElementById('app').appendChild(newEle);
  return newEle;
};

const updateImage = (id, name, img) => {
  const ele = getImageEle(id);
  ele.querySelector('img').src = img;
  ele.querySelector('.name').innerHTML = name;
  ele.dataset.modified = Date.now();
  ele.style.opacity = 1.0;
};

const checkObsoletedImage = async () => {
  document.getElementById('app').childNodes.forEach((ele) => {
    const { modified } = ele.dataset || {};
    if (modified) {
      const t = new Date(Number(modified));
      if (t < Date.now() - 2 * 60 * 1000) {
        ele.style.opacity = 0.2;
      }
    }
  });
  await sleep(5000);
  checkObsoletedImage();
};

// peers ---------------------------

let myPeer;
let roomPeer;
let lastData;

const sendPhoto = async () => {
  try {
    const dataUrl = await takePhoto();
    lastData = {
      myself: params.myself,
      members: [params.myself, ...params.members],
      img: dataUrl,
    };
    const { connMap = {} } = myPeer || {};
    Object.keys(connMap).forEach((key) => {
      const conn = connMap[key];
      if (conn.open) {
        const data = Object.assign({}, lastData); // shallow copy
        if (conn.lastReceived < Date.now() - 5 * 60 * 1000) {
          // the conn may be stalled, so not sending img.
          delete data.img;
        }
        conn.send(data);
      }
    });
    document.getElementById('app').style.display = 'block';
    updateImage('base', params.myself, dataUrl);
    await sleep(2 * 60 * 1000);
    lastData = null;
    sendPhoto();
  } catch (e) {
    console.error('sendPhoto', e);
    document.getElementById('error').style.display = 'block';
  }
};

const receivePhoto = conn => async (data) => {
  try {
    if (conn) {
      conn.lastReceived = Date.now();
    }
    if (conn && data.myself && data.img) {
      updateImage(conn.peer, data.myself, data.img);
    }
    if (mergeMembers(data.members || [])) {
      connectMembers();
    }
  } catch (e) {
    console.log('receivePhoto', e);
  }
};

const connectMembers = (force) => {
  if (!myPeer || !myPeer.connMap) return;
  params.members.forEach((member) => {
    const id = hash(params.roomid) + '_' + hash(member);
    const oldConn = myPeer.connMap[id];
    if (oldConn) {
      if (oldConn.open) return;
      if (!force) return;
    }
    const conn = myPeer.connect(id, { serialization: 'json' });
    myPeer.connMap[id] = conn;
    conn.on('data', receivePhoto(conn));
    conn.on('open', () => {
      conn.lastReceived = Date.now();
      if (lastData) conn.send(lastData);
    });
  });
};

const heartbeat = async () => {
  await sleep(5 * 60 * 1000);
  [myPeer, roomPeer].forEach((peer) => {
    if (peer) peer.socket.send({ type: 'HEARTBEAT' });
  });
  heartbeat();
};

const createMyPeer = () => {
  const id = hash(params.roomid) + '_' + hash(params.myself);
  myPeer = new Peer(id, {
    host: 'peerjs.axlight.com',
    port: window.location.protocol === 'https:' ? 443 : 80,
    secure: window.location.protocol === 'https:',
  });
  myPeer.on('open', sendPhoto);
  myPeer.on('error', async (err) => {
    if (err.type === 'peer-unavailable') return;
    myPeer.destroy();
    myPeer = null;
    if (err.type === 'network') {
      showError('The network is down, reloading.');
      await sleep(5000);
      window.location.reload();
    }
    if (err.type === 'unavailable-id') {
      showError('The name is not available, reloading.');
      await sleep(30 * 1000);
      window.location.reload();
    }
    console.error('main', err.type, err);
    showError('Error occured, please reload.');
  });
  myPeer.connMap = {};
  connectMembers();
  myPeer.on('connection', (conn) => {
    myPeer.connMap[conn.peer] = conn;
    conn.on('data', receivePhoto(conn));
    conn.on('open', () => {
      conn.lastReceived = Date.now();
      if (lastData) conn.send(lastData);
    });
  });
};

const connectRoomPeer = async () => {
  await sleep(1000);
  if (!myPeer) {
    connectRoomPeer();
    return;
  }
  const id = hash(params.roomid);
  const conn = myPeer.connect(id, { serialization: 'json' });
  conn.on('data', (data) => {
    try {
      if (mergeMembers(data.members || [])) {
        connectMembers(true);
      }
    } catch (e) {
      console.log('roomPeer on data', e);
    }
  });
  conn.on('close', connectRoomPeer);
  createRoomPeer();
};

const createRoomPeer = () => {
  if (roomPeer) return;
  // create for others
  const id = hash(params.roomid);
  roomPeer = new Peer(id, {
    host: 'peerjs.axlight.com',
    port: window.location.protocol === 'https:' ? 443 : 80,
    secure: window.location.protocol === 'https:',
  });
  roomPeer.on('error', async (err) => {
    if (roomPeer) {
      roomPeer.destroy();
      roomPeer = null;
      if (err.type === 'unavailable-id') {
        // already created by others
        // retry just in case
        await sleep(3 * 60 * 1000);
        connectRoomPeer();
      } else {
        // retry
        await sleep(5000);
        connectRoomPeer();
      }
    }
  });
  roomPeer.on('connection', (conn) => {
    conn.on('open', () => {
      const data = {
        members: [params.myself, ...params.members],
      };
      conn.send(data);
    });
  });
};

const initParams = () => new Promise((resolve) => {
  document.getElementById('param-roomid').value = params.roomid || '';
  document.getElementById('param-myself').value = params.myself || '';
  const callback = (e) => {
    e.preventDefault();
    const roomid = document.getElementById('param-roomid').value;
    const myself = document.getElementById('param-myself').value;
    if (roomid && myself) {
      updateRoomid(roomid);
      updateMyself(myself);
      document.getElementById('init').style.display = 'none';
      resolve();
    }
  };
  document.getElementById('init').onsubmit = callback;
  document.getElementById('init').style.display = 'block';
});

const main = async () => {
  if (!params.roomid || !params.myself) {
    await initParams();
  }
  createMyPeer();
  connectRoomPeer();
  checkObsoletedImage();
  heartbeat();
};

window.onload = main;
