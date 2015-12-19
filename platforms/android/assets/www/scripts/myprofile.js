!function(e,a,t,r){function s(a){var t=getParameterByName("userId");Dashboard.showLoadingMsg(),ApiClient.getUser(t).then(function(t){e(".username",a).html(t.Name),e("#uploadUserImage",a).val("").trigger("change"),Dashboard.setPageTitle(t.Name);var r;r=t.PrimaryImageTag?ApiClient.getUserImageUrl(t.Id,{height:200,tag:t.PrimaryImageTag,type:"Primary"}):"css/images/logindefault.png",e("#fldImage",a).show().html("").html("<img width='140px' src='"+r+"' />");var s=!1;"Guest"==t.ConnectLinkType?e(".connectMessage",a).show():t.PrimaryImageTag?(e("#headerUploadNewImage",a).show(),s=!0,e(".connectMessage",a).hide()):(s=!0,e("#headerUploadNewImage",a).show(),e(".connectMessage",a).hide()),Dashboard.getCurrentUser().then(function(r){s&&AppInfo.supportsFileInput&&(r.Policy.IsAdministrator||t.Policy.EnableUserPreferenceAccess)?(e(".newImageForm",a).show(),e("#btnDeleteImage",a).removeClass("hide")):(e(".newImageForm",a).hide(),e("#btnDeleteImage",a).addClass("hide"))}),Dashboard.hideLoadingMsg()})}function o(){Dashboard.hideLoadingMsg();var a=e(e.mobile.activePage)[0];s(a)}function n(e){switch(Dashboard.hideLoadingMsg(),e.target.error.code){case e.target.error.NOT_FOUND_ERR:Dashboard.alert(Globalize.translate("FileNotFound"));break;case e.target.error.NOT_READABLE_ERR:Dashboard.alert(Globalize.translate("FileReadError"));break;case e.target.error.ABORT_ERR:break;default:Dashboard.alert(Globalize.translate("FileReadError"))}}function i(){e("#fldUpload",e.mobile.activePage).hide()}function d(){Dashboard.hideLoadingMsg(),Dashboard.alert(Globalize.translate("FileReadCancelled"))}function l(a,t){var s=t[0];if(!s||!s.type.match("image.*"))return e("#userImageOutput",a).html(""),e("#fldUpload",a).hide(),void(m=null);m=s;var o=new r;o.onerror=n,o.onloadstart=i,o.onabort=d,o.onload=function(t){var r=['<img style="max-width:500px;max-height:200px;" src="',t.target.result,'" title="',escape(s.name),'"/>'].join("");e("#userImageOutput",a).html(r),e("#fldUpload",a).show()},o.readAsDataURL(s)}function g(a){return a.preventDefault(),l(e.mobile.activePage,a.originalEvent.dataTransfer.files),!1}function c(e){return e.preventDefault(),e.originalEvent.dataTransfer.dropEffect="Copy",!1}function u(){var e=this;e.onImageSubmit=function(){var e=m;if(!e)return!1;if("image/png"!=e.type&&"image/jpeg"!=e.type&&"image/jpeg"!=e.type)return!1;Dashboard.showLoadingMsg();var a=getParameterByName("userId");return ApiClient.uploadUserImage(a,"Primary",e).then(o),!1}}var m;a.MyProfilePage=new u,e(t).on("pageinit","#userImagePage",function(){var a=this;s(a),e("#userImageDropZone",a).on("dragover",c).on("drop",g),e("#btnDeleteImage",a).on("click",function(){Dashboard.confirm(Globalize.translate("DeleteImageConfirmation"),Globalize.translate("DeleteImage"),function(e){if(e){Dashboard.showLoadingMsg();var a=getParameterByName("userId");ApiClient.deleteUserImage(a,"primary").then(o)}})}),e(".newImageForm").off("submit",MyProfilePage.onImageSubmit).on("submit",MyProfilePage.onImageSubmit),a.querySelector("#uploadUserImage").addEventListener("change",function(e){l(a,e.target.files)})})}(jQuery,window,document,window.FileReader),function(e,a,t){function r(a){var t=getParameterByName("userId");ApiClient.getUser(t).then(function(t){Dashboard.getCurrentUser().then(function(r){Dashboard.setPageTitle(t.Name);var s=!0,o=!1;"Guest"==t.ConnectLinkType?(e(".localAccessSection",a).hide(),s=!1):t.HasConfiguredPassword?(e("#btnResetPassword",a).show(),e("#fldCurrentPassword",a).show(),o=!0):(e("#btnResetPassword",a).hide(),e("#fldCurrentPassword",a).hide()),s&&(r.Policy.IsAdministrator||t.Policy.EnableUserPreferenceAccess)?e(".passwordSection",a).show():e(".passwordSection",a).hide(),o&&(r.Policy.IsAdministrator||t.Policy.EnableUserPreferenceAccess)?e(".localAccessSection",a).show():e(".localAccessSection",a).hide(),t.HasConfiguredEasyPassword?(e("#txtEasyPassword",a).val("").attr("placeholder","******"),e("#btnResetEasyPassword",a).removeClass("hide")):(e("#txtEasyPassword",a).val("").attr("placeholder",""),e("#btnResetEasyPassword",a).addClass("hide")),a.querySelector(".chkEnableLocalEasyPassword").checked=t.Configuration.EnableLocalPassword})}),e("#txtCurrentPassword",a).val(""),e("#txtNewPassword",a).val(""),e("#txtNewPasswordConfirm",a).val("")}function s(a){var t=getParameterByName("userId"),r=e("#txtEasyPassword",a).val();r?ApiClient.updateEasyPassword(t,r).then(function(){o(a,t)}):o(a,t)}function o(e,a){ApiClient.getUser(a).then(function(a){a.Configuration.EnableLocalPassword=e.querySelector(".chkEnableLocalEasyPassword").checked,ApiClient.updateUserConfiguration(a.Id,a.Configuration).then(function(){Dashboard.hideLoadingMsg(),Dashboard.alert(Globalize.translate("MessageSettingsSaved")),r(e)})})}function n(a){var t=getParameterByName("userId"),s=e("#txtCurrentPassword",a).val(),o=e("#txtNewPassword",a).val();ApiClient.updateUserPassword(t,s,o).then(function(){Dashboard.hideLoadingMsg(),Dashboard.alert(Globalize.translate("PasswordSaved")),r(a)})}function i(){var a=this;a.onSubmit=function(){var a=e(e.mobile.activePage)[0];return e("#txtNewPassword",a).val()!=e("#txtNewPasswordConfirm",a).val()?Dashboard.alert(Globalize.translate("PasswordMatchError")):(Dashboard.showLoadingMsg(),n(a)),!1},a.onLocalAccessSubmit=function(){var a=e(e.mobile.activePage)[0];return Dashboard.showLoadingMsg(),s(a),!1},a.resetPassword=function(){var a=Globalize.translate("PasswordResetConfirmation"),t=e(e.mobile.activePage)[0];Dashboard.confirm(a,Globalize.translate("PasswordResetHeader"),function(e){if(e){var a=getParameterByName("userId");Dashboard.showLoadingMsg(),ApiClient.resetUserPassword(a).then(function(){Dashboard.hideLoadingMsg(),Dashboard.alert({message:Globalize.translate("PasswordResetComplete"),title:Globalize.translate("PasswordResetHeader")}),r(t)})}})},a.resetEasyPassword=function(){var a=Globalize.translate("PinCodeResetConfirmation"),t=e(e.mobile.activePage)[0];Dashboard.confirm(a,Globalize.translate("HeaderPinCodeReset"),function(e){if(e){var a=getParameterByName("userId");Dashboard.showLoadingMsg(),ApiClient.resetEasyPassword(a).then(function(){Dashboard.hideLoadingMsg(),Dashboard.alert({message:Globalize.translate("PinCodeResetComplete"),title:Globalize.translate("HeaderPinCodeReset")}),r(t)})}})}}t.UpdatePasswordPage=new i,e(a).on("pageinit",".userPasswordPage",function(){e(".updatePasswordForm").off("submit",UpdatePasswordPage.onSubmit).on("submit",UpdatePasswordPage.onSubmit),e(".localAccessForm").off("submit",UpdatePasswordPage.onLocalAccessSubmit).on("submit",UpdatePasswordPage.onLocalAccessSubmit)}).on("pageshow",".userPasswordPage",function(){var e=this;r(e)})}(jQuery,document,window);