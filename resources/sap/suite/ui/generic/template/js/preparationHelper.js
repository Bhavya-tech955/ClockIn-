sap.ui.define(["sap/base/util/deepExtend"],function(d){"use strict";function g(m,o,D,e){var s=d({},o);s.tableType=s.tableType||(s.gridTable?"GridTable":undefined);s.tableType=s.tableType||(s.treeTable?"TreeTable":undefined);s.tableSettings=s.tableSettings||{};s.tableSettings.type=s.tableSettings.type||s.tableType;s.tableSettings.multiSelect=(s.tableSettings.multiSelect===undefined?s.multiSelect:s.tableSettings.multiSelect);s.tableSettings.selectAll=(s.tableSettings.selectAll===undefined?false:s.tableSettings.selectAll);s.tableSettings.inlineDelete=!!s.tableSettings.inlineDelete;s.tableSettings.multiSelect=!!s.tableSettings.multiSelect;s.tableSettings.selectionLimit=s.tableSettings.selectionLimit||200;if(D.system.phone){s.tableSettings.type="ResponsiveTable";}else if(e){var E=m.getODataEntitySet(e);var a=m.getODataEntityType(E.entityType);s.tableSettings.type=s.tableSettings.type||(a["sap:semantics"]==="aggregate"?"AnalyticalTable":"ResponsiveTable");if(s.tableSettings.type==="AnalyticalTable"&&!(a["sap:semantics"]==="aggregate")){s.tableSettings.type="GridTable";}}if(s.tableSettings.multiSelect&&s.tableSettings.inlineDelete){throw new Error("Both inlineDelete and multiSelect options for table are not possible");}if(s.tableSettings.type!=="ResponsiveTable"&&s.tableSettings.inlineDelete){throw new Error("InlineDelete property is not supported for "+s.tableSettings.type+" type table");}delete s.gridTable;delete s.treeTable;delete s.tableType;delete s.multiSelect;return s.tableSettings;}return{getNormalizedTableSettigs:g};});