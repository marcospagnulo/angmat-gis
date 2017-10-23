import { AppState } from './app.state';
import { Util } from './common/util';
import { MapKeysPipe } from './common/mapKeysPipe';
import { FormatHourPipe } from './common/formatHourPipe';
import { FormatDayMonthPipe } from './common/formatDayMonthPipe';
import { CatalogActions } from './actions/catalog.actions';
import { AuthActions } from './actions/auth.actions';
import { TimebarActions } from './actions/timebar.actions';
import { AuthorizedDirective } from './guard/authorized.directive';
import { DialogOverviewExampleDialog, LoginComponent, SnackbarComponent } from './views/login.component';
import { AuthGuard } from './guard/auth.guard';
import { DevicesActions } from './actions/devices.actions';
import { AppRoutingModule } from './app.routing.module';
import { ReduxComponent } from './views/redux.component';
import { HomeComponent } from './views/home.component';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { BranchComponent } from './components/catalog/branch.component';
import { TimebarComponent } from './components/timebar.component';
import { MapLayersComponent } from './components/mapLayers.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import { IAppState, rootReducer } from './store/index';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { DragulaModule } from 'ng2-dragula';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

@NgModule({
  declarations: [
    MapKeysPipe, FormatHourPipe, FormatDayMonthPipe,
    AppComponent, HomeComponent, ReduxComponent, LoginComponent, AuthorizedDirective,
    DialogOverviewExampleDialog, SnackbarComponent,
    CatalogComponent, BranchComponent, TimebarComponent, MapLayersComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, NgReduxModule, AppRoutingModule, DragulaModule, MalihuScrollbarModule.forRoot(),
    // material animations
    BrowserAnimationsModule, NoopAnimationsModule,
    // material compoment
    MatButtonModule, MatCardModule, MatIconModule, MatRadioModule, MatSliderModule, MatMenuModule,
    MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatListModule,
    MatGridListModule, MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule,
    MatCheckboxModule, MatTabsModule
  ],
  providers: [AppState, DevicesActions, AuthActions, CatalogActions, AuthGuard, TimebarActions, Util],
  bootstrap: [AppComponent],
  entryComponents: [DialogOverviewExampleDialog, SnackbarComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<IAppState>, private devTool: DevToolsExtension) {
    // Reducer, Initial State, Opts MiddleWares, Opts Enhancers
    ngRedux.configureStore(rootReducer, {}, [],
      [ devTool.isEnabled() ? devTool.enhancer() : f => f]
    );
  }
}
