import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from "angular-gridster2";

const DASHBOARD_ROWS = 8;
const DASHBOARD_COLUMNS = 14;

export abstract class DashboardOptions {

    public static getViewOnlyOptions(
        itemChangeCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void,
        itemResizeCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void
    ): GridsterConfig {
        return {
            itemChangeCallback: itemChangeCallback,
            itemResizeCallback: itemResizeCallback,
            pushItems: true,
            draggable: {
                enabled: false
            },
            resizable: {
                enabled: false
            },
            minRows: DASHBOARD_ROWS,
            maxRows: DASHBOARD_ROWS,
            minCols: DASHBOARD_COLUMNS,
            maxCols: DASHBOARD_COLUMNS,
            displayGrid: 'none',
            disableScrollHorizontal: true,
            disableScrollVertical: true,
            enableBoundaryControl: true,
            disableAutoPositionOnConflict: true
        };
    }
    
    public static getEditorOptions(
        itemChangeCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void,
        itemResizeCallback?: (item: GridsterItem, itemComponent: GridsterItemComponentInterface) => void
    ): GridsterConfig {
        return {
            itemChangeCallback: itemChangeCallback,
            itemResizeCallback: itemResizeCallback,
            pushItems: true,
            draggable: {
            enabled: true
            },
            resizable: {
            enabled: true,
            handles: {
                n: false,
                ne: false,
                e: false,
                se: true,
                s: false,
                sw: true,
                w: false,
                nw: false
            }
            },
            minRows: DASHBOARD_ROWS,
            maxRows: DASHBOARD_ROWS,
            minCols: DASHBOARD_COLUMNS,
            maxCols: DASHBOARD_COLUMNS,
            displayGrid: 'none',
            disableScrollHorizontal: true,
            disableScrollVertical: true,
            enableBoundaryControl: true,
            disableAutoPositionOnConflict: false
        }
    }
}
