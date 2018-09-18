sap.ui.define([
			'jquery.sap.global',
			'sap/ui/core/mvc/Controller',
			'sap/ui/model/json/JSONModel',
			'sap/ui/core/UIComponent',
			"sap/m/MessageBox"
		], function(jQuery, Controller, JSONModel, UIComponent, MessageBox) {
	"use strict";

	return Controller.extend("sap.ui.demo.walkthrough.controller.Login", {
		onInit : function() {
				var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.walkthrough.json", "/Role.json"));
				this.getView().setModel(oModel);
		},

		submit : function(oEvent) {

				var username = this.getView().byId("username").getValue();
				var password = this.getView().byId("password").getValue();
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("Homepage",{
					username:username,
					query: {
						password:password}
				});
				// var loginRequest = {
				// 		type : 'POST',
				// 		url : "login?name=" + username + "&password=" + encodeURIComponent(password),
				// 		contentType:'application/json',
				// 		success : function(result) {
				// 		 if(result=="success"){
				// 			 location.reload();
				// 			 //MessageBox.success(result);
				// 		   oRouter.navTo("homepage");
				// 		 }else{
        //        MessageBox.error("Username or Password is not correct");
        //      }
				// 		},
				// 		error : function(result) {
				// 			MessageBox.error("Login Failed");
				// 		}
				// };
				// $.ajax(loginRequest);
		},

	});

});
