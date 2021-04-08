/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/model/Filter","sap/ui/core/format/NumberFormat"],function(F,N){"use strict";function g(T,s){var e=T.data("targetCollectionName"),S=T.getModel().getMetaModel().getObject(e+"/@"+s),f=[];for(var i in S.SelectOptions){var o=S.SelectOptions[i];if(o&&o.PropertyName){var p=o.PropertyName.$PropertyPath;for(var j in o.Ranges){var r=o.Ranges[j];f.push(new F(p,r.Option.$EnumMember.split("/").pop(),r.Low,r.High));}}}return{filters:f,text:S.Text};}function a(T){var s=T.getQuickFilter();if(s){var S=s.getItems();if(S.length>0){var k=S[0].getKey();s.setSelectedKey(k);T.data("quickFilterKey",k);}}}function h(T,p){var s=T.data("quickFilterKey"),b=T.getRowsBindingInfo();if(s){var S=T.getQuickFilter();if(S.data("showCounts")==="true"){var d=T.getModel(),o=S.getItems(),O,B=[],i=[],f=T.getFilter(),c=f?sap.ui.getCore().byId(f):undefined;if(c&&typeof c.getFilters==="function"){var e=c.getFilters();O=e?[e]:[];}else{O=[];}for(var k in o){var I=o[k].getKey(),l,j,m=g(T,I),n=O.concat(m.filters);i.push(m.text);j=new F({filters:n,and:true});l=d.bindList((p?p.getPath()+"/":"")+b.path,T.getBindingContext(),null,j,{$count:true,$$groupId:S.data("batchGroupId")||""});B.push(l.requestContexts(0,1));}Promise.all(B).then(function(C){var q=N.getIntegerInstance({groupingEnabled:true});for(var k in C){var r=C[k]&&C[k].length?C[k][0].getBinding().getLength():0;o[k].setText(i[k]+" ("+q.format(r)+")");}});}}}var t={initializeQuickFilterKey:a,getFiltersInfoforSV:g,handleQuickFilterCounts:h};return t;});