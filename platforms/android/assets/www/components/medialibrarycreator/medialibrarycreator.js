define(["dialogHelper","jQuery","emby-input","emby-select","paper-icon-button-light","listViewStyle","formDialogStyle"],function(e,t){function n(){if(0==p.length)return require(["alert"],function(e){e({text:Globalize.translate("PleaseAddAtLeastOneFolder"),type:"error"})}),!1;var n=this,i=t(n).parents(".dialog")[0],r=t("#txtValue",n).val(),o=t("#selectCollectionType",n).val();return"mixed"==o&&(o=null),ApiClient.addVirtualFolder(r,o,m.refresh,p).then(function(){v=!0,e.close(i)},function(){require(["toast"],function(e){e(Globalize.translate("ErrorAddingMediaPathToVirtualFolder"))})}),!1}function i(e){return e.filter(function(e){return e.isSelectable!==!1}).map(function(e){return'<option value="'+e.value+'">'+e.name+"</option>"}).join("")}function r(e,r){t("#selectCollectionType",e).html(i(r)).val("").on("change",function(){if("mixed"!=this.value){var e=t(this).parents(".dialog")[0],n=this.selectedIndex;if(-1!=n){var i=this.options[n].innerHTML.replace("*","").replace("&amp;","&"),o=this.value;t("#txtValue",e).val(i);var a=r.filter(function(e){return e.value==o})[0];t(".collectionTypeFieldDescription",e).html(a.message||"")}}}),t(".btnAddFolder",e).on("click",o),t("form",e).off("submit",n).on("submit",n)}function o(){var e=t(this).parents(".dlg-librarycreator")[0];require(["directorybrowser"],function(t){var n=new t;n.show({callback:function(t){t&&s(e,t),n.close()}})})}function a(e,t){var n="";return n+='<div class="listItem lnkPath">',n+='<i class="listItemIcon md-icon">folder</i>',n+='<div class="listItemBody">',n+='<div class="listItemBodyText">'+e+"</div>",n+="</div>",n+='<button is="paper-icon-button-light"" class="btnRemovePath" data-index="'+t+'"><i class="md-icon">remove_circle</i></button>',n+="</div>"}function l(e){var n=p.map(a).join(""),i=e.querySelector(".folderList");i.innerHTML=n,n?i.classList.remove("hide"):i.classList.add("hide"),t(e.querySelectorAll(".btnRemovePath")).on("click",c)}function s(e,t){0==p.filter(function(e){return e.toLowerCase()==t.toLowerCase()}).length&&(p.push(t),l(e))}function c(){var e=this,n=parseInt(e.getAttribute("data-index")),i=p[n];p=p.filter(function(e){return e.toLowerCase()!=i.toLowerCase()});var r=t(this).parents(".dlg-librarycreator")[0];l(r)}function d(){Dashboard.hideLoadingMsg(),f.resolveWith(null,[v])}function u(){var t=this;t.show=function(t){var n=jQuery.Deferred();m=t,f=n,v=!1;var i=new XMLHttpRequest;return i.open("GET","components/medialibrarycreator/medialibrarycreator.template.html",!0),i.onload=function(){var n=this.response,i=e.createDialog({size:"small",modal:!1,removeOnClose:!0});i.classList.add("ui-body-a"),i.classList.add("background-theme-a"),i.classList.add("dlg-librarycreator"),i.innerHTML=Globalize.translateDocument(n),document.body.appendChild(i),r(i,t.collectionTypeOptions),i.addEventListener("close",d),e.open(i),i.querySelector(".btnCancel").addEventListener("click",function(){e.close(i)}),p=[],l(i)},i.send(),n.promise()}}var f,v,m,p=[];return u});