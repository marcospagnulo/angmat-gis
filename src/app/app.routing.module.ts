import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReduxComponent } from './views/redux/redux.component';
import { HomeComponent } from './views/home/home.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'redux', component: ReduxComponent},
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent},
      { path: '**', component: HomeComponent }
    ])
  ],
  exports: [ RouterModule ],  // export to use router API in main module
  providers: [],
})
export class AppRoutingModule {}
