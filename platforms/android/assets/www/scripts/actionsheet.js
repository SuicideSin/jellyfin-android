!function(){function e(e){require(["paper-menu","paper-dialog","paper-dialog-scrollable","scale-up-animation","fade-out-animation"],function(){t(e)})}function t(e){var t,n="",o=$(window).height();e.positionTo&&o>=540&&(t=$(e.positionTo).offset(),t.top+=$(e.positionTo).innerHeight()/2,t.left+=$(e.positionTo).innerWidth()/2,t.top-=24,t.left-=24,t.top-=55*e.items.length/2,t.left-=80,t.top-=$(window).scrollTop(),t.left-=$(window).scrollLeft(),t.top=Math.min(t.top,$(window).height()-300),t.left=Math.min(t.left,$(window).width()-300),t.top=Math.max(t.top,0),t.left=Math.max(t.left,0)),e.title&&(n+="<h2>",n+=e.title,n+="</h2>");var i=!browserInfo.safari;i&&(n+="<paper-dialog-scrollable>");var a=e.items.filter(function(e){return e.ironIcon}).length;n+=e.title&&!a?'<paper-menu style="text-align:center;">':"<paper-menu>";for(var r=0,l=e.items.length;l>r;r++){var p=e.items[r];n+='<paper-menu-item class="actionSheetMenuItem" data-id="'+p.id+'" style="display:block;">',p.ironIcon?n+='<iron-icon icon="'+p.ironIcon+'"></iron-icon>':a&&(n+="<iron-icon></iron-icon>"),n+="<span>"+p.name+"</span>",n+="</paper-menu-item>"}n+="</paper-menu>",i&&(n+="</paper-dialog-scrollable>"),e.showCancel&&(n+='<div class="buttons">',n+="<paper-button dialog-dismiss>"+Globalize.translate("ButtonCancel")+"</paper-button>",n+="</div>");var s=document.createElement("paper-dialog");s.setAttribute("with-backdrop","with-backdrop"),s.innerHTML=n,t&&(s.style.position="fixed",s.style.left=t.left+"px",s.style.top=t.top+"px"),document.body.appendChild(s),browserInfo.msie||(s.animationConfig={entry:{name:"scale-up-animation",node:s,timing:{duration:160,easing:"ease-out"}},exit:{name:"fade-out-animation",node:s,timing:{duration:200,easing:"ease-in"}}}),setTimeout(function(){s.open()},50),s.addEventListener("iron-overlay-closed",function(){s.parentNode.removeChild(s)});var c=browserInfo.chrome||browserInfo.safari?"click":"mousedown";$(".actionSheetMenuItem",s).on(c,function(){var t=this.getAttribute("data-id");setTimeout(function(){s.close(),e.callback&&e.callback(t)},100)})}window.ActionSheetElement={show:e}}();