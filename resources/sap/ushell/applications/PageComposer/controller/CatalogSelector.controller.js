// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Fragment","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(C,F,a,b){"use strict";var _;var c=C.extend("sap.ushell.applications.PageComposer.controller.CatalogSelector.controller",{load:function(p){_=_||F.load({id:p.getId(),name:"sap.ushell.applications.PageComposer.view.CatalogSelector",controller:this}).then(function(d){p.addDependent(d);return d;});return _;},open:function(p){this.load(p).then(function(d){d.getBinding("items").filter([]);d.open();});},onConfirm:function(e){var d=e.getParameter("selectedContexts");if(this._fnConfirm){this._fnConfirm(d.map(function(o){return o.getObject().id;}));}this._fnConfirm=null;},onSearch:function(e){var v=e.getParameter("value");var f=new a([new a("id",b.Contains,v),new a("title",b.Contains,v)]);e.getSource().getBinding("items").filter([f]);},selectCatalogs:function(p,f){this._fnConfirm=f;this.open(p);}});return new c();});