import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../shared/services/app-state.service';
import { EmployeeDashboardComponent } from './employee-dashboard.component';
import { OwnerDashboardComponent } from './owner-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EmployeeDashboardComponent, OwnerDashboardComponent],
  template: `
    <app-employee-dashboard *ngIf="session().mode === 'employee'" />
    <app-owner-dashboard *ngIf="session().mode === 'owner'" />
  `
})
export class DashboardComponent {
  readonly session = inject(AppStateService).session;
}
