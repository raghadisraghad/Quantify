import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page page-fade">
      <div class="page-header">
        <div>
          <div class="eyebrow">Settings</div>
          <h2>Business profile and security controls</h2>
        </div>
      </div>

      <div class="grid">
        <article class="card">Business profile</article>
        <article class="card">Locations</article>
        <article class="card">Taxes & preferences</article>
        <article class="card">Security and branding</article>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .page { display:flex; flex-direction:column; gap:1.25rem; }
    .page-header { display:flex; justify-content:space-between; align-items:center; }
    .page-header h2 { margin:0; font-size:1rem; font-weight:600; color:var(--text-secondary); }
    .eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.72rem; color:#8fb4ff; margin-bottom:.2rem; font-weight:700; }
    .grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:1rem; }
    .card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); min-height:120px; display:grid; place-items:center; color:var(--text-muted); font-size:.9rem; }
    @media (max-width: 760px) { .grid { grid-template-columns:1fr; } .page-header { flex-direction:column; align-items:flex-start; } }
  `]
})
export class SettingsComponent {}
