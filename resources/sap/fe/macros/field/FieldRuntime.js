/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/XMLTemplateProcessor","sap/ui/core/util/XMLPreprocessor","sap/ui/core/Fragment","sap/fe/macros/ResourceModel","sap/fe/core/helpers/SideEffectsUtil","sap/base/Log"],function(X,a,F,R,S,L){"use strict";function _(s,d){var B=s.getBindingContext(),m=B.getModel().getMetaModel(),M=m.getMetaPath(B.getPath()),e=m.getObject(M)["$Type"],C=B;if(d!==e){C=B.getBinding().getContext();if(C){M=m.getMetaPath(C.getPath());e=m.getObject(M)["$Type"];if(d!==e){return undefined;}}}return C||undefined;}function b(C){while(C&&!(C.getMetadata().getName()==="sap.ui.core.mvc.XMLView")){C=C.getParent();}return C;}var c={formatDraftOwnerTextInPopover:function(h,d,D,s,e){if(h){var u=s||d||e||D;if(!u){return R.getText("draft.POPOVER_UNSAVED_CHANGES_BY_UNKNOWN");}else{return d?R.getText("draft.POPOVER_LOCKED_BY_KNOWN",u):R.getText("draft.POPOVER_UNSAVED_CHANGES_BY_KNOWN",u);}}else{return R.getText("draft.POPOVER_NO_DATA_TEXT");}},onDataFieldWithNavigationPath:function(s,C,d){var B=s.getBindingContext();if(C.routingListener){C.routingListener.navigateToTarget(B,d);}else{L.error("FieldRuntime: No routing listener controller extension found. Internal navigation aborted.","sap.fe.macros.field.FieldRuntime","onDataFieldWithNavigationPath");}},onDraftLinkPressed:function(e,E){var t=this,s=e.getSource(),v=b(s),B=s.getBindingContext(),m=B.getModel().getMetaModel(),V=v.getId(),d;this.mDraftPopovers=this.mDraftPopovers||{};this.mDraftPopovers[V]=this.mDraftPopovers[V]||{};d=this.mDraftPopovers[V][E];if(d){d.setBindingContext(B);d.openBy(s);}else{var f="sap.fe.macros.field.DraftPopOverAdminData",p=X.loadTemplate(f,"fragment");Promise.resolve(a.process(p,{name:f},{bindingContexts:{entitySet:m.createBindingContext("/"+E)},models:{entitySet:m}})).then(function(o){return F.load({definition:o,controller:t});}).then(function(P){d=t.mDraftPopovers[V][E]=P;d.setModel(R.getModel(),"i18n");v.addDependent(d);d.setBindingContext(B);d.openBy(s);});}},closeDraftAdminPopover:function(e){e.getSource().getParent().getParent().close();},_initSideEffectsQueue:function(C,o){this.sideEffectsRequestsQueue=this.sideEffectsRequestsQueue||{};this.sideEffectsRequestsQueue[C]=this.sideEffectsRequestsQueue[C]||{};this.sideEffectsRequestsQueue[C]["context"]=this.sideEffectsRequestsQueue[C]["context"]||o;this.sideEffectsRequestsQueue[C]["pathExpressions"]=this.sideEffectsRequestsQueue[C]["pathExpressions"]||[];if(this.aFailedSideEffects&&this.aFailedSideEffects[C]){this.sideEffectsRequestsQueue[C]["pathExpressions"]=this.sideEffectsRequestsQueue[C]["pathExpressions"].concat(this.aFailedSideEffects[C]["pathExpressions"]);delete this.aFailedSideEffects[C];}},prepareForSideEffects:function(f,s){var t=this,p=[],w=f.indexOf("#")>-1,d=(w&&f.split("#")[0])||f,q=(w&&f.split("#")[1])||"",e="/"+d+"@com.sap.vocabularies.Common.v1.SideEffects",B=s.getBindingContext(),m=B.getModel().getMetaModel(),C,g,P,Q,E,h,o,G=function(j){return j["$PropertyPath"];},i=function(j){return j["$NavigationPropertyPath"];};e=(w&&e+"#"+q)||e;o=m.getObject(e);if(o&&t.aPendingSideEffects.indexOf(f)>-1){C=_(s,d);if(!C){return Promise.resolve();}g=C.getPath();p=p.concat(o.TargetProperties||[]).concat(o.TargetEntities||[]);p=S.replaceEmptyNavigationPaths(p);p=S.addTextProperties(p,m,d);if(p.length){t._initSideEffectsQueue(g,C);Q=t.sideEffectsRequestsQueue[g]["pathExpressions"].filter(G).map(G);h=t.sideEffectsRequestsQueue[g]["pathExpressions"].filter(i).map(i);P=p.map(G).filter(function(j){return j&&Q.indexOf(j)<0;}).map(function(j){return{"$PropertyPath":j};});E=p.map(i).filter(function(j){return(j||j==="")&&h.indexOf(j)<0;}).map(function(j){return{"$NavigationPropertyPath":j};});p=P.concat(E);t.sideEffectsRequestsQueue[g]["pathExpressions"]=t.sideEffectsRequestsQueue[g]["pathExpressions"].concat(p);t.aPendingSideEffects.splice(t.aPendingSideEffects.indexOf(f),1);}}return Promise.resolve();},requestSideEffects:function(){if(!this.sideEffectsRequestsQueue){return;}var t=this,s=this.sideEffectsRequestsQueue,o=this.oSideEffectQueuePromise||Promise.resolve();this.sideEffectsRequestsQueue=null;o.then(function(){var m=Object.keys(s).map(function(p){var d=s[p];S.logRequest(d);return d["context"].requestSideEffects(d["pathExpressions"]).then(function(){},function(){L.info("FieldRuntime: Failed to request side effect - "+p,"sap.fe.macros.field.FieldRuntime","requestSideEffects");t.aFailedSideEffects[p]=d;});});t.oSideEffectQueuePromise=Promise.all(m);});},requestTextIfRequired:function(s){var A=s.getBindingInfo("additionalValue");if(!A){return;}var p=A.parts.map(function(P){return{"$PropertyPath":P.path};}),C=s.getBindingContext();if(p.length){C.requestSideEffects(p).then(function(){},function(){L.info("FieldRuntime: Failed to request Text association - "+(p[0]&&p[0]["$PropertyPath"]),"sap.fe.macros.field.FieldRuntime","requestTextIfRequired");});}},handleChange:function(e){var t=this,s=e.getSource(),i=s&&s.getBindingContext().isTransient(),p=e.getParameter("promise")||Promise.resolve(),d=p,A=false;if(s.getParent().isA("sap.ui.table.CreationRow")){if(e.getParameter("valid")===true&&s.getParent().getApplyEnabled()===false){s.getParent().setApplyEnabled(true);}else if(e.getParameter("valid")===false&&s.getParent().getApplyEnabled()===true){s.getParent().setApplyEnabled(false);}else if(e.getParameter("valid")===undefined&&s.getParent().getApplyEnabled()===true){var C=s.getParent().getCells();var h=function(f,g,j){if(f.getValue!==null){if(Array.isArray(f)){if(f.some(function(k){return k!==null&&k!==undefined;})){return true;}else{return false;}}else{return f.getValue()!==null;}}};if(!C.some(h)){s.getParent().setApplyEnabled(false);}}}if(i){return;}this.aPendingSideEffects=this.aPendingSideEffects||[];this.mFieldGroupResolves=this.mFieldGroupResolves||{};this.aFailedSideEffects=this.aFailedSideEffects||{};p.then(function(){t.requestTextIfRequired(s);});if(s.getFieldGroupIds()){s.getFieldGroupIds().forEach(function(f){var I=f.indexOf("$$ImmediateRequest")>-1;if(I){A=true;f=f.substr(0,f.indexOf("$$ImmediateRequest"));}else if(t.mFieldGroupResolves.hasOwnProperty(f)){t.mFieldGroupResolves[f].push(p);}else{t.mFieldGroupResolves[f]=[p];}if(t.aPendingSideEffects.indexOf(f)===-1){t.aPendingSideEffects.push(f);}if(I){d=d.then(function(){return t.prepareForSideEffects(f,s);});}});if(A){d.then(this.requestSideEffects.bind(this));}}},handleSideEffect:function(e){if(!this.aPendingSideEffects||this.aPendingSideEffects.length===0){return;}var t=this,f=e.getParameter("fieldGroupIds"),s=e.getSource(),p=Promise.resolve();f=f||[];f.forEach(function(d){var g=[Promise.resolve()];if(t.mFieldGroupResolves&&t.mFieldGroupResolves[d]){g=t.mFieldGroupResolves[d];delete(t.mFieldGroupResolves&&t.mFieldGroupResolves[d]);}p=p.then(function(){return Promise.all(g).then(t.prepareForSideEffects.bind(t,d,s));});});p.then(this.requestSideEffects.bind(this));},handlePatchEvents:function(B){if(!B){return;}var t=this;B=(B.getBinding&&B.getBinding())||B;B.attachEvent("patchCompleted",function(e){if(e.getParameter("success")!==false&&t.aFailedSideEffects){Object.keys(t.aFailedSideEffects).forEach(function(C){t._initSideEffectsQueue(C,t.aFailedSideEffects[C]["context"]);});t.requestSideEffects();}});}};return c;},true);