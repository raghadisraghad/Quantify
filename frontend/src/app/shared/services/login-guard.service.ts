import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppStateService } from './app-state.service';

/** Blocks authenticated users. Only guests (logged-out) can pass. */
@Injectable({ providedIn: 'root' })
export class GuestGuard implements CanActivate {
  constructor(private appState: AppStateService, private router: Router) {}

  canActivate(): boolean {
    if (this.appState.session().isAuthenticated) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}

/** Only authenticated users who have NOT yet entered their PIN can pass. */
@Injectable({ providedIn: 'root' })
export class PinGuard implements CanActivate {
  constructor(private appState: AppStateService, private router: Router) {}

  canActivate(): boolean {
    const s = this.appState.session();
    if (!s.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    if (s.employee) {
      this.router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
}
