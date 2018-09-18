sap.ui.define([
	'jquery.sap.global',
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",

	], function (jQuery, UIComponent, JSONModel) {
	"use strict";
	return UIComponent.extend("sap.ui.demo.walkthrough.Component", {
		metadata : {
			manifest : "json"
		},

		init : function () {

			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			var oLogoData = {
					logo : jQuery.sap.getModulePath("sap.ui.core", '/')
							+ "mimes/logo/sap_50x26.png"
				};
				var oLogoModel = new JSONModel();
				oLogoModel.setData(oLogoData);
				this.setModel(oLogoModel, "logoMdl");

			// create the views based on the url/hash
			this.getRouter().initialize();
		},

	});
});
