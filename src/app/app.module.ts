import { MapKeysPipe } from './common/mapKeysPipe';
import { FormatHourPipe } from './common/formatHourPipe';
import { FormatDayMonthPipe } from './common/formatDayMonthPipe';
import { CatalogActions } from './actions/catalog.actions';
import { AuthActions } from './actions/auth.actions';
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
import { TimebarComponent } from './components/catalog/timebar.component';
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

@NgModule({
  declarations: [
    MapKeysPipe, FormatHourPipe, FormatDayMonthPipe,
    AppComponent, HomeComponent, ReduxComponent, LoginComponent, AuthorizedDirective,
    DialogOverviewExampleDialog, SnackbarComponent,
    CatalogComponent, BranchComponent, TimebarComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, NgReduxModule, AppRoutingModule,
    // material animations
    BrowserAnimationsModule, NoopAnimationsModule,
    // material compoment
    MatButtonModule, MatCardModule, MatIconModule, MatRadioModule, MatSliderModule, MatMenuModule,
    MatToolbarModule, MatSidenavModule, MatInputModule, MatSelectModule, MatListModule,
    MatGridListModule, MatSnackBarModule, MatDialogModule, MatProgressSpinnerModule,
    MatCheckboxModule, MatTabsModule
  ],
  providers: [DevicesActions, AuthActions, CatalogActions, AuthGuard],
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
