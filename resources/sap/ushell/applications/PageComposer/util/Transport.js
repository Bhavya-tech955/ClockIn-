// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";var T=function(){};T.prototype._changeHandler=function(d){return function(e){var m=d.getModel();var v=jQuery.extend({},m.getProperty("/validation"),{transport:e&&e.getParameter("valid")});m.setProperty("/validation",v);};};T.prototype.enhanceDialogWithTransport=function(d,t,o){var c=this._changeHandler(d);c(false);var C=function(p){var P=t.decorateResultWithTransportInformation(p);o(P);};t.attachChange(c);d.attachConfirm(C);d.transportExtensionPoint(t);return d;};return T;});