/*!
 * SAPUI5

        (c) Copyright 2009-2020 SAP SE. All rights reserved
    
 */
sap.ui.define([],function(){"use strict";var C={};C.render=function(r,c){var l=c.getAggregation("labels");if(c.getVisible()&&l&&l.length>0){var m="";var w=c.getWidth();if(w){m+="width:"+w+";";}r.write("<div");r.writeControlData(c);r.addClass("sapUIMeLegendOuterContainer");r.writeAttribute("style",m);r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMeCalendarLegend");r.addClass("sapMeCalendarLegend"+c.getDesign());r.writeClasses();r.write(">");r.write("<div  id='"+c.getId()+"-arrow'");r.addClass("sapUIMeLegend");r.writeClasses();r.write(">");if(c.getExpandable()){r.renderControl(c.getAggregation("icon"));}r.write("<div id='"+c.getId()+"-LegendMenuContainer'");r.addClass("sapUIMeLegendMenuContainer");r.writeClasses();r.write(">");r.write("<div id='"+c.getId()+"-LegendMenu'");r.addClass("sapUIMeLegendMenu");if(!c.getExpanded()){r.write("style = 'display:none'");}r.writeClasses();r.write(">");for(var i=0;i<l.length;i++){r.write("<div ");r.addClass("sapUIMeLegendLine");r.writeClasses();r.write(">");r.write("<div ");r.addClass("sapUIMeLegendColor");r.addClass(c._getColorBoxStyle(l[i].getId()));r.writeClasses();r.write("></div>");r.renderControl(l[i]);r.write("</div>");}r.write("</div>");r.write("</div>");r.write("</div>");r.write("</div>");r.write("</div>");}};return C;},true);
