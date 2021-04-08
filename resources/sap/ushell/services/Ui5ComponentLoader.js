// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/services/Ui5ComponentHandle","sap/ushell/services/_Ui5ComponentLoader/utils","sap/ushell/EventHub","sap/ui/thirdparty/jquery"],function(u,U,o,e,q){"use strict";function a(c,p,C){this._oConfig=(C&&C.config)||{};this.createComponent=function(A,P,w){var b=A||{},l=o.shouldLoadCoreExt(b),d=o.shouldUseAmendedLoading(this._oConfig),L=o.shouldLoadDefaultDependencies(b,this._oConfig,d),n=u.getParameterValueBoolean("sap-ushell-nocb"),f=b.applicationDependencies||{};o.logAnyApplicationDependenciesMessages(f.name,f.messages);if(!b.ui5ComponentName){return new q.Deferred().resolve(A).promise();}delete b.loadCoreExt;delete b.loadDefaultDependencies;var g=o.createComponentData(b.componentData||{},b.url,b.applicationConfiguration,b.reservedParameters);if(b.getExtensions){g.getExtensions=b.getExtensions;delete b.getExtensions;}var s=o.constructAppComponentId(P||{}),h=l&&d,i=o.prepareBundle(this._oConfig.coreResourcesComplement),j=o.createComponentProperties(h,L,n,w,b.applicationDependencies||{},b.ui5ComponentName,b.url,s,i);U.onBeforeApplicationInstanceCreated.call(null,j);var D=new q.Deferred();o.createUi5Component(j,g).then(function(k){var m=new U(k);b.componentHandle=m;var r=l;if(r){b.coreResourcesFullyLoaded=r;e.emit("CoreResourcesComplementLoaded",{status:"success"});}D.resolve(b);},function(E){var k=JSON.stringify(j,null,4);o.logInstantiateComponentError(j.name,E+"",E.status,E.stack,k);D.reject(E);});return D.promise();};this.loadCoreResourcesComplement=function(){if(this.loadCoreResourcesComplementPromise){return this.loadCoreResourcesComplementPromise.promise();}var b=o.prepareBundle(this._oConfig.coreResourcesComplement),d=new q.Deferred();o.loadBundle(b).done(function(){e.emit("CoreResourcesComplementLoaded",{status:"success"});this.loadCoreResourcesComplementPromise=d;d.resolve();}.bind(this)).fail(function(){e.emit("CoreResourcesComplementLoaded",{status:"failed"});d.reject();});return d.promise();};e.once("loadCoreResourcesComplement").do(function(){this.loadCoreResourcesComplement();}.bind(this));}a.hasNoAdapter=true;return a;},true);