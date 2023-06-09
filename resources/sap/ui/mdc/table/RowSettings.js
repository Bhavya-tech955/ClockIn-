/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/Element'],function(E){"use strict";var R=E.extend("sap.ui.mdc.table.RowSettings",{metadata:{properties:{highlight:{type:"string",group:"Appearance",defaultValue:"None"},highlightText:{type:"string",group:"Misc",defaultValue:""},navigated:{type:"boolean",group:"Appearance",defaultValue:false}}}});R.prototype.getAllSettings=function(){var s={},t=this.clone();if(this.isBound("navigated")){s.navigated=t.getBindingInfo("navigated");}else{s.navigated=this.getNavigated();}if(this.isBound("highlight")){s.highlight=t.getBindingInfo("highlight");}else{s.highlight=this.getHighlight();}if(this.isBound("highlightText")){s.highlightText=t.getBindingInfo("highlightText");}else{s.highlightText=this.getHighlightText();}return s;};return R;});
