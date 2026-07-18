import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../shared/services/app-state.service';
import { VirtualKeyboardComponent } from '../../shared/components/virtual-keyboard.component';

@Component({
  selector: 'app-owner-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, VirtualKeyboardComponent],
  template: `
    <div class="overlay" *ngIf="session().showOwnerModal" (click)="close()">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h3>Owner Verification</h3>
          <p>Enter the business owner password to switch to Owner Mode.</p>
        </div>

        <div class="modal-body">
          <label class="field">
            <span>Owner Password</span>
            <div class="input-row">
              <input type="password" [(ngModel)]="password" (keyup.enter)="verify()" autofocus />
              <button type="button" class="keyboard-btn" (click)="showKeyboard = !showKeyboard">⌨</button>
            </div>
            <app-virtual-keyboard [(value)]="password" [(visible)]="showKeyboard"></app-virtual-keyboard>
          </label>
          <div class="hint">Demo password: <strong>welcome</strong></div>
        </div>

        <div class="actions">
          <button type="button" class="secondary" (click)="close()">Cancel</button>
          <button type="button" class="primary" (click)="verify()">Verify & Enter Owner Mode</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `@keyframes overlayIn { from { opacity:0; } to { opacity:1; } }`,
    `@keyframes modalIn { from { opacity:0; transform:scale(.95) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }`,
    `.overlay { position:fixed; inset:0; background:rgba(2,6,23,.55); backdrop-filter:blur(4px); display:grid; place-items:center; z-index:999; padding:1rem; animation:overlayIn .2s ease-out; }`,
    `.modal { background:white; border-radius:1.2rem; width:min(92vw,440px); box-shadow:0 25px 60px rgba(0,0,0,.25); animation:modalIn .25s ease-out; overflow:hidden; }`,
    `.modal-header { padding:1.5rem 1.5rem 0; }`,
    `.modal-header h3 { margin:0 0 .25rem; font-size:1.2rem; }`,
    `.modal-header p { margin:0; color:#64748b; font-size:.88rem; }`,
    `.modal-body { padding:1.25rem 1.5rem; }`,
    `.field { display:flex; flex-direction:column; gap:.35rem; }`,
    `.field span { font-size:.82rem; font-weight:600; color:#334155; }`,
    `.input-row { display:flex; align-items:center; gap:.4rem; }`,
    `.input-row input { flex:1; border:1px solid #dbe3ef; border-radius:.85rem; padding:.75rem .9rem; font:inherit; outline:none; transition:border-color .2s; }`,
    `.input-row input:focus { border-color:#7c8dff; }`,
    `.keyboard-btn { background:none; border:1px solid #dbe3ef; border-radius:.85rem; padding:.5rem .65rem; cursor:pointer; font-size:1.1rem; line-height:1; color:#4756c8; transition:background .15s; }`,
    `.keyboard-btn:hover { background:#f1f5f9; }`,
    `.hint { margin-top:.5rem; font-size:.78rem; color:#94a3b8; }`,
    `.hint strong { color:#4756c8; }`,
    `.actions { display:flex; justify-content:flex-end; gap:.6rem; padding:0 1.5rem 1.25rem; }`,
    `.primary { background:#4756c8; color:white; border:none; border-radius:.8rem; padding:.75rem 1.2rem; font-weight:600; cursor:pointer; transition:transform .15s, box-shadow .2s; }`,
    `.primary:active { transform:scale(.97); }`,
    `.secondary { background:#f1f5f9; color:#334155; border:none; border-radius:.8rem; padding:.75rem 1.2rem; font-weight:600; cursor:pointer; transition:background .15s; }`,
    `.secondary:hover { background:#e2e8f0; }`
  ]
})
export class OwnerModalComponent {
  private readonly appState = inject(AppStateService);
  readonly session = this.appState.session;
  password = '';
  showKeyboard = false;

  verify() {
    if (this.appState.verifyOwner(this.password)) {
      this.password = '';
    }
  }

  close() {
    this.appState.session.update((state) => ({ ...state, showOwnerModal: false }));
    this.password = '';
  }
}
