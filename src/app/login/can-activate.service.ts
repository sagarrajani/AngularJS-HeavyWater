import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Auth } from './auth.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: Auth, private router: Router) { }

  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(next, state);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.authenticated()) {
      return true;
    }
    const params = (state.url && state.url !== '/') ? {queryParams: { redirectTo: state.url }} : {};
    this.router.navigate(['/login'], params);
    return false;
  }
}
