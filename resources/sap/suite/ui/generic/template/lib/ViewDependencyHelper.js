sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/js/AnnotationHelper","sap/suite/ui/generic/template/lib/testableHelper","sap/base/util/extend"],function(B,A,t,e){"use strict";function g(T){function s(E){E=E||[];for(var i in T.componentRegistry){if(E.indexOf(i)===-1){var C=T.componentRegistry[i];C.oComponent.setIsRefreshRequired(true);}}}function a(C,E,l){var m=C.getId();var o=T.componentRegistry[m];var h=T.mRoutingTree[o.route];for(var i=0;(!l||i<l)&&h.level>0;i++){var p=T.mRoutingTree[h.parentRoute];if(p.componentId){var P=T.componentRegistry[p.componentId].oComponent;b(P,E);}h=p;}}function b(C,E){if(E){var r=T.componentRegistry[C.getId()];var R=r.mRefreshInfos;R[E]=true;if(r.utils.isComponentActive()){r.utils.refreshBinding();}}else if(C.setIsRefreshRequired){C.setIsRefreshRequired(true);}}function c(o,S){for(var i=0;i<o.children.length;i++){var C=T.mEntityTree[o.children[i]];c(C,S);if(C.componentId){var h=T.componentRegistry[C.componentId];S.push(h.oComponent);}}}function d(C){var r=[];var o=T.componentRegistry[C.getId()];var h=T.mRoutingTree[o.route];c(h,r);return r;}function u(C,h){var S=d(C);if(h){S.push(C);}for(var i=0;i<S.length;i++){T.componentRegistry[S[i].getId()].utils.unbind();}}function f(){var r=T.mRoutingTree.root;if(r.componentId){var R=T.componentRegistry[r.componentId];var i=R.oComponent;if(i&&typeof i.setIsRefreshRequired==="function"){i.setIsRefreshRequired(true);}}}var a=t.testable(a,"setParentToDirty");return{setAllPagesDirty:s,setParentToDirty:a,setMeToDirty:b,unbindChildren:u,setRootPageToDirty:f};}return B.extend("sap.suite.ui.generic.template.lib.ViewDependencyHelper",{constructor:function(T){e(this,g(T));}});});