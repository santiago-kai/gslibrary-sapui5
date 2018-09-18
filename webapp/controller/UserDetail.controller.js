sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/ui/core/UIComponent',
		"sap/ui/core/routing/History"
	], function(jQuery, Fragment, Controller, JSONModel, UIComponent, History) {
	"use strict";

	var PageController = Controller.extend("sap.ui.demo.walkthrough.controller.UserDetail", {

		onInit: function (oEvent) {
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.walkthrough.json", "/Role.json"));
			this.getView().setModel(oModel);

			// Set the initial form to be the display one
			this._showFormFragment("UserChange");

			// Set footer button
			this._toggleButtonsAndView(true);
		},

		back: function(){
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = UIComponent.getRouterFor(this);
				oRouter.navTo("Login", {}, true /*no history*/);
			}
		},

		onExit : function () {
			for (var sPropertyName in this._formFragments) {
				if (!this._formFragments.hasOwnProperty(sPropertyName) || this._formFragments[sPropertyName] == null) {
					return;
				}

				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},

		handleCancelPress : function () {
			this.back();
		},

		handleSavePress : function () {

			// To do Save

			// MessageBox

			this.back();

		},

		_formFragments: {},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "UserChange" : "UserDisplay");
		},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "sap.ui.demo.walkthrough.fragment." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},

		_showFormFragment : function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}

	});


	return PageController;

});
