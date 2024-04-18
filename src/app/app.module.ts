import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { HeaderComponent } from './menu/header/header.component';
import { SidenavComponent } from './menu/sidenav/sidenav.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { EditorComponent } from './editor/editor.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';
import { BarGraphComponent } from './widgets/bar-graph/bar-graph.component';
import { GridsterModule } from 'angular-gridster2';
import { DynamicWidgetComponent } from './widgets/dynamic-widget.component';
import { LineChartComponent } from './widgets/line-chart/line-chart.component';
import { PieChartComponent } from './widgets/pie-chart/pie-chart.component';
import { GridTableComponent } from './widgets/grid-table/grid-table.component';
import { GaugeComponent } from './widgets/gauge/gauge.component';
import { GridSpacerComponent } from './widgets/grid-spacer/grid-spacer.component';
import { EditWidgetConnectionDialog } from './editor/edit-widget-connection-dialog/edit-widget-connection-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    HeaderComponent,
    SidenavComponent,
    SigninComponent,
    RegisterComponent,
    EditorComponent,
    DashboardListComponent,
    BarGraphComponent,
    DynamicWidgetComponent,
    LineChartComponent,
    PieChartComponent,
    GridTableComponent,
    GaugeComponent,
    GridSpacerComponent,
    EditWidgetConnectionDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    GridsterModule,
    MatMenuModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
