import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener, EventEmitter, Inject } from '@angular/core';

import { GridsterConfig, GridsterItem }  from 'angular-gridster2';
import * as ui from '@floating-ui/dom';

import { GridsterEmit } from '../interfaces/gridster-emit';
import { DashboardOptions } from '../models/dashboard-options.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditWidgetConnectionDialog } from './edit-widget-connection-dialog/edit-widget-connection-dialog.component';

const HEADER_GAP: number = 71;
const PCT_HEIGHT_TOOLBAR: number = 10; // Sets how tall to make the toolbar
const DASHBOARD_ASPECT_RATIO: number = 16/9; // Sets the aspect ratio of the dashboard
const DASHBOARD_PADDING: number = 0;

export interface WidgetOption {
  displayName: string;
  type: string;
  tooltip: string;
  icon: string|null;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass']
})
export class EditorComponent implements OnInit {

  resizeEvent: EventEmitter<GridsterEmit> = new EventEmitter<GridsterEmit>();
  
  dashboard: Array<GridsterItem> = [];
  options: GridsterConfig = DashboardOptions.getEditorOptions(
    EditorComponent.itemChange,
    (item,itemComponent) => this.resizeEvent.emit({item,itemComponent})
  );

  isAuth: boolean = false;

  widgetTypes: WidgetOption[] = [
    { displayName: 'Bar Graph', type: 'bar-graph', tooltip: '', icon: 'bar_chart' },
    { displayName: 'Line Chart', type: 'line-chart', tooltip: '', icon: 'show_chart' },
    { displayName: 'Pie Chart', type: 'pie-chart', tooltip: '', icon: 'pie_chart' },
    { displayName: 'Table', type: 'table-content', tooltip: '', icon: 'table_chart' },
    { displayName: 'Gauge', type: 'gauge', tooltip: '', icon: 'speed' },
    { displayName: 'Spacer', type: 'spacer', tooltip: '', icon: 'expand' },
  ];

  protected toolbarHeight: number = 0;
  protected workspaceWidth: number = 0;
  protected workspaceHeight: number = 0;
  protected viewportWidth: number = 0;
  protected viewportHeight: number = 0;
  protected dashboardWidth: number = 0;
  protected dashboardHeight: number = 0;
  
  protected calcViewportAspectRatio(): number {
    return this.viewportWidth/this.viewportHeight;
  }

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.applyWorkspaceBoundaries();
    this.http.get<any>('http://localhost:3000/users/protected').subscribe({
      next: (response) => {
        this.isAuth = true;
        setTimeout(() => this.loadGrid(), 1000);
      },
      error: (response) => {
        // console.log(response);
      }
    });
    
  }

  public loadGrid(): void {
    this.dashboard = [];
  }

  protected createWidget(type: string, displayName: string) {
    this.dashboard.push({
      x: 0, y: 0, cols: 2, rows: 2, type: type, displayName: displayName
    });
  }

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.applyWorkspaceBoundaries();
  }
  applyWorkspaceBoundaries(): void {

    // Calculates the total working screen space (must negate header)
    this.workspaceHeight = (window.innerHeight - HEADER_GAP);
    this.workspaceWidth = window.innerWidth;

    // Calculates the total toolbar height based on percentage of screen to take up 
    this.toolbarHeight = this.workspaceHeight * (PCT_HEIGHT_TOOLBAR/100);

    // Calculates the viewport size where the dashboard will fit
    this.viewportWidth = this.workspaceWidth;
    this.viewportHeight = this.workspaceHeight - this.toolbarHeight;

    // Calculates the dashboard size depending on whether the viewport's aspect ratio is < the dashboard's aspect ratio
    if(this.calcViewportAspectRatio() < DASHBOARD_ASPECT_RATIO){
      this.dashboardWidth = this.viewportWidth - DASHBOARD_PADDING;
      this.dashboardHeight = this.dashboardWidth * (1/DASHBOARD_ASPECT_RATIO);
    } else {
      this.dashboardHeight = this.viewportHeight - DASHBOARD_PADDING;
      this.dashboardWidth = this.dashboardHeight * DASHBOARD_ASPECT_RATIO;
    }
  }
  

  static itemChange(item: any, itemComponent: any) {
    // console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item: any, itemComponent: any) {
    console.info('itemResized', item, itemComponent);
  }

  protected openConnectModal(item: any): void {
    console.log(item);
    const dialogRef = this.dialog.open(EditWidgetConnectionDialog, {
      width: `${this.dashboardWidth*0.7}px`,
      data: {widgetName: item.displayName, currentConnection: ''},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(JSON.stringify(result));
    });
  }

  protected editClicked(event: MouseEvent | TouchEvent, item: any): void {
    console.log('Edit clicked');
    console.log(item);

    const dialogRef = this.dialog.open(EditWidgetConnectionDialog, {
      width: '250px',
      data: {name: 'Bobby', animal: 'Cow'},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  protected deleteClicked(event: MouseEvent | TouchEvent, item: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }
}