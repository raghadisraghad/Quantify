import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { salesData } from '../../shared/data/mock-data';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page page-fade">
      <div class="page-header">
        <div>
          <div class="eyebrow">Sales</div>
          <h2>Sales performance and transactions</h2>
        </div>
        <button type="button" class="btn-primary">New transaction</button>
      </div>

      <div class="card">
        <div class="bars">
          <div class="bar-col" *ngFor="let point of salesData">
            <div class="bar" [style.height.%]="(point.revenue / 140) * 100"></div>
            <span>{{ point.day }}</span>
          </div>
        </div>
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
    .card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); }
    .bars { display:grid; grid-template-columns:repeat(6, 1fr); gap:.75rem; align-items:end; height:200px; }
    .bar-col { display:flex; flex-direction:column; align-items:center; gap:.4rem; }
    .bar-col span { font-size:.72rem; color:var(--text-light); margin-top:.2rem; }
    .bar { width:100%; background:linear-gradient(180deg,#7c8dff,#49b8ff); border-radius:999px 999px 0 0; min-height:22px; transition:height .4s ease; }
    @media (max-width: 700px) { .page-header { flex-direction:column; align-items:flex-start; } .bars { grid-template-columns:repeat(3,1fr); height:150px; } }
  `]
})
export class SalesComponent {
  readonly salesData = salesData;
}
