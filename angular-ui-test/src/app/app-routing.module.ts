import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanActivateAuthGuard } from './login/can-activate.service';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ListingComponent } from './listing/listing.component';
import { DetailsComponent } from './listing/details/details.component';

const routes: Routes = [
  { path: '',  component: ListingComponent, canActivate: [CanActivateAuthGuard], canActivateChild: [CanActivateAuthGuard]},
  { path: 'forgot',  component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
