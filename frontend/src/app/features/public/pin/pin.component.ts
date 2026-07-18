import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService, EmployeeInfo } from '../../../shared/services/app-state.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-pin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="auth-shell">
      <div class="auth-card">
        <div class="brand">{{ business?.name }}</div>
        <h1>Employee PIN</h1>
        <p>Enter your 4-digit PIN to access the workspace.</p>

        <div class="employee-card">
          <div class="avatar">{{ (business?.name?.charAt(0)) || '?' }}</div>
          <div>
            <strong>{{ business?.name }}</strong>
            <span class="muted">Enter your employee PIN below</span>
          </div>
        </div>

        <label class="field">
          <span>Employee PIN</span>
          <input
            type="password"
            maxlength="4"
            [(ngModel)]="pin"
            (keyup.enter)="submitPin()"
            autofocus
            inputmode="numeric"
            pattern="[0-9]*"
            placeholder="• • • •"
          />
        </label>

        <div class="keypad">
          <button *ngFor="let digit of ['1','2','3','4','5','6','7','8','9']" type="button" class="kp-key" (click)="addDigit(digit)">{{ digit }}</button>
          <button type="button" class="kp-key kp-fn" (click)="deleteDigit()">⌫</button>
          <button type="button" class="kp-key" (click)="addDigit('0')">0</button>
        </div>

        <button class="btn btn-primary" type="button" (click)="submitPin()" [disabled]="loading || pin.length < 4">{{ loading ? 'Verifying...' : 'Continue' }}</button>

        <div class="pin-footer">
          <button class="btn-ghost" type="button" (click)="logout()">Back to Login</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`,
    `.auth-shell { min-height:100vh; display:grid; place-items:center; background:linear-gradient(135deg,#07111f,#18243f); color:#f8fafc; padding:1rem; }`,
    `.auth-card { width:min(100%,430px); background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.14); border-radius:1.5rem; padding:2rem; box-shadow:0 18px 60px rgba(0,0,0,.22); animation:fadeUp .4s ease-out; }`,
    `.brand { font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:#8fb4ff; }`,
    `h1 { margin:.6rem 0 .25rem; font-size:1.8rem; }`,
    `p { color:#b9c7e6; margin-bottom:1rem; font-size:.9rem; }`,
    `.employee-card { display:flex; align-items:center; gap:.85rem; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); border-radius:1rem; padding:.85rem; margin:1.2rem 0; }`,
    `.avatar { width:44px; height:44px; min-width:44px; border-radius:50%; display:grid; place-items:center; background:linear-gradient(135deg,#7c8dff,#52c6ff); font-weight:700; font-size:1.2rem; }`,
    `.employee-card div { display:flex; flex-direction:column; gap:.15rem; }`,
    `.muted { color:#aac0e5; font-size:.82rem; }`,
    `.field { display:flex; flex-direction:column; gap:.35rem; margin-bottom:1rem; }`,
    `.field span { color:#b9c7e6; font-size:.82rem; font-weight:500; }`,
    `input { border:1px solid rgba(255,255,255,.2); border-radius:.95rem; padding:.85rem 1rem; font-size:1.5rem; letter-spacing:.5em; text-align:center; background:rgba(255,255,255,.12); color:white; outline:none; transition:border-color .2s; font-family:inherit; width:100%; }`,
    `input:focus { border-color:#7c8dff; }`,
    `input::placeholder { letter-spacing:.1em; font-size:.85rem; color:rgba(255,255,255,.25); }`,
    `.keypad { display:grid; grid-template-columns:repeat(3, 1fr); gap:.55rem; margin:.8rem 0 1rem; }`,
    `.kp-key { height:3.2rem; border:none; border-radius:.85rem; background:rgba(255,255,255,.1); color:#f3f6ff; font-size:1.35rem; font-weight:600; cursor:pointer; transition:all .15s; font-family:inherit; }`,
    `.kp-key:active { transform:scale(.93); background:rgba(255,255,255,.2); }`,
    `.kp-fn { background:rgba(255,255,255,.06); color:#b9c7e6; font-size:1.1rem; }`,
    `.btn { width:100%; border:none; border-radius:.9rem; padding:.85rem; font-weight:700; font-size:1rem; cursor:pointer; transition:transform .15s, box-shadow .2s; }`,
    `.btn:active { transform:scale(.97); }`,
    `.btn-primary { background:linear-gradient(135deg,#7c8dff,#52c6ff); color:#07111f; }`,
    `.btn-primary:disabled { opacity:.4; cursor:default; transform:none; }`,
    `.pin-footer { display:flex; justify-content:space-between; align-items:center; margin-top:.75rem; }`,
    `.btn-ghost { background:none; border:none; color:#8fb4ff; cursor:pointer; font-size:.85rem; padding:.4rem 0; transition:color .2s; }`,
    `.btn-ghost:hover { color:#b9c7e6; }`
  ]
})
export class PinComponent {
  private readonly appState: AppStateService = inject(AppStateService);
  private readonly auth: AuthService = inject(AuthService);
  pin = '';
  loading = false;
  business = this.appState.session().business;

  addDigit(digit: string) {
    if (this.pin.length < 4) this.pin += digit;
  }

  deleteDigit() {
    this.pin = this.pin.slice(0, -1);
  }

  submitPin() {
    if (this.loading || this.pin.length < 4 || !this.business) return;
    this.loading = true;
    this.auth.verifyPin(this.business.id, this.pin).subscribe({
      next: (res) => {
        this.loading = false;
        const employee: EmployeeInfo = {
          id: res.userId,
          name: res.userName,
          role: res.role
        };
        this.appState.setEmployee(employee, res.token);
      },
      error: (err) => {
        this.loading = false;
        this.pin = '';
        const msg = err.error?.error || 'PIN verification failed. Is the server running?';
        this.appState.showToast(msg, 'error');
      }
    });
  }

  logout() {
    this.appState.logoutBusiness();
  }
}
