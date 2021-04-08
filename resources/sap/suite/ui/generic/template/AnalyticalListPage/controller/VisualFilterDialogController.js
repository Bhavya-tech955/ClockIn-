sap.ui.define(["sap/m/Button","sap/m/Label","sap/m/Dialog","sap/m/Bar","sap/m/SearchField","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/Title","sap/m/VBox","sap/m/HBox","sap/m/CheckBox","sap/m/Link","sap/m/List","sap/m/CustomListItem","sap/m/TextArea","sap/m/Text","sap/m/StandardListItem","sap/m/Popover","sap/ui/layout/form/SimpleForm","sap/ui/layout/GridData","sap/ui/core/mvc/Controller","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/suite/ui/generic/template/AnalyticalListPage/util/V4Terms",'sap/ui/model/Filter',"sap/suite/ui/generic/template/AnalyticalListPage/controller/DropDownController","sap/suite/ui/generic/template/AnalyticalListPage/controller/DatePickerController","sap/m/OverflowToolbarButton","sap/ui/model/json/JSONModel","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/ui/core/CustomData","sap/ui/Device","sap/m/library","sap/ui/core/library","sap/ui/model/FilterOperator","sap/m/DatePicker","sap/base/Log","sap/ui/core/InvisibleText","sap/base/util/deepEqual","sap/suite/ui/generic/template/js/StableIdHelper","sap/base/util/extend","sap/base/util/deepExtend"],function(B,L,D,a,S,T,b,c,V,H,C,d,f,g,h,j,k,P,l,G,m,F,n,o,p,q,r,s,O,J,t,u,v,w,x,y,z,A,E,I,K,M,N,Q){"use strict";var R=x.ListSeparators;var U="_BASIC";var W="100%";var X=0.33;var Y=0.5;var Z=m.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController",{init:function(e){E.setLevel(E.Level.WARNING,"VisualFilter");this.oState=e;this.oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");this.bIsTimeBasedLine;this.bSortOrder;},_createForm:function(){this._searchTriggered=false;this._restoreTriggered=false;var e=new J();var i=this.oState.alr_visualFilterBar.getModel('_visualFilterConfigModel');this._initialFilters=this.oState.alr_visualFilterBar.getModel("_filter").getJSON();this.oConfig=JSON.parse(i.getJSON());e.setData(this.oConfig);this.filterCompList=[];this.filterChartList=[];this._buildFiltersFromConfig(true);var _=new J();_.setData(JSON.parse(this._initialFilters));this.oVerticalBox=new V();this.oVerticalBox.setModel(this.oState.oController.getView().getModel("_templPriv"),"_templPriv");this.oVerticalBox.setModel(this.oState.oController.getView().getModel());this.oVerticalBox.setModel(this.oState.oController.getView().getModel("i18n"),"i18n");this.oVerticalBox.setModel(_,"_dialogFilter");this.oVerticalBox.setModel(e,'_visualFilterDialogModel');this._addFilterSwitch();this._addGroupsAndFilters();return this.oVerticalBox;},_toggle:function(){var e=this.oState.oSmartFilterbar.getFilterDialogContent();if(e&&(e.length===2)){if(e[0].getVisible()){e[0].setVisible(false);e[1].setVisible(true);e[1].getItems()[0].getContent()[1].addCustomData(new v({key:'isToggle',value:true}));if(this.oState.alr_visualFilterBar.getLazyLoadVisualFilter()){this.oState.alr_visualFilterBar.updateVisualFilterBindings.apply(this,[true,true]);}}else{e[0].setVisible(true);e[1].setVisible(false);e[0].getToolbar().getContent()[1].addCustomData(new v({key:'isToggle',value:true}));}}},_addFilterSwitch:function(){var e=[new o({icon:"sap-icon://filter-fields",width:"inherit",key:"compact",tooltip:"{i18n>FILTER_COMPACT}"}),new o({icon:"sap-icon://filter-analytics",width:"inherit",key:"visual",tooltip:"{i18n>FILTER_VISUAL}"})];var i=new n({width:"inherit",selectedKey:"visual",items:e}).addEventDelegate({onAfterRendering:function(_){if(_.srcControl.getCustomData()[0]&&_.srcControl.getCustomData()[0].getValue()){_.srcControl.focus();_.srcControl.removeAllCustomData();}}});i.attachSelect(function(_){var a1=_.getSource();a1.setSelectedKey("visual");this._toggle();}.bind(this));var $=new t({design:x.ToolbarDesign.Transparent,content:[new b(),i]}).addStyleClass("sapSmartTemplatesAnalyticalListPageFilterDialogToolbar");this.oVerticalBox.addItem($);},_searchDialog:function(){this._searchTriggered=true;if(this.bSearchPendingAfterDialogFilterChange){this.bSearchPendingAfterDialogFilterChange=false;this.oState.oSmartFilterbar.search();}},_updateFilterBarFromDialog:function(){var e=this.oState.alr_visualFilterBar.getModel('_filter'),i=this.oVerticalBox.getModel('_dialogFilter'),$=K(e.getJSON(),i.getJSON());if(!$){e.setData(JSON.parse(i.getJSON()));}var _=this.oState.alr_visualFilterBar.getModel('_visualFilterConfigModel'),a1=this._getDialogConfigModel(),b1=K(_.getJSON(),a1.getJSON());if(!b1){_.setData(JSON.parse(a1.getJSON()));this.oState.alr_visualFilterBar.updateVisualFilterBindings(true);}if(this.oState.alr_visualFilterBar.getLazyLoadVisualFilter()){this.oState.alr_visualFilterBar.updateVisualFilterBindings(true);}},_closeDialog:function(){if(this._searchTriggered){this._updateFilterBarFromDialog();if(this._restoreTriggered){this._restoreTriggered=false;this.oState.filterBarController._afterSFBVariantLoad();}}this.oVerticalBox.destroyItems();},_restoreDialog:function(){var e=this.oState.alr_visualFilterBar._oCurrentVariant.config;if(e){this.oConfig.filterCompList.forEach(function(i){if(e[i.component.properties.parentProperty]){Q(i,e[i.component.properties.parentProperty]);}});}else{this.oConfig=this.oState.alr_visualFilterBar._getStandardVariantConfig();}this._getDialogConfigModel().setData(this.oConfig);this._reloadForm();this._restoreTriggered=true;this.bSearchPendingAfterDialogFilterChange=false;},_cancelDialog:function(){if(this.bSearchPendingAfterDialogFilterChange){this.bSearchPendingAfterDialogFilterChange=false;}},_buildFiltersFromConfig:function(e){var i;this.filterCompList=[];this.filterChartList=[];for(i=0;i<this.oConfig.filterCompList.length;i++){var $=this.oConfig.filterCompList[i].component.properties.sortOrder;if($.constructor===Object&&$.value){this.oConfig.filterCompList[i].component.properties.sortOrder=$.value;}this.filterCompList.push({obj:{shownInFilterBar:this.oConfig.filterCompList[i].shownInFilterBar,shownInFilterDialog:this.oConfig.filterCompList[i].shownInFilterDialog,cellHeight:this.oConfig.filterCompList[i].cellHeight,component:{type:this.oConfig.filterCompList[i].component.type,cellHeight:this.oConfig.filterCompList[i].component.cellHeight},group:{label:this.oConfig.filterCompList[i].group.label,name:this.oConfig.filterCompList[i].group.name}},searchVisible:e===true||this.oConfig.filterCompList[i].searchVisible===undefined||this.oConfig.filterCompList[i].searchVisible});}},_rebuildConfig:function(){var i;var e={filterCompList:[]};for(i=0;i<this.filterCompList.length;i++){e.filterCompList.push({shownInFilterBar:this.filterCompList[i].obj.shownInFilterBar&&this.filterCompList[i].obj.shownInFilterDialog,shownInFilterDialog:this.filterCompList[i].obj.shownInFilterDialog,cellHeight:this.filterCompList[i].obj.cellHeight,group:{label:this.filterCompList[i].obj.group.label,name:this.filterCompList[i].obj.group.name},component:{type:this.filterCompList[i].obj.component.type,cellHeight:this.filterCompList[i].obj.component.cellHeight,properties:{scaleFactor:this.filterChartList[i].getScaleFactor(),numberOfFractionalDigits:this.filterChartList[i].getNumberOfFractionalDigits(),sortOrder:this.filterChartList[i].getSortOrder(),filterRestriction:this.oConfig.filterCompList[i].component.properties.filterRestriction,entitySet:this.filterChartList[i].getEntitySet(),isDropDown:this.oConfig.filterCompList[i].component.properties.isDropDown,width:this.oConfig.filterCompList[i].component.properties.width,height:this.oConfig.filterCompList[i].component.properties.height,dimensionField:this.filterChartList[i].getDimensionField(),dimensionFieldDisplay:this.filterChartList[i].getDimensionFieldDisplay(),dimensionFieldIsDateTime:this.filterChartList[i].getDimensionFieldIsDateTime(),dimensionFilter:this.filterChartList[i].getDimensionFilter(),unitField:this.filterChartList[i].getUnitField(),isCurrency:this.filterChartList[i].getIsCurrency(),isMandatory:this.oConfig.filterCompList[i].component.properties.isMandatory,measureField:this.filterChartList[i].getMeasureField(),outParameter:this.oConfig.filterCompList[i].component.properties.outParameter,inParameters:this.oConfig.filterCompList[i].component.properties.inParameters,parentProperty:this.oConfig.filterCompList[i].component.properties.parentProperty,chartQualifier:this.oConfig.filterCompList[i].component.properties.chartQualifier}}});}return e;},_reloadForm:function(){this.oVerticalBox.destroyItems();this._buildFiltersFromConfig();this._addFilterSwitch();this._addGroupsAndFilters();},_addGroupsAndFilters:function(){var i;var e;var $;var _=[];var a1=0;for(i=0;i<this.filterCompList.length;i++){if(!Array.isArray(this.filterCompList[i])){if(this.filterCompList[i].searchVisible===false){continue;}if(!(_.indexOf(this.filterCompList[i].obj.group.name)>-1)){if($){this.oVerticalBox.addItem($);}e=this.filterCompList[i].obj.group.name;_.push(e);$=new f({showSeparators:"None",showNoData:false});$.setWidth("100%");$.setLayoutData(new G({span:"L12 M12 S12"}));$.addStyleClass("sapUiSmallMarginTop");a1++;this._addGroupToolbar($,this.filterCompList[i].obj.group.label,this.filterCompList[i].obj.group.name);}if(this.filterCompList[i].obj.shownInFilterDialog){this.filterCompList[i].toolbar=this._addChartCustomToolbar(this.oConfig.filterCompList[i],i);this.filterCompList[i].overlay=this._addChartOverlay(this.oConfig.filterCompList[i],i);var b1=this,c1=new V(),d1=this.oConfig.filterCompList[i].component.properties.parentProperty;c1.setModel(this._getDialogConfigModel(),'_visualFilterDialogModel');c1.bindAggregation('items',{path:"_visualFilterDialogModel>/filterCompList",factory:function(e1,k1){var l1=k1.getProperty('component/type'),m1=k1.getProperty('component/properties'),n1=k1.getPath().split("/")[2];this.filterChartList[n1]=this._addChart(l1,m1,n1);return this.filterChartList[n1];}.bind(this),filters:new q("component/properties/parentProperty",z.EQ,d1)});var e1="visualFilterDialogInvisibleText"+this.filterChartList[i].getParentProperty();var f1=new I({id:e1});var g1=this.filterChartList[i].getParentProperty().replace(/[^\w]/gi,'')+"checkBox";var h1=[new V({items:[b1.filterCompList[i].toolbar,b1.filterCompList[i].overlay,c1,f1]}).setWidth("100%").addStyleClass("sapUiSmallMarginEnd")];if(w.system.desktop){h1[0].setWidth("80%");h1.splice(1,0,new V({items:[new L({text:"{i18n>SHOW_ON_FILTER_BAR}",labelFor:g1,wrapping:true}).addStyleClass("sapUiTinyMarginTop"),new C({id:g1,text:"",selected:b1.oConfig.filterCompList[i].shownInFilterBar}).data("idx",i).attachSelect(null,b1._onCheckBoxSelect,b1)]}).setAlignItems("Center"));h1[1].setWidth("20%");}var i1=new H({items:h1}).addStyleClass("sapUiSmallMarginTop").setWidth("100%");F._updateVisualFilterAria(i1.getItems()[0]);var j1=new g({id:M.getStableId({type:"VisualFilterDialog",subType:"FilterItemContainer",sProperty:b1.filterChartList[i].getParentProperty()}),content:i1});j1.attachBrowserEvent("keyup",F.onKeyUpVisualFilter.bind(F));j1.attachBrowserEvent("keydown",F.onKeyDownVisualFilter.bind(F,this.oState.oSmartFilterbar));$.addItem(j1);}}if($){this.oVerticalBox.addItem($);}}if(a1==1&&e===U){F.executeFunction($,"mAggregations.headerToolbar.setVisible",[false]);}},_onCheckBoxSelect:function(e){var i=e.getSource().data("idx");this.selectCheckBox(i,e.getSource().getSelected());},_addGroupToolbar:function(e,i,$){var _=new c({text:i}).addStyleClass("sapSmartTemplatesAnalyticalListPageVFDialogGroupTitle");var a1=new T({content:[_,new b()]});if($!=U){a1.addContent(this._createMoreFiltersLink($,_));}e.setHeaderToolbar(a1);},selectCheckBox:function(i,e){var $=this._getDialogConfigModel();var _=Q({},$);_.setProperty('/filterCompList/'+i+'/shownInFilterBar',e);$.setData(_.getData());this.oConfig=$.getData();this.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);},_addChartOverlay:function(e,i){var $=new V({width:"100%",height:e.component.properties.height,items:[new L({text:{path:'_visualFilterDialogModel>/filterCompList/'+i+'/overlayMessage',formatter:function(_){return this.getModel("i18n").getResourceBundle().getText(_);}},wrapping:true,textAlign:y.TextAlign.Center})],visible:{path:'_visualFilterDialogModel>/filterCompList/'+i+'/showChartOverlay',formatter:function(_){return _;}}});$.addStyleClass("sapUiOverlay");$.addStyleClass("sapSmartTemplatesAnalyticalListPageVFOverflow");return $;},_formatTitle:function(e,i){var $=this.oVerticalBox.getModel("i18n").getResourceBundle();var _=e.titleMD;var a1=e.titleUnitCurr;if(i==="tooltipMD"){return a1==""?_:$.getText("VIS_FILTER_TITLE_MD_WITH_UNIT_CURR",[_,a1]);}else if(i==="titleUnitCurr"){return a1.length>0?"| "+a1:"";}},_addChartCustomToolbar:function(e,i){var $=this;var _=this.oState.oController.getView().getModel("@i18n");var a1=e.component.properties.parentProperty,b1=e.component.properties,c1=F.getPropertyNameDisplay(this.oState.alr_visualFilterBar.getModel(),e.component.properties.entitySet,e.component.properties.dimensionField,_),d1=a1.replace(/[^\w]/gi,''),e1=this.oState.alr_visualFilterBar._oMetadataAnalyser.getEntityTypeNameFromEntitySetName(e.component.properties.entitySet),f1=e.component.properties.sortOrder[0].Descending.Boolean,g1=F.readProperty(e,"component.type")==="Line"&&F.readProperty(e,"component.properties.dimensionFieldIsDateTime"),h1=this.oState.alr_visualFilterBar._resolveChartType(e.component.type),i1=this._getChartTypeIconLink(h1),rb=this.oVerticalBox.getModel("i18n").getResourceBundle(),k1=$._getChartTitle(e,i),l1=new c({text:k1.titleMD,tooltip:this._formatTitle(k1,"tooltipMD"),titleStyle:y.TitleLevel.H6}),m1=new c({text:this._formatTitle(k1,"titleUnitCurr"),tooltip:"",titleStyle:y.TitleLevel.H6});if(this.oConfig.filterCompList[i].component.properties.isMandatory){l1.addStyleClass("sapMLabelRequired");}var n1=function(){var j1=this.oConfig.filterCompList[i].component.properties.entitySet,z1=this._getVisibleMeasureList(j1),A1=Object.keys(z1).length>1;if(!A1){E.warning("Change measure button has been disabled in the dialog as only one visible measure exists in the collection "+j1,"","VisualFilter");}return A1;};var o1=this.oState.oSmartFilterbar.getControlByKey(e.component.properties.parentProperty);this.oState.oSmartFilterbar.ensureLoadedValueHelp(e.component.properties.parentProperty);var p1=o1.getShowValueHelp&&o1.getShowValueHelp()&&!b1.dimensionFieldIsDateTimeOffset,q1=o1 instanceof A,r1=o1.getMetadata().getName()==="sap.m.DateTimePicker",s1=(q1&&!r1)?"sap-icon://appointment-2":"",t1=(b1.isDropDown)?"sap-icon://slim-arrow-down":"",u1=p1?"sap-icon://value-help":s1||t1,v1=this.oState.alr_visualFilterBar.getView().sId+"--"+M.getStableId({type:"VisualFilterDialog",subType:"ValueHelpButton",sProperty:b1.parentProperty}),w1,x1=[new B({type:"Transparent",icon:"sap-icon://line-chart-time-axis",visible:false,press:function(j1){$._showLineChartTimeAxisPopup(j1);}}).data("idx",i),new B({id:v1,type:"Transparent",icon:(p1||b1.isDropDown||q1)?u1:"",customData:[new v({key:'isF4Enabled',value:(p1||b1.isDropDown||q1)?true:false})],visible:{path:"_dialogFilter>/"+a1,formatter:function(j1){if(p1||b1.isDropDown||(q1&&!r1)){return true;}else{if(!j1){return false;}if(typeof j1==="object"){if(j1 instanceof Date){return true;}return(j1.value||(j1.items&&j1.items.length)||(j1.ranges&&j1.ranges.length))?true:false;}return true;}}},text:{path:"_dialogFilter>/"+a1,formatter:function(j1){var z1=$.filterChartList[i];var A1=z1.getFilterRestriction();w1=0;if(j1){if(A1==='single'){w1=1;}else{if(typeof j1==="object"){if(j1.value){w1++;}if(j1.items){w1+=j1.items.length;}if(j1.ranges){w1+=j1.ranges.length;}}else{w1++;}}}return w1?"("+w1+")":"";}},enabled:{path:'_visualFilterDialogModel>/filterCompList/'+i+'/showChartOverlay',formatter:function(j1){return!j1;}},press:function(j1){if(p1){o1.fireValueHelpRequest.call(o1);}else if(b1.isDropDown){var z1=$.oState.alr_visualFilterBar._isDimensionFieldFilterable(this.getModel(),b1.entitySet,b1.dimensionField),A1=this.getModel("visualFilter")||this.getModel();r.createDropdown(j1.getSource(),$.filterChartList[j1.getSource().data("idx")],A1,c1,b1,z1);}else if(q1&&!r1){s._createDatePicker(j1.getSource(),$.filterChartList[j1.getSource().data("idx")]);}else{sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController.launchAllFiltersPopup(j1.getSource(),$.filterChartList[j1.getSource().data("idx")],j1.getSource().getModel('i18n'));}},tooltip:{path:"_dialogFilter>/"+a1,formatter:function(){return F.getTooltipForValueHelp(p1,c1,rb,w1,q1);}},layoutData:new u({priority:x.OverflowToolbarPriority.NeverOverflow})}).data("idx",i),new O({type:"Transparent",icon:(f1?"sap-icon://sort-descending":"sap-icon://sort-ascending"),visible:!g1,tooltip:"{i18n>VISUAL_FILTER_SORT_ORDER}",text:"{i18n>VISUAL_FILTER_SORT_ORDER}",press:function(j1){$._showChartSortPopup(j1);},layoutData:new u({closeOverflowOnInteraction:false,priority:(!w.system.desktop)?x.OverflowToolbarPriority.AlwaysOverflow:x.OverflowToolbarPriority.High})}).data("idx",i),new O({type:"Transparent",icon:i1,tooltip:"{i18n>VISUAL_FILTER_CHART_TYPE}",text:"{i18n>VISUAL_FILTER_CHART_TYPE}",press:function(j1){$._showChartTypesPopup(j1);},layoutData:new u({closeOverflowOnInteraction:false,priority:(!w.system.desktop)?x.OverflowToolbarPriority.AlwaysOverflow:x.OverflowToolbarPriority.High})}).data("idx",i),new O({id:"template::VisualFilterDialog::MeasureChangeButton::"+e1+"::"+d1,type:"Transparent",icon:"sap-icon://measure",tooltip:"{i18n>VISUAL_FILTER_MEASURE}",text:"{i18n>VISUAL_FILTER_MEASURE}",enabled:n1.apply($),press:function(j1){$._showChartMeasuresPopup(j1);},layoutData:new u({closeOverflowOnInteraction:false,priority:(!w.system.desktop)?x.OverflowToolbarPriority.AlwaysOverflow:x.OverflowToolbarPriority.High})}).data("idx",i)];if((w.system.tablet||w.system.phone)&&!w.system.desktop){x1.splice(2,0,new C({tooltip:"{i18n>SHOW_ON_FILTER_BAR}",text:"{i18n>SHOW_ON_FILTER_BAR}",selected:$.oConfig.filterCompList[i].shownInFilterBar,layoutData:new u({closeOverflowOnInteraction:false,priority:x.OverflowToolbarPriority.AlwaysOverflow})}).data("idx",i).attachSelect(null,$._onCheckBoxSelect,$));x1[2].addStyleClass("sapSmartTemplatesAnalyticalListPageVFDShowInFilterBarCozy");}var y1=new t({design:x.ToolbarDesign.Transparent,content:[l1,m1,new b(),x1]}).addStyleClass("sapSmartTemplatesAnalyticalListPageFilterDialogTitleToolbar");y1.getContent()[0].addStyleClass("sapUiTinyMarginTop");y1.getContent()[0].addStyleClass("sapSmartTemplatesAnalyticalListPageVFDialogChartTitle");y1.getContent()[1].addStyleClass("sapUiTinyMarginTop");y1.setWidth("100%");return y1;},_addChart:function($,_,a1){var b1;var c1=this;var d1=_.selectFilters&&_.selectFilters.SelectOptions;var e1={selectFilters:_.selectFilters,scaleFactor:_.scaleFactor,numberOfFractionalDigits:_.numberOfFractionalDigits,sortOrder:_.sortOrder,filterRestriction:_.filterRestriction,isDropDown:_.isDropDown,width:W,height:_.height,labelWidthPercent:X,entitySet:_.entitySet,dimensionField:_.dimensionField,dimensionFieldDisplay:_.dimensionFieldDisplay,dimensionFieldIsDateTime:_.dimensionFieldIsDateTime,dimensionFieldIsDateTimeOffset:_.dimensionFieldIsDateTimeOffset,unitField:_.unitField,isCurrency:_.isCurrency,isMandatory:_.isMandatory,measureField:_.measureField,dimensionFilter:_.dimensionFilter,outParameter:_.outParameter,inParameters:_.inParameters,parentProperty:_.parentProperty,textArrangement:_.textArrangement,chartQualifier:_.chartQualifier,lazyLoadVisualFilter:this.oState.alr_visualFilterBar.getLazyLoadVisualFilter()};var f1="/filterCompList/"+a1;if($==="Donut"){e1.labelWidthPercent=Y;}$=this.oState.alr_visualFilterBar._resolveChartType($);var b1=this.oState.alr_visualFilterBar._createFilterItemOfType($,e1,false);b1.data("isDialogFilterItem","true");b1.setModel(this.oVerticalBox.getModel('_dialogFilter'),'_dialogFilter');b1.setModel(this._getDialogConfigModel(),'_visualFilterDialogModel');b1.data("idx",a1);b1.addCustomData(new v({key:'sPath',value:f1}));if(e1.dimensionFieldIsDateTime){b1.addCustomData(new v({key:'stringdate',value:_.stringdate}));}b1.bindProperty('visible',{path:'_visualFilterDialogModel>/filterCompList/'+a1+'/showChartOverlay',formatter:function(e){return!e;}});b1.bindProperty('dimensionFilter',{path:'_dialogFilter>/'+b1.getParentProperty()});var g1=b1.getInParameters(),h1=[];if(g1&&g1.length>0){g1.forEach(function(e){h1.push({path:"_dialogFilter>/"+e.localDataProperty});});}if(c1.oState.alr_visualFilterBar.getEntitySet()===b1.getEntitySet()){var i1=c1.oState.alr_visualFilterBar._smartFilterContext.determineMandatoryFilterItems();if(i1&&i1.length>0){i1.forEach(function(e){if(!e.data("isCustomField")){h1.push({path:'_dialogFilter>/'+e.getName()});}});}}if(h1&&h1.length>0){b1.bindProperty('dimensionFilterExternal',{parts:h1,formatter:function(){var g1=this.getInParameters()||[],l1=this.getParentProperty();var m1,n1;if(c1.oState.alr_visualFilterBar.getEntitySet()===this.getEntitySet()){var i1=c1.oState.alr_visualFilterBar._smartFilterContext.determineMandatoryFilterItems();i1.forEach(function(C1){var D1=C1.getName();var E1=g1&&g1.some(function(e){return e.localDataProperty===D1;});if(D1.indexOf("$Parameter")===-1&&!E1){g1.push({localDataProperty:D1,valueListProperty:D1});}});}if(!(c1.oState.alr_visualFilterBar.getEntitySet()===this.getEntitySet()&&c1.oState.alr_visualFilterBar._smartFilterContext.getAnalyticBindingPath()!=="")&&(c1.oState.alr_visualFilterBar._smartFilterContext.getAnalyticBindingPath()===""||c1.oState.alr_visualFilterBar._smartFilterContext.getAnalyticBindingPath().indexOf("P_DisplayCurrency")!=-1)){var o1=this.getMeasureField();var p1=c1.oState.alr_visualFilterBar.getModel();var q1=p1.getMetaModel();var r1=q1.getODataEntityType(c1.oState.alr_visualFilterBar._oMetadataAnalyser.getEntityTypeNameFromEntitySetName(this.getEntitySet()));var s1=q1.getODataEntitySet(this.getEntitySet());var t1=q1.getODataProperty(r1,o1);var u1=c1.oState.alr_visualFilterBar.getProperty("displayCurrency");var v1=t1&&t1[p.ISOCurrency];if(u1&&v1){var w1=v1.Path;for(var x1=(g1.length-1);x1>-1;x1--){var y1=g1[x1].valueListProperty;var z1=g1[x1].localDataProperty;if(y1===w1){var A1=c1.oState.alr_visualFilterBar._smartFilterContext.getFilterData();if(!A1[z1]){n1=q1.getODataProperty(r1,w1);var B1=n1&&F.isPropertyNonFilterable(s1,n1.name);if(!B1){m1=new q({aFilters:[new q({path:w1,operator:"EQ",value1:u1,value2:undefined})],and:false});}}break;}}}}if(this._chart instanceof sap.suite.ui.microchart.InteractiveDonutChart){this._inParameterFilterList=new q({aFilters:[],bAnd:true});}return c1.oState.alr_visualFilterBar._getFiltersForFilterItem(g1,l1,m1,w1,d1,this._inParameterFilterList);}});}else if(d1&&d1.length>0){var j1=new q({aFilters:[],bAnd:true});for(var i in d1){var k1=d1[i];j1=this.oState.alr_visualFilterBar.fnAddSelectOptionsToFilters(k1,j1);}b1.setProperty('dimensionFilterExternal',j1);}b1.attachBeforeRebindVisualFilter(function(e){var l1=e.getParameters();var m1=l1.sEntityType;var n1=l1.sDimension;var o1=l1.sMeasure;var p1=l1.oContext;var q1=c1.oState.oController;q1.onBeforeRebindVisualFilterExtension(m1,n1,o1,p1);});b1._updateBinding();b1._bAllowBindingUpdateOnPropertyChange=true;b1.attachFilterChange(function(e){c1.oState.alr_visualFilterBar.fireFilterChange();});b1.attachTitleChange(function(e){var a1=e.getSource().data("idx");if(c1.filterCompList[a1].toolbar.getContent().length>0){if(e1.isMandatory){c1.filterCompList[a1].toolbar.getContent()[0].addStyleClass("sapMLabelRequired");}var l1=c1.filterCompList[a1].toolbar.getContent()[0];var m1=c1.filterCompList[a1].toolbar.getContent()[1];var n1=c1._getChartTitle(c1.filterCompList[a1].obj,a1);l1.setText(n1.titleMD);var o1=c1._formatTitle(n1,"tooltipMD");l1.setTooltip(o1);m1.setText(c1._formatTitle(n1,"titleUnitCurr"));var p1=n1.titleUnitCurr.split(" ");if(n1.titleUnitCurr==""){m1.setVisible(false);}else{m1.setVisible(true);var q1=p1.length>1?"4.15rem":"2.4rem";m1.setWidth(q1);}}if(c1.filterChartList[a1].data("needsToUpdateAria")==="true"){F._updateVisualFilterAria(c1.filterChartList[a1].getParent().getParent());}});return b1;},_createMoreFiltersLink:function(e,$){var _=this;var a1=0;var i;var b1=new d();for(i=0;i<this.filterCompList.length;i++){if(this.filterCompList[i].searchVisible&&this.filterCompList[i].obj.group.name===e&&!this.filterCompList[i].obj.shownInFilterDialog){a1++;}}if(a1>0){b1.setText(this.oRb.getText("FILTER_BAR_SHOW_MORE_FILTERS",[a1]));}else{b1.setText(this.oRb.getText("FILTER_BAR_SHOW_CHANGE_FILTERS"));}b1.attachPress(function(c1){_._createAddRemoveFiltersDialog(e,b1);});if($){b1.addAriaLabelledBy($);}return b1;},_showChartMeasuresPopup:function(e){var i=this;var $=e.getSource().data("idx");var _=this.filterChartList[$].getProperty("entitySet");var a1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(e.getSource().getModel('i18n'),"VISUAL_FILTER_MEASURES");var b1=e.getSource().getModel("@i18n");if(b1){a1.setModel(b1,"@i18n");}var c1=new f({mode:x.ListMode.SingleSelectLeft,includeItemInSelection:true});c1.data("idx",$);a1.addContent(c1);var d1=this._getVisibleMeasureList(_);c1.addStyleClass("sapUiSizeCompact");if(d1){for(var e1 in d1){var f1=new k({title:d1[e1].label?d1[e1].label:d1[e1].name,tooltip:(d1[e1].fieldInfo&&d1[e1].fieldInfo.quickInfo)||d1[e1].label||d1[e1].name}).data("measureName",d1[e1].name);c1.addItem(f1);if(this.filterChartList[$].getMeasureField()===d1[e1].name){c1.setSelectedItem(f1);}}}c1.attachSelectionChange(function(e){var $=e.getSource().data("idx"),g1=e.getSource().getSelectedItem().data("measureName");i.filterChartList[$].setProperty("unitField",d1[g1].fieldInfo.unit);var h1=i.filterCompList[$].toolbar.getContent()[0];var i1=i.filterCompList[$].toolbar.getContent()[1];var j1=i._getChartTitle(i.filterCompList[$].obj,$);h1.setText(j1.titleMD);i1.setText(i._formatTitle(j1,"titleUnitCurr"));i.oConfig.filterCompList[$].component.properties.measureField=g1;if(!i.filterChartList[$]._chart.getPoints){var k1=Q([],i.filterChartList[$].getSortOrder());k1[0].Field.String=g1;i.filterChartList[$].setSortOrder(k1);i._updateVisualFilterConfigModel($,'/component/properties/sortOrder',k1);}var l1={bUpdateBinding:true,value:g1};i.filterChartList[$].setMeasureField(l1);i._updateVisualFilterConfigModel($,'/component/properties/measureField',l1);i._updateVisualFilterConfigModel($,'/component/properties/measureField',g1);i._updateVisualFilterConfigModel($,'/component/properties/unitField',d1[g1].fieldInfo.unit);if(a1){a1.close();}});a1.attachAfterClose(function(){a1.destroy();a1=null;});a1.openBy(e.getSource());},_showChartTypesPopup:function(e){var $=this,_=e.getSource(),a1=_.getModel('i18n'),b1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(a1,"VISUAL_FILTER_CHART_TYPES"),c1=this.oState.alr_visualFilterBar._getSupportedFilterItemList(),d1=[];for(var i=0;i<c1.length;i++){var e1=c1[i];var f1=new k({title:"{i18n>"+e1.textKey+"}",icon:e1.iconLink,selected:_.getIcon()===e1.iconLink}).data("type",e1.type);d1.push(f1);}var g1=new f({mode:x.ListMode.SingleSelectMaster,items:d1});g1.data("button",_);g1.addStyleClass("sapUiSizeCompact");g1.setModel(a1,"i18n");b1.addContent(g1);g1.attachSelectionChange(function(e){var h1=e.getSource().data("button").data("idx"),i1=e.getSource().getSelectedItem().data("type"),j1=$.filterChartList[h1],k1=j1.getDimensionField(),l1=j1.getMeasureField(),m1=j1.getDimensionFieldIsDateTime(),n1=F.readProperty($.oConfig,"filterCompList."+h1+".component.properties.sortOrder.0.Field.String"),o1=$._getDialogConfigModel(),p1=o1.getProperty('/filterCompList/'),q1=Q({},p1[h1]),r1=F.readProperty(q1,"component.properties.sortOrder.0.Field.String");e.getSource().data("button").setIcon($._getChartTypeIconLink(i1));if(n1&&r1){if(i1==="Line"){$.oConfig.filterCompList[h1].component.properties.sortOrder[0].Field.String=k1;q1.component.properties.sortOrder[0].Field.String=k1;if(m1){$.bSortOrder=$.oConfig.filterCompList[h1].component.properties.sortOrder[0].Descending.Boolean;$.oConfig.filterCompList[h1].component.properties.sortOrder[0].Descending.Boolean=true;q1.component.properties.sortOrder[0].Descending.Boolean=true;$.bIsTimeBasedLine=true;}}else{$.oConfig.filterCompList[h1].component.properties.sortOrder[0].Field.String=l1;q1.component.properties.sortOrder[0].Field.String=l1;if($.bIsTimeBasedLine){$.oConfig.filterCompList[h1].component.properties.sortOrder[0].Descending.Boolean=$.bSortOrder;q1.component.properties.sortOrder[0].Descending.Boolean=$.bSortOrder;$.bIsTimeBasedLine=false;}}}q1.component.type=i1;o1.setProperty('/filterCompList/'+h1,q1);$.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);$.oState.alr_visualFilterBar.updateVisualFilterBindings.apply($,[true,true]);if(b1){b1.close();}});b1.attachAfterClose(function(){b1.destroy();b1=null;});b1.openBy(e.getSource());},_showLineChartTimeAxisPopup:function(e){var i=e.getSource().data("idx");var $=e.getSource();var _=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(e.getSource().getModel('i18n'),"VISUAL_FILTER_LINE_CHART_TIME_LINE");var a1=new f({mode:x.ListMode.SingleSelectLeft,items:[new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_DAYS}"}).data("idx",i),new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_MONTH}"}).data("idx",i),new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_QUARTERS}"}).data("idx",i),new k({title:"{i18n>VISUAL_FILTER_LINE_CHART_TIME_LINE_YEARS}"}).data("idx",i)]});a1.data("button",$);a1.addStyleClass("sapUiSizeCompact");_.addContent(a1);a1.attachSelectionChange(function(e){_.close();});_.attachAfterClose(function(){_.destroy();_=null;});_.openBy(e.getSource());},_showChartSortPopup:function(e){var i=this;var $=e.getSource().data("idx");var _=e.getSource();var a1=e.getSource().getModel('i18n');var b1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog(a1,"VISUAL_FILTER_SORTING");var c1=new f({mode:x.ListMode.SingleSelectLeft,includeItemInSelection:true,items:[new k({title:a1.getResourceBundle().getText("VISUAL_FILTER_SORTING_ASCENDING")}).data("idx",$),new k({title:a1.getResourceBundle().getText("VISUAL_FILTER_SORTING_DESCENDING")}).data("idx",$)]});c1.data("button",_);c1.addStyleClass("sapUiSizeCompact");if(this.filterChartList[$].getSortOrder()[0].Descending.Boolean){c1.setSelectedItem(c1.getItems()[1],true);}else{c1.setSelectedItem(c1.getItems()[0],true);}b1.addContent(c1);c1.attachSelectionChange(function(e){var _=e.getSource().data("button");var $=_.data("idx");var d1=Q([],i.filterChartList[$].getSortOrder());d1[0].Descending.Boolean=e.getSource().getItems()[1].isSelected();if(d1[0].Descending.Boolean){_.setIcon("sap-icon://sort-descending");}else{_.setIcon("sap-icon://sort-ascending");}var e1={bUpdateBinding:true,value:d1};i.filterChartList[$].setSortOrder(e1);i._updateVisualFilterConfigModel($,'/component/properties/sortOrder',e1);i._updateVisualFilterConfigModel($,'/component/properties/sortOrder',d1);if(b1){b1.close();}});b1.attachAfterClose(function(){b1.destroy();b1=null;});b1.openBy(e.getSource());},_createAddRemoveFiltersDialog:function(e,$){var i;var _=this;var a1=new D();a1.setTitle(this.oRb.getText("SELECT_FILTER_FIELDS"));a1.addStyleClass("sapUiPopupWithPadding");a1.addStyleClass("sapUiCompAddRemoveFilterDialog");a1.addStyleClass("sapUiSizeCompact");a1.setVerticalScrolling(true);var b1=new a();var c1=new S({placeholder:this.oRb.getText("FILTER_BAR_SEARCH")});this._oSearchField=c1;c1.attachLiveChange(function(h1){_._onAddRemoveFiltersSearch(h1);});b1.addContentRight(c1);a1.setSubHeader(b1);this.addRemoveList=new f({mode:x.ListMode.MultiSelect});this.addRemoveList.setShowSeparators(R.None);a1.addContent(this.addRemoveList);for(i=0;i<this.filterCompList.length;i++){if(this.filterCompList[i].obj.group.name===e&&this.filterCompList[i].searchVisible){var d1=this._getChartTitle(this.filterCompList[i].obj,i,true);var e1=new k({title:d1.titleMD}).data("idx",i);this.addRemoveList.addItem(e1);if(this.filterCompList[i].obj.shownInFilterDialog){this.addRemoveList.setSelectedItem(e1,true);}}}this.addRemoveList.attachSelectionChange(function(h1){if(h1){var i1=h1.getParameters();if(i1){var e1=i1.listItem;var j1=e1.data("idx");if(e1){var k1={bVisible:i1.selected,propertyName:_.oConfig.filterCompList[j1].component.properties.parentProperty};_.oState.alr_visualFilterBar.fireFilterChange(k1);}}}});var f1=new B({text:this.oRb.getText("FORM_PERS_DIALOG_OK")});f1.attachPress(function(){var i;var h1=_.addRemoveList.getItems();var i1=_._getDialogConfigModel(),j1=Q({},i1);for(i=0;i<h1.length;i++){var k1=h1[i].data("idx");var l1=h1[i].isSelected();j1.setProperty('/filterCompList/'+k1+'/shownInFilterBar',l1);j1.setProperty('/filterCompList/'+k1+'/shownInFilterDialog',l1);}i1.setData(j1.getData());_.oConfig=JSON.parse(i1.getJSON());_.oState.alr_visualFilterBar.updateVisualFilterBindings.apply(this,[true,true]);_.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);_._reloadForm();a1.close();});a1.addAggregation("buttons",f1);a1.setInitialFocus(this._oSearchField);a1.setContentHeight("23.25rem");var g1=new B({text:this.oRb.getText("FORM_PERS_DIALOG_CANCEL"),press:function(){a1.close();}});a1.addAggregation("buttons",g1);a1.attachAfterClose(function(){a1.destroy();a1=null;});a1.open();},_onAddRemoveFiltersSearch:function(e){var i;if(!e){return;}var $=e.getParameters();if(!$){return;}var _=($.newValue?$.newValue:"").toLowerCase();var a1=this.addRemoveList.getItems();for(i=0;i<a1.length;i++){var b1=(a1[i].getTitle()).toLowerCase();a1[i].setVisible(b1.indexOf(_)>=0);}},_getChartTypeIconLink:function(i){var e=this.oState.alr_visualFilterBar._getSupportedFilterItemMap();var $=e[i];return!$?"":$.iconLink;},_getChartTitle:function(e,i,$){var _=this.oState.oController.getView().getModel("@i18n");var a1="";if(this.filterChartList[i]){if($){e.component.properties=this.filterChartList[i].getP13NConfig();a1=this.oState.alr_visualFilterBar.getTitleByFilterItemConfig(e);}else{a1=this.filterChartList[i].getTitle(_);}}else{e.component.properties=this.oConfig.filterCompList[i].component.properties;a1=this.oState.alr_visualFilterBar.getTitleByFilterItemConfig(e);}return a1;},_adjustToolbarIcons:function(i){if(this.filterCompList[i].obj.component.type==="Line"){this.filterCompList[i].toolbar.getContent()[1].getItems()[1].setVisible(true);this.filterCompList[i].toolbar.getContent()[1].getItems()[2].setVisible(false);}else{this.filterCompList[i].toolbar.getContent()[1].getItems()[1].setVisible(false);this.filterCompList[i].toolbar.getContent()[1].getItems()[2].setVisible(true);}},_updateVisualFilterConfigModel:function(i,e,$,_){var a1=this._getDialogConfigModel();a1.setProperty('/filterCompList/'+i+e,$);if(_){var b1=Q({},a1.getProperty('/filterCompList/'+i));a1.setProperty('/filterCompList/'+i,b1);this.oState.alr_visualFilterBar.updateVisualFilterBindings.apply(this,[true,true]);}this.oConfig=a1.getData();this.oState.oSmartFilterbar._oVariantManagement.currentVariantSetModified(true);},_getVisibleMeasureList:function(e){var i={},$=this.oState.alr_visualFilterBar._getMeasureMap()[e];for(var _ in $){var a1=$[_];if(!(a1.fieldInfo[p.Hidden]&&a1.fieldInfo[p.Hidden].Bool==="true")){i[a1.name]=a1;}}return i;},_triggerSearchInFilterDialog:function(e){var i;if(!e){return;}var $=e.getParameters();if(!$){return;}var _=($.newValue?$.newValue:"").toLowerCase();for(i=0;i<this.oConfig.filterCompList.length;i++){var a1=this.oConfig.filterCompList[i].component.properties;var b1=this._getChartTitle(this.oConfig.filterCompList[i],i).titleMD.toLowerCase();var c1=this._getLabelForDimensionsAndMeasures(a1,a1.parentProperty),d1=this._getLabelForDimensionsAndMeasures(a1,a1.measureField),e1=(c1.indexOf(_)>=0)||(d1.indexOf(_)>=0)||(b1.indexOf(_)>=0);this.oConfig.filterCompList[i].searchVisible=e1;}this._reloadForm();},_getDialogConfigModel:function(){return this.oVerticalBox.getModel('_visualFilterDialogModel');},_getLabelForDimensionsAndMeasures:function(e,i){var $=this.oState.alr_visualFilterBar._oMetadataAnalyser,_=this.oVerticalBox.getModel().getMetaModel(),a1=$.getEntityTypeNameFromEntitySetName(e.entitySet),b1=_.getODataEntityType(a1),c1=_.getODataProperty(b1,i)[p.Label];c1=c1&&c1.String?c1.String:"";return c1;}});sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog=function(i,e){if(this._oPopoverDialog){this._oPopoverDialog.destroy();}this._oPopoverDialog=new P();this._oPopoverDialog.setTitle(i.getResourceBundle().getText(e));this._oPopoverDialog.setPlacement(sap.m.PlacementType.PreferredBottomOrFlip);this._oPopoverDialog.addStyleClass("sapUiPopupWithPadding");return this._oPopoverDialog;};sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createFilterItemSelectedList=function(e,$){var _=new f({mode:x.ListMode.Delete}),a1,b1=e.getFilterRestriction();_.data("chart",e);if(b1==='multiple'){a1=Q({},e.getDimensionFilter());var c1=(a1&&a1.items)?a1.items:undefined,d1=(a1&&a1.ranges)?a1.ranges:undefined,e1=(a1&&a1.value)?a1.value:null;a1=Q({},e.getDimensionFilter());if(c1){for(var i=0;i<c1.length;i++){var f1=new k({title:c1[i].text?c1[i].text:c1[i].key});if(f1){f1.addCustomData(new v({key:'items',value:i}));}_.addItem(f1);}}if(d1){for(var i=0;i<d1.length;i++){var f1=new k({title:d1[i].tokenText?d1[i].tokenText:F.createTitleFromCode(d1[i])});f1.addCustomData(new v({key:'ranges',value:i}));_.addItem(f1);}}if(e1){var f1=new k({title:e1});f1.addCustomData(new v({key:'value'}));_.addItem(f1);}}else{_.addItem(new k({title:e.getDimensionFilter()}));}_.attachDelete(function(g1){var h1=g1.getParameter("listItem"),i1=_.data('chart'),j1;if(b1==='single'){j1=null;}else{j1=Q({},i1.getDimensionFilter());var k1=h1.getCustomData()[0],l1=k1.getKey(),m1=j1[l1];if(l1!=='value'){var n1=k1.getValue();m1.splice(n1,1);}else{j1.value=null;}}_.removeItem(h1);i1.setDimensionFilter(j1);i1.fireFilterChange();$.removeContent(_);var o1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createFilterItemSelectedList(i1,$);if(o1.getItems().length>0){$.addContent(o1);$.focus();}else{$.close();}});return _;};sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController.launchAllFiltersPopup=function(e,i,$){var _=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createPopoverDialog($,"VISUAL_FILTER_ALL_SELECTED_FILTERS"),a1=sap.suite.ui.generic.template.AnalyticalListPage.controller.VisualFilterDialogController._createFilterItemSelectedList(i,_);_.addContent(a1);_.addStyleClass("sapUiSizeCompact");_.addStyleClass("sapSmartTemplatesAnalyticalListPageSelectedLinkDialog");var b1=new a();var c1=new B({text:$.getResourceBundle().getText("CLEAR_FILTERS_ALL"),press:function(d1){var e1=a1.data('chart'),f1=e1.getFilterRestriction(),g1;if(f1==='multiple'){g1=Q({},e1.getDimensionFilter());g1.items=[];g1.ranges=[];g1.value=null;}else{g1=null;}_.removeContent(a1);e1.setDimensionFilter(g1);e1.fireFilterChange();_.close();}});b1.addContentRight(c1);_.setFooter(b1);_.attachAfterClose(function(){_.destroy();_=null;});_.openBy(e);};return Z;});