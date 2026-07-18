import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { inventoryItems, products, employeeTasks, expiringProducts, employeeQuickActions, notifications } from '../../shared/data/mock-data';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dash page-fade">
      <div class="dash-header">
        <div>
          <div class="eyebrow">Good {{ timeOfDay }}, {{ session().employee?.name }}</div>
          <h1>Operations</h1>
        </div>
      </div>

      <div class="quick-actions">
        <a *ngFor="let action of quickActions" [routerLink]="action.route" class="qa-chip">
          <span class="qa-icon">{{ action.icon }}</span>
          <span>{{ action.label }}</span>
        </a>
      </div>

      <div class="grid cards-grid">
        <article class="stat-card" *ngFor="let item of inventoryStats">
          <div class="stat-label">{{ item.label }}</div>
          <div class="stat-value" [class.text-warning]="item.warning">{{ item.value }}</div>
          <div class="stat-detail">{{ item.detail }}</div>
        </article>
      </div>

      <div class="grid two-col">
        <article class="card">
          <div class="card-header">
            <h3>Inventory Status</h3>
            <span class="badge" *ngIf="lowStockCount > 0">{{ lowStockCount }} need attention</span>
          </div>
          <ul class="list">
            <li *ngFor="let item of inventoryItems">
              <div class="li-left">
                <strong>{{ item.name }}</strong>
                <span class="li-sub">{{ item.category }}</span>
              </div>
              <div class="li-right">
                <strong [class.warning]="item.status === 'Low Stock'" [class.danger]="item.status === 'Critical'">{{ item.quantity }}{{ item.unit }}</strong>
                <span class="tag" [class.tag-warning]="item.status === 'Low Stock'" [class.tag-danger]="item.status === 'Critical'">{{ item.status }}</span>
              </div>
            </li>
          </ul>
        </article>

        <article class="card">
          <div class="card-header">
            <h3>Tasks</h3>
            <span class="badge">{{ tasks.length }} open</span>
          </div>
          <ul class="list">
            <li *ngFor="let task of tasks">
              <div class="li-left">
                <strong>{{ task.task }}</strong>
                <span class="li-sub">{{ task.assignee }} · {{ task.due }}</span>
              </div>
              <span class="tag" [class.tag-danger]="task.priority === 'High'" [class.tag-warning]="task.priority === 'Medium'">{{ task.priority }}</span>
            </li>
          </ul>
        </article>
      </div>

      <div class="grid two-col">
        <article class="card">
          <div class="card-header">
            <h3>Expiring Products</h3>
            <span class="badge" *ngIf="expiring.length > 0">{{ expiring.length }} items</span>
          </div>
          <ul class="list">
            <li *ngFor="let item of expiring">
              <div class="li-left">
                <strong>{{ item.name }}</strong>
                <span class="li-sub">{{ item.quantity }}</span>
              </div>
              <span class="tag tag-danger">{{ item.expires }}</span>
            </li>
            <li *ngIf="expiring.length === 0" class="empty-item">No expiring products</li>
          </ul>
        </article>

        <article class="card">
          <div class="card-header">
            <h3>Recent Activity</h3>
          </div>
          <ul class="list">
            <li *ngFor="let n of recentNotifications">
              <div class="li-left">
                <strong>{{ n.title }}</strong>
                <span class="li-sub">{{ n.time }}</span>
              </div>
              <span class="unread-dot" *ngIf="n.unread"></span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `.dash { display:flex; flex-direction:column; gap:1.25rem; }`,
    `.dash-header h1 { margin:0; font-size:1.6rem; color:var(--text-primary); }`,
    `.eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.78rem; color:#8fb4ff; margin-bottom:.25rem; }`,
    `.quick-actions { display:flex; gap:.65rem; flex-wrap:wrap; }`,
    `.qa-chip { display:flex; align-items:center; gap:.5rem; background:var(--bg-card); border-radius:999px; padding:.55rem 1rem; text-decoration:none; color:var(--text-primary); font-weight:600; font-size:.85rem; box-shadow:var(--shadow-card); transition:transform .15s, box-shadow .2s; }`,
    `.qa-chip:hover { transform:translateY(-2px); box-shadow:0 8px 20px rgba(15,23,42,.1); }`,
    `.qa-icon { font-size:1.1rem; }`,
    `.grid { display:grid; gap:1rem; }`,
    `.cards-grid { grid-template-columns:repeat(4, minmax(0,1fr)); }`,
    `.two-col { grid-template-columns:repeat(2, minmax(0,1fr)); }`,
    `.stat-card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); transition:transform .2s, box-shadow .2s; }`,
    `.stat-card:hover { transform:translateY(-2px); box-shadow:0 12px 35px rgba(15,23,42,.1); }`,
    `.stat-label { color:var(--text-muted); font-size:.78rem; text-transform:uppercase; letter-spacing:.08em; }`,
    `.stat-value { font-size:1.6rem; font-weight:800; margin:.3rem 0 .15rem; color:var(--text-primary); }`,
    `.stat-detail { font-size:.78rem; color:var(--text-light); }`,
    `.text-warning { color:#b45309; }`,
    `.card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); transition:transform .2s, box-shadow .2s; }`,
    `.card:hover { box-shadow:0 12px 35px rgba(15,23,42,.08); }`,
    `.card-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; }`,
    `.card-header h3 { font-size:1.05rem; margin:0; color:var(--text-primary); }`,
    `.badge { background:#eef4ff; color:#4756c8; padding:.25rem .65rem; border-radius:999px; font-size:.75rem; font-weight:600; }`,
    `.list { display:flex; flex-direction:column; gap:0; padding:0; margin:0; list-style:none; }`,
    `.list li { display:flex; justify-content:space-between; align-items:center; gap:1rem; padding:.75rem .2rem; border-bottom:1px solid var(--border-table); animation:fadeIn .3s ease-out; }`,
    `.list li:last-child { border-bottom:none; }`,
    `.li-left { display:flex; flex-direction:column; gap:.1rem; flex:1; }`,
    `.li-left strong { font-size:.9rem; color:var(--text-primary); }`,
    `.li-sub { font-size:.78rem; color:var(--text-light); }`,
    `.li-right { display:flex; align-items:center; gap:.5rem; }`,
    `.tag { font-size:.7rem; padding:.2rem .55rem; border-radius:999px; background:var(--bg-hover); color:var(--text-muted); font-weight:600; text-transform:uppercase; white-space:nowrap; }`,
    `.tag-warning { background:#fef3c7; color:#b45309; }`,
    `.tag-danger { background:#fee2e2; color:#dc2626; }`,
    `.warning { color:#b45309; }`,
    `.danger { color:#dc2626; }`,
    `.unread-dot { width:8px; height:8px; border-radius:50%; background:#4756c8; flex-shrink:0; }`,
    `.empty-item { color:#94a3b8; font-style:italic; justify-content:center; padding:1rem; }`,
    `@media (max-width: 1100px) { .cards-grid { grid-template-columns:repeat(2, minmax(0,1fr)); } .two-col { grid-template-columns:1fr; } }`,
    `@media (max-width: 760px) { .cards-grid { grid-template-columns:1fr; } }`
  ]
})
export class EmployeeDashboardComponent {
  private readonly appState = inject(AppStateService);
  readonly session = this.appState.session;
  readonly inventoryItems = inventoryItems;
  readonly tasks = employeeTasks;
  readonly expiring = expiringProducts;
  readonly quickActions = employeeQuickActions;

  get lowStockCount() {
    return this.inventoryItems.filter((i) => i.status === 'Low Stock' || i.status === 'Critical').length;
  }

  get inventoryStats() {
    const total = this.inventoryItems.reduce((s, i) => s + i.quantity, 0);
    return [
      { label: 'Total Items', value: this.inventoryItems.length, detail: 'ingredients tracked', warning: false },
      { label: 'Low Stock', value: this.lowStockCount, detail: 'items need reorder', warning: this.lowStockCount > 0 },
      { label: 'Total Quantity', value: total, detail: 'units in stock', warning: false },
      { label: 'Tasks Today', value: this.tasks.length, detail: 'pending assignments', warning: false }
    ];
  }

  get recentNotifications() {
    return notifications.slice(0, 4);
  }

  get timeOfDay() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }
}
