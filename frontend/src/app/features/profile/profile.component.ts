import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page page-fade">
      <div class="page-header">
        <div>
          <div class="eyebrow">Profile</div>
          <h2>Current employee and business profile</h2>
        </div>
      </div>

      <div class="grid">
        <article class="card">
          <div class="card-title">Employee</div>
          <div class="card-value">{{ session.employee?.name }}</div>
          <div class="card-meta">{{ session.employee?.role }}</div>
        </article>
        <article class="card">
          <div class="card-title">Business</div>
          <div class="card-value">{{ session.business?.name }}</div>
          <div class="card-meta">{{ session.business?.type }}</div>
        </article>
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
    .card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); }
    .card-title { color:var(--text-muted); text-transform:uppercase; font-size:.78rem; letter-spacing:.06em; font-weight:600; }
    .card-value { font-size:1.3rem; font-weight:800; margin:.35rem 0; color:var(--text-primary); }
    .card-meta { color:var(--text-muted); font-size:.85rem; }
    @media (max-width: 760px) { .grid { grid-template-columns:1fr; } .page-header { flex-direction:column; align-items:flex-start; } }
  `]
})
export class ProfileComponent {
  private readonly appState = inject(AppStateService);
  readonly session = this.appState.session();
}
