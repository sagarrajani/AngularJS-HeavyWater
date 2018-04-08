import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, Http } from '@angular/http';

import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdCardModule,MdSelectModule, MdButtonModule, MdListModule, MdDialogModule, MdInputModule, MdTabsModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { Auth } from './login/auth.service';
import { CanActivateAuthGuard } from './login/can-activate.service';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

import { AppComponent } from './app.component';
import { ListingComponent } from './listing/listing.component';
import { SidebarComponent } from './shared/directive/sidebar/sidebar.component';
import { ClassNamePipe } from './shared/directive/class-name.pipe';

import { DataService } from './shared/data/data.service';
import { ListItemComponent } from './listing/list-item/list-item.component';
import { NewAppDialogComponent } from './shared/dialogs/new-app/new-app.component';
import { DetailsComponent } from './listing/details/details.component';
import { ObjKeysPipe } from './shared/directive/obj-keys.pipe';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';
import { SearchfilterPipe } from './searchfilter.pipe';

export function authFactory(
   http: Http,
   options: RequestOptions) {
   return new AuthHttp(new AuthConfig({
      // Config options if you want
   }), http, options);
};

// Include this in your ngModule providers
export const AUTH_PROVIDERS = {
   provide: AuthHttp,
   deps: [Http, RequestOptions],
   useFactory: authFactory
};

@NgModule({
  declarations: [
    ListingComponent,
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SidebarComponent,
    ListItemComponent,
    ClassNamePipe,
    NewAppDialogComponent,
    DetailsComponent,
    ObjKeysPipe,
    LoadingSpinnerComponent,
    SearchfilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    MdSelectModule,
    MdCardModule,
    MdButtonModule,
    MdListModule,
    MdDialogModule,
    MdInputModule,
    MdTabsModule,
  ],
  providers: [
    CanActivateAuthGuard,
    Auth,
    AUTH_PROVIDERS,
    DataService,
  ],
  entryComponents: [
    NewAppDialogComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
