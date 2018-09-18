sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/ui/core/UIComponent',
		"sap/ui/core/routing/History"
	], function(jQuery, Fragment, Controller, JSONModel, UIComponent, History) {
	"use strict";

	var PageController = Controller.extend("sap.ui.demo.walkthrough.controller.MovieDetail", {

		onInit: function (oEvent) {

			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.walkthrough.json", "/BookDetail.json"));
			oModel.attachRequestCompleted(function() {
				this.byId('edit').setEnabled(true);
			}.bind(this));
			this.getView().setModel(oModel);

			this.getView().bindElement("/Book/0");

			// Set the initial form to be the display one
			this._showFormFragment("MovieDisplay");
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

		handleEditPress : function () {

			//Clone the data
			this._oSupplier = jQuery.extend({}, this.getView().getModel().getData().Book[0]);
			this._toggleButtonsAndView(true);

		},

		handleCancelPress : function () {

			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			oData.Book[0] = this._oSupplier;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);

		},

		handleSavePress : function () {

			this._toggleButtonsAndView(false);

		},

		_formFragments: {},

		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);
			oView.byId("delete").setVisible(bEdit);

			// Set the right form type
			this._showFormFragment(bEdit ? "MovieChange" : "MovieDisplay");
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
