sap.ui.define([],function(){"use strict";return{getPropertyOfEntitySet:function(m,e){if(!m||!m.getMetaModel){throw new Error("OData Model needs to be passed as an argument");}var M=m.getMetaModel();var E=M.getODataEntitySet(e);var o=M.getODataEntityType(E.entityType);return o.property?Array.from(o.property):[];},getParametersByEntitySet:function(m,e){if(!m||!m.getMetaModel){throw new Error("OData Model needs to be passed as an argument");}var M=m.getMetaModel();var r={entitySetName:null,parameters:[],navPropertyName:null};var E=M.getODataEntitySet(e);var o=M.getODataEntityType(E.entityType);var n=o.navigationProperty;if(!n){return r;}n.filter(function(N){var a=M.getODataAssociationEnd(o,N.name);var b=M.getODataEntityType(a.type);if(b["sap:semantics"]==="parameters"&&b.key){r.entitySetName=M.getODataAssociationSetEnd(o,N.name).entitySet;for(var i=0;i<b.key.propertyRef.length;i++){r.parameters.push(b.key.propertyRef[i].name);}var s=b.navigationProperty;var B=s.some(function(S){var c=M.getODataAssociationEnd(b,S.name).type;c===E.entityType?r.navPropertyName=S.name:Function.prototype();return r.navPropertyName;});return B&&r.navPropertyName&&r.entitySetName;}return false;});return r;},checkAnalyticalParameterisedEntitySet:function(m,e){if(!m||!m.getMetaModel){throw new Error("OData Model needs to be passed as an argument");}var M=m.getMetaModel();var E=M.getODataEntitySet(e);var o=M.getODataEntityType(E.entityType);if(o['sap:semantics']&&o['sap:semantics']==='aggregate'){return true;}return false;}};});