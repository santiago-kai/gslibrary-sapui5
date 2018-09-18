sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/Filter',
		'sap/ui/model/json/JSONModel',
		'sap/ui/core/UIComponent',
		"sap/ui/core/routing/History"
	], function(jQuery, Controller, Filter, JSONModel, UIComponent, History) {
	"use strict";

	var ListController = Controller.extend("sap.ui.demo.walkthrough.controller.BooksReturn", {

		onInit : function (evt) {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.walkthrough.json", "/BookList.json"));
			this.getView().setModel(oModel);
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


		onSearch : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("idList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},

		onSelectionChange : function (oEvt) {

			var oList = oEvt.getSource();
			var oLabel = this.byId("idFilterLabel");
			var oInfoToolbar = this.byId("idInfoToolbar");
			var oReturnBtn = this.byId("return");

			// With the 'getSelectedContexts' function you can access the context paths
			// of all list items that have been selected, regardless of any current
			// filter on the aggregation binding.
			var aContexts = oList.getSelectedContexts(true);

			// update UI
			var sText = null;
			if (aContexts && aContexts.length > 0) {
				var sText = aContexts.length + " selected";
				oInfoToolbar.setVisible(true);
				oReturnBtn.setEnabled(true);
			} else {
				oReturnBtn.setEnabled(false);
				oInfoToolbar.setVisible(false);
			}
			oLabel.setText(sText);
		}
	});


	return ListController;

});
