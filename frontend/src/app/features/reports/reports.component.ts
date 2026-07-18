import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page page-fade">
      <div class="page-header">
        <div>
          <div class="eyebrow">Reports</div>
          <h2>Inventory, sales, procurement, and profit reporting</h2>
        </div>
        <button type="button" class="btn-primary">Export PDF</button>
      </div>

      <div class="grid">
        <article class="card">Inventory report placeholder</article>
        <article class="card">Sales report placeholder</article>
        <article class="card">Procurement report placeholder</article>
        <article class="card">Profit report placeholder</article>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .page { display:flex; flex-direction:column; gap:1.25rem; }
    .page-header { display:flex; justify-content:space-between; align-items:center; }
    .page-header h2 { margin:0; font-size:1rem; font-weight:600; color:var(--text-secondary); }
    .eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.72rem; color:#8fb4ff; margin-bottom:.2rem; font-weight:700; }
    .btn-primary { background:#4756c8; color:white; border:none; border-radius:.75rem; padding:.6rem 1rem; font:inherit; font-weight:600; cursor:pointer; }
    .grid { display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:1rem; }
    .card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); min-height:120px; display:grid; place-items:center; color:var(--text-muted); font-size:.9rem; }
    @media (max-width: 760px) { .grid { grid-template-columns:1fr; } .page-header { flex-direction:column; align-items:flex-start; } }
  `]
})
export class ReportsComponent {}
