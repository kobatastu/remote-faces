(this["webpackJsonpremote-faces-web"]=this["webpackJsonpremote-faces-web"]||[]).push([[0],{19:function(e,t,n){e.exports=n(32)},24:function(e,t,n){},25:function(e,t,n){},27:function(e,t,n){},28:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=28},29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(11),o=n.n(c),i=(n(24),n(12)),u=n(13),s=n(15),l=n(16),d=n(1),m=function(){var e=Object(r.useState)(30),t=Object(d.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){n>0?setTimeout((function(){c(n-1)}),1e3):window.location.reload()})),a.a.createElement("div",null,a.a.createElement("h1",null,"Unrecoverable error occurred."),a.a.createElement("p",null,"Will auto reload in ",n," sec."))},f=(n(25),n(2)),v=n.n(f),p=n(3),g=function(){var e=window.crypto.getRandomValues(new Uint8Array(32));return Array.from(e).map((function(e){return e.toString(16).padStart(2,"0")})).join("")},h=function(){return 1e3+window.crypto.getRandomValues(new Uint16Array(1))[0]%9e3},b=function(e){try{var t=new URL(e).hash.slice(1);return new URLSearchParams(t).get("roomId")}catch(n){return null}},y=(n(27),n(17)),E=n(18),O=n(9),I=n(5),j=n(14),w=n.n(j),k=function(e,t){return"string"===typeof t&&t.startsWith("".concat(e,"_"))},C=function(e,t){return"".concat(e,"_").concat(t)},S=function(e){return Number(e.split("_")[1])},M=function(e){return S(e.peer)},A=function(e){return S(e)<5},N=function(e,t,n){var r=!1,a=null,c=null,o=function(){var e=new Map;return{addConn:function(t){var n=e.get(t.peer);n&&n.conn.close(),e.set(t.peer,{conn:t,connected:!1,live:!1})},markConnected:function(t){var n=e.get(t.peer);n&&(n.connected=!0)},isConnected:function(t){var n=e.get(t);return!!n&&n.connected},hasConn:function(t){return e.has(t)},delConn:function(t){var n=e.get(t.peer);n&&n.conn===t&&e.delete(t.peer)},getConnectedPeerJsIds:function(){return Array.from(e.keys()).filter((function(t){var n;return null===(n=e.get(t))||void 0===n?void 0:n.connected}))},getLivePeerJsIds:function(){return Array.from(e.keys()).filter((function(t){var n=e.get(t);return n&&n.connected&&n.live}))},forEachConnectedConns:function(t){Array.from(e.values()).forEach((function(e){e.connected&&t(e.conn)}))},forEachLiveConns:function(t){Array.from(e.values()).forEach((function(e){e.connected&&e.live&&t(e.conn)}))},setMedia:function(t){var n=e.get(t.peer);n&&!n.media?n.media=t:console.error("setMedia: invalid value, should not happen")},getMedia:function(t){var n=e.get(t);return n&&n.media},delMedia:function(t){var n=e.get(t.peer);n&&(n.media===t?delete n.media:console.error("delMedia: invalid value, should not happen"))},closeAllMedia:function(){Array.from(e.values()).forEach((function(e){e.media&&(e.media.close(),delete e.media)}))},clearAll:function(){e.size&&console.log("connectionMap garbage:",e),e.clear()}}}(),i=!1,u=null,s=null,l=function(){if(!r){var e=o.getConnectedPeerJsIds().map(S);t({type:"CONNECTED_PEERS",peerIds:e})}},d=function(e){if(!r&&a&&a.id!==e&&!o.hasConn(e)){console.log("connectPeer",e);var t=a.connect(e,{serialization:"json"});f(t)}},m=function(e,t){if(!r){t&&(c=e);var n=o.getConnectedPeerJsIds(),a=o.getLivePeerJsIds();o.forEachConnectedConns((function(t){try{t.send({data:e,peers:n,liveMode:i,livePeers:a})}catch(r){console.error("broadcastData",r)}}))}},f=function(u){o.isConnected(u.peer)?u.close():(o.addConn(u),u.on("open",(function(){o.markConnected(u),l(),c&&u.send({data:c,peers:o.getConnectedPeerJsIds(),liveMode:i,livePeers:o.getLivePeerJsIds()})})),u.on("data",(function(t){return function(t,a){if(!r)try{if(a&&"object"===typeof a){var c={peerId:M(t),liveMode:!!a.liveMode};n(a.data,c),Array.isArray(a.peers)&&a.peers.forEach((function(t){k(e,t)&&d(t)})),i&&(c.liveMode&&k(e,t.peer)&&setTimeout((function(){g(t.peer)}),1e3),Array.isArray(a.livePeers)&&a.livePeers.forEach((function(t){k(e,t)&&g(t)})))}}catch(o){console.error("handlePayload",o)}}(u,t)})),u.on("close",(function(){if(o.delConn(u),console.log("dataConnection closed",u),t({type:"CONNECTION_CLOSED",peerId:M(u)}),l(),0===o.getConnectedPeerJsIds().length)p(!0);else if(A(u.peer)&&a&&!a.disconnected&&!A(a.id)){var e=30+Math.floor(60*Math.random());console.log("Disconnected seed peer: ".concat(S(u.peer),", reinit in ").concat(e,"sec...")),setTimeout(p,1e3*e)}})))},v=function n(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;if(!r&&!a){o.clearAll(),t({type:"INITIALIZING_PEER",index:i});var s=i<5,l=s?i:h(),m=C(e,l);console.log("initMyPeer start",i,m);var v=new w.a(m);a=v,v.on("open",(function(){a=v,t({type:"CONNECTING_SEED_PEERS"});for(var n=0;n<5;n+=1){var r=C(e,n);d(r)}})),v.on("error",(function(e){"unavailable-id"===e.type?(a=null,c=null,v.destroy(),n(i+1)):"peer-unavailable"===e.type||("network"===e.type?(console.log("initMyPeer network error",i,e),v.destroy()):(console.error("initMyPeer",i,e.type,e),t({type:"UNKNOWN_ERROR"})))})),v.on("connection",(function(e){a===v?(console.log("new connection received",e),t({type:"NEW_CONNECTION",peerId:M(e)}),f(e)):e.close()})),v.on("call",(function(e){a===v&&u?(console.log("new media received",e),b(e)&&e.answer(u)):e.close()})),v.on("disconnected",(function(){console.log("initMyPeer disconnected",i),setTimeout((function(){a!==v||v.destroyed||(console.log("initMyPeer reconnecting",i),t({type:"RECONNECTING"}),v.reconnect())}),5e3)})),v.on("close",(function(){a===v?(console.log("initMyPeer closed, re-initializing",i),a=null,c=null,setTimeout(n,1e4)):console.log("initMyPeer closed, ignoring",i)}))}};v();var p=function(t){if(a&&!a.disconnected){if(!t){if(A(a.id))return;if(Array.from(Array(5).keys()).every((function(t){var n=C(e,t);return o.isConnected(n)})))return void l()}var n=a;a=null,c=null,n.destroy(),v()}},g=function(e){if(!r&&a&&a.id!==e&&u&&o.isConnected(e)&&!o.getMedia(e)){console.log("callPeer",e);var t=a.call(e,u);b(t)}},b=function(e){var t=o.getMedia(e.peer);if(t){if(a&&S(a.id)>S(e.peer))return console.log("my peer id is bigger, closing media",e),e.close(),!1;console.log("closing prevMedia",t),o.delMedia(t),t.close()}return console.log("init media",e),o.setMedia(e),e.on("stream",(function(t){console.log("mediaConnection received stream",e);var n={peerId:S(e.peer)};s&&s(t,n,(function(){return e.close()}))})),e.on("close",(function(){console.log("mediaConnection closed",e);var t={peerId:S(e.peer)};s&&s(null,t),o.delMedia(e)})),!0};return{broadcastData:m,enableLiveMode:function(e,t){i?console.warn("liveMode already enabled"):(i=!0,u=e,s=t,m(c),o.forEachLiveConns((function(e){g(e.peer)})))},disableLiveMode:function(){i?(i=!1,u=null,s=null,m(c),o.closeAllMedia()):console.warn("liveMode already disabled")},dispose:function(){r=!0,a&&a.destroy()}}},x=new Map,T=function(e,t,n,r){var a=x.get(e);if(!a){var c=new Set,o=new Set,i=new Map,u=new Set,s=N(e,(function(e){"CONNECTION_CLOSED"===e.type&&i.delete(e.peerId),c.forEach((function(t){t(e)}))}),(function(e,t){o.forEach((function(n){n(e,t)&&i.set(t.peerId,e)}))}));a={room:s,networkStatusListeners:c,dataListeners:o,mediaAttachedData:i,streamListeners:u,count:0},x.set(e,a)}t&&a.networkStatusListeners.add(t),n&&a.dataListeners.add(n),r&&(a.streamListeners.add(r),1===a.streamListeners.size&&(a.myStream=new MediaStream,a.room.enableLiveMode(a.myStream,(function(e,t,n){var r=t.peerId;if(e&&n&&!a.mediaAttachedData.has(r))return console.warn("stream received too early, closing media:",r),void n();var c=a.mediaAttachedData.get(r);a.streamListeners.forEach((function(t){t(r,e,c)}))})))),a.count+=1;return{broadcastData:a.room.broadcastData,myStream:a.myStream,unregister:function(){t&&a.networkStatusListeners.delete(t),n&&a.dataListeners.delete(n),r&&(a.streamListeners.delete(r),0===a.streamListeners.size&&(delete a.myStream,a.room.disableLiveMode())),a.count-=1,a.count<=0&&(a.room.dispose(),x.delete(e))}}},L=function(e){var t=Object(r.useRef)(),n=Object(r.useCallback)((function(){t.current&&t.current.apply(t,arguments)}),[]);return Object(r.useEffect)((function(){var n=T(e),r=n.broadcastData,a=n.unregister;return t.current=r,a}),[e]),n},R=new WeakMap,D=function(e){try{return R.get(e)}catch(t){return}},P=function(e,t,n){var a=Object(r.useState)(),c=Object(d.a)(a,2),o=c[0],i=c[1];return Object(r.useEffect)((function(){return T(e,void 0,(function(e,r){return!!t(e)&&(function(e,t){try{R.set(e,t)}catch(n){}}(e,r),i(e),!!n)})).unregister}),[e,t,n]),o},U=function(){var e=Object(p.a)(v.a.mark((function e(){var t,n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.enumerateDevices();case 3:return t=e.sent,n=t.filter((function(e){return"videoinput"===e.kind})).map((function(e){return{label:e.label,deviceId:e.deviceId}})),e.abrupt("return",n);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),V=function(){var e=Object(p.a)(v.a.mark((function e(){var t,n;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.enumerateDevices();case 3:return t=e.sent,n=t.filter((function(e){return"audioinput"===e.kind})).map((function(e){return{label:e.label,deviceId:e.deviceId}})),e.abrupt("return",n);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",[]);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}(),F=(n(29),n(7)),_=function(e){return new Promise((function(t){return setTimeout(t,e)}))},W=function(){var e=Object(p.a)(v.a.mark((function e(t,n){var r,a,c,o,i,u,s,l,d,m,f;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"===typeof ImageCapture){e.next=21;break}return r=new ImageCapture(n),e.next=4,_(2e3);case 4:return e.prev=4,e.next=7,r.takePhoto();case 7:return c=e.sent,e.next=10,createImageBitmap(c);case 10:a=e.sent,e.next=18;break;case 13:return e.prev=13,e.t0=e.catch(4),e.next=17,r.grabFrame();case 17:a=e.sent;case 18:return o=a.width,i=a.height,e.abrupt("return",{srcImg:a,srcW:o,srcH:i});case 21:return(u=document.getElementById("internal-video")).style.display="block",s=u.srcObject,l=function(){u.srcObject=s},u.srcObject=t,e.next=28,_(2e3);case 28:return d=u,m=u.videoWidth,f=u.videoHeight,e.abrupt("return",{srcImg:d,srcW:m,srcH:f,revert:l});case 32:case"end":return e.stop()}}),e,null,[[4,13]])})));return function(t,n){return e.apply(this,arguments)}}(),q=function(){var e=Object(p.a)(v.a.mark((function e(t){var n,r,a,c,o,i,u,s,l,d,m,f,p,g,h,b,y;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t?{video:{deviceId:t}}:{video:!0},e.next=3,navigator.mediaDevices.getUserMedia(n);case 3:return r=e.sent,a=r.getVideoTracks()[0],c=document.getElementById("internal-canvas"),o=c.getContext("2d"),i=72,u=72,c.width=i,c.height=u,e.next=13,W(r,a);case 13:return s=e.sent,l=s.srcImg,d=s.srcW,m=s.srcH,f=s.revert,p=Math.max(i/d,u/m),g=Math.min(d,i/p),h=Math.min(m,u/p),b=(d-g)/2,y=(m-h)/2,o.drawImage(l,b,y,g,h,0,0,i,u),f&&f(),a.stop(),e.abrupt("return",c.toDataURL("image/png"));case 27:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),B=function(e){return e&&"object"===typeof e&&"string"===typeof e.userId&&"string"===typeof e.image&&function(e){return e&&"object"===typeof e&&"string"===typeof e.nickname&&"string"===typeof e.message}(e.info)},J=function(){var e=Object(p.a)(v.a.mark((function e(t){var n,r,a,c,o,i,u,s,l,d,m,f,p,g,h,b;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t?{video:{deviceId:t}}:{video:!0},e.next=3,navigator.mediaDevices.getUserMedia(n);case 3:return r=e.sent,a=r.getVideoTracks()[0],(c=document.getElementById("internal-video")).style.display="block",c.srcObject=r,e.next=10,_(1e3);case 10:return o=c.videoWidth,i=c.videoHeight,u=document.getElementById("internal-canvas"),s=u.getContext("2d"),72,72,u.width=72,u.height=72,l=Math.max(72/o,72/i),d=Math.min(o,72/l),m=Math.min(i,72/l),f=(o-d)/2,p=(i-m)/2,g=setInterval((function(){s.drawImage(c,f,p,d,m,0,0,72,72)}),1e3/30),h=u.captureStream(),b=function(){c.style.display="none",clearInterval(g),a.stop()},e.abrupt("return",{stream:h,dispose:b});case 27:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),H=function(){var e=Object(p.a)(v.a.mark((function e(t){var n,r,a,c;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t?{audio:{deviceId:t}}:{audio:!0},e.next=3,navigator.mediaDevices.getUserMedia(n);case 3:return r=e.sent,a=r.getAudioTracks()[0],e.next=7,a.applyConstraints({echoCancellation:!0,echoCancellationType:{ideal:"system"},noiseSuppression:{ideal:!0}});case 7:return c=function(){a.stop()},e.abrupt("return",{stream:r,dispose:c});case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),z=function(e,t,n,a,c){var o=function(e,t){var n=Object(r.useState)(null),a=Object(d.a)(n,2),c=a[0],o=a[1],i=Object(r.useState)({}),u=Object(d.a)(i,2),s=u[0],l=u[1];return Object(r.useEffect)((function(){if(t){var n=T(e,void 0,void 0,(function(e,t,n){l(t?function(r){return Object(I.a)({},r,Object(O.a)({},e,{stream:t,attachedData:n}))}:function(t){t[e];return Object(y.a)(t,[e].map(E.a))})})),r=n.myStream,a=n.unregister;return o(r||null),a}o(null),l({})}),[e,t]),{myStream:c,streamList:Object(r.useMemo)((function(){return Object.values(s)}),[s])}}(e,t||n),i=o.myStream,u=o.streamList;Object(r.useEffect)((function(){var e=null;return t&&i&&Object(p.a)(v.a.mark((function t(){var n,r,c,o;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,J(a);case 2:n=t.sent,r=n.stream,c=n.dispose,o=r.getVideoTracks()[0],i.addTrack(o),i.dispatchEvent(new Event("customtrack")),e=function(){i.removeTrack(o),c(),i.dispatchEvent(new Event("customtrack"))};case 9:case"end":return t.stop()}}),t)})))(),function(){e&&e()}}),[e,t,a,i]),Object(r.useEffect)((function(){var e=null;return n&&i&&Object(p.a)(v.a.mark((function t(){var n,r,a,o;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,H(c);case 2:n=t.sent,r=n.stream,a=n.dispose,o=r.getAudioTracks()[0],i.addTrack(o),i.dispatchEvent(new Event("customtrack")),e=function(){i.removeTrack(o),a(),i.dispatchEvent(new Event("customtrack"))};case 9:case"end":return t.stop()}}),t)})))(),function(){e&&e()}}),[e,n,c,i]);var s=Object(r.useMemo)((function(){var e={};return u.forEach((function(t){if("object"===typeof t.attachedData){var n=t.attachedData.userId;"string"===typeof n&&(e[n]=t.stream)}})),e}),[u]);return{myStream:i,streamMap:s}},G=a.a.memo((function(e){var t=e.image,n=e.nickname,c=e.statusMesg,o=e.obsoleted,i=e.liveMode,u=e.stream,s=e.unmuted,l=Object(r.useState)(!1),m=Object(d.a)(l,2),f=m[0],v=m[1],p=Object(r.useState)(!1),g=Object(d.a)(p,2),h=g[0],b=g[1],y=Object(r.useRef)(null);return Object(r.useEffect)((function(){u&&y.current&&(y.current.srcObject=u);var e=function(){v(!!u&&u.getVideoTracks().length>0),b(!!u&&u.getAudioTracks().length>0)};return u&&(u.addEventListener("addtrack",e),u.addEventListener("removetrack",e),u.addEventListener("customtrack",e)),e(),function(){u&&(u.removeEventListener("addtrack",e),u.removeEventListener("removetrack",e),u.removeEventListener("customtrack",e))}}),[u]),a.a.createElement("div",{className:"FaceImages-card",style:{opacity:o?.2:1}},u?a.a.createElement("video",{className:"FaceImages-photo",ref:y,autoPlay:!0,muted:!s}):a.a.createElement("img",{src:t||"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQI12NgYAAAAAMAASDVlMcAAAAASUVORK5CYII=",className:"FaceImages-photo",alt:"myself"}),a.a.createElement("div",{className:"FaceImages-name"},n),a.a.createElement("div",{className:"FaceImages-mesg"},c),f&&h&&a.a.createElement("div",{className:"FaceImages-live-indicator",title:"Video/Audio On"},"\u25c8"),f&&!h&&a.a.createElement("div",{className:"FaceImages-live-indicator",title:"Video On"},"\u25c9"),i&&!f&&!h&&a.a.createElement("div",{className:"FaceImages-live-indicator",title:"Video On"},"\u25ce"))})),K=a.a.memo((function(e){var t=e.roomId,n=e.userId,c=e.nickname,o=e.statusMesg,i=e.liveType,u=e.videoDeviceId,s=e.audioDeviceId,l=function(e,t,n,a,c){var o=Object(r.useState)(),i=Object(d.a)(o,2),u=i[0],s=i[1],l=Object(r.useState)([]),m=Object(d.a)(l,2),f=m[0],g=m[1],h=Object(r.useState)(),b=Object(d.a)(h,2),y=b[0],E=b[1],O=Object(r.useRef)({nickname:n,message:a});if(O.current={nickname:n,message:a},y)throw y;var j=L(e),w=P(e,B,!0),k=Object(r.useMemo)((function(){var e;return w&&Object(I.a)({},w,{received:Date.now(),obsoleted:!1,liveMode:!!(null===(e=D(w))||void 0===e?void 0:e.liveMode)})}),[w]);if(k){var C=f.find((function(e){return e.userId===k.userId}));C?C.received!==k.received&&g(f.map((function(e){return e.userId===k.userId?k:e}))):g([].concat(Object(F.a)(f),[k]))}return Object(r.useEffect)((function(){var e=function(){var e=Date.now()-12e4,t=Date.now()-6e5;g((function(n){var r=!1,a=n.map((function(n){return n.received<e&&!n.obsoleted?(r=!0,Object(I.a)({},n,{obsoleted:!0})):n.received<t&&n.obsoleted?(r=!0,null):n})).filter((function(e){return e}));return r?a:n}))},n=function(){var n=Object(p.a)(v.a.mark((function n(){var r,a;return v.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,e(),n.next=4,q(c);case 4:r=n.sent,s(r),a={userId:t,image:r,info:O.current},j(a,!0),n.next=14;break;case 10:n.prev=10,n.t0=n.catch(0),console.error(n.t0),E(n.t0);case 14:case"end":return n.stop()}}),n,null,[[0,10]])})));return function(){return n.apply(this,arguments)}}();n();var r=setInterval(n,12e4);return function(){clearTimeout(r)}}),[e,t,c,j]),{myImage:u,roomImages:f}}(t,n,c,o,u),m=l.myImage,f=l.roomImages,g=z(t,"video"===i||"video+audio"===i,"video+audio"===i,u,s),h=g.myStream,b=g.streamMap;return a.a.createElement("div",{className:"FaceImage-container"},a.a.createElement(G,{image:m,nickname:c,statusMesg:o,liveMode:"off"!==i,stream:h||void 0}),f.map((function(e){return a.a.createElement(G,{key:e.userId,image:e.image,nickname:e.info.nickname,statusMesg:e.info.message,obsoleted:e.obsoleted,liveMode:e.liveMode,stream:b[e.userId],unmuted:"video+audio"===i})})))})),Y=(n(30),function(e){return e&&"object"===typeof e&&"string"===typeof e.userId&&"string"===typeof e.nickname&&"number"===typeof e.chatSeq&&"string"===typeof e.chatText&&("undefined"===typeof e.chatInReplyTo||"string"===typeof e.chatInReplyTo.userId||"number"===typeof e.chatInReplyTo.chatSeq)}),Q=function(e,t){var n=t[1]-e[1];return 0===n?e[0].length-t[0].length:n},Z=["\ud83d\udc4d","\u2764\ufe0f","\ud83d\ude01","\ud83d\ude0e","\ud83e\udd23"],$=function(e){var t=e.text,n=e.onClick;return a.a.createElement("button",{type:"button",onClick:function(){return n(t)}},a.a.createElement("span",{"aria-label":"Reaction"},t))},X=a.a.memo((function(e){var t=e.chatList,n=e.replyChat;return a.a.createElement("ul",{className:"MomentaryChat-list"},t.map((function(e){var t=function(t){return n(t,e.replyTo)};return a.a.createElement("li",{key:e.key,className:"MomentaryChat-listPart"},a.a.createElement("div",{className:"MomentaryChat-listPart-header"},a.a.createElement("div",{className:"MomentaryChat-iconButton-container"},a.a.createElement("div",{className:"MomentaryChat-iconButton"},Z.map((function(e){return a.a.createElement($,{key:e,text:e,onClick:t})})))),a.a.createElement("div",{className:"MomentaryChat-nickname"},e.nickname||"No Name")),a.a.createElement("div",null,e.text),e.replies.map((function(e){var t=Object(d.a)(e,2),n=t[0],r=t[1];return a.a.createElement("div",{className:"Momentary-icon"},n," ",r)})))})))})),ee=a.a.memo((function(e){var t=function(e,t,n){var a=Object(r.useRef)(1),c=Object(r.useRef)(new Map),o=Object(r.useState)([]),i=Object(d.a)(o,2),u=i[0],s=i[1],l=Object(r.useCallback)((function(e){if((c.current.get(e.userId)||0)<e.chatSeq)if(c.current.set(e.userId,e.chatSeq),e.chatInReplyTo){var t=e.chatText,n=e.chatInReplyTo;s((function(e){return e.map((function(e){if(e.replyTo.userId===n.userId&&e.replyTo.chatSeq===n.chatSeq){var r=new Map(e.replies);r.set(t,(r.get(t)||0)+1);var a=Object(F.a)(r.entries());return a.sort(Q),Object(I.a)({},e,{replies:a})}return e}))}))}else{var r={key:"".concat(e.userId,"_").concat(e.chatSeq),replyTo:{userId:e.userId,chatSeq:e.chatSeq},nickname:e.nickname,text:e.chatText,replies:[]};s((function(e){return[r].concat(Object(F.a)(e)).slice(0,100)}))}}),[]),m=L(e),f=P(e,Y);return Object(r.useEffect)((function(){f&&l(f)})),{chatList:u,sendChat:Object(r.useCallback)((function(e){var r={userId:t,nickname:n,chatSeq:a.current,chatText:e};a.current+=1,m(r),l(r)}),[m,t,n,l]),replyChat:Object(r.useCallback)((function(e,r){var c={userId:t,nickname:n,chatSeq:a.current,chatText:e,chatInReplyTo:r};a.current+=1,m(c),l(c)}),[m,t,n,l])}}(e.roomId,e.userId,e.nickname),n=t.chatList,c=t.sendChat,o=t.replyChat,i=Object(r.useState)(""),u=Object(d.a)(i,2),s=u[0],l=u[1];return a.a.createElement("div",{className:"MomentaryChat-container"},a.a.createElement("form",{onSubmit:function(e){e.preventDefault(),s&&(c(s),l(""))}},a.a.createElement("input",{value:s,onChange:function(e){return l(e.target.value)},placeholder:"Enter chat message"}),a.a.createElement("button",{type:"submit",disabled:!s},"Send")),a.a.createElement(X,{chatList:n,replyChat:o}))})),te=function(e){try{return window.localStorage.getItem(e)||""}catch(t){return""}}("nickname"),ne=function(e){var t=e.roomId,n=e.userId,c=Object(r.useState)(te),o=Object(d.a)(c,2),i=o[0],u=o[1],s=Object(r.useState)(""),l=Object(d.a)(s,2),m=l[0],f=l[1];Object(r.useEffect)((function(){!function(e){var t=window.location.hash.slice(1),n=new URLSearchParams(t);n.set("roomId",e),window.location.hash=n.toString()}(t)}),[t]);var g=function(){var e=Object(r.useState)([]),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){Object(p.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,U();case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})))()}),[]),n}(),h=function(){var e=Object(r.useState)([]),t=Object(d.a)(e,2),n=t[0],a=t[1];return Object(r.useEffect)((function(){Object(p.a)(v.a.mark((function e(){var t;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V();case 2:t=e.sent,a(t);case 4:case"end":return e.stop()}}),e)})))()}),[]),n}(),b=Object(r.useState)(),y=Object(d.a)(b,2),E=y[0],O=y[1],I=Object(r.useState)(),j=Object(d.a)(I,2),w=j[0],k=j[1],C=Object(r.useState)("off"),S=Object(d.a)(C,2),M=S[0],A=S[1],N=Object(r.useState)(!0),x=Object(d.a)(N,2),L=x[0],R=x[1],D=function(e){var t=Object(r.useState)(),n=Object(d.a)(t,2),a=n[0],c=n[1];if(a&&"UNKNOWN_ERROR"===a.type)throw new Error("Network Error");return Object(r.useEffect)((function(){return T(e,c).unregister}),[e]),a}(t),P="remote-faces://".concat(window.location.href.replace(/^https:\/\//,""));return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"SingleRoom-status"},JSON.stringify(D)),a.a.createElement("div",{className:"SingleRoom-room-info"},L?a.a.createElement(a.a.Fragment,null,a.a.createElement("button",{type:"button",onClick:function(){return R(!1)}},"Hide config"),a.a.createElement("div",null,"Link to this room:",a.a.createElement("input",{value:window.location.href,readOnly:!0}),"(Share this link with your colleagues)",a.a.createElement("a",{href:P},"Open App")),a.a.createElement("div",{className:"SingleRoom-nickname"},"Your Name:"," ",a.a.createElement("input",{defaultValue:te,onChange:function(e){u(e.target.value),function(t,n){try{window.localStorage.setItem(t,n)}catch(e){console.log("Failed to save string to localStorage",e)}}("nickname",e.target.value)}})),a.a.createElement("div",{className:"SingleRoom-statusmesg"},"Your Status:"," ",a.a.createElement("input",{onChange:function(e){f(e.target.value)},placeholder:"Enter status message"})),a.a.createElement("div",null,"Select Camera:"," ",a.a.createElement("select",{onChange:function(e){return O(e.target.value)}},g.map((function(e){return a.a.createElement("option",{key:e.deviceId,value:e.deviceId},e.label)})))),a.a.createElement("div",null,"Select Mic:"," ",a.a.createElement("select",{onChange:function(e){return k(e.target.value)}},h.map((function(e){return a.a.createElement("option",{key:e.deviceId,value:e.deviceId},e.label)})))),a.a.createElement("div",null,"Live Type:"," ",a.a.createElement("select",{onChange:function(e){return A(e.target.value)}},a.a.createElement("option",{value:"off"},"Off"),a.a.createElement("option",{value:"video"},"Video Only"),a.a.createElement("option",{value:"video+audio"},"Video and Audio")))):a.a.createElement("button",{type:"button",onClick:function(){return R(!0)}},"Show config")),a.a.createElement(K,{roomId:t,userId:n,videoDeviceId:E,audioDeviceId:w,nickname:i,statusMesg:m,liveType:M}),a.a.createElement(ee,{roomId:t,userId:n,nickname:i}))},re=function(){var e=window.location.hash.slice(1);return new URLSearchParams(e).get("roomId")}(),ae=g(),ce=function(){var e=Object(r.useState)(re),t=Object(d.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(""),i=Object(d.a)(o,2),u=i[0],s=i[1];return n?a.a.createElement(ne,{roomId:n,userId:ae}):a.a.createElement("div",{className:"SingleRoomEntrance-init"},a.a.createElement("button",{type:"button",onClick:function(){c(g())}},"Create a new room"),"OR",a.a.createElement("input",{value:u,onChange:function(e){return s(e.target.value)},placeholder:"Enter room link..."}),a.a.createElement("button",{type:"button",onClick:function(){c(b(u))},disabled:!b(u)},"Enter room"))},oe=(n(31),function(e){Object(l.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(i.a)(this,n);for(var r=arguments.length,a=new Array(r),c=0;c<r;c++)a[c]=arguments[c];return(e=t.call.apply(t,[this].concat(a))).state={hasError:!1},e}return Object(u.a)(n,[{key:"render",value:function(){var e=this.props.children;return this.state.hasError?a.a.createElement(m,null):e}}],[{key:"getDerivedStateFromError",value:function(){return{hasError:!0}}}]),n}(a.a.Component)),ie=function(){return a.a.createElement("div",{className:"App"},a.a.createElement(oe,null,a.a.createElement(ce,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(ie,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.3652471f.chunk.js.map