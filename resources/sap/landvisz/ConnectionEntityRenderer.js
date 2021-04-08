/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2013 SAP AG. All rights reserved
 */
sap.ui.define(["sap/landvisz/library","sap/landvisz/internal/LinearRowField"],function(l,L){"use strict";var C=l.ConnectionType;var D=l.DependencyType;var E=l.EntityCSSSize;var V=l.ViewType;var a={};a.render=function(r,c){if(!this.initializationDone){c.initControls();c.initializationDone=true;r.write("<div");r.writeControlData(c);if(c.viewType==D.NETWORK_VIEW)r.addClass("sapLandviszConnection_entity_container");else if(c.viewType==D.BOX_VIEW)r.addClass("sapLandviszConnectionBox");else if(c.viewType==V.SOLUTION_VIEW)r.addClass("sapLandviszSolutionBox");r.writeClasses();if(this.left!=0)r.addStyle("left",c.left+"px");if(this.top!=0)r.addStyle("top",c.top+"px");if(c.width!=0)r.addStyle("width",c.width+"px");if(c.height!=0)r.addStyle("height",c.height+"px");r.addStyle("position","absolute");r.writeStyles();r.write(" >");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"connectionRow");r.addClass("connectionEntity");if(c.getType()==C.ProductSystem)r.addClass("productSystem");if(c.getType()==C.TechnicalSystem)r.addClass("technicalSystem");if(c.getType()==C.MobileSolution&&c.viewType!=V.SOLUTION_VIEW)r.addClass("mobileSolution");r.writeClasses();if(this.left!=0)r.addStyle("left",c.innerLeft+"px");if(this.top!=0)r.addStyle("top",c.innerTop+"px");if(c.width!=0)r.addStyle("width",c.innerWidth+"px");if(c.height!=0)r.addStyle("height",c.innerHeight+"px");r.addStyle("position","absolute");var b=c.getConnectionData();if(b.length>1)r.addStyle("overflow","auto");r.writeStyles();r.write(">");r.write("<div");r.writeAttributeEscaped("id",c.getId()+"connectionRowField");r.addClass("boxRowDisplay");if(b.length<=1){r.addStyle("width","100%");}r.writeStyles();r.addClass("sapLandviszConnectionRowField");r.writeClasses();r.write(">");if(c.viewType==V.SOLUTION_VIEW){for(var i=0;i<b.length;i++){if(b.length>1){b[i].setRenderingSize(E.Medium);b[i].addStyleClass("sapLandviszConnectionDataNotopMargin");r.renderControl(b[i]);}else{c.connectionImage.setSrc(sap.ui.resource("sap.landvisz","themes/base/img/landscapeobjects/"+"48x48"+"/Solution.png")).addStyleClass("solutionImage");c.connectionImage.setTooltip(c.getDependencyTooltip());r.renderControl(c.connectionImage);c.connectionLabel.setText(b[i].getLabel());c.connectionLabel.setTooltip(b[i].getTooltip());c.connectionLabel.addStyleClass("solutionRow");r.renderControl(c.connectionLabel);}}}else{var b=c.getConnectionData();if(b.length>0){for(var i=0;i<b.length;i++){if(c.getSize()==E.Small)b[i].setRenderingSize(E.Small);else b[i].setRenderingSize(E.Medium);b[i].addStyleClass("sapLandviszConnectionDataNotopMargin");r.renderControl(b[i]);}}var d;if(b.length>0){c.oVLayoutToolPopup.removeAllContent();c.oVLayoutToolPopup.addStyleClass("sapLandviszConnectionToolPopup");for(var i=0;i<b.length;i++){if(c.getSize()==E.Small)b[i].setRenderingSize(E.Small);else b[i].setRenderingSize(E.Medium);d=new L();d.addStyleClass("overlayRow");d.setLabel(b[i].getLabel());d.setValue(b[i].getValue());d.setRenderingSize(b[i].getRenderingSize());d.setIconType(b[i].getIconType());d.setIconTitle(b[i].getIconTitle());d.setLinkSource(b[i].getLinkSource());d.setRightIconSrc(b[i].getRightIconSrc());c.oVLayoutToolPopup.addContent(d);}}}r.write("</div>");r.write("</div>");r.write("</div>");var e=c.oVLayoutCallout.getContent();for(var i=0;i<e.length;i++){c.addAggregation("connectionData",e[i],false);}}};return a;},true);