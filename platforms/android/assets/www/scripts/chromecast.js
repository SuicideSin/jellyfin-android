!function(e,t){function s(){return u?new Promise(function(e){e(u)}):ApiClient.getJSON(ApiClient.getUrl("System/Endpoint")).then(function(e){return u=e,e})}function n(){function e(){var e=t.lastPlayerData||{};return e=e.PlayState||{},null==e.VolumeLevel?100:e.VolumeLevel}var t=this;t.name=r,t.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(s){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){s({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))},Events.on(p,"connect",function(){MediaController.setActivePlayer(r,t.getCurrentTargetInfo()),Logger.log("cc: connect"),t.lastPlayerData={}}),Events.on(p,"playbackstart",function(e,s){Logger.log("cc: playbackstart"),p.initializeCastPlayer();var n=t.getPlayerStateInternal(s);Events.trigger(t,"playbackstart",[n])}),Events.on(p,"playbackstop",function(e,s){Logger.log("cc: playbackstop");var n=t.getPlayerStateInternal(s);Events.trigger(t,"playbackstop",[n]),t.lastPlayerData={}}),Events.on(p,"playbackprogress",function(e,s){Logger.log("cc: positionchange");var n=t.getPlayerStateInternal(s);Events.trigger(t,"positionchange",[n])}),t.play=function(e){Dashboard.getCurrentUser().then(function(){e.items?t.playWithCommand(e,"PlayNow"):t.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(s){e.items=s.Items,t.playWithCommand(e,"PlayNow")})})},t.playWithCommand=function(e,s){return e.items?void p.loadMedia(e,s):void ApiClient.getItem(Dashboard.getCurrentUserId(),e.ids[0]).then(function(n){e.items=[n],t.playWithCommand(e,s)})},t.unpause=function(){p.sendMessage({options:{},command:"Unpause"})},t.pause=function(){p.sendMessage({options:{},command:"Pause"})},t.shuffle=function(e){var s=Dashboard.getCurrentUserId();ApiClient.getItem(s,e).then(function(e){t.playWithCommand({items:[e]},"Shuffle")})},t.instantMix=function(e){var s=Dashboard.getCurrentUserId();ApiClient.getItem(s,e).then(function(e){t.playWithCommand({items:[e]},"InstantMix")})},t.canQueueMediaType=function(e){return"Audio"==e},t.queue=function(e){t.playWithCommnd(e,"PlayLast")},t.queueNext=function(e){t.playWithCommand(e,"PlayNext")},t.stop=function(){p.sendMessage({options:{},command:"Stop"})},t.displayContent=function(e){p.sendMessage({options:e,command:"DisplayContent"})},t.mute=function(){p.sendMessage({options:{},command:"Mute"})},t.unMute=function(){t.setVolume(e()+2)},t.setRepeatMode=function(e){p.sendMessage({options:{RepeatMode:e},command:"SetRepeatMode"})},t.toggleMute=function(){var e=t.lastPlayerData||{};e=e.PlayState||{},e.IsMuted?t.unMute():t.mute()},t.getTargets=function(){var e=[];return p.hasReceivers&&e.push(t.getCurrentTargetInfo()),e},t.getCurrentTargetInfo=function(){var e=null;return p.session&&p.session.receiver&&p.session.receiver.friendlyName&&(e=p.session.receiver.friendlyName),{name:r,id:r,playerName:r,playableMediaTypes:["Audio","Video"],isLocalPlayer:!1,appName:r,deviceName:e,supportedCommands:["VolumeUp","VolumeDown","Mute","Unmute","ToggleMute","SetVolume","SetAudioStreamIndex","SetSubtitleStreamIndex","DisplayContent","SetRepeatMode","EndSession"]}},t.seek=function(e){e=parseInt(e),e/=1e7,p.sendMessage({options:{position:e},command:"Seek"})},t.setAudioStreamIndex=function(e){p.sendMessage({options:{index:e},command:"SetAudioStreamIndex"})},t.setSubtitleStreamIndex=function(e){p.sendMessage({options:{index:e},command:"SetSubtitleStreamIndex"})},t.nextTrack=function(){p.sendMessage({options:{},command:"NextTrack"})},t.previousTrack=function(){p.sendMessage({options:{},command:"PreviousTrack"})},t.beginPlayerUpdates=function(){},t.endPlayerUpdates=function(){},t.volumeDown=function(){p.sendMessage({options:{},command:"VolumeDown"})},t.endSession=function(){t.stop(),setTimeout(function(){p.stopApp()},1e3)},t.volumeUp=function(){p.sendMessage({options:{},command:"VolumeUp"})},t.setVolume=function(e){e=Math.min(e,100),e=Math.max(e,0),p.sendMessage({options:{volume:e},command:"SetVolume"})},t.getPlayerState=function(){return new Promise(function(e){var s=t.getPlayerStateInternal();e(s)})},t.lastPlayerData={},t.getPlayerStateInternal=function(e){return e=e||t.lastPlayerData,t.lastPlayerData=e,Logger.log(JSON.stringify(e)),e},t.tryPair=function(){return new Promise(function(e){e()})}}function i(){p=new l,MediaController.registerPlayer(new n),Events.on(MediaController,"playerchange",function(e,t){t.name==r&&p.deviceState!=o.ACTIVE&&p.isInitialized&&p.launchApp()})}var o={IDLE:0,ACTIVE:1,WARNING:2,ERROR:3},a={IDLE:"IDLE",LOADING:"LOADING",LOADED:"LOADED",PLAYING:"PLAYING",PAUSED:"PAUSED",STOPPED:"STOPPED",SEEKING:"SEEKING",ERROR:"ERROR"},r="Chromecast",c="2D4B1DA3",d="urn:x-cast:com.connectsdk",l=function(){this.deviceState=o.IDLE,this.currentMediaSession=null,this.session=null,this.castPlayerState=a.IDLE,this.hasReceivers=!1,this.errorHandler=this.onError.bind(this),this.mediaStatusUpdateHandler=this.onMediaStatusUpdate.bind(this),this.initializeCastPlayer()};l.prototype.initializeCastPlayer=function(){if(t){if(!t.cast||!t.cast.isAvailable)return void setTimeout(this.initializeCastPlayer.bind(this),1e3);var e=new t.cast.SessionRequest(c),s=new t.cast.ApiConfig(e,this.sessionListener.bind(this),this.receiverListener.bind(this));Logger.log("chromecast.initialize"),t.cast.initialize(s,this.onInitSuccess.bind(this),this.errorHandler)}},l.prototype.onInitSuccess=function(){this.isInitialized=!0,Logger.log("chromecast init success")},l.prototype.onError=function(){Logger.log("chromecast error")},l.prototype.sessionListener=function(e){this.session=e,this.session&&(Logger.log("sessionListener "+JSON.stringify(e)),this.session.media[0]&&this.onMediaDiscovered("activeSession",this.session.media[0]),this.onSessionConnected(e))},l.prototype.messageListener=function(e,t){if(t=JSON.parse(t),"playbackerror"==t.type){var s=t.data;setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessagePlaybackError"+s),title:Globalize.translate("HeaderPlaybackError")})},300)}else"connectionerror"==t.type?setTimeout(function(){Dashboard.alert({message:Globalize.translate("MessageChromecastConnectionError"),title:Globalize.translate("HeaderError")})},300):t.type&&0==t.type.indexOf("playback")&&Events.trigger(this,t.type,[t.data])},l.prototype.receiverListener=function(e){"available"===e?(Logger.log("chromecast receiver found"),this.hasReceivers=!0):(Logger.log("chromecast receiver list empty"),this.hasReceivers=!1)},l.prototype.sessionUpdateListener=function(e){Logger.log("sessionUpdateListener alive: "+e),e||(this.session=null,this.deviceState=o.IDLE,this.castPlayerState=a.IDLE,Logger.log("sessionUpdateListener: setting currentMediaSession to null"),this.currentMediaSession=null,MediaController.removeActivePlayer(r))},l.prototype.launchApp=function(){Logger.log("chromecast launching app..."),t.cast.requestSession(this.onRequestSessionSuccess.bind(this),this.onLaunchError.bind(this))},l.prototype.onRequestSessionSuccess=function(e){Logger.log("chromecast session success: "+e.sessionId),this.onSessionConnected(e)},l.prototype.onSessionConnected=function(e){this.session=e,this.deviceState=o.ACTIVE,this.session.addMessageListener(d,this.messageListener.bind(this)),this.session.addMediaListener(this.sessionMediaListener.bind(this)),this.session.addUpdateListener(this.sessionUpdateListener.bind(this)),Events.trigger(this,"connect"),this.sendMessage({options:{},command:"Identify"})},l.prototype.sessionMediaListener=function(e){Logger.log("sessionMediaListener"),this.currentMediaSession=e,this.currentMediaSession.addUpdateListener(this.mediaStatusUpdateHandler)},l.prototype.onLaunchError=function(){Logger.log("chromecast launch error"),this.deviceState=o.ERROR,MediaController.removeActivePlayer(r)},l.prototype.stopApp=function(){this.session&&this.session.stop(this.onStopAppSuccess.bind(this,"Session stopped"),this.errorHandler)},l.prototype.onStopAppSuccess=function(e){Logger.log(e),this.deviceState=o.IDLE,this.castPlayerState=a.IDLE,Logger.log("onStopAppSuccess: setting currentMediaSession to null"),this.currentMediaSession=null},l.prototype.loadMedia=function(e,t){return this.session?(e.items=e.items.map(function(e){return{Id:e.Id,Name:e.Name,Type:e.Type,MediaType:e.MediaType,IsFolder:e.IsFolder}}),void this.sendMessage({options:e,command:t})):void Logger.log("no session")};var u;l.prototype.sendMessage=function(e){var t=this,n=AppSettings.maxChromecastBitrate(),i=null;p.session&&p.session.receiver&&p.session.receiver.friendlyName&&(i=p.session.receiver.friendlyName),e=$.extend(e,{userId:Dashboard.getCurrentUserId(),deviceId:ApiClient.deviceId(),accessToken:ApiClient.accessToken(),serverAddress:ApiClient.serverAddress(),maxBitrate:n,receiverName:i,supportsAc3:AppSettings.enableChromecastAc3()}),s().then(function(s){s.IsInNetwork?ApiClient.getPublicSystemInfo().then(function(s){e.serverAddress=s.LocalAddress,t.sendMessageInternal(e)}):t.sendMessageInternal(e)})},l.prototype.sendMessageInternal=function(e){e=JSON.stringify(e),this.session.sendMessage(d,e,this.onPlayCommandSuccess.bind(this),this.errorHandler)},l.prototype.onPlayCommandSuccess=function(){Logger.log("Message was sent to receiver ok.")},l.prototype.onMediaDiscovered=function(e,t){Logger.log("chromecast new media session ID:"+t.mediaSessionId+" ("+e+")"),this.currentMediaSession=t,"loadMedia"==e&&(this.castPlayerState=a.PLAYING),"activeSession"==e&&(this.castPlayerState=t.playerState),this.currentMediaSession.addUpdateListener(this.mediaStatusUpdateHandler)},l.prototype.onMediaStatusUpdate=function(e){0==e&&(this.castPlayerState=a.IDLE),Logger.log("chromecast updating media: "+e)},l.prototype.setReceiverVolume=function(e,t){return this.currentMediaSession?void(e?this.session.setReceiverMuted(!0,this.mediaCommandSuccessCallback.bind(this),this.errorHandler):this.session.setReceiverVolumeLevel(t||1,this.mediaCommandSuccessCallback.bind(this),this.errorHandler)):void Logger.log("this.currentMediaSession is null")},l.prototype.mute=function(){this.setReceiverVolume(!0)},l.prototype.mediaCommandSuccessCallback=function(e){Logger.log(e)};var p;requirejs(["https://www.gstatic.com/cv/js/sender/v1/cast_sender.js"],i)}(window,window.chrome,console);