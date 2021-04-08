/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/model/ClientModel','sap/ui/model/Context','./XMLListBinding','./XMLPropertyBinding','./XMLTreeBinding',"sap/ui/util/XMLHelper","sap/base/Log","sap/base/util/each"],function(C,a,X,b,c,d,L,e){"use strict";var f=C.extend("sap.ui.model.xml.XMLModel",{constructor:function(D){C.apply(this,arguments);this.oNameSpaces=null;if(D&&D.documentElement){this.setData(D);}},metadata:{publicMethods:["setXML","getXML","setNameSpace"]}});f.prototype.setXML=function(x){var o=d.parse(x);if(o.parseError.errorCode!=0){var p=o.parseError;L.fatal("The following problem occurred: XML parse Error for "+p.url+" code: "+p.errorCode+" reason: "+p.reason+" src: "+p.srcText+" line: "+p.line+" linepos: "+p.linepos+" filepos: "+p.filepos);this.fireParseError({url:p.url,errorCode:p.errorCode,reason:p.reason,srcText:p.srcText,line:p.line,linepos:p.linepos,filepos:p.filepos});}this.setData(o);};f.prototype.getXML=function(){return d.serialize(this.oData);};f.prototype.setData=function(D){this.oData=D;this.checkUpdate();};f.prototype.loadData=function(u,p,A,t,g,h){var i=this;A=(A!==false);t=t||"GET";g=g===undefined?this.bCache:g;this.fireRequestSent({url:u,type:t,async:A,headers:h,info:"cache="+g,infoObject:{cache:g}});this._ajax({url:u,async:A,cache:g,dataType:'xml',data:p,headers:h,type:t,success:function(D){if(!D){L.fatal("The following problem occurred: No data was retrieved by service: "+u);}i.setData(D);i.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+g,infoObject:{cache:g},success:true});},error:function(j,k,l){var E={message:k,statusCode:j.status,statusText:j.statusText,responseText:j.responseText};L.fatal("The following problem occurred: "+k,j.responseText+","+j.status+","+j.statusText);i.fireRequestCompleted({url:u,type:t,async:A,headers:h,info:"cache="+g,infoObject:{cache:g},success:false,errorobject:E});i.fireRequestFailed(E);}});};f.prototype.setNameSpace=function(n,p){if(!p){p="";}if(!this.oNameSpaces){this.oNameSpaces={};}this.oNameSpaces[p]=n;};f.prototype.bindProperty=function(p,o,P){var B=new b(this,p,o,P);return B;};f.prototype.bindList=function(p,o,s,F,P){var B=new X(this,p,o,s,F,P);return B;};f.prototype.bindTree=function(p,o,F,P,s){var B=new c(this,p,o,F,P,s);return B;};f.prototype.setProperty=function(p,v,o,A){var O=p.substring(0,p.lastIndexOf("/")+1),P=p.substr(p.lastIndexOf("/")+1);if(!this.resolve(p,o)){return false;}if(!this.oData.documentElement){L.warning("Trying to set property "+p+", but no document exists.");return false;}var g;if(P.indexOf("@")==0){g=this._getObject(O,o);if(g[0]){g[0].setAttribute(P.substr(1),v);this.checkUpdate(false,A);return true;}}else{g=this._getObject(p,o);if(g[0]){g[0].textContent=v;this.checkUpdate(false,A);return true;}}return false;};f.prototype.getProperty=function(p,o){var r=this._getObject(p,o);if(r&&typeof r!="string"){r=r[0]?r[0].textContent:"";}return r;};f.prototype.getObject=function(p,o){var O=this._getObject(p,o);if(Array.isArray(O)){O=O[0];}return O;};f.prototype._getObject=function(p,o){var r=this.oData.documentElement;if(!r){return null;}var n=this.isLegacySyntax()?[r]:[];if(o instanceof a){n=this._getObject(o.getPath());}else if(o){n=[o];}if(!p){return n;}var P=p.split("/"),s,i=0;if(!P[0]){n=r;i++;}n=n.length==undefined?[n]:n;n=n[0]?n:null;while(n&&n.length>0&&P[i]){s=P[i];if(s.indexOf("@")==0){n=this._getAttribute(n[0],s.substr(1));}else if(s=="text()"){n=n[0]?n[0].textContent:"";}else if(isNaN(s)){n=this._getChildElementsByTagName(n[0],s);}else{n=[n[s]];}i++;}return n;};f.prototype._getAttribute=function(n,N){if(!this.oNameSpaces||N.indexOf(":")==-1){return n.getAttribute(N);}var s=this._getNameSpace(N),l=this._getLocalName(N);if(n.getAttributeNS){return n.getAttributeNS(s,l);}else{if(!this.oDocNSPrefixes){this.oDocNSPrefixes=this._getDocNSPrefixes();}var p=this.oDocNSPrefixes[s];N=(p?p+":":"")+l;return n.getAttribute(N);}};f.prototype._getChildElementsByTagName=function(n,N){var g=n.childNodes,r=[];if(this.oNameSpaces){var s=this._getNameSpace(N),l=this._getLocalName(N),h;e(g,function(i,o){h=o.localName||o.baseName;if(o.nodeType==1&&h==l&&o.namespaceURI==s){r.push(o);}});}else{e(g,function(i,o){if(o.nodeType==1&&o.nodeName==N){r.push(o);}});}return r;};f.prototype._getNameSpace=function(n){var i=n.indexOf(":"),p="";if(i>0){p=n.substr(0,i);}return this.oNameSpaces[p];};f.prototype._getLocalName=function(n){var i=n.indexOf(":"),l=n;if(i>0){l=n.substr(i+1);}return l;};f.prototype._getDocNSPrefixes=function(){var p={},D=this.oData&&this.oData.documentElement;if(!D){return p;}var A=D.attributes;e(A,function(i,o){var n=o.name,v=o.value;if(n=="xmlns"){p[v]="";}else if(n.indexOf("xmlns")==0){p[v]=n.substr(6);}});return p;};f.prototype._resolve=function(p,o){var i=!p.startsWith("/"),r=p;if(i){if(o){r=o.getPath()+"/"+p;}else{r=this.isLegacySyntax()?"/"+p:undefined;}}return r;};f.prototype.isList=function(p,o){return false;};f.prototype._setMetaModel=function(m){this._oMetaModel=m;};f.prototype.getMetaModel=function(){return this._oMetaModel;};return f;});