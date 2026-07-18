import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-toast-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-stack">
      <div class="toast" *ngFor="let toast of toasts" [class.success]="toast.type === 'success'" [class.error]="toast.type === 'error'" [class.info]="toast.type === 'info'">
        <div class="toast-body">
          <span class="toast-icon">{{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ' }}</span>
          <span>{{ toast.message }}</span>
        </div>
        <button type="button" class="toast-close" (click)="dismiss(toast.id)">×</button>
      </div>
    </div>
  `,
  styles: [
    `@keyframes toastIn { from { opacity:0; transform:translateX(100%) scale(.9); } to { opacity:1; transform:translateX(0) scale(1); } }`,
    `@keyframes toastOut { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(100%); } }`,
    `.toast-stack { position:fixed; right:1rem; bottom:1rem; display:flex; flex-direction:column; gap:.6rem; z-index:1000; pointer-events:none; }`,
    `.toast { min-width:300px; max-width:420px; background:#0f172a; color:white; padding:.75rem 1rem; border-radius:.95rem; display:flex; justify-content:space-between; align-items:center; gap:.75rem; box-shadow:0 12px 40px rgba(0,0,0,.2); animation:toastIn .3s cubic-bezier(.16,1,.3,1); pointer-events:all; }`,
    `.toast.success { background:#059669; }`,
    `.toast.error { background:#dc2626; }`,
    `.toast.info { background:#2563eb; }`,
    `.toast-body { display:flex; align-items:center; gap:.5rem; font-size:.88rem; }`,
    `.toast-icon { font-weight:700; font-size:1rem; }`,
    `.toast-close { background:transparent; border:none; color:white; font-size:1.1rem; cursor:pointer; opacity:.7; padding:0 .2rem; transition:opacity .15s; }`,
    `.toast-close:hover { opacity:1; }`
  ]
})
export class ToastStackComponent {
  private readonly appState = inject(AppStateService);
  readonly session = this.appState.session;

  get toasts() {
    return this.session().toasts;
  }

  dismiss(id: number) {
    this.appState.dismissToast(id);
  }
}
