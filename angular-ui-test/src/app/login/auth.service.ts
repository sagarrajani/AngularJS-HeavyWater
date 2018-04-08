import { Injectable, EventEmitter } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

// Avoid name not found warnings
declare var Auth0: any;

@Injectable()
export class Auth {
  // Configure Auth0
  auth0 = new Auth0(environment.auth);
  private jwtHelper: JwtHelper = new JwtHelper();
  isLoggedIn = false;
  isLoginFailed = false;
  isResetSuccess = null;

  onUserInfoReady = new EventEmitter;

  constructor(private router: Router) {
    var result = this.auth0.parseHash(window.location.hash);

    if (result && result.idToken) {
      localStorage.setItem('id_token', result.idToken);
      this.router.navigate([environment.auth.redirectOnSuccess]);
    } else if (result && result.error) {
      console.log('error: ' + result.error);
    }
  }

  public login(username, password, rememberme) {
    this.isLoginFailed = false;

    this.auth0.login({
      connection: 'Username-Password-Authentication',
      email: username,
      password: password,
    }, (error, result) => {
      if(error) {
        this.isLoginFailed = true;
      } else {
        const storage = (rememberme ? localStorage : sessionStorage);
        // store jwt token
        storage.setItem('id_token', result.idToken);

        // retrieve & store user profile info
        this.auth0.getUserInfo(result.accessToken, (err, userInfo) => {
          storage.setItem('user_info', JSON.stringify(userInfo));
          this.onUserInfoReady.emit(JSON.stringify(userInfo));
          this.isLoggedIn = true;
          let {queryParams} = this.router.parseUrl(this.router.url);

          this.router.navigate([queryParams.redirectTo || '/']);
        });
      }
    });
  };

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    if(sessionStorage.getItem('id_token') != null) {
      return tokenNotExpired(null, sessionStorage.getItem('id_token'));
    } else {
      return tokenNotExpired();
    }
  };

  public logout(queryParams?) {
    // Remove token from localStorage and sessionStorage
    localStorage.removeItem('id_token');
    sessionStorage.removeItem('id_token');
    
    localStorage.removeItem('user_info');
    sessionStorage.removeItem('user_info');
    this.isLoggedIn = false;
    this.router.navigate(['/login'], {queryParams});
  };

  public changePassword(email) {
    let that = this;
    return this.auth0.changePassword({
      email: email,
      connection: 'Username-Password-Authentication'
    }, (error, result) => {
      if(error) {
        that.isResetSuccess = false;
        console.log(error)
      } else {
        that.isResetSuccess = true;
         console.log(result)
      }
    });
  };

  get userInfo() {
    return JSON.parse(
      localStorage.getItem('user_info') || sessionStorage.getItem('user_info') || '{}'
    );
  }
}
