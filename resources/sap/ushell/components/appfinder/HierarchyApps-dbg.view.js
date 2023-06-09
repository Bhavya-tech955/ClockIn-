// Copyright (c) 2009-2020 SAP SE, All Rights Reserved

sap.ui.define([
    "sap/ushell/ui/appfinder/AppBox",
    "sap/ushell/ui/appfinder/PinButton",
    "sap/ushell/resources",
    "sap/ushell/ui/launchpad/AccessibilityCustomData",
    "sap/m/FlexBox",
    "sap/m/library",
    "sap/m/MessagePage",
    "sap/ui/model/json/JSONModel",
    "sap/m/Link",
    "sap/m/Breadcrumbs",
    "sap/m/Text",
    "sap/m/Button"
], function (
    AppBox,
    PinButton,
    resources,
    AccessibilityCustomData,
    FlexBox,
    mobileLibrary,
    MessagePage,
    JSONModel,
    Link,
    Breadcrumbs,
    Text,
    Button
) {
    "use strict";

    // shortcut for sap.m.ButtonType
    var ButtonType = mobileLibrary.ButtonType;

    // shortcut for sap.m.FlexWrap
    var FlexWrap = mobileLibrary.FlexWrap;

    sap.ui.jsview("sap.ushell.components.appfinder.HierarchyApps", {
        createContent: function (oController) {
            this.oController = oController;

            function getTooltip (aGroupsIDs, bookmarkCount, sGroupContextModelPath, sGroupContextId, sGroupContextTitle) {
                var oResourceBundle = resources.i18n,
                    sTooltip;

                if (sGroupContextModelPath) {
                    var iCatalogTileInGroup = aGroupsIDs ? Array.prototype.indexOf.call(aGroupsIDs, sGroupContextId) : -1;

                    var sTooltipKey = iCatalogTileInGroup !== -1
                        ? "removeAssociatedTileFromContextGroup"
                        : "addAssociatedTileToContextGroup";

                    sTooltip = oResourceBundle.getText(sTooltipKey, sGroupContextTitle);
                } else {
                    sTooltip = bookmarkCount
                        ? oResourceBundle.getText("EasyAccessMenu_PinButton_Toggled_Tooltip")
                        : oResourceBundle.getText("EasyAccessMenu_PinButton_UnToggled_Tooltip");
                }
                return sTooltip;
            }

            var oPinButton = new PinButton({
                icon: "sap-icon://pushpin-off",
                selected: {
                    path: "easyAccess>bookmarkCount",
                    formatter: function (bookmarkCount) {
                        return (!!bookmarkCount);
                    }
                },
                tooltip: {
                    parts: ["associatedGroups", "easyAccess>bookmarkCount", "/groupContext/path", "/groupContext/id", "/groupContext/title"],
                    formatter: function (aGroupsIDs, bookmarkCount, sGroupContextModelPath, sGroupContextId, sGroupContextTitle) {
                        return getTooltip(aGroupsIDs, bookmarkCount, sGroupContextModelPath, sGroupContextId, sGroupContextTitle);
                    }
                },
                press: oController.showSaveAppPopover.bind(oController)
            });
            oPinButton.addCustomData(new AccessibilityCustomData({
                key: "tabindex",
                value: "-1",
                writeToDom: true
            }));
            oPinButton.addStyleClass("sapUshellPinButton");

            this.oItemTemplate = new AppBox({
                title: "{easyAccess>text}",
                subtitle: "{easyAccess>subtitle}",
                url: "{easyAccess>url}",
                icon: "{easyAccess>icon}",
                pinButton: oPinButton,
                tabindex: {
                    path: "easyAccess>text"
                },
                press: [oController.onAppBoxPressed, oController]
            });
            this.oItemTemplate.addCustomData(new AccessibilityCustomData({
                key: "tabindex",
                value: "-1",
                writeToDom: true
            }));


            this.layout = new FlexBox(this.getId() + "_hierarchyAppsLayout", {
                items: {
                    path: "easyAccess>/apps",
                    template: this.oItemTemplate
                },
                wrap: FlexWrap.Wrap
            });

            this.layout.addDelegate({
                onAfterRendering: function () {
                    var items = this.getItems();
                    var updateTabindex = function (customData) {
                        if (customData.getKey() === "tabindex") {
                            customData.setValue("0");
                        }
                    };
                    if (items.length) {
                        items[0].getCustomData().forEach(updateTabindex);
                        items[0].getPinButton().getCustomData().forEach(updateTabindex);
                    }
                }.bind(this.layout)
            });

            // create message-page as invisible by default
            this.oMessagePage = new MessagePage({
                visible: false,
                showHeader: false,
                text: resources.i18n.getText("EasyAccessMenu_NoAppsToDisplayMessagePage_Text"),
                description: ""
            });

            var aContent = [];

            // if it is not a search result view - e.g. this is a regular hierarchy Apps content view
            if (this.getViewData() && this.getViewData().navigateHierarchy) {
                this.crumbsModel = new JSONModel({ crumbs: [] });

                this.linkTemplate = new Link({
                    text: "{crumbs>text}",
                    press: function (e) {
                        var crumbData = e.oSource.getBinding("text").getContext().getObject();
                        this.getViewData().navigateHierarchy(crumbData.path, false);

                    }.bind(this)
                });

                this.breadcrumbs = new Breadcrumbs({
                    links: {
                        path: "crumbs>/crumbs",
                        template: this.linkTemplate
                    },
                    currentLocationText: "{/text}"
                });

                this.breadcrumbs.setModel(this.crumbsModel, "crumbs");
                aContent.push(this.breadcrumbs);
            } else {
                // else we are in search results content view
                this.resultText = new Text({
                    text: {
                        parts: [
                            { path: "easyAccessSystemsModel>/systemSelected" },
                            { path: "easyAccess>/total" }
                        ],
                        formatter: oController.resultTextFormatter.bind(oController)
                    }
                }).addStyleClass("sapUshellEasyAccessSearchResultText");

                this.resultText.addCustomData(new AccessibilityCustomData({
                    key: "role",
                    value: "heading",
                    writeToDom: true
                }));
                this.resultText.addCustomData(new AccessibilityCustomData({
                    key: "aria-level",
                    value: "3",
                    writeToDom: true
                }));

                aContent.push(this.resultText);

                this.showMoreResultsLink = new Button({
                    text: {
                        parts: [
                            { path: "easyAccess>/apps" },
                            { path: "easyAccess>/total" }
                        ],
                        formatter: oController.showMoreResultsTextFormatter.bind(oController)
                    },
                    press: this.getViewData().getMoreSearchResults,
                    visible: {
                        parts: [
                            { path: "easyAccess>/apps" },
                            { path: "easyAccess>/total" }
                        ],
                        formatter: oController.showMoreResultsVisibilityFormatter.bind(oController)
                    },
                    type: ButtonType.Transparent
                });
            }

            // adding the message-page
            aContent.push(this.oMessagePage);
            aContent.push(this.layout);
            if (this.showMoreResultsLink) {
                aContent.push(this.showMoreResultsLink);
            }
            return aContent;
        },

        /*
         * updates the text-field OR the messagePage according to
         *   - if items exist we update the text-field, otherwise show message page
         *   - if bIsSearchResults we use different text then if is not (e.g. standard empty folder navigation)
         */
        updateResultSetMessage: function (bItemsExist, bIsSearchResults) {

            var sEmptyContentMessageKey;
            if (bIsSearchResults) {
                sEmptyContentMessageKey = "noFilteredItems";
            } else {
                sEmptyContentMessageKey = "EasyAccessMenu_NoAppsToDisplayMessagePage_Text";
            }

            // if there are items in the results
            if (bItemsExist) {

                // if this is search results --> update the result-text which we display at the top of page when there are results
                if (bIsSearchResults) {
                    this.resultText.updateProperty("text");
                    this.resultText.setVisible(true);
                }

                // set layout visible, hide the message page
                this.layout.setVisible(true);
                this.oMessagePage.setVisible(false);
            } else {
                // in case this is search results --> hide the result-text which we display at the top of page as there are no results.
                // we will display the message page instaed
                if (bIsSearchResults) {
                    this.resultText.setVisible(false);
                }

                this.layout.setVisible(false);
                this.oMessagePage.setVisible(true);

                var sEmptyContentMessageText = resources.i18n.getText(sEmptyContentMessageKey);
                this.oMessagePage.setText(sEmptyContentMessageText);
            }
        },

        setShowMoreResultsBusy: function (bBusy) {
            if (this.showMoreResultsLink) {
                this.showMoreResultsLink.setBusy(bBusy);
            }
        },

        getControllerName: function () {
            return "sap.ushell.components.appfinder.HierarchyApps";
        }
    });
}, /* bExport= */ true);
