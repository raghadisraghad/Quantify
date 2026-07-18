import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { AppStateService } from './app-state.service';

@Injectable({ providedIn: 'root' })
export class OwnerGuard implements CanActivate {
  constructor(private appState: AppStateService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.appState.session().mode === 'owner') {
      return true;
    }

    this.appState.openOwnerVerification(state.url);
    return false;
  }
}
