/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(['sap/chart/coloring/ColoringUtils','sap/chart/coloring/criticality/DimensionValues','sap/chart/ChartLog',"sap/ui/thirdparty/jquery"],function(C,D,a,q){"use strict";var t=q.type;var b={};var v=function(c,A,d,o){var e=q.extend({},o);e.bHasOtherSeriesDim=d.aDim.some(function(h){return h._getFixedRole()==="series"&&h.getName()!==A[0];});e.type='Emphasis';e.subType='DimensionValues';C.checkColoringDimension(A,d,c,e);var f=c[A[0]],g=f.Values,l=f.Legend||{};if(g.length>1&&!l.Highlighted){throw new a('error','Colorings.Emphasis.DimensionValues','Legend.Highlighted is mandatory when Highlight has multiple values.');}};b.qualify=function(c,d,o,e){v(c,d,o,e);var f;if(d[0]){f={dim:d[0],setting:c};}return f;};b.parse=function(c,l){var L={},d=c.dim,o=c.setting[d],e=o.Values;var h=(t(e)==="array")?e:[e];var H=function(f){return h.indexOf(f[d])>-1;};if(o.Legend&&o.Legend.Highlighted!=null){L.Highlight=o.Legend.Highlighted;}else{L.Highlight=h[0];}if(o.Legend&&o.Legend.Others){L.Others=o.Legend.Others;}else{L.Others=l.getText("COLORING_TYPE_OTHER");}var m={Highlight:H};return{callbacks:m,legend:L};};return b;});
