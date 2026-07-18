import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OwnerModalComponent } from './features/owner-modal/owner-modal.component';
import { ToastStackComponent } from './features/toast-stack/toast-stack.component';
import { AppStateService } from './shared/services/app-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OwnerModalComponent, ToastStackComponent],
  template: `
    <router-outlet></router-outlet>
    <app-owner-modal></app-owner-modal>
    <app-toast-stack></app-toast-stack>
  `,
  styleUrl: './app.css'
})
export class App {
  readonly appState = inject(AppStateService);
}
