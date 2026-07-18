import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppStateService, BusinessInfo } from '../../../shared/services/app-state.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-shell">
      <div class="auth-card">
        <div class="brand">Quantify</div>
        <h1>Business Login</h1>
        <p>Access inventory, procurement, sales, and AI-ready operations.</p>

        <form (ngSubmit)="submitLogin()" #loginForm="ngForm">
          <label class="field">
            <span>Email</span>
            <input type="email" name="email" [(ngModel)]="email" required #emailInput="ngModel" [pattern]="emailPattern" autofocus />
            <div class="field-error" *ngIf="emailInput.invalid && emailInput.touched">Please enter a valid email address.</div>
          </label>

          <label class="field">
            <span>Password</span>
            <div class="pw-row">
              <input [type]="showPassword ? 'text' : 'password'" name="password" [(ngModel)]="password" required />
              <button type="button" class="pw-toggle" (click)="showPassword = !showPassword">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sm">
                  <path *ngIf="!showPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle *ngIf="!showPassword" cx="12" cy="12" r="3"/>
                  <path *ngIf="showPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </label>

          <label class="checkbox-row">
            <input type="checkbox" name="remember" [(ngModel)]="remember" />
            <span>Remember me</span>
          </label>

          <button class="btn btn-primary" type="submit" [disabled]="loading || loginForm.invalid">
            {{ loading ? 'Signing in...' : 'Login' }}
          </button>
          <div class="kbd-hint">Press <kbd>Enter</kbd> to submit</div>
        </form>

        <div class="helper-links">
          <a routerLink="/">Back home</a>
          <a href="#">Forgot password</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `@keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }`,
    `.auth-shell { min-height:100vh; display:grid; place-items:center; background:linear-gradient(135deg,#f6f8ff,#eef4ff); padding:1rem; }`,
    `.auth-card { width:min(100%,440px); background:white; border-radius:1.5rem; padding:2rem; box-shadow:0 20px 60px rgba(15,23,42,.12); animation:fadeUp .4s ease-out; }`,
    `.brand { font-weight:800; letter-spacing:.1em; text-transform:uppercase; color:#4756c8; }`,
    `h1 { margin:.6rem 0 .25rem; font-size:1.8rem; color:#0f172a; }`,
    `p { color:#64748b; margin-bottom:1.4rem; }`,
    `.field { display:flex; flex-direction:column; gap:.35rem; margin-bottom:1rem; }`,
    `.field span { font-size:.82rem; font-weight:600; color:#334155; }`,
    `input { border:1px solid #d8deeb; border-radius:.9rem; padding:.85rem 1rem; font:inherit; outline:none; transition:border-color .2s; }`,
    `input:focus { border-color:#7c8dff; box-shadow:0 0 0 3px rgba(124,141,255,.15); }`,
    `input.ng-invalid.ng-touched { border-color:#ef4444; }`,
    `.field-error { color:#ef4444; font-size:.8rem; margin-top:.25rem; }`,
    `.pw-row { display:flex; align-items:center; gap:.4rem; }`,
    `.pw-row input { flex:1; }`,
    `.pw-toggle { background:none; border:1px solid #d8deeb; border-radius:.9rem; padding:.65rem .7rem; cursor:pointer; color:#64748b; display:grid; place-items:center; transition:background .15s; }`,
    `.pw-toggle:hover { background:#f1f5f9; }`,
    `.icon-sm { width:18px; height:18px; }`,
    `.checkbox-row { display:flex; align-items:center; gap:.5rem; margin:1rem 0 1.2rem; color:#334155; font-size:.9rem; }`,
    `.kbd-hint { text-align:center; color:#94a3b8; font-size:.78rem; margin-top:.4rem; }`,
    `.kbd-hint kbd { display:inline-block; padding:.1rem .45rem; border:1px solid #d8deeb; border-radius:.35rem; font-size:.7rem; font-family:inherit; background:#f1f5f9; color:#334155; margin:0 .1rem; }`,
    `.btn { width:100%; border:none; padding:.9rem 1rem; border-radius:.95rem; font-weight:700; cursor:pointer; transition:transform .15s, box-shadow .2s; font-size:1rem; }`,
    `.btn:active { transform:scale(.98); }`,
    `.btn-primary { background:linear-gradient(135deg,#6c7dfc,#49b8ff); color:white; }`,
    `.btn-primary:disabled { opacity:.5; cursor:default; transform:none; }`,
    `.helper-links { display:flex; justify-content:space-between; margin-top:1rem; font-size:.9rem; }`,
    `a { color:#4756c8; text-decoration:none; font-weight:500; }`,
    `a:hover { text-decoration:underline; }`
  ]
})
export class LoginComponent {
  private readonly appState: AppStateService = inject(AppStateService);
  private readonly auth: AuthService = inject(AuthService);
  email = '';
  password = '';
  remember = true;
  loading = false;
  showPassword = false;
  emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

  submitLogin() {
    if (this.loading || !this.email || !this.password) return;
    this.loading = true;
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.loading = false;
        const business: BusinessInfo = {
          id: res.businessId,
          name: res.businessName,
          slug: res.businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          type: res.type,
          owner: res.email,
          email: res.email,
          phone: '',
          address: ''
        };
        this.appState.loginBusiness(business, res.token);
      },
      error: (err) => {
        this.loading = false;
        const msg = err.error?.error || 'Connection failed. Is the server running?';
        this.appState.showToast(msg, 'error');
      }
    });
  }
}
