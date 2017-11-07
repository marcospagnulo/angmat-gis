import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkspaceComponent } from './views/workspace.component';
import { HomeComponent } from './views/home.component';
import { LoginComponent } from './views/login.component';
@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard]},
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: '', component: HomeComponent, canActivate: [AuthGuard]},
      { path: '**', component: HomeComponent, canActivate: [AuthGuard] }
    ])
  ],
  exports: [ RouterModule ],  // export to use router API in main module
  providers: [],
})
export class AppRoutingModule {}
