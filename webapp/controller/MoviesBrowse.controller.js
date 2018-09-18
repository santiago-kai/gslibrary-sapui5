sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter',
	'sap/m/MessageBox',
	'sap/ui/core/UIComponent',
	"sap/ui/core/routing/History",
	"../service/Formatter"],
	function(jQuery, Controller, JSONModel, Filter, MessageBox, UIComponent, History, Formatter) {
	"use strict";

	var PageController = Controller.extend("sap.ui.demo.walkthrough.controller.MoviesBrowse", {
		onInit: function () {
			var oPage = this.getView();
			// oPage.setBusy(true);
			this.oModel = new JSONModel();
			this.oModel.loadData(jQuery.sap.getModulePath("sap.ui.demo.walkthrough.json", "/MovieList.json"), null, false);
			// this.oModel.attachRequestCompleted(function() {
			// 	oPage.setBusy(false);
			// });
			// this.oModel.attachRequestFailed(function() {
			// 	oPage.setBusy(false);
			// 	var errorMsg="Network_Error";
			// 	MessageBox.error(errorMsg);
			// });
			this.getView().setModel(this.oModel);

			this.aKeys = ["Genre", "Category"];
			this.oSelectStatus = this.getView().byId("slGenre");
			this.oSelectCategory = this.getView().byId("slCategory");
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

		onMovieDetail: function (evt) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("MovieDetail", {});
		},

		onAddMovie: function (evt) {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("MovieAdd", {});
		},

/********************** Filter selection bar *************************/
		onSelectChange: function() {
			var aCurrentFilterValues = [];

			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectStatus));
			aCurrentFilterValues.push(this.getSelectedItemText(this.oSelectCategory));

			this.filterTable(aCurrentFilterValues);
		},

		filterTable: function (aCurrentFilterValues) {
			this.getTableItems().filter(this.getFilters(aCurrentFilterValues));
		},

		getFilters: function (aCurrentFilterValues) {
			this.aFilters = [];

			this.aFilters = this.aKeys.map(function (sCriteria, i) {
				return new sap.ui.model.Filter(sCriteria, sap.ui.model.FilterOperator.Contains, aCurrentFilterValues[i]);
			});

			return this.aFilters;
		},

		getTableItems : function () {
			return this.getView().byId("idMoviesTable").getBinding("items");
		},

		getSelectedItemText : function (oSelect) {
			return oSelect.getSelectedItem() ? oSelect.getSelectedItem().getKey() : "";
		},
/********************** Filter selection bar *************************/

/********************** Filter search bar *************************/
		onSearch : function (oEvt) {

			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("idMoviesTable");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},
/********************** Filter search bar *************************/

	});

	return PageController;
});
