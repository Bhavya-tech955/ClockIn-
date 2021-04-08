/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dt/ElementUtil","sap/base/Log","sap/base/util/ObjectPath","sap/ui/rta/util/BindingsExtractor"],function(q,E,L,O,B){"use strict";function _(P,j,F,G,M){var H={name:P.name,bindingPath:P.name,entityType:j.name};var I=P["com.sap.vocabularies.Common.v1.Label"];H.label=I&&I.String;var Q=P["com.sap.vocabularies.Common.v1.QuickInfo"];H.tooltip=Q&&Q.String;var J=P["com.sap.vocabularies.UI.v1.Hidden"];H.unsupported=!!J&&J.Bool==="true";var K;if(!H.unsupported){K=P["com.sap.vocabularies.Common.v1.FieldControl"];if(K&&K.EnumMember){H.unsupported=K.EnumMember==="com.sap.vocabularies.Common.v1.FieldControlType/Hidden";}else{var N=K&&K.Path;if(N){var R=F.getBinding(G)instanceof sap.ui.model.ListBinding;if(!R){var S=F.getBindingContext(M).getProperty(N);H.unsupported=S===0;}}}}return H;}function a(P){if(P&&P.type){if(P.type.toLowerCase().indexOf("edm")!==0){return true;}}return false;}function b(j,F,M){if(!j){return false;}var G=j.getBindingInfo(F,M);var P=G&&G.path;if(!P){return false;}if(P.indexOf(">")>-1){P=P.split(">").pop();}return P.indexOf("/")===0;}function c(j,F,G,M){var H;if(F){H=j.getBindingInfo(G,M);if(typeof H.model==="string"&&H.model!==M){H=undefined;}}else{H=j.getBindingContext(M);}return H;}function d(j,F,M){var G=b(j,F,M);var H=c(j,G,F,M);if(H){return G?H.path:H.getPath();}}function e(j,M,F,G,H){var P=j.property.map(function(I){var J=_(I,j,F,G,H);if(a(I)){var K=M.getODataComplexType(I.type);if(K){J.properties=K.property.map(function(Q){var R=_(Q,j,F,G,H);R.bindingPath=I.name+"/"+Q.name;R.referencedComplexPropertyName=J.label||J.name;return R;});}}return J;});if(j.navigationProperty){var N=j.navigationProperty.map(function(I){var J=(M.getODataAssociationEnd(j,I.name)&&M.getODataAssociationEnd(j,I.name).type);return{name:I.name,entityType:J,bindingPath:I.name,unsupported:true};});P=P.concat(N);}return P;}function f(P){var F=P.reduce(function(j,G){if(Array.isArray(G.properties)){j=j.concat(G.properties);}else{j.push(G);}return j;},[]);return F;}function g(j){return Promise.resolve().then(function(){var M=j.getModel();if(M){var F=M.getMetadata().getName();if(F==="sap.ui.model.odata.ODataModel"||F==="sap.ui.model.odata.v2.ODataModel"){var G=M.getMetaModel();return G.loaded().then(function(){return G;});}}});}function h(M,j){var F=M.getMetaContext(j);return F.getObject();}function i(j,M,F){var G=j.getMetadata().getAggregation();if(G){var H=j.getBindingInfo(G.name);var T=H&&H.template;if(T){var P=j.getBindingPath(G.name);var I=M.getODataAssociationEnd(F,P);var J=I&&I.type;if(J){var K=M.getODataEntityType(J);F=K;}}}return F;}function k(j,F){return g(j).then(function(M){var P=[];if(M){var G=d(j,F);if(G){var H=h(M,G);H=i(j,M,H);P=e(H,M,j,F);}}return P;}).then(f);}function l(j,F,G){var P={element:j,aggregationName:F,payload:G.delegateInfo.payload||{}};return G.delegateInfo.delegate.getPropertyInfo(P).then(f);}function m(j,F,G){var H=G.addODataProperty;var I=G.addViaDelegate;var J;if(I){J=l.bind(null,j,F,I);}else if(H){J=k.bind(null,j,F);}else{J=Promise.resolve.bind(Promise,[]);}return J().then(function(P){return t(P);});}function n(P){return P.filter(function(j){return!j.unsupported;});}function o(P,j){j.type="custom";if(j.id){j.itemId=P+"-"+j.id;j.key=j.itemId;}return j;}function p(T,P){return{selected:false,label:P.label||P.name,referencedComplexPropertyName:P.referencedComplexPropertyName?P.referencedComplexPropertyName:"",duplicateComplexName:P.duplicateComplexName?P.duplicateComplexName:false,tooltip:P.tooltip||P.label,originalLabel:"",type:T,entityType:P.entityType,name:P.name,bindingPath:P.bindingPath};}function r(j){var F=j.element;var G=j.action;var H=j.bindingPathCollection;return{selected:false,label:F.label||E.getLabelForElement(F,G.getLabel),tooltip:F.tooltip||E.getLabelForElement(F,G.getLabel)||F.name,referencedComplexPropertyName:F.referencedComplexPropertyName?F.referencedComplexPropertyName:"",duplicateComplexName:F.duplicateComplexName?F.duplicateComplexName:false,bindingPaths:H.bindingPaths,originalLabel:F.renamedLabel&&F.label!==F.originalLabel?F.originalLabel:"",type:"invisible",elementId:F.getId()};}function s(j,R,F,M){if(R&&R!==j){var G=d(j,F,M);return E.findAllSiblingsInContainer(j,R).filter(function(S){return G===d(S,F,M);});}return[j];}function t(P){P.forEach(function(M,F,P){if(M["duplicateComplexName"]!==true){for(var j=F+1;j<P.length-1;j++){if(M.label===P[j].label){M["duplicateComplexName"]=true;P[j]["duplicateComplexName"]=true;}}}});return P;}function u(I,P){return P.some(function(M){return M.label===I.label;});}function v(j){return Array.isArray(j)&&j.length>0;}function w(j,P){return P.filter(function(M){return j.some(function(F){return F.startsWith(M.bindingPath);});}).pop();}function x(j){return(q.isPlainObject(j)?j.parts[0].path:!!j.getPath&&j.getPath());}function y(j,F,M,G,T){var H=j.getMetadata().getAggregation();var I=H?H.name:F.action.aggregation;return Promise.resolve().then(function(){return G(j,I,F);}).then(function(J){var K=j.getModel(M);var U=n(J);var R=s(j,F.relevantContainer,I,M);var N=[];R.forEach(function(j){N=N.concat(B.getBindings(j,K).map(x));});var P=F.action.filter?F.action.filter:function(){return true;};U=U.filter(function(Q){var S=false;if(N){S=N.some(function(V){return V===Q.bindingPath;});}return!S&&P(F.relevantContainer,Q);});U=t(U);return U;}).then(function(U){return U.map(p.bind(null,T));});}function z(I,S){I.originalLabel=S.label;I.tooltip=S.tooltip;I.name=S.name;if(I.label!==I.originalLabel){I.renamedLabel=true;}if(S.referencedComplexPropertyName){I.referencedComplexPropertyName=S.referencedComplexPropertyName;}}function A(I,P,j){var F=j.bindingPaths;if(!v(F)){return true;}var M=w(F,P);if(M){z(I,M);return true;}return false;}function C(j){return O.get("delegateInfo.payload.modelName",j);}var D={enhanceInvisibleElements:function(j,F){var R=F.reveal;var G=F.addODataProperty;var H=F.addViaDelegate;var M=C(H);var I=F.addViaCustom;var J=j.getMetadata().getAggregation();var K=J?J.name:F.aggregation;var N=j.getModel(M);return Promise.resolve().then(function(){return m(j,K,F);}).then(function(P){var Q=[];var S=R.elements||[];S.forEach(function(T){var U=T.element;var V=T.action;var W=true;var X={};U.label=E.getLabelForElement(U,V.getLabel);if(G||H){if(d(j,K,M)===d(U,K,M)){X=B.collectBindingPaths(U,N);U.duplicateComplexName=u(U,P);W=A(U,P,X);}else if(B.getBindings(U,N).length>0){W=false;}}if(I&&W){I.items.forEach(function(Y){o(j.getParent().getId(),Y);if(Y.itemId===U.getId()){z(U,Y);}});}if(W){Q.push({element:U,action:V,bindingPathCollection:X});}});return Q;}).then(function(P){return P.map(r);});},getUnboundODataProperties:function(j,F){return y(j,F,undefined,k,"odata");},getUnrepresentedDelegateProperties:function(j,F){var M=C(F);return y(j,F,M,l,"delegate");},getCustomAddItems:function(j,F){return new Promise(function(R){if(Array.isArray(F.items)){R(F.items.map(o.bind(null,j.getParent().getId())).filter(function(G){if(!G.id){L.error("CustomAdd item with label "+G.label+" does not contain an 'id' property","sap.ui.rta.plugin.AdditionalElementsAnalyzer#showAvailableElements");return false;}return!E.getElementInstance(G.itemId);}));}else{R();}});},getFilteredItemsList:function(j){var I=j[0];var F=2;var G=j[F];if(G){var H=I.map(function(J){return J.elementId;});j[F]=G.filter(function(J){return!J.itemId||H.indexOf(J.itemId)===-1;});}return j.reduce(function(J,K){return J.concat(K);},[]);}};return D;});