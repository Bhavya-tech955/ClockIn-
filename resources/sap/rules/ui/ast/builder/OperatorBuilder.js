sap.ui.define(["sap/rules/ui/ast/provider/OperatorProvider","sap/rules/ui/ast/constants/Constants"],function(O,C){'use strict';var i;var a=function(){this._oOperatorProviderInstance=O.getInstance();};a.prototype.construct=function(o){var b;var c;this._oOperatorProviderInstance.reset();for(var I=0;I<o.length;I++){b=o[I];c=this._oOperatorProviderInstance.createOperator(b[C.NAME],b[C.NUMBEROFARGUMENTS],b[C.RETURNVALUE_BUSINESSDATA_TYPE_COLLECTION],b[C.RETURNVALUE_DATAOBJECT_TYPE_COLLECTION],b[C.LABEL],b[C.CATEGORY],b[C.SUPPORTED_FUNCTIONS]);this._oOperatorProviderInstance.addOperatorToNameMap(c);this._oOperatorProviderInstance.addOperatorToLabelMap(c);this._oOperatorProviderInstance.addOperatorToBusinessDataTypeMap(c);this._oOperatorProviderInstance.addOperatorToDataObjectTypeMap(c);this._oOperatorProviderInstance.addOperatorToCategoryMap(c);}};return{getInstance:function(){if(!i){i=new a();i.constructor=null;}return i;}};},true);