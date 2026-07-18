import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppStateService } from './app-state.service';

@Injectable({ providedIn: 'root' })
export class SessionGuard implements CanActivate {
  constructor(private appState: AppStateService, private router: Router) {}

  canActivate(): boolean {
    const session = this.appState.session();
    if (session.isAuthenticated && session.employee) {
      return true;
    }

    if (session.isAuthenticated) {
      this.router.navigate(['/pin']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
