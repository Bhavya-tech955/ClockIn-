/*
 * Copyright (C) 2009-2018 SAP SE or an SAP affiliate company. All rights reserved.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("edu.weill.Timeevents.controller.BaseController", {
		/**
		 * Convenience method for accessing the router.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		/**
		 * Convenience method for getting the view model by name.
		 * @public
		 * @param {string} [sName] the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function(sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Getter for the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler when the share by E-Mail button has been clicked
		 * @public
		 */
		onShareEmailPress: function() {
			var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
			sap.m.URLHelper.triggerEmail(
				null,
				oViewModel.getProperty("/shareSendEmailSubject"),
				oViewModel.getProperty("/shareSendEmailMessage")
			);
		},
		getGlobalModel: function(sName) {
			return this.getOwnerComponent().getModel(sName);
		},
		setGlobalModel: function(oModel, sName) {
			return this.getOwnerComponent().setModel(oModel, sName);
		},
		setPernr: function(oPernr) {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(oPernr);
			this.getOwnerComponent().setModel(oModel, "Pernr");
		},
		getPernr: function() {
			var oModel = this.getOwnerComponent().getModel("Pernr");
			return oModel.getData();
		},
		setSelectedDate: function(oDate) {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(oDate);
			this.getOwnerComponent().setModel(oModel, "SelectedDate");
		},
		getSelectedDate: function() {
			var oModel = this.getOwnerComponent().getModel("SelectedDate");
			return oModel.getData();
		}

	});

});