/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/rta/command/FlexCommand"
], function (FlexCommand) {
	"use strict";

	/**
	 * Add new OData / delegate property to a control
	 *
	 * @class
	 * @extends sap.ui.rta.command.FlexCommand
	 * @author SAP SE
	 * @version 1.78.0
	 * @constructor
	 * @private
	 * @since 1.78
	 * @alias sap.ui.rta.command.AddProperty
	 * @experimental Since 1.78. This class is experimental and provides only limited functionality. Also the API might be
	 *               changed in future.
	 */
	var AddProperty = FlexCommand.extend("sap.ui.rta.command.AddProperty", {
		metadata : {
			library : "sap.ui.rta",
			properties : {
				index : {
					type : "int"
				},
				newControlId : {
					type : "string"
				},
				//the name "bindingPath" conflicts with getBindingPath() method from ManagedObject
				bindingString : {
					type : "string"
				},
				entityType : {
					type : "string"
				},
				parentId : {
					type : "string"
				},
				oDataServiceVersion : {
					type : "string"
				},
				oDataServiceUri: {
					type: "string"
				},
				propertyName: {
					type: "string"
				}
			}
		}
	});

	AddProperty.prototype._getChangeSpecificData = function() {
		// general format
		return {
			changeType: this.getChangeType(),
			index: this.getIndex(),
			newControlId: this.getNewControlId(),
			bindingPath: this.getBindingString(),
			parentId: this.getParentId(),
			oDataServiceVersion: this.getODataServiceVersion(),
			oDataInformation: {
				oDataServiceUri: this.getODataServiceUri(),
				propertyName: this.getPropertyName(),
				entityType: this.getEntityType()
			}
		};
	};

	return AddProperty;
}, /* bExport= */true);
