sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/UIComponent',
	'sap/m/MessageToast'],
	function(jQuery, Controller, UIComponent, MessageToast) {
	"use strict";

	var PageController = Controller.extend("sap.ui.demo.walkthrough.controller.Homepage", {
		onInit: function () {
			// var item = this.byId('TileManageBooks');
			// item.setVisible(!item.getVisible());
		},

		press: function(evt) {
			MessageToast.show("The generic tile is pressed.");
		},

		userMgn: function (evt) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("UsersManage", {});
		},


		returnBooks: function (evt) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("BooksReturn", {});
		},

		bookBooks: function (evt) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("BooksBook", {});
		},

		browseBooks: function (evt) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("BooksBrowse", {});
		},

		browseMovies: function (evt) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("MoviesBrowse", {});
		}
	});

	return PageController;
});
