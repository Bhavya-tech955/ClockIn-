/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","../Extension"],function(q,S,a){"use strict";var b=a.extend("sap.ui.vtm.extensions.SceneNodeHoverHighlightExtension",{metadata:{interfaces:["sap.ui.vtm.interfaces.ISceneNodeHoverHighlightExtension"],properties:{highlightColor:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(0, 0, 255, 0.7)"}}},constructor:function(i,s){a.apply(this,arguments);},initialize:function(){this._panelPanelInitialized=new Map();this.applyPanelHandler(function(p){var v=p.getViewport();var s=this._vtm.getScene();s.attachLoadCompleted(function(e){if(!e.getParameter("succeeded")){return;}if(this._panelPanelInitialized.get(p)){return;}this._panelPanelInitialized.set(p,true);var h=new sap.ui.vtm.DisplayGroup();var d=h.getDisplayStatesBySceneNodeId();var c=sap.ve.dvl.DVLID_INVALID;v.addOverrideDisplayGroup(h);var r=function(){if(c){if(d[c]){delete d[c];}}};var f=function(n,g){if(n!==sap.ve.dvl.DVLID_INVALID){d[n]={highlightColor:g};}};this.attachEnabledChanged(function(e){if(this.getEnabled()&&c){f(c,this.getHighlightColor());}else{r();}v.refresh();}.bind(this));v.addEventDelegate({onmouseout:function(){r();c=sap.ve.dvl.DVLID_INVALID;v.refresh();}},v);v.attachHover(function(e){var n=e.getParameter("nodeId");if(!this.getEnabled()){c=n;return;}if(n!==c){r();c=n;f(n,this.getHighlightColor());v.refresh();}}.bind(this));v.attachBeginGesture(function(e){r();c=sap.ve.dvl.DVLID_INVALID;v.refresh();});}.bind(this));}.bind(this));}});return b;});