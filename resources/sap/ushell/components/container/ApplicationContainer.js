// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/Device","sap/ushell/utils","sap/ushell/ApplicationType","sap/m/MessagePopover","sap/ui/core/Component","sap/ui/core/ComponentContainer","sap/ui/core/Control","sap/ui/thirdparty/URI","sap/ushell/EventHub","sap/ui/core/Icon","sap/ushell/System","sap/ushell/User","sap/m/Text","sap/base/util/UriParameters","sap/base/util/deepEqual","sap/base/util/uid","sap/base/security/encodeXML","sap/ushell/utils/testableHelper","sap/ushell/Config"],function(D,u,A,M,C,a,b,U,E,I,S,c,T,d,f,g,h,t,j){"use strict";var p="sap.ushell.components.container.",s=p+"ApplicationContainer",k="sap.ushell.Container.dirtyState.",l,o,H,r,P=false,K=false,m=[],n=0;var q=["sap-ach","sap-fiori-id","sap-hide-intent-link","sap-priority","sap-tag","sap-ui-app-id-hint","sap-ui-debug","sap-ui-fl-control-variant-id","sap-ui-fl-max-layer","sap-ui-tech-hint","sap-ui2-tcode","sap-ui2-wd-app-id","sap-ui2-wd-conf-id","sap-ushell-cdm-site-url","sap-ushell-defaultedParameterNames","sap-ushell-navmode","sap-ushell-next-navmode","sap-ushell-url"];function v(e){var i=sap.ushell.Container.getService("CrossApplicationNavigation");i.isUrlSupported(e.url).done(function(){e.promise.resolve({"allowed":true,"id":e.id});}).fail(function(){e.promise.resolve({"allowed":false,"id":e.id});});}function w(e){var i={"asyncURLHandler":k1.prototype._adaptIsUrlSupportedResultForMessagePopover};if(M&&M.setDefaultHandlers){M.setDefaultHandlers(i);}E.emit("StepDone",e.stepName);}E.once("initMessagePopover").do(w);l=new u.Map();function x(e){return l.get(e.getId());}function y(){return o;}function z(e){var i=new d(e).mParams,l1=i["sap-xapp-state"],m1;delete i["sap-xapp-state"];m1={startupParameters:i};if(l1){m1["sap-xapp-state"]=l1;}return m1;}function B(e,i){if(!r){r=jQuery.sap.resources({url:jQuery.sap.getModulePath(p)+"/resources/resources.properties",language:sap.ui.getCore().getConfiguration().getLanguage()});}return r.getText(e,i);}function F(){return new I({size:"2rem",src:"sap-icon://error",tooltip:k1.prototype._getTranslatedText("an_error_has_occured")});}function G(e){var i=e.getAggregation("child"),l1;if(i instanceof a){l1=i.getComponentInstance().getMetadata().getName().replace(/\.Component$/,"");jQuery.sap.log.debug("unloading component "+l1,null,s);}e.destroyAggregation("child");}function J(e,i,l1){var m1,n1,o1,p1,q1,r1,s1,t1={},u1,v1;o1=i.indexOf("?");if(o1>=0){r1=k1.prototype._getParameterMap(i);t1=r1.startupParameters;i=i.slice(0,o1);}if(i.slice(-1)!=="/"){i+="/";}if(/\.view\.(\w+)$/i.test(l1)){q1=/^SAPUI5=(?:([^/]+)\/)?([^/]+)\.view\.(\w+)$/i.exec(l1);if(!q1){jQuery.sap.log.error("Invalid SAPUI5 URL",l1,s);return k1.prototype._createErrorControl();}s1=q1[1];u1=q1[2];v1=q1[3].toUpperCase();if(s1){u1=s1+"."+u1;}else{p1=u1.lastIndexOf(".");if(p1<1){jQuery.sap.log.error("Missing namespace",l1,s);return k1.prototype._createErrorControl();}s1=u1.slice(0,p1);}}else{s1=l1.replace(/^SAPUI5=/,"");}jQuery.sap.registerModulePath(s1,i+s1.replace(/\./g,"/"));k1.prototype._destroyChild(e);if(u1){if(e.getApplicationConfiguration()){t1.config=e.getApplicationConfiguration();}n1=sap.ui.view({id:e.getId()+"-content",type:v1,viewData:t1||{},viewName:u1});e.fireEvent("applicationConfiguration");}else{jQuery.sap.log.debug("loading component "+s1,null,s);var w1=r1?{startupParameters:r1.startupParameters}:{startupParameters:{}};if(r1&&r1["sap-xapp-state"]){w1["sap-xapp-state"]=r1["sap-xapp-state"];}if(e.getApplicationConfiguration()){w1.config=e.getApplicationConfiguration();}m1=sap.ui.component({id:e.getId()+"-component",componentData:w1,name:s1});e.fireEvent("applicationConfiguration",{"configuration":m1.getMetadata().getConfig()});n1=new a({id:e.getId()+"-content",component:m1});}n1.setWidth(e.getWidth());n1.setHeight(e.getHeight());n1.addStyleClass("sapUShellApplicationContainer");e.setAggregation("child",n1,true);return n1;}function L(e,i){setTimeout(function(){sap.ui.getCore().getEventBus().publish("sap.ushell",e,i);},0);}function N(e,i,l1){var m1,n1,o1,p1,q1={startupParameters:{}},r1,s1=e.getComponentHandle(),t1=sap.ushell.Container.getService("PluginManager"),u1,v1;u.addTime("createUi5Component");m1=i.indexOf("?");if(m1>=0){p1=k1.prototype._getParameterMap(i);q1={startupParameters:p1.startupParameters};if(p1["sap-xapp-state"]){q1["sap-xapp-state"]=p1["sap-xapp-state"];}i=i.slice(0,m1);}if(e.getApplicationConfiguration()){q1.config=e.getApplicationConfiguration();}if(i.slice(-1)!=="/"){i+="/";}k1.prototype._destroyChild(e);r1={id:e.getId()+"-component",name:l1,componentData:q1};jQuery.sap.log.debug("Creating component instance for "+l1,JSON.stringify(r1),s);sap.ui.getCore().getEventBus().publish("sap.ushell.components.container.ApplicationContainer","_prior.newUI5ComponentInstantion",{name:l1});if(s1){n1=s1.getInstance(r1);}else{jQuery.sap.registerModulePath(l1,i);jQuery.sap.log.error("No component handle available for '"+l1+"'; fallback to component.load()",null,s);n1=sap.ui.component({id:e.getId()+"-component",name:l1,componentData:q1});}e.fireEvent("applicationConfiguration",{"configuration":n1.getMetadata().getConfig()});o1=new a({id:e.getId()+"-content",component:n1});o1.setHeight(e.getHeight());o1.setWidth(e.getWidth());o1.addStyleClass("sapUShellApplicationContainer");e._disableRouterEventHandler=k1.prototype._disableRouter.bind(this,n1);sap.ui.getCore().getEventBus().subscribe("sap.ushell.components.container.ApplicationContainer","_prior.newUI5ComponentInstantion",e._disableRouterEventHandler);e.setAggregation("child",o1,true);if(t1){u1=t1.getPluginLoadingPromise("RendererExtensions");v1=u1&&u1.state();if(v1==="pending"){u1.done(function(){k1.prototype._publishExternalEvent("appComponentLoaded",{component:n1});}).fail(function(){k1.prototype._publishExternalEvent("appComponentLoaded",{component:n1});});}if(v1==="resolved"||v1==="rejected"){k1.prototype._publishExternalEvent("appComponentLoaded",{component:n1});}}else{k1.prototype._publishExternalEvent("appComponentLoaded",{component:n1});}return o1;}function O(e){var i;if((e instanceof C)&&(typeof e.getRouter==="function")){i=e.getRouter();if(i&&(typeof i.stop==="function")){jQuery.sap.log.info("router stopped for instance "+e.getId());i.stop();}}}function Q(e){var i=document.createElement("a"),l1=new d(e).get("sap-client"),m1;i.href=e;m1=i.protocol+"//"+i.host;return new S({alias:l1?m1+"?sap-client="+l1:m1,baseUrl:m1,client:l1||undefined,platform:"abap"});}function R(e,i){var l1=false,m1=e.getDomRef(),n1,o1;if(e.getIframeWithPost()===true&&m1&&m1.getAttribute&&m1.getAttribute("sap-iframe-app")=="true"){m1=jQuery("#"+m1.getAttribute("id")+"-iframe")[0];}if(m1){n1=U(e._getIFrameUrl(m1)||window.location&&window.location.href||"");o1=n1.protocol()+"://"+n1.host();l1=(i.source===m1.contentWindow)||(i.origin===o1);}return l1;}function V(e,i,l1){var m1=JSON.stringify({type:"request",service:i,request_id:g(),body:{}});jQuery.sap.log.debug("Sending post message request to origin ' "+l1+"': "+m1,null,"sap.ushell.components.container.ApplicationContainer");e.postMessage(m1,l1);}function W(){var i=this.getDomRef();if(!i||i.tagName!=="IFRAME"){if(this.getIframeWithPost()===true&&i&&i.getAttribute&&i.getAttribute("sap-iframe-app")=="true"){return jQuery("#"+i.getAttribute("id")+"-iframe")[0];}return null;}return i;}function X(i){var e;if(i===undefined){i=this._getIFrame();}e=i.src;if(this.getIframeWithPost()===true){e=jQuery("#"+i.getAttribute("id").replace("-iframe","-form"))[0].action;}return e;}function Y(e,i){if(e&&!e.getActive()){jQuery.sap.log.debug("Skipping handling of postMessage 'message' event with data '"+JSON.stringify(m1)+"' on inactive container '"+e.getId()+"'","Only active containers can handle 'message' postMessage event","sap.ushell.components.container.ApplicationContainer");return;}var l1=e.getUi5ComponentName&&e.getUi5ComponentName(),m1=i.data;if(typeof l1==="string"){jQuery.sap.log.debug("Skipping handling of postMessage 'message' event with data '"+JSON.stringify(m1)+"' on container of UI5 application '"+l1+"'","Only non UI5 application containers can handle 'message' postMessage event","sap.ushell.components.container.ApplicationContainer");return;}var n1={bApiRegistered:true};H(e,i,n1);Z(e,i,n1);}var Y=t.testableStatic(Y,"ApplicationContainer_handleMessageEvent");function Z(e,l1,m1){var n1,o1,p1;if(m1.bApiRegistered!==false){return;}if(P===false){P=true;n1=sap.ushell.Container.getService("PluginManager");if(n1){o1=n1.getPluginLoadingPromise("RendererExtensions");p1=o1&&o1.state();if(p1==="pending"){K=true;o1.done(function(){var q1;K=false;jQuery.sap.log.debug("Processing post messages queue after 'RendererExtensions' plugins loaded, queue size is: "+m.length,null,"sap.ushell.components.container.ApplicationContainer");for(var i=0;i<m.length;i++){q1=m[i];try{Y.call(q1.that,q1.oContainer,q1.oMessage);}catch(ex){jQuery.sap.log.error(ex.message||ex,null,"sap.ushell.components.container.ApplicationContainer");}}m=[];});}}}if(K===true){m.push({index:n++,that:this,oContainer:e,oMessage:l1});}}var Z=t.testableStatic(Z,"ApplicationContainer_handlePostMessagesForPluginsPostLoading");function $(){P=false;K=false;m=[];n=0;}var $=t.testableStatic($,"ApplicationContainer_resetPluginsLoadIndications");function _(e,i){var l1=e._getIFrame(),m1=e.getApplicationType();if(u.isApplicationTypeEmbeddedInIframe(e.getApplicationType(m1))&&l1){var n1=new U(e._getIFrameUrl(l1));var o1=n1.protocol()+"://"+n1.host();l1.contentWindow.postMessage(JSON.stringify({action:"pro54_disableDirtyHandler"}),o1);i.preventDefault();}}function a1(e,i,l1){e.write("<div").writeControlData(i).writeAccessibilityState(i).addClass("sapUShellApplicationContainer").writeClasses(i).addStyle("height",i.getHeight()).addStyle("width",i.getWidth()).writeStyles().write(">").renderControl(l1);e.write("</div>");}function b1(e,i,l1,m1){var n1,o1=function(){var w1=u.getParameterValueBoolean("sap-accessibility");if(w1!==undefined){return w1;}return sap.ushell.Container.getUser().getAccessibilityMode();},p1=function(){var w1=new d(e)||{mParams:{}};if(w1.mParams["sap-theme"]===undefined){return sap.ushell.Container.getUser().getTheme(c.prototype.constants.themeFormat.NWBC);}return undefined;},q1=function(){var w1=false,x1=new d(e)||{mParams:{}};w1=sap.ui.getCore().getConfiguration().getStatistics()&&x1.mParams["sap-statistics"]===undefined;return w1;},r1=function(){var w1=window.hasher&&window.hasher.getHash(),t1="",x1;if(w1&&w1.length>0&&w1.indexOf("sap-iapp-state=")>0){x1=/(?:sap-iapp-state=)([^&/]+)/.exec(w1);if(x1&&x1.length===2){t1=x1[1];}}return t1;},s1=function(){var w1="";var x1=(!!jQuery("body.sapUiSizeCompact").length);var y1=(!!jQuery("body.sapUiSizeCozy").length);if(x1===true){w1="0";}else if(y1){w1="1";}return w1;};e+=e.indexOf("?")>=0?"&":"?";e+="sap-ie=edge";n1=p1();if(n1){e+=e.indexOf("?")>=0?"&":"?";e+="sap-theme="+encodeURIComponent(n1);}if(l1){e+=e.indexOf("?")>=0?"&":"?";e+="sap-target-navmode="+encodeURIComponent(l1);}if(o1()){e+=e.indexOf("?")>=0?"&":"?";e+="sap-accessibility=X";}if(q1()){e+=e.indexOf("?")>=0?"&":"?";e+="sap-statistics=true";}if(m1){e+=e.indexOf("?")>=0?"&":"?";e+="sap-keepclientsession=1";}var t1=r1();if(t1&&t1.length>0){e+=e.indexOf("?")>=0?"&":"?";e+="sap-iapp-state="+t1;}var u1=s1();if(u1&&u1.length>0){e+=e.indexOf("?")>=0?"&":"?";e+="sap-touch="+u1;}var v1=0;if(j.last("/core/shell/sessionTimeoutIntervalInMinutes")>0){v1=j.last("/core/shell/sessionTimeoutIntervalInMinutes");}e+=e.indexOf("?")>=0?"&":"?";e+="sap-ushell-timeout="+v1;return u.appendSapShellParam(e,i);}function c1(e,i,l1,m1){var n1=i.getAggregation("child");if(!n1||i._bRecreateChild){n1=k1.prototype._createUi5Component(i,l1,m1);i._bRecreateChild=false;}k1.prototype._renderControlInDiv(e,i,n1);}function d1(e,i,l1){var m1=e.getProperty(i);if(f(m1,l1)){return;}e.setProperty(i,l1);e._bRecreateChild=true;}function e1(e,i,l1,m1,n1){var o1;localStorage.removeItem(i.globalDirtyStorageKey);if(n1&&n1.indexOf("SAPUI5.Component=")===0&&l1===A.URL.type){c1(e,i,m1,n1.replace(/^SAPUI5\.Component=/,""));return;}if(n1&&n1.indexOf("SAPUI5=")===0&&l1===A.URL.type){k1.prototype._renderControlInDiv(e,i,k1.prototype._createUi5View(i,m1,n1));return;}jQuery.sap.log.debug("Not resolved as \"SAPUI5.Component=\" or \"SAPUI5=\" , "+"will attempt to load into iframe "+n1);if(!i.getActive()){jQuery.sap.log.debug("Skipping rendering container iframe","Container '"+i.getId()+"' is inactive");return;}try{m1=i.getFrameSource(l1,m1,n1);}catch(ex){jQuery.sap.log.error(ex.message||ex,null,s);i.fireEvent("applicationConfiguration");e.renderControl(k1.prototype._createErrorControl());return;}if(sap.ushell.Container){o1=k1.prototype._getLogoutHandler(i);if(!o1){if(u.isApplicationTypeEmbeddedInIframe(l1)){o1=k1.prototype._logout.bind(null,i);l.put(i.getId(),o1);sap.ushell.Container.attachLogoutEvent(o1);sap.ushell.Container.addRemoteSystem(k1.prototype._createSystemForUrl(m1));}}else if(!u.isApplicationTypeEmbeddedInIframe(l1)){sap.ushell.Container.detachLogoutEvent(o1);l.remove(i.getId());}}if(u.isApplicationTypeEmbeddedInIframe(l1)){var q1=i.getTargetNavigationMode();m1=k1.prototype._adjustNwbcUrl(m1,l1,q1,i.getIsStateful());u.localStorageSetItem(i.globalDirtyStorageKey,sap.ushell.Container.DirtyState.INITIAL);}m1=this._adjustURLForIsolationOpeningWithoutURLTemplate(m1);if(i.getIframeWithPost()===true&&u.isApplicationTypeEmbeddedInIframe(l1)){i.oDeferredRenderer=new jQuery.Deferred();m1=k1.prototype._filterURLParams(m1);var r1=[];var s1=k1.prototype._getParamKeys(m1,r1);k1.prototype._generateRootElementForIFrame(e,i,true);if(s1.length>0){var t1=sap.ushell.Container.getService("CrossApplicationNavigation");t1.getAppStateData(s1).then(function(p1){var u1;var v1=jQuery("#"+i.getId());if(v1){u1=sap.ui.getCore().createRenderManager();k1.prototype._buildHTMLElements(u1,i,p1,r1,m1,true);u1.flush(v1[0]);u1.destroy();i.oDeferredRenderer.resolve();}},function(p1){k1.prototype._buildHTMLElements(e,i,undefined,r1,m1,true);i.oDeferredRenderer.resolve();});}else{k1.prototype._buildHTMLElements(e,i,undefined,r1,m1,false);i.oDeferredRenderer.resolve();}k1.prototype._generateRootElementForIFrame(e,i,false);return;}i.fireEvent("applicationConfiguration");e.write("<iframe").writeControlData(i).writeAccessibilityState(i).writeAttributeEscaped("src",m1).addClass("sapUShellApplicationContainer").writeClasses(i).addStyle("height",i.getHeight()).addStyle("width",i.getWidth()).writeStyles().write("></iframe>");}function f1(e){var i=new U();if(i.query(true).hasOwnProperty("sap-isolation-enabled")){var l1=sap.ushell.Container.getService("URLParsing"),m1=l1.getHash(i.toString()),n1="&sap-plugins="+encodeURIComponent(sap.ushell.Container.getService("PluginManager")._getNamesOfPluginsWithAgents());if(n1==="&sap-plugins="){n1="";}if(m1){var o1=l1.parseShellHash("#"+m1),p1=l1.paramsToString(o1.params);if(p1&&p1.length>=0){var q1=sap.ushell.Container.getService("AppState").createEmptyAppState(),r1=sap.ushell.Container.getService("AppState").createEmptyAppState(),s1="";if(p1.indexOf("sap-intent-param")>=0){s1=encodeURIComponent(p1);}else{q1.setData(p1);q1.save();s1=encodeURIComponent("sap-intent-param="+q1.getKey());}r1.setData("sap-startup-params="+s1);r1.save();e=e.split("#")[0]+"&sap-intent-param="+r1.getKey()+n1+"#"+window.hasher.getHash();}else{e=e.split("#")[0]+n1+"#"+window.hasher.getHash();}}else{e+="#"+window.hasher.getHash();}}return e;}function g1(e){var i=new U(e);i=i.removeSearch(q);return i.toString();}function h1(e,i){var l1=[],m1;if(e.indexOf("sap-intent-param=")>0){m1=/(?:sap-intent-param=)([^&/]+)/.exec(e);if(m1&&m1.length===2){l1.push([m1[1]]);i.push("sap-intent-param-data");}}if(e.indexOf("sap-xapp-state=")>0){m1=/(?:sap-xapp-state=)([^&/]+)/.exec(e);if(m1&&m1.length===2){l1.push([m1[1]]);i.push("sap-xapp-state-data");}}if(e.indexOf("sap-iapp-state=")>0){m1=/(?:sap-iapp-state=)([^&/]+)/.exec(e);if(m1&&m1.length===2){l1.push([m1[1]]);i.push("sap-iapp-state-data");}}return l1;}function i1(e,i,l1,m1,n1,o1){var p1=i.getId()+"-form",q1="",r1=false;if(l1===undefined){l1=[];}l1.push([sap.ushell.Container.getFLPUrl(true)]);m1.push("sap-flp-url");var s1="";var t1={};m1.forEach(function(v1,w1){if(l1[w1][0]){t1[v1]=l1[w1][0];}});s1=JSON.stringify(t1);q1="<input name=\"sap-flp-params\" value=\""+h(s1)+"\"/>";i.fireEvent("applicationConfiguration");e.write("<form").writeAttributeEscaped("method","post").writeAttributeEscaped("id",p1).writeAttributeEscaped("name",p1).writeAttributeEscaped("target",i.getId()+"-iframe").writeAttributeEscaped("action",n1).addStyle("display","none").writeStyles().write(">").writeAttributeEscaped(q1).write("</form>");var u1=i.sId;if(!o1&&i.hasStyleClass("hidden")){r1=true;i.toggleStyleClass("hidden",false);}i.sId+="-iframe";e.write("<iframe").writeAttributeEscaped("name",i.getId()).writeControlData(i).writeAccessibilityState(i).writeAttributeEscaped("sap-orig-src",n1).addClass("sapUShellApplicationContainer").writeClasses(i).addStyle("height",i.getHeight()).addStyle("width",i.getWidth()).writeStyles().write("></iframe>");i.sId=u1;if(r1){i.toggleStyleClass("hidden",true);}}function j1(e,i,l1){if(l1){e.write("<div").writeControlData(i).writeAttributeEscaped("sap-iframe-app","true").addClass("sapUShellApplicationContainer").writeClasses(i).addStyle("height",i.getHeight()).addStyle("width",i.getWidth()).writeStyles().write(">");}else{e.write("</div>");}}var k1=b.extend(s,{metadata:{properties:{additionalInformation:{defaultValue:"",type:"string"},application:{type:"object"},applicationConfiguration:{type:"object"},applicationType:{defaultValue:"URL",type:p+"ApplicationType"},height:{defaultValue:"100%",type:"sap.ui.core.CSSSize"},navigationMode:{defaultValue:"",type:"string"},targetNavigationMode:{defaultValue:"",type:"string"},text:{defaultValue:"",type:"string"},url:{defaultValue:"",type:"string"},visible:{defaultValue:true,type:"boolean"},active:{defaultValue:true,type:"boolean"},"sap-system":{type:"string"},applicationDependencies:{type:"object"},componentHandle:{type:"object"},ui5ComponentName:{type:"string"},width:{defaultValue:"100%",type:"sap.ui.core.CSSSize"},shellUIService:{type:"object"},appIsolationService:{type:"object"},reservedParameters:{type:"object"},coreResourcesFullyLoaded:{type:"boolean"},isStateful:{defaultValue:false,type:"boolean"},iframeHandlers:{defaultValue:"",type:"string"},iframeWithPost:{defaultValue:false,type:"boolean"},beforeAppCloseEvent:{type:"object"}},events:{"applicationConfiguration":{}},aggregations:{child:{multiple:false,type:"sap.ui.core.Control",visibility:"hidden"}},library:"sap.ushell",designtime:"sap/ushell/designtime/ApplicationContainer.designtime"},exit:function(){var e,i=this;if(sap.ushell.Container){e=k1.prototype._getLogoutHandler(i);if(e){sap.ushell.Container.detachLogoutEvent(e);l.remove(i.getId());}}localStorage.removeItem(i.globalDirtyStorageKey);if(i._unloadEventListener){removeEventListener("unload",i._unloadEventListener);}if(i._disableRouterEventHandler){sap.ui.getCore().getEventBus().unsubscribe("sap.ushell.components.container.ApplicationContainer","_prior.newUI5ComponentInstantion",i._disableRouterEventHandler);}if(i._storageEventListener){removeEventListener("storage",i._storageEventListener);}if(i._messageEventListener){removeEventListener("message",i._messageEventListener);}k1.prototype._destroyChild(i);if(b.exit){b.exit.apply(i);}},setHandleMessageEvent:function(i){H=i;},init:function(){var e=this;e.globalDirtyStorageKey=k+g();if(new d(window.location.href).get("sap-post")==="true"){e.setIframeWithPost(true);}e._unloadEventListener=e.exit.bind(e);addEventListener("unload",e._unloadEventListener);e._storageEventListener=function(i){var l1=e.getApplicationType();if(i.key===e.globalDirtyStorageKey&&i.newValue===sap.ushell.Container.DirtyState.PENDING&&u.isApplicationTypeEmbeddedInIframe(l1)){var m1=e._getIFrame();if(m1){jQuery.sap.log.debug("getGlobalDirty() send pro54_getGlobalDirty ",null,"sap.ushell.components.container.ApplicationContainer");var n1=new U(e._getIFrameUrl(m1));var o1=n1.protocol()+"://"+n1.host();m1.contentWindow.postMessage(JSON.stringify({action:"pro54_getGlobalDirty"}),o1);}}};addEventListener("storage",e._storageEventListener);e._messageEventListener=k1.prototype._handleMessageEvent.bind(null,e);addEventListener("message",e._messageEventListener);},onAfterRendering:function(){var e=this;this.rerender=function(){};if(D.os.ios&&this.$().prop("tagName")==="IFRAME"){this.$().parent().css("overflow","auto");}if(this.oDeferredRenderer){this.oDeferredRenderer.done(function(){var i=document.getElementById(e.getId()+"-form");if(i){i.submit();}});}},renderer:function(e,i){var l1=i.getApplication(),m1=i.launchpadData,n1;if(!i.getVisible()){k1.prototype._renderControlInDiv(e,i);return;}if(i.error){delete i.error;k1.prototype._renderControlInDiv(e,i,k1.prototype._createErrorControl());}else if(!l1){k1.prototype._render(e,i,i.getApplicationType(),i.getUrl(),i.getAdditionalInformation());}else if(!l1.isResolvable()){k1.prototype._render(e,i,l1.getType(),l1.getUrl(),"");}else if(m1){k1.prototype._render(e,i,m1.applicationType,m1.Absolute.url.replace(/\?$/,""),m1.applicationData);}else{jQuery.sap.log.debug("Resolving "+l1.getUrl(),null,s);l1.resolve(function(o1){jQuery.sap.log.debug("Resolved "+l1.getUrl(),JSON.stringify(o1),s);i.launchpadData=o1;k1.prototype._destroyChild(i);},function(o1){var p1=l1.getMenu().getDefaultErrorHandler();if(p1){p1(o1);}k1.prototype._destroyChild(i);i.error=o1;});n1=new T({text:k1.prototype._getTranslatedText("loading",[l1.getText()])});k1.prototype._destroyChild(i);i.setAggregation("child",n1);k1.prototype._renderControlInDiv(e,i,n1);}}});k1.prototype.getFrameSource=function(e,i){if(!Object.prototype.hasOwnProperty.call(A.enum,e)){throw new Error("Illegal application type: "+e);}return i;};k1.prototype.setUrl=function(e){d1(this,"url",e);};k1.prototype.setAdditionalInformation=function(e){d1(this,"additionalInformation",e);};k1.prototype.setApplicationType=function(e){d1(this,"applicationType",e);};k1.prototype.createPostMessageRequest=function(e,i){var l1=Date.now().toString();return{"type":"request","request_id":l1,"service":e,"body":i};};k1.prototype.setNewTRApplicationContext=function(e){var i=this._getIFrame();if(!i){return Promise.reject({message:"Expected an exisiting TR application application frame but found none."});}e=u.appendSapShellParam(e);var l1=this.createPostMessageRequest("sap.its.startService",{"url":e});return this.postMessageToIframe(l1,i,true).catch(function(m1){return Promise.reject({eventData:m1,message:"Failed to change application context."});});};k1.prototype.postMessageToIframe=function(i,l1,m1){var n1=this;var o1=i.request_id;return new Promise(function(p1,q1){function r1(v1){var w1;try{w1=JSON.parse(v1.data,n1);if(o1!==w1.request_id){return;}if(w1.status==="success"){p1(w1);}else{q1(w1);}window.removeEventListener("message",r1);}catch(e){p1();jQuery.sap.log.warning("Obtained bad response from framework in response to message "+i.request_id);jQuery.sap.log.debug("Underlying framework returned invalid response data: '"+v1.data+"'");}}var s1=JSON.stringify(i);jQuery.sap.log.debug("Sending postMessage "+s1+" to application container '"+n1.getId()+"'");var t1=new U(n1._getIFrameUrl(l1));var u1=t1.protocol()+"://"+t1.host();if(m1){window.addEventListener("message",r1,false);l1.contentWindow.postMessage(s1,u1);}else{l1.contentWindow.postMessage(s1,u1);p1();}});};k1.prototype.postMessageToCurrentIframe=function(e,i){if(i===undefined){i=false;}var l1=this._getIFrame();if(!l1){if(i){return Promise.reject({message:"Expected opened iframe not found."});}return;}return this.postMessageToIframe(e,l1,i);};k1.prototype.setNewApplicationContext=function(e,i){var l1=this;var m1=this["setNew"+e+"ApplicationContext"];if(!m1){return Promise.reject({message:"Unsupported application type"});}var n1=this._getIFrame();if(!n1){return Promise.reject({message:"Expected an exisiting TR application application frame but found none."});}var o1=this.createPostMessageRequest("sap.gui.triggerCloseSessionImmediately",{});return this.postMessageToIframe(o1,n1,true).then(function(){return m1.call(l1,i);},function(p1){return Promise.reject({eventData:p1,message:"Failed to change application context."});});};k1.prototype.onApplicationOpened=function(e){var i=this.getIsStateful();if(!i){return Promise.resolve();}var l1=this.getApplicationType();if(l1==="TR"&&e!=="TR"){var m1=this._getIFrame();if(!m1){return Promise.reject({message:"Expected an exisiting TR application application frame but found none."});}var n1=this.createPostMessageRequest("sap.gui.triggerCloseSession",{});return this.postMessageToIframe(n1,m1,false).catch(function(o1){return Promise.reject({eventData:o1,message:"Failed to change application context."});});}return Promise.resolve();};k1.prototype.postMessageRequest=function(e,i){var l1=this._getIFrame();if(!l1){return Promise.reject({message:"Expected an exisiting TR application application frame but found none."});}var m1=this.createPostMessageRequest(e,i||{});return this.postMessageToIframe(m1,l1,false).catch(function(n1){return Promise.reject({eventData:n1,message:"Failed to post message."});});};k1.prototype.sendBeforeAppCloseEvent=function(){var e=this.getBeforeAppCloseEvent&&this.getBeforeAppCloseEvent(),i;if(e&&e.enabled&&e.enabled===true){i=this.createPostMessageRequest("sap.ushell.services.CrossApplicationNavigation.beforeAppCloseEvent",e.params);return this.postMessageToIframe(i,this._getIFrame(),true);}else{return undefined;}};k1.prototype._getCommunicationHandlers=y;k1.prototype._adaptIsUrlSupportedResultForMessagePopover=v;k1.prototype._getLogoutHandler=x;k1.prototype._getParameterMap=z;k1.prototype._getTranslatedText=B;k1.prototype._createErrorControl=F;k1.prototype._destroyChild=G;k1.prototype._createUi5View=J;k1.prototype._publishExternalEvent=L;k1.prototype._createUi5Component=N;k1.prototype._disableRouter=O;k1.prototype._createSystemForUrl=Q;k1.prototype._isTrustedPostMessageSource=R;k1.prototype._handleMessageEvent=Y;k1.prototype._logout=_;k1.prototype._renderControlInDiv=a1;k1.prototype._adjustNwbcUrl=b1;k1.prototype._render=e1;k1.prototype._getParamKeys=h1;k1.prototype._buildHTMLElements=i1;k1.prototype._generateRootElementForIFrame=j1;k1.prototype._backButtonPressedCallback=V;k1.prototype._getIFrame=W;k1.prototype._getIFrameUrl=X;k1.prototype._filterURLParams=g1;k1.prototype._adjustURLForIsolationOpeningWithoutURLTemplate=f1;return k1;},true);