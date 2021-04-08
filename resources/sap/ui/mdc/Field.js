/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/mdc/library','sap/ui/base/ManagedObjectObserver','sap/ui/mdc/field/FieldBase','sap/ui/mdc/field/FieldBaseRenderer','sap/ui/mdc/condition/Condition','sap/ui/mdc/condition/FilterOperatorUtil','sap/ui/mdc/util/BaseType','sap/ui/mdc/util/ConditionValidated','sap/base/util/deepEqual','sap/base/util/merge','sap/ui/model/BindingMode'],function(l,M,F,a,C,b,B,c,d,m,e){"use strict";var f=l.FieldDisplay;var g=F.extend("sap.ui.mdc.Field",{metadata:{library:"sap.ui.mdc",properties:{value:{type:"any",defaultValue:null},additionalValue:{type:"any",defaultValue:null}},events:{change:{parameters:{value:{type:"string"},valid:{type:"boolean"},promise:{type:"Promise"}}}},defaultProperty:"value"},renderer:a});g.prototype.init=function(){this._vValue=null;this._vAdditionalValue=null;F.prototype.init.apply(this,arguments);this.setMaxConditions(1);this._oObserver.observe(this,{properties:["value","additionalValue"]});};g.prototype.exit=function(){F.prototype.exit.apply(this,arguments);if(this._iConditionUpdateTimer){clearTimeout(this._iConditionUpdateTimer);delete this._iConditionUpdateTimer;}};g.prototype.bindProperty=function(N,r){if(N==="value"&&!r.formatter){r.targetType="raw";if(r.type&&(!this._oDataType||this._oDataType.getMetadata().getName()!==r.type.getMetadata().getName())){this._oDataType=r.type;}}F.prototype.bindProperty.apply(this,arguments);};g.prototype._handleModelContextChange=function(E){F.prototype._handleModelContextChange.apply(this,arguments);if(!this._oDataType){var r=this.getBinding("value");if(r){this._oDataType=r.getType();}}};g.prototype._initDataType=function(){F.prototype._initDataType.apply(this,arguments);var r=this.getBinding("value");if(r){this._oDataType=r.getType();}};g.prototype.setMaxConditions=function(r){if(r!==1){throw new Error("Only one condition allowed for Field "+this);}return this.setProperty("maxConditions",r,true);};g.prototype._observeChanges=function(r){F.prototype._observeChanges.apply(this,arguments);if(r.name==="value"){var v=k.call(this,r.current,r.old);if(this._vAdditionalValue!==null&&q.call(this)&&!n.call(this,v,this._vValue,true)){this._vAdditionalValue=this.getAdditionalValue();}this._vValue=v;o.call(this,r.current);i.call(this);}if(r.name==="additionalValue"){this._vAdditionalValue=r.current;i.call(this);}if(r.name==="conditions"){p.call(this,r.current);}};function _(){return this._vValue;}function h(){return this._vAdditionalValue;}function i(){if(!this.DELEGATE){this.oDelegatePromise.then(function(){i.call(this);}.bind(this));return;}if(this.getDisplay()===f.Value){j.call(this,_.call(this),h.call(this));}else if(!this._iConditionUpdateTimer){this._iConditionUpdateTimer=setTimeout(function(){j.call(this,_.call(this),h.call(this));this._iConditionUpdateTimer=undefined;}.bind(this),0);}}function j(v,A){var r=this.getConditions();if(this._checkValueInitial(v)&&!A){if(r.length>0){this.setConditions([]);}}else{var O=r[0]&&r[0].values[0];var s=r[0]&&r[0].values[1]?r[0].values[1]:null;if(!r[0]||r[0].operator!=="EQ"||!n.call(this,O,v)||s!==A){var t=C.createItemCondition(v,A);t.validated=c.Validated;this.setConditions([t]);}}}function k(v,O){var D=this._oDataType?this._oDataType.getMetadata().getName():this.getDataType();if(v&&O&&(D==="sap.ui.model.odata.type.Unit"||D==="sap.ui.model.odata.type.Currency")&&!v[2]&&O[2]!==undefined){v=m([],v);v[2]=O[2];}return v;}function n(v,V,u){var E=v===V;var D=this._oDataType?this._oDataType.getMetadata().getName():this.getDataType();if(!E&&this.DELEGATE.getBaseType(this._oPayload,D)===B.Unit&&Array.isArray(v)&&Array.isArray(V)){var N=v[0];var U=v[1];var r=v.length>=3?v[2]:null;var s=V[0];var t=V[1];var w=V.length>=3?V[2]:null;if(N===s&&U===t&&(((this._bUnitSet||u)&&(!r||!w))||d(r,w))){E=true;}if((r||w)&&!u){this._bUnitSet=true;}}return E;}function o(v){if(!this._bTypeInitialized){if(!this.DELEGATE){this.oDelegatePromise.then(function(){o.call(this,v);}.bind(this));return;}var r=this.getBinding("value");var D=r&&r.getType();this._oTypeInitialization=this.DELEGATE.initializeTypeFromBinding(this._oPayload,D,v);this._bTypeInitialized=this._oTypeInitialization.bTypeInitialized;}}g.prototype._fireChange=function(r,v,w,P){var V;if(r){if(v){V=this._getResultForPromise(r);}else{V=w;}}this.fireChange({value:V,valid:v,promise:P});};g.prototype._getResultForPromise=function(r){var v;if(r.length===0&&this._oDataType){v=this._oDataType.parseValue("","string",[]);}else if(r.length===1){v=r[0].values[0];}return v;};function p(r){if(!this.DELEGATE){this.oDelegatePromise.then(function(){p.call(this,r);}.bind(this));return;}var v=null;var A=null;var O=this.getValue();var s=this.getAdditionalValue();if(r.length===0&&O===null&&s===null){return;}v=this._getResultForPromise(r);if(r.length===0&&!s){A=s;}else if(r.length===1&&r[0].values.length>1){A=r[0].values[1];}this._vValue=v;this._vAdditionalValue=A;if(!n.call(this,v,O,true)){this.setProperty("value",v,true);}if(A!==s&&!q.call(this)){this.setProperty("additionalValue",A,true);}}g.prototype._getOperators=function(){return["EQ"];};function q(){var r=this.getBinding("additionalValue");if(r&&r.getBindingMode()===e.OneWay){return true;}return false;}return g;});