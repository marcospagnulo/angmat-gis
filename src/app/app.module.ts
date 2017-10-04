import { AuthGuard } from './guard/auth.guard';
import { DevicesActions } from './actions/devices.actions';
import { AppRoutingModule } from './app.routing.module';
import { ReduxComponent } from './views/redux/redux.component';
import { HomeComponent } from './views/home/home.component';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/navbar.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
  MdStepperModule,
} from '@angular/material';
import { IAppState, rootReducer } from './store/index';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

@NgModule({
  declarations: [
    AppComponent, NavBarComponent, HomeComponent, ReduxComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, NgReduxModule, AppRoutingModule,
    // material animations
    BrowserAnimationsModule, NoopAnimationsModule,
    // material compoment
    MdButtonModule, MdCardModule, MdIconModule, MdRadioModule, MdSliderModule, MdMenuModule,
    MdToolbarModule, MdSidenavModule, MdInputModule, MdSelectModule, MdListModule,
    MdGridListModule
  ],
  providers: [DevicesActions, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<IAppState>, private devTool: DevToolsExtension) {
    // Reducer, Initial State, Opts MiddleWares, Opts Enhancers
    ngRedux.configureStore(rootReducer, {}, [],
      [ devTool.isEnabled() ? devTool.enhancer() : f => f]
    );
  }
}
