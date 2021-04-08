sap.ui.define(["sap/ui/model/Filter","sap/suite/ui/generic/template/ListReport/extensionAPI/ExtensionAPI","sap/suite/ui/generic/template/listTemplates/listUtils","sap/suite/ui/generic/template/ListReport/controller/IappStateHandler","sap/suite/ui/generic/template/ListReport/controller/MultipleViewsHandler","sap/suite/ui/generic/template/ListReport/controller/WorklistHandler","sap/suite/ui/generic/template/lib/ShareUtils","sap/base/Log","sap/base/util/ObjectPath","sap/suite/ui/generic/template/js/StableIdHelper","sap/base/util/deepExtend","sap/suite/ui/generic/template/ListReport/controller/CreateWithDialogHandler"],function(F,E,l,I,M,W,S,L,O,a,d,C){"use strict";var m={getMethods:function(v,t,c){var s={};s.oWorklistData={bWorkListEnabled:false,bVariantDirty:true};var f;var w=null;function b(){var i=c.getOwnerComponent();var T=t.oComponentUtils.getTemplatePrivateModel();T.setProperty("/listReport/isLeaf",i.getIsLeaf());}function o(i){c.onInitSmartFilterBarExtension(i);c.templateBaseExtension.onInitSmartFilterBar(i);s.oIappStateHandler.onSmartFilterBarInitialise();}var e=true;var g;var h=new Promise(function(R){g=R;});function j(){if(!e){s.oIappStateHandler.changeIappState(true,false);}}function u(i){t.oCommonUtils.setEnabledToolbarButtons(i);if(!t.oCommonUtils.isSmartChart(i)){t.oCommonUtils.setEnabledFooterButtons(i);}}function r(i){var J;J=i.getSource();J.getChartAsync().then(function(K){K.attachSelectData(u.bind(null,J));K.attachDeselectData(u.bind(null,J));});}function k(i){var J=i.getParameters();var K=i.getSource();t.oCommonEventHandlers.onSemanticObjectLinkNavigationPressed(K,J);}function n(i){var J,K;J=i.getParameters();K=i.getSource();t.oCommonEventHandlers.onSemanticObjectLinkNavigationTargetObtained(K,J,s,undefined,undefined);}function p(i){var J,T,K,P,Q,R;J=i.getParameters().mainNavigation;Q=i.getParameters();R=i.getSource();if(J){T=R.getText&&R.getText();K=t.oCommonUtils.getCustomData(i);if(K&&K["LinkDescr"]){P=K["LinkDescr"];J.setDescription(P);}}R=R.getParent().getParent().getParent().getParent();t.oCommonEventHandlers.onSemanticObjectLinkNavigationTargetObtained(R,Q,s,T,J);}function q(J){var K=v.getItems();for(var i=0;i<K.length;i++){if(!J||K[i].getBindingContextPath()===J){return K[i];}}}function N(i){t.oCommonEventHandlers.onListNavigate(i,s,undefined,true);}function x(P,i){t.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){t.oCommonEventHandlers.addEntry(i,false,s.oSmartFilterbar,P);},Function.prototype,s);}function y(V){var i=a.getStableId({type:"ListReportAction",subType:"Create",sQuickVariantKey:V});if(c.getOwnerComponent().getCreateWithParameterDialog()){t.oCommonUtils.executeIfControlReady(s.oCreateWithDialogHandler.createWithDialog,i);}else{t.oCommonUtils.executeIfControlReady(x.bind(null,undefined),i);}}function z(i){var J=c.getOwnerComponent().getCreateWithFilters();var K=J.strategy||"extension";var P;switch(K){case"extension":P=c.getPredefinedValuesForCreateExtension(s.oSmartFilterbar);break;default:L.error(K+" is not a valid strategy to extract values from the SmartFilterBar");return;}x(P,i.getSource());}function D(i){var T=t.oComponentUtils.getTemplatePrivateModel();var J=T.getProperty("/listReport/deleteEnabled");if(J){t.oCommonEventHandlers.deleteEntries(i);}}function A(i){if(!t.oComponentUtils.isDraftEnabled()){return;}var T=t.oComponentUtils.getTemplatePrivateModel();var J=T.getProperty("/listReport/vDraftState");switch(J){case"1":i.push(new F("IsActiveEntity","EQ",true));i.push(new F("HasDraftEntity","EQ",false));break;case"2":i.push(new F("IsActiveEntity","EQ",false));break;case"3":i.push(new F("IsActiveEntity","EQ",true));i.push(new F("SiblingEntity/IsActiveEntity","EQ",null));i.push(new F("DraftAdministrativeData/InProcessByUser","NE",""));break;case"4":i.push(new F("IsActiveEntity","EQ",true));i.push(new F("SiblingEntity/IsActiveEntity","EQ",null));i.push(new F("DraftAdministrativeData/InProcessByUser","EQ",""));break;default:var K=T.getProperty("/listReport/activeObjectEnabled");if(K){i.push(new F("IsActiveEntity","EQ",true));}else{var P=new F({filters:[new F("IsActiveEntity","EQ",false),new F("SiblingEntity/IsActiveEntity","EQ",null)],and:false});if(i[0]&&i[0].aFilters){var Q=i[0];i[0]=new F([Q,P],true);}else{i.push(P);}}break;}}function B(i){var J={shareEmailPressed:function(){var Q=t.oCommonUtils.getText("EMAIL_HEADER",[t.oServices.oApplication.getAppTitle()]);sap.m.URLHelper.triggerEmail(null,Q,document.URL);},shareJamPressed:function(){S.openJamShareDialog(t.oServices.oApplication.getAppTitle());},getDownloadUrl:function(){var T=s.oSmartTable.getTable();var Q=T.getBinding("rows")||T.getBinding("items");return Q&&Q.getDownloadUrl()||"";},getServiceUrl:function(){var Q=J.getDownloadUrl();if(Q){Q+="&$top=0&$inlinecount=allpages";}var R={serviceUrl:Q};if(c.onSaveAsTileExtension){c.onSaveAsTileExtension(R);}return R.serviceUrl;},getModelData:function(){var Q=O.get("sap.ushell.Container.getUser");var R=c.getOwnerComponent();var T=R.getAppComponent();var U=T.getMetadata();var V=U.getManifestEntry("sap.ui");var X=(V&&V.icons&&V.icons.icon)||"";var Y=U.getManifestEntry("sap.app");var Z=(Y&&Y.title)||"";return{serviceUrl:J.getServiceUrl(),icon:X,title:Z,isShareInJamActive:!!Q&&Q().isJamActive(),customUrl:S.getCustomUrl()};}};S.openSharePopup(t.oCommonUtils,i,J);var K=this.getView().byId("template::Share");var P=this.getView().byId("bookmarkButton");P.setBeforePressHandler(function(){K.focus();});}function G(i){var J=i.getId();var K=s.oSmartFilterbar;var P="";var Q=[];if(i.fetchVariant()&&i.fetchVariant().filter&&i.fetchVariant().filter.filterItems){Q=i.fetchVariant().filter.filterItems;}var R={search:!!K.getBasicSearchValue(),filter:!!(Q.length||K.retrieveFiltersWithValues().length)};if(R.search||R.filter){P=t.oCommonUtils.getContextText("NOITEMS_LR_SMARTTABLE_WITH_FILTER",J);}else{P=t.oCommonUtils.getContextText("NOITEMS_LR_SMARTTABLE",J);}i.setNoData(P);}function H(i){var J=i.getId();var K=s.oSmartFilterbar;var P=[];if(i.fetchVariant()&&i.fetchVariant().filter&&i.fetchVariant().filter.filterItems){P=i.fetchVariant().filter.filterItems;}var Q="";var R={search:!!K.getBasicSearchValue(),filter:!!(P.length||K.retrieveFiltersWithValues().length)};if(R.search||R.filter){Q=t.oCommonUtils.getContextText("NOITEMS_SMARTCHART_WITH_FILTER",J);}else{Q=t.oCommonUtils.getContextText("NOITEMS_SMARTCHART",J);}i.getChartAsync().then(function(T){T.setCustomMessages({NO_DATA:Q});});}return{onInit:function(){var i=c.getOwnerComponent().getAppComponent();var J=i.getConfig();s.oWorklistData.bWorkListEnabled=!!J.pages[0].component.settings&&J.pages[0].component.settings.isWorklist;s.oSmartFilterbar=c.byId("listReportFilter");s.oSmartTable=c.byId("listReport");s.updateControlOnSelectionChange=u;f=t.oComponentUtils.getFclProxy();s.bLoadListAndFirstEntryOnStartup=f.isListAndFirstEntryLoadedOnStartup();s.oMultipleViewsHandler=new M(s,c,t);s.oCreateWithDialogHandler=new C(s,c,t);s.oWorklistHandler=new W(s,c,t);s.oIappStateHandler=new I(s,c,t);s.oIappStateHandler.onSFBVariantInitialise();if(s.oWorklistData.bWorkListEnabled){s.oWorklistHandler.fetchAndSaveWorklistSearchField();}var T=t.oComponentUtils.getTemplatePrivateModel();T.setProperty("/generic/bDataAreShownInTable",false);T.setProperty("/listReport/isHeaderExpanded",true);T.setProperty("/listReport/deleteEnabled",false);if(t.oComponentUtils.isDraftEnabled()){T.setProperty("/listReport/activeObjectEnabled",false);T.setProperty("/listReport/vDraftState","0");}T.setProperty("/listReport/multipleViews/msgVisibility",false);t.oServices.oApplication.registerStateChanger({isStateChange:s.oIappStateHandler.isStateChange});v.getUrlParameterInfo=s.oIappStateHandler.getUrlParameterInfo;v.getItems=function(){var K=s.oSmartTable.getTable();if(t.oCommonUtils.isUiTable(K)){return K.getRows();}return K.getItems();};v.displayNextObject=function(K){return new Promise(function(P,Q){w={aWaitingObjects:K,resolve:P,reject:Q};});};v.onComponentActivate=function(){h.then(function(){var K=s.oIappStateHandler.parseUrlAndApplyAppState();K.then(function(){e=false;});});};v.refreshBinding=function(U,K){if(s.oIappStateHandler.areDataShownInTable()){if(s.oMultipleViewsHandler.refreshOperation(2,null,!U&&K)){return;}if(U||K[s.oSmartTable.getEntitySet()]){t.oCommonUtils.refreshModel(s.oSmartTable);t.oCommonUtils.refreshSmartTable(s.oSmartTable);}}};b();c.byId("template::FilterText").attachBrowserEvent("click",function(){c.byId("page").setHeaderExpanded(true);});},handlers:{addEntry:y,addEntryWithFilters:z,deleteEntries:D,deleteEntry:function(i){t.oCommonEventHandlers.deleteEntry(i);},updateTableTabCounts:function(){s.oMultipleViewsHandler.fnUpdateTableTabCounts();},onCancelCreateWithPopUpDialog:function(){s.oCreateWithDialogHandler.onCancelPopUpDialog();},onSaveCreateWithPopUpDialog:function(i){s.oCreateWithDialogHandler.onSavePopUpDialog(i);},onSelectionChange:function(i){var T=i.getSource();u(T);},onMultiSelectionChange:function(i){t.oCommonEventHandlers.onMultiSelectionChange(i);},onSmartFieldUrlPressed:function(i){t.oCommonEventHandlers.onSmartFieldUrlPressed(i,s);},onContactDetails:function(i){t.oCommonEventHandlers.onContactDetails(i);},onSmartFilterBarInitialise:o,onSmartFilterBarInitialized:g,onBeforeSFBVariantFetch:function(){s.oIappStateHandler.onBeforeSFBVariantFetch();},onAfterSFBVariantSave:function(){s.oIappStateHandler.onAfterSFBVariantSave();},onAfterSFBVariantLoad:function(i){s.oIappStateHandler.onAfterSFBVariantLoad(i);},onDataRequested:function(){s.oMultipleViewsHandler.onDataRequested();},onDataReceived:function(J){t.oCommonEventHandlers.onDataReceived(J);if(w){var K;var P=false;for(var i=0;i<w.aWaitingObjects.length&&!P;i++){K=q(w.aWaitingObjects[i]);if(K){N(K);w.resolve();P=true;}}if(!P){K=q();if(K){N(K);w.resolve();}else{w.reject();}}w=null;return;}var T=J.getSource().getTable();f.handleDataReceived(T,N);},onSmartChartDataReceived:function(){s.oMultipleViewsHandler.onDataRequested();},onBeforeRebindTable:function(i){var J=i.getSource();G(J);var K=i.getParameters().bindingParams;s.oMultipleViewsHandler.aTableFilters=d({},K.filters);var P=K.filters.slice(0);t.oCommonEventHandlers.onBeforeRebindTable(i,{determineSortOrder:s.oMultipleViewsHandler.determineSortOrder,ensureExtensionFields:c.templateBaseExtension.ensureFieldsForSelect,addTemplateSpecificFilters:A,addExtensionFilters:c.templateBaseExtension.addFilters,resolveParamaterizedEntitySet:s.oMultipleViewsHandler.fnResolveParameterizedEntitySet,isFieldControlRequired:false});c.onBeforeRebindTableExtension(i);s.oMultipleViewsHandler.onRebindContentControl(K,P);l.handleErrorsOnTableOrChart(t,i);},onListNavigate:function(i){t.oCommonEventHandlers.onListNavigate(i,s);},onCallActionFromToolBar:function(i){t.oCommonEventHandlers.onCallActionFromToolBar(i,s);},onDataFieldForIntentBasedNavigation:function(i){t.oCommonEventHandlers.onDataFieldForIntentBasedNavigation(i,s);},onDataFieldWithIntentBasedNavigation:function(i){t.oCommonEventHandlers.onDataFieldWithIntentBasedNavigation(i,s);},onBeforeSemanticObjectLinkPopoverOpens:function(i){var J=i.getParameters();t.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){var K=JSON.stringify(s.oSmartFilterbar.getUiState().getSelectionVariant());t.oCommonUtils.semanticObjectLinkNavigation(J,K,c);},Function.prototype,s,Function.prototype);},onSemanticObjectLinkNavigationPressed:k,onSemanticObjectLinkNavigationTargetObtained:n,onSemanticObjectLinkNavigationTargetObtainedSmartLink:p,onDraftLinkPressed:function(i){var J=i.getSource();var K=J.getBindingContext();t.oCommonUtils.showDraftPopover(K,J);},onAssignedFiltersChanged:function(i){if(i.getSource()){c.byId("template::FilterText").setText(i.getSource().retrieveFiltersWithValuesAsText());}},onFilterChange:j,onToggleFiltersPressed:function(){var T=t.oComponentUtils.getTemplatePrivateModel();T.setProperty("/listReport/isHeaderExpanded",!T.getProperty("/listReport/isHeaderExpanded"));},onSearchButtonPressed:function(){t.oCommonUtils.refreshModel(s.oSmartTable);s.oIappStateHandler.changeIappState(false,true);},onSemanticObjectLinkPopoverLinkPressed:function(i){t.oCommonEventHandlers.onSemanticObjectLinkPopoverLinkPressed(i,s);},onAfterTableVariantSave:function(){s.oIappStateHandler.onAfterTableVariantSave();},onAfterApplyTableVariant:function(){if(!e){s.oIappStateHandler.onAfterApplyTableVariant();}},onAfterChartVariantSave:function(i){s.oIappStateHandler.onAfterTableVariantSave();},onAfterApplyChartVariant:function(i){if(!e){s.oIappStateHandler.onAfterApplyTableVariant();}},onBeforeRebindChart:function(i){var J=i.getSource();H(J);var K=i.getParameters().bindingParams;s.oMultipleViewsHandler.aTableFilters=d({},K.filters);var P=K.filters.slice(0);var Q={setBindingPath:J.setChartBindingPath.bind(J),ensureExtensionFields:Function.prototype,addTemplateSpecificFilters:A,addExtensionFilters:c.templateBaseExtension.addFilters,resolveParamaterizedEntitySet:s.oMultipleViewsHandler.fnResolveParameterizedEntitySet,isFieldControlRequired:false};t.oCommonUtils.onBeforeRebindTableOrChart(i,Q,s.oSmartFilterbar);c.onBeforeRebindChartExtension(i);s.oMultipleViewsHandler.onRebindContentControl(K,P);l.handleErrorsOnTableOrChart(t,i);},onChartInitialized:function(i){r(i);t.oCommonUtils.checkToolbarIntentsSupported(i.getSource());},onSelectionDetailsActionPress:function(i){s.oMultipleViewsHandler.onDetailsActionPress(i);},onShareListReportActionButtonPress:function(i){t.oCommonUtils.executeIfControlReady(B,"template::Share");},onInlineDataFieldForAction:function(i){t.oCommonEventHandlers.onInlineDataFieldForAction(i,s);},onInlineDataFieldForIntentBasedNavigation:function(i){t.oCommonEventHandlers.onInlineDataFieldForIntentBasedNavigation(i.getSource(),s);},onDeterminingDataFieldForAction:function(i){t.oCommonEventHandlers.onDeterminingDataFieldForAction(i,s.oSmartTable);},onDeterminingDataFieldForIntentBasedNavigation:function(i){var J=i.getSource();t.oCommonEventHandlers.onDeterminingDataFieldForIntentBasedNavigation(J,s.oSmartTable.getTable(),s);},onTableInit:function(i){var J=i.getSource();t.oCommonUtils.checkToolbarIntentsSupported(J);},onSearchWorkList:function(i){s.oWorklistHandler.performWorklistSearch(i);},onWorkListTableSettings:function(i){s.oWorklistHandler.openWorklistPersonalisation(i);},onActiveButtonPress:function(i){var P=c.byId("template::PageVariant");var T=t.oComponentUtils.getTemplatePrivateModel();var J=T.getProperty("/listReport/activeObjectEnabled");T.setProperty("/listReport/activeObjectEnabled",!J);P.currentVariantSetModified(true);s.oSmartFilterbar.search();s.oIappStateHandler.changeIappState(true,true);}},formatters:{formatDraftType:function(i,J,K){if(i&&i.DraftUUID){if(!J){return sap.m.ObjectMarkerType.Draft;}else if(K){return i.InProcessByUser?sap.m.ObjectMarkerType.Locked:sap.m.ObjectMarkerType.Unsaved;}}return sap.m.ObjectMarkerType.Flagged;},formatDraftVisibility:function(i,J){if(i&&i.DraftUUID){if(!J){return sap.m.ObjectMarkerVisibility.TextOnly;}}return sap.m.ObjectMarkerVisibility.IconAndText;},formatDraftLineItemVisible:function(i,J,K){if(i&&i.DraftUUID){if(K==="0"&&J){return false;}return true;}return false;},formatDraftOwner:function(i,J){var K="";if(i&&i.DraftUUID&&J){var U=i.InProcessByUserDescription||i.InProcessByUser||i.LastChangedByUserDescription||i.LastChangedByUser;if(U){K=t.oCommonUtils.getText("ST_DRAFT_OWNER",[U]);}else{K=t.oCommonUtils.getText("ST_DRAFT_ANOTHER_USER");}}return K;},formatItemTextForMultipleView:function(i){return s.oMultipleViewsHandler?s.oMultipleViewsHandler.formatItemTextForMultipleView(i):"";},formatMessageStrip:function(i,J){return s.oMultipleViewsHandler?s.oMultipleViewsHandler.formatMessageStrip(i,J):"";}},extensionAPI:new E(t,c,s)};}};return m;});