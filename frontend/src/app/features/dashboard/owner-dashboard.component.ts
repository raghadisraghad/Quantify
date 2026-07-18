import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ownerAnalyticsCards, salesData, monthlyProfit, purchaseOrders, products, inventoryItems, employeeProfiles, aiInsights } from '../../shared/data/mock-data';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dash page-fade">
      <div class="dash-header">
        <div>
          <div class="eyebrow">Owner Dashboard</div>
          <h1>{{ session().business.name }}</h1>
        </div>
        <div class="dash-badges">
          <span class="status-badge healthy">Business Health: Good</span>
        </div>
      </div>

      <div class="grid cards-grid">
        <article class="stat-card" *ngFor="let card of analyticsCards">
          <div class="stat-label">{{ card.label }}</div>
          <div class="stat-value">{{ card.value }}</div>
          <div class="stat-footer">
            <span class="stat-delta" [class.positive]="card.delta.startsWith('+')" [class.negative]="card.delta.startsWith('-')">{{ card.delta }}</span>
            <span class="stat-detail">{{ card.detail }}</span>
          </div>
        </article>
      </div>

      <div class="grid two-col">
        <article class="card">
          <div class="card-header">
            <h3>Revenue Trend</h3>
            <span class="badge">This week</span>
          </div>
          <div class="bars">
            <div class="bar-col" *ngFor="let point of salesData">
              <div class="bar" [style.height.%]="(point.revenue / 120) * 100"></div>
              <div class="bar-target" [style.height.%]="(point.target / 120) * 100"></div>
              <span>{{ point.day }}</span>
            </div>
          </div>
          <div class="legend">
            <span><span class="dot dot-primary"></span> Revenue</span>
            <span><span class="dot dot-target"></span> Target</span>
          </div>
        </article>

        <article class="card">
          <div class="card-header">
            <h3>Profit vs Expenses</h3>
            <span class="badge">6 months</span>
          </div>
          <div class="bars two-bars">
            <div class="bar-col" *ngFor="let m of monthlyProfit">
              <div class="bar profit" [style.height.%]="(m.profit / 350) * 100"></div>
              <div class="bar expense" [style.height.%]="(m.expenses / 350) * 100"></div>
              <span>{{ m.month }}</span>
            </div>
          </div>
          <div class="legend">
            <span><span class="dot dot-profit"></span> Profit</span>
            <span><span class="dot dot-expense"></span> Expenses</span>
          </div>
        </article>
      </div>

      <div class="grid two-col">
        <article class="card">
          <div class="card-header">
            <h3>Purchase Orders</h3>
            <span class="badge">{{ purchaseOrders.length }} total</span>
          </div>
          <ul class="list">
            <li *ngFor="let po of purchaseOrders">
              <div class="li-left">
                <strong>{{ po.id }}</strong>
                <span class="li-sub">{{ po.supplier }} · {{ po.eta }}</span>
              </div>
              <div class="li-right">
                <strong>MAD {{ po.total }}</strong>
                <span class="tag" [class.tag-success]="po.status === 'Received'" [class.tag-warning]="po.status === 'Pending'">{{ po.status }}</span>
              </div>
            </li>
          </ul>
        </article>

        <article class="card">
          <div class="card-header">
            <h3>Inventory Overview</h3>
            <span class="badge">{{ lowStock }} low stock</span>
          </div>
          <ul class="list">
            <li *ngFor="let item of inventoryItems">
              <div class="li-left">
                <strong>{{ item.name }}</strong>
                <span class="li-sub">{{ item.category }}</span>
              </div>
              <div class="li-right">
                <strong>{{ item.quantity }}{{ item.unit }}</strong>
                <span class="tag" [class.tag-danger]="item.status === 'Critical'" [class.tag-warning]="item.status === 'Low Stock'">{{ item.status }}</span>
              </div>
            </li>
          </ul>
        </article>
      </div>

      <div class="grid two-col">
        <article class="card">
          <div class="card-header">
            <h3>Team</h3>
            <span class="badge">{{ employees.length }} active</span>
          </div>
          <ul class="list">
            <li *ngFor="let emp of employees">
              <div class="li-left">
                <strong>{{ emp.name }}</strong>
                <span class="li-sub">{{ emp.role }}</span>
              </div>
              <span class="tag" [class.tag-success]="emp.status === 'Active'">{{ emp.status }}</span>
            </li>
          </ul>
        </article>

        <article class="card">
          <div class="card-header">
            <h3>Top Products</h3>
            <span class="badge">by margin</span>
          </div>
          <ul class="list">
            <li *ngFor="let p of topProducts">
              <div class="li-left">
                <strong>{{ p.name }}</strong>
                <span class="li-sub">{{ p.category }}</span>
              </div>
              <div class="li-right">
                <strong>{{ p.margin }}%</strong>
                <span class="tag">MAD {{ p.price }}</span>
              </div>
            </li>
          </ul>
        </article>
      </div>

      <article class="card ai-card">
        <div class="card-header">
          <h3>AI Insights</h3>
          <span class="badge ai-badge">Powered by Analytics</span>
        </div>
        <div class="ai-grid">
          <div class="ai-item" *ngFor="let insight of aiInsights">
            <span class="ai-type" [class.forecast]="insight.type === 'forecast'" [class.recommendation]="insight.type === 'recommendation'" [class.trend]="insight.type === 'trend'">{{ insight.type }}</span>
            <p>{{ insight.insight }}</p>
          </div>
        </div>
      </article>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `.dash { display:flex; flex-direction:column; gap:1.25rem; }`,
    `.dash-header { display:flex; justify-content:space-between; align-items:center; }`,
    `.dash-header h1 { margin:0; font-size:1.6rem; color:var(--text-primary); }`,
    `.eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.78rem; color:#8fb4ff; margin-bottom:.25rem; }`,
    `.status-badge { padding:.35rem .85rem; border-radius:999px; font-size:.78rem; font-weight:600; }`,
    `.status-badge.healthy { background:#dcfce7; color:#16a34a; }`,
    `.grid { display:grid; gap:1rem; }`,
    `.cards-grid { grid-template-columns:repeat(3, minmax(0,1fr)); }`,
    `.two-col { grid-template-columns:repeat(2, minmax(0,1fr)); }`,
    `.stat-card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); transition:transform .2s, box-shadow .2s; }`,
    `.stat-card:hover { transform:translateY(-2px); box-shadow:0 12px 35px rgba(15,23,42,.1); }`,
    `.stat-label { color:var(--text-muted); font-size:.78rem; text-transform:uppercase; letter-spacing:.08em; }`,
    `.stat-value { font-size:1.5rem; font-weight:800; margin:.3rem 0 .2rem; color:var(--text-primary); }`,
    `.stat-footer { display:flex; align-items:center; gap:.5rem; }`,
    `.stat-delta { font-size:.85rem; font-weight:600; }`,
    `.stat-delta.positive { color:#22c55e; }`,
    `.stat-delta.negative { color:#ef4444; }`,
    `.stat-detail { font-size:.78rem; color:var(--text-light); }`,
    `.card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); transition:transform .2s, box-shadow .2s; }`,
    `.card:hover { box-shadow:0 12px 35px rgba(15,23,42,.08); }`,
    `.card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; }`,
    `.card-header h3 { font-size:1.05rem; margin:0; color:var(--text-primary); }`,
    `.badge { background:#eef4ff; color:#4756c8; padding:.25rem .65rem; border-radius:999px; font-size:.75rem; font-weight:600; }`,
    `.ai-badge { background:#f0fdf4; color:#16a34a; }`,
    `.bars { display:grid; grid-template-columns:repeat(6, 1fr); gap:.5rem; align-items:end; height:150px; margin-top:.5rem; position:relative; }`,
    `.two-bars { height:140px; }`,
    `.bar-col { display:flex; flex-direction:column; align-items:center; gap:.25rem; }`,
    `.bar { width:65%; background:linear-gradient(180deg,#7c8dff,#49b8ff); border-radius:6px 6px 0 0; min-height:8px; transition:height .4s ease; }`,
    `.bar.profit { background:linear-gradient(180deg,#22c55e,#16a34a); }`,
    `.bar.expense { background:linear-gradient(180deg,#f87171,#ef4444); }`,
    `.bar-target { width:65%; background:#fee2e2; border-radius:6px 6px 0 0; min-height:4px; }`,
    `.bar-col span { font-size:.68rem; color:var(--text-light); margin-top:.2rem; }`,
    `.legend { display:flex; gap:1.5rem; justify-content:center; margin-top:.75rem; font-size:.78rem; color:var(--text-muted); }`,
    `.dot { display:inline-block; width:10px; height:10px; border-radius:50%; margin-right:.35rem; vertical-align:middle; }`,
    `.dot-primary { background:#7c8dff; }`,
    `.dot-target { background:#fee2e2; }`,
    `.dot-profit { background:#22c55e; }`,
    `.dot-expense { background:#f87171; }`,
    `.list { display:flex; flex-direction:column; gap:0; padding:0; margin:0; list-style:none; }`,
    `.list li { display:flex; justify-content:space-between; align-items:center; gap:1rem; padding:.7rem .2rem; border-bottom:1px solid var(--border-table); }`,
    `.list li:last-child { border-bottom:none; }`,
    `.li-left { display:flex; flex-direction:column; gap:.1rem; flex:1; }`,
    `.li-left strong { font-size:.9rem; color:var(--text-primary); }`,
    `.li-sub { font-size:.78rem; color:var(--text-light); }`,
    `.li-right { display:flex; align-items:center; gap:.5rem; }`,
    `.tag { font-size:.7rem; padding:.2rem .55rem; border-radius:999px; background:var(--bg-hover); color:var(--text-muted); font-weight:600; text-transform:uppercase; white-space:nowrap; }`,
    `.tag-success { background:#dcfce7; color:#16a34a; }`,
    `.tag-warning { background:#fef3c7; color:#b45309; }`,
    `.tag-danger { background:#fee2e2; color:#dc2626; }`,
    `.light .ai-card, :root .ai-card { background:linear-gradient(135deg,#f0f9ff,#e0f2fe); border-color:#bae6fd; }`,
    `.dark .ai-card { background:var(--bg-card); border-color:var(--border-light); }`,
    `.ai-card { transition:background .3s, border-color .3s; }`,
    `.ai-grid { display:flex; flex-direction:column; gap:.75rem; }`,
    `.ai-item { background:var(--bg-card); border-radius:.9rem; padding:.85rem 1rem; border:1px solid #e0f2fe; }`,
    `.dark .ai-item { border-color:var(--border-light); }`,
    `.ai-item p { margin:.35rem 0 0; font-size:.9rem; color:var(--text-primary); line-height:1.4; }`,
    `.ai-type { display:inline-block; font-size:.7rem; padding:.15rem .5rem; border-radius:999px; font-weight:600; text-transform:uppercase; }`,
    `.ai-type.forecast { background:#dbeafe; color:#1d4ed8; }`,
    `.ai-type.recommendation { background:#fef3c7; color:#b45309; }`,
    `.ai-type.trend { background:#dcfce7; color:#16a34a; }`,
    `@media (max-width: 1100px) { .cards-grid { grid-template-columns:repeat(2, minmax(0,1fr)); } .two-col { grid-template-columns:1fr; } }`,
    `@media (max-width: 760px) { .cards-grid { grid-template-columns:1fr; } .dash-header { flex-direction:column; align-items:flex-start; gap:.5rem; } }`
  ]
})
export class OwnerDashboardComponent {
  private readonly appState = inject(AppStateService);
  readonly session = this.appState.session;
  readonly analyticsCards = ownerAnalyticsCards;
  readonly salesData = salesData;
  readonly monthlyProfit = monthlyProfit;
  readonly purchaseOrders = purchaseOrders;
  readonly inventoryItems = inventoryItems;
  readonly employees = employeeProfiles;
  readonly aiInsights = aiInsights;

  get lowStock() {
    return this.inventoryItems.filter((i) => i.status === 'Low Stock' || i.status === 'Critical').length;
  }

  get topProducts() {
    return [...products].sort((a, b) => b.margin - a.margin).slice(0, 4);
  }
}
