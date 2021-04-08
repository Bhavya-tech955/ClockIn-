/*!
 * @copyright@
 */
sap.ui.define(["sap/base/Log","sap/fe/navigation/SelectionVariant","sap/fe/navigation/NavError"],function(L,S,N){"use strict";var a={aValidTypes:["Edm.Boolean","Edm.Byte","Edm.Date","Edm.DateTimeOffset","Edm.Decimal","Edm.Double","Edm.Guid","Edm.Int16","Edm.Int32","Edm.Int64","Edm.SByte","Edm.Single","Edm.String","Edm.TimeOfDay"],oExcludeMap:{"Contains":"NotContains","StartsWith":"NotStartsWith","EndsWith":"NotEndsWith","Empty":"NotEmpty","NotEmpty":"Empty","LE":"NOTLE","GE":"NOTGE","LT":"NOTLT","GT":"NOTGT","BT":"NOTBT","NE":"EQ","EQ":"NE"},removeSensitiveData:function(c,d){if(!c){L.error("Context is required");return;}var p=[],i,P,C=c.getObject(),m=c.getModel().getMetaModel(),e=this._getTargetCollection(c),t=this,I=function(s,b,D){var f;b=b||e;D=D||C;f=m.getObject(b+"/"+s+"@");if(f){if(t._checkPropertyAnnotationsForSensitiveData(f)){return true;}else if(f["@com.sap.vocabularies.Common.v1.FieldControl"]){var F=f["@com.sap.vocabularies.Common.v1.FieldControl"];if(F["$EnumMember"]&&F["$EnumMember"].split("/")[1]==="Inapplicable"){return true;}else if(F["$Path"]){var o=F["$Path"],g=o.split("/");if(g.length>1){return D[g[0]]&&D[g[0]][g[1]]&&D[g[0]][g[1]]===0;}else{return D[o]===0;}}}}return false;};if(C){delete C["@odata.context"];delete C["@odata.metadataEtag"];}if(d){P=d;if(d.getMetadata&&d.getMetadata().getName()==="sap.fe.navigation.SelectionVariant"){i=true;p=d.getPropertyNames()||[];}else if(d instanceof Object){p=Object.keys(d)||[];}else{L.error("Unsupported format - Sensitive data not removed. Pass a SelectionVariant or data map");}}else{p=Object.keys(C)||[];P=JSON.parse(JSON.stringify(C));}p.forEach(function(s){if(!(C[s]instanceof Object)){if(I(s)){if(i){P.removeSelectOption(s);}else{delete P[s];}}}else{var b="/"+m.getObject(e+"/$NavigationPropertyBinding/"+s),n=i?JSON.parse(d.getSelectOption(s)[0].Low):P[s],f=Object.keys(n),g=false;f.forEach(function(h){if(I(h,b,n)){g=true;delete n[h];}});if(g){if(i){P.removeSelectOption(s);P.addSelectOption(s,"I","EQ",JSON.stringify(n));}else{P[s]=n;}}}});return P;},_checkPropertyAnnotationsForSensitiveData:function(p){return(p["@com.sap.vocabularies.PersonalData.v1.IsPotentiallySensitive"]||p["@com.sap.vocabularies.UI.v1.ExcludeFromNavigationContext"]||p["@com.sap.vocabularies.Analytics.v1.Measure"]);},_getTargetCollection:function(c,n){var p=c.getPath(),P,e,b;if(c.getMetadata().getName()==="sap.ui.model.Context"&&c.getObject("$kind")==="EntitySet"){return p;}if(c.getModel){p=(c.getModel().getMetaPath&&c.getModel().getMetaPath(p))||c.getModel().getMetaModel().getMetaPath(p);}P=p.split("/").filter(Boolean);e="/"+P[0];if(P.length===1){return e;}b=typeof n==="undefined"?P[P.length-1]:n;return e+"/$NavigationPropertyBinding/"+b;},addDefaultDisplayCurrency:function(m,A){if(A&&A.oSelectionVariant&&m&&m.length){for(var i=0;i<m.length;i++){var s=A.oSelectionVariant.getSelectOption("DisplayCurrency"),d=A.oDefaultedSelectionVariant&&A.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency");if(m[i].$PropertyPath==="DisplayCurrency"&&(!s||!s.length)&&d&&d.length){var b=d[0];var c=b["Sign"];var o=b["Option"];var l=b["Low"];var h=b["High"];A.oSelectionVariant.addSelectOption("DisplayCurrency",c,o,l,h);}}}},_mixAttributesToSelVariant:function(s,o,i){for(var p in s){if(s.hasOwnProperty(p)){var v=s[p];if(jQuery.type(v)==="array"||jQuery.type(v)==="object"){v=JSON.stringify(v);}else if(jQuery.type(v)==="date"){v=v.toJSON();}else if(jQuery.type(v)==="number"||jQuery.type(v)==="boolean"){v=v.toString();}if(v===""){if(i&sap.fe.navigation.SuppressionBehavior.ignoreEmptyString){L.info("Semantic attribute "+p+" is an empty string and due to the chosen Suppression Behiavour is being ignored.");continue;}}if(v===null){if(i&sap.fe.navigation.SuppressionBehavior.raiseErrorOnNull){throw new N("NavigationHandler.INVALID_INPUT");}else{L.warning("Semantic attribute "+p+" is null and ignored for mix in to selection variant");continue;}}if(v===undefined){if(i&sap.fe.navigation.SuppressionBehavior.raiseErrorOnUndefined){throw new N("NavigationHandler.INVALID_INPUT");}else{L.warning("Semantic attribute "+p+" is undefined and ignored for mix in to selection variant");continue;}}if(jQuery.type(v)==="string"){o.addSelectOption(p,"I","EQ",v);}else{throw new N("NavigationHandler.INVALID_INPUT");}}}return o;},mixAttributesAndSelectionVariant:function(s,b,c){var o=new S(b);var n=new S();if(o.getFilterContextUrl()){n.setFilterContextUrl(o.getFilterContextUrl());}if(o.getParameterContextUrl()){n.setParameterContextUrl(o.getParameterContextUrl());}if(Array.isArray(s)){s.forEach(function(m){a._mixAttributesToSelVariant(m,n,c);});}else{a._mixAttributesToSelVariant(s,n,c);}var p=o.getParameterNames();for(var i=0;i<p.length;i++){if(!n.getSelectOption(p[i])){n.addSelectOption(p[i],"I","EQ",o.getParameter(p[i]));}}var d=o.getSelectOptionsPropertyNames();for(i=0;i<d.length;i++){var e=o.getSelectOption(d[i]);if(!n.getSelectOption(d[i])){for(var j=0;j<e.length;j++){n.addSelectOption(d[i],e[j].Sign,e[j].Option,e[j].Low,e[j].High);}}}return n;}};return a;});