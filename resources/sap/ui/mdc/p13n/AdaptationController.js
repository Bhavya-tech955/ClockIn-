/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/mdc/p13n/FlexUtil","sap/ui/fl/apply/api/FlexRuntimeInfoAPI","sap/ui/mdc/condition/ConditionModel","sap/base/util/merge","sap/m/Button","sap/base/Log"],function(M,F,a,C,m,B,L){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var A=M.extend("sap.ui.mdc.AdaptationController",{library:"sap.ui.mdc",metadata:{properties:{adaptationControl:{type:"object"},liveMode:{type:"boolean",defaultValue:true},itemConfig:{type:"object"},sortConfig:{type:"object",defaultValue:{addOperation:"addSort",removeOperation:"removeSort",moveOperation:"moveSort",panelPath:"sap/ui/mdc/p13n/panels/SortPanel",title:r.getText("sort.PERSONALIZATION_DIALOG_TITLE")}},stateRetriever:{type:"function"},retrievePropertyInfo:{type:"function"},afterChangesCreated:{type:"function"}},events:{beforeP13nContainerOpens:{container:{type:"object"}},afterP13nContainerCloses:{reason:{type:"string"}}}}});A.prototype.init=function(){this.oAdaptationModel=new C();this.oAdaptationModel.setSizeLimit(10000);this.oState={};this.bIsDialogOpen=false;};A.prototype.showP13n=function(s,p){if(!this.bIsDialogOpen){return new Promise(function(b,c){this._setP13nTypeSpecificInfo(p);this._retrievePropertyInfo().then(function(P){var o=this._prepareAdaptationData(P);this._setP13nModelData(o);this._createP13nControl(this.sTitle).then(function(d){var e=d.getContent()[0];e.setP13nModel(this.oAdaptationModel);this.getAdaptationControl().addDependent(d);this._openP13nControl(d,s);b(d);}.bind(this));}.bind(this));}.bind(this));}};A.prototype.createSortChanges=function(n){return this._executeAfterAsyncActions(function(){var b=this.getAdaptationControl();var c=m({},this.getStateRetriever().call(this.getAdaptationControl(),this.oAdaptationControlDelegate));var p=c.sorters;var s=this.getSortConfig();var S=function(o){return o.name+o.descending;};var d=F.getArrayDeltaChanges(p,n,S,b,s.removeOperation,s.addOperation,s.moveOperation);if(this.getAfterChangesCreated()){this.getAfterChangesCreated()(this,d);}return d;}.bind(this));};A.prototype.createItemChanges=function(n){return this._executeAfterAsyncActions(function(){var N=m([],n);var c=m({},this.getStateRetriever().call(this.getAdaptationControl(),this.oAdaptationControlDelegate));var p=c.items;var i=this.getItemConfig();var s=function(o){return o.name;};var e=p.reduce(function(d,o,g){d[o.name]=o;d[o.name].position=g;return d;},{});var b=m([],p);N.forEach(function(o,d){var E=e[o.name];if(!o.hasOwnProperty("visible")||o.visible){var g=o.position;if(E){g=g>-1?g:E.position;var O=E.position;b.splice(g,0,b.splice(O,1)[0]);}else{g=g>-1?g:b.length;b.splice(g,0,o);}}else if(E){b[E.position].visible=false;}});var f=function(o){return o.hasOwnProperty("visible")&&o.visible===false?false:true;};b=b.filter(f);var I=F.getArrayDeltaChanges(p,b,s,this.getAdaptationControl(),i.removeOperation,i.addOperation,i.moveOperation);if(this.getAfterChangesCreated()){this.getAfterChangesCreated()(this,I);}return I;}.bind(this));};A.prototype.createConditionChanges=function(n){return this._executeAfterAsyncActions(function(){var c=[];var o=m({},this.getStateRetriever().call(this.getAdaptationControl(),this.oAdaptationControlDelegate));var p=o.filter;var b=this.getAdaptationControl();for(var f in n){var v=this._hasProperty(f);if(!v){L.warning("property '"+f+"' not supported");continue;}c=c.concat(F.getConditionDeltaChanges(f,n[f],p[f],b));}if(this.getAfterChangesCreated()){this.getAfterChangesCreated()(this,c);}return c;}.bind(this));};A.prototype._retrievePropertyInfo=function(){return new Promise(function(b,c){if(this.aPropertyInfo){b(this.aPropertyInfo);}else if(this.getRetrievePropertyInfo()){this.aPropertyInfo=this.getRetrievePropertyInfo().call(this.getAdaptationControl());b(this.aPropertyInfo);}else{sap.ui.require([this.getAdaptationControl().getDelegate().name],function(d){this.oAdaptationControlDelegate=d;d.fetchProperties(this.getAdaptationControl()).then(function(p){this.aPropertyInfo=p;b(this.aPropertyInfo);}.bind(this));}.bind(this));}}.bind(this));};A.prototype._executeAfterAsyncActions=function(c){return new Promise(function(b,d){this._retrievePropertyInfo().then(function(p){b(c());});}.bind(this));};A.prototype._setP13nTypeSpecificInfo=function(p){this.sP13nType=p;this.sAddOperation=this["get"+p+"Config"]().addOperation;this.sRemoveOperation=this["get"+p+"Config"]().removeOperation;this.sMoveOperation=this["get"+p+"Config"]().moveOperation;this.sPanelPath=this["get"+p+"Config"]().panelPath;this.sTitle=this["get"+p+"Config"]().title;};A.prototype._openP13nControl=function(p,s){this.fireBeforeP13nContainerOpens({container:p});if(this.getLiveMode()){p.openBy(s);}else{p.open();}this.bIsDialogOpen=true;};A.prototype._prepareAdaptationData=function(p){var i=[];var o=this.getAdaptationControl();var c=m({},this.getStateRetriever().call(o,this.oAdaptationControlDelegate,p));var I=c.items||[];var s=c.sorters||[];var f=function(d){return d.reduce(function(g,P,h){g[P.name]=P;g[P.name].position=h;return g;},{});};var e=f(I);var E=f(s);var b=c.filter||{};p.forEach(function(P){var d={};var k=P.path||P.name;var g=e[k];d.selected=g?true:false;d.position=g?g.position:-1;d=m(d,P,g);d.label=P.label||P.name;d.name=P.path?P.path:P.name;if(this.sP13nType=="Sort"){d.isSorted=E[k]?true:false;d.sortPosition=E[k]?E[k].position:-1;d.descending=E[k]?E[k].descending:false;}d.isFiltered=b[k]&&b[k].length>0?true:false;var h=this._checkRestrictions(d);if(h){i.push(d);}}.bind(this));return{items:i,filter:b};};A.prototype._setP13nModelData=function(p){this._sortP13nData(p);this.oAdaptationModel.setProperty("/items",p.items);this.oAdaptationModel.setConditions(p.filter);this.oState=m({},p);};A.prototype._createP13nControl=function(t){return new Promise(function(b,c){var l=this.getLiveMode();sap.ui.require(l?['sap/m/ResponsivePopover',this.sPanelPath]:['sap/m/Dialog',this.sPanelPath],function(d,P){var p=new P();p.attachEvent("change",function(){if(l){this._handleChange();}}.bind(this));var D=this._createP13nContainer(d,p,t);b(D);}.bind(this));}.bind(this));};A.prototype._createP13nContainer=function(b,p,t){var c;if(this.getLiveMode()){c=this._createPopover(b,p,t);}else{c=this._createModalDialog(b,p,t);}c.addStyleClass("sapUiMdcPersonalizationDialog");c.toggleStyleClass("sapUiSizeCompact",!!jQuery(this.getAdaptationControl()).closest(".sapUiSizeCompact").length);return c;};A.prototype._createPopover=function(b,p,t){var c=new b({title:t,horizontalScrolling:false,verticalScrolling:true,contentWidth:"26rem",resizable:true,contentHeight:"40rem",placement:"HorizontalPreferredRight",content:p,afterClose:function(){c.destroy();this.fireAfterP13nContainerCloses({reason:"autoclose"});this.bIsDialogOpen=false;}.bind(this)});return c;};A.prototype._createModalDialog=function(b,p,t){var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var c=new b({title:t,horizontalScrolling:false,verticalScrolling:true,contentWidth:"40rem",contentHeight:"55rem",draggable:true,resizable:true,stretch:"{device>/system/phone}",content:p,buttons:[new B({text:r.getText("p13nDialog.OK"),type:"Emphasized",press:function(){this._handleChange();c.close();c.destroy();this.bIsDialogOpen=false;this.fireAfterP13nContainerCloses({reason:"Ok"});}.bind(this)}),new B({text:r.getText("p13nDialog.CANCEL"),press:function(){c.close();c.destroy();this.bIsDialogOpen=false;this.fireAfterP13nContainerCloses({reason:"Cancel"});}.bind(this)})]});return c;};A.prototype._sortP13nData=function(d){var p=this.sP13nType=="Item"?"position":"sortPosition";var s=this.sP13nType=="Item"?"selected":"isSorted";var l=sap.ui.getCore().getConfiguration().getLocale().toString();var c=window.Intl.Collator(l,{});d.items.sort(function(f,b){if(f[s]&&b[s]){return(f[p]||0)-(b[p]||0);}else if(f[s]){return-1;}else if(b[s]){return 1;}else if(!f[s]&&!b[s]){return c.compare(f.label,b.label);}});};A.prototype._checkRestrictions=function(i){var I=true;if(this.sP13nType=="Sort"){I=i.sortable===false?false:true;}return I;};A.prototype._handleChange=function(){var c=[],i=[],b=[];var f=function(I){return this.sP13nType=="Sort"?I.isSorted:I.selected;}.bind(this);i=this.oState.items.filter(f);b=this.oAdaptationModel.getData().items.filter(f);var s=function(o){var d=o.name;if(o.hasOwnProperty("descending")){d=d+o.descending;}if(o.role){d=d+o.role;}return d;};c=F.getArrayDeltaChanges(i,b,s,this.getAdaptationControl(),this.sRemoveOperation,this.sAddOperation,this.sMoveOperation);this.oState=m({},this.oAdaptationModel.getData());this.getAfterChangesCreated()(this,c);};A.prototype._hasProperty=function(n){return this.aPropertyInfo.some(function(p){var v=p.name===n||n=="$search";return v;});};A.prototype.destroy=function(s){M.prototype.destroy.apply(this,arguments);if(this.oAdaptationModel){this.oAdaptationModel.destroy();}this.oAdaptationModel=null;this.bIsDialogOpen=null;this.sP13nType=null;this.oAdaptationControlDelegate=null;this.sAddOperation=null;this.sRemoveOperation=null;this.sMoveOperation=null;};return A;});