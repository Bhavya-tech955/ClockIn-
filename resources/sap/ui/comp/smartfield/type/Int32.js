/*
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/model/odata/type/Int32"],function(I){"use strict";var a=I.extend("sap.ui.comp.smartfield.type.Int32",{constructor:function(f,c){I.apply(this,arguments);this.oFieldControl=null;}});a.prototype.parseValue=function(v,s){var r=I.prototype.parseValue.apply(this,arguments);if(typeof this.oFieldControl==="function"){this.oFieldControl(v,s);}return r;};a.prototype.destroy=function(){I.prototype.destroy.apply(this,arguments);this.oFieldControl=null;};a.prototype.getName=function(){return"sap.ui.comp.smartfield.type.Int32";};return a;});
