import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { orders } from '../../shared/data/mock-data';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">
      <div class="page-head">
        <div>
          <div class="eyebrow">Orders</div>
          <h1>Order Management</h1>
        </div>
        <button class="btn btn-primary">+ New Order</button>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search orders..." [(ngModel)]="searchQuery" (input)="applyFilters()" />
        </div>
        <select [(ngModel)]="statusFilter" (change)="applyFilters()">
          <option value="">All statuses</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div class="card">
        <table>
          <thead>
            <tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Time</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let o of pagedItems">
              <td class="cell-id">{{ o.id }}</td>
              <td>{{ o.customer }}</td>
              <td>{{ o.items }}</td>
              <td class="cell-price">MAD {{ o.total }}</td>
              <td><span class="tag">{{ o.payment }}</span></td>
              <td><span class="badge" [class.completed]="o.status === 'Completed'" [class.progress]="o.status === 'In Progress'" [class.pending]="o.status === 'Pending'">{{ o.status }}</span></td>
              <td class="cell-time">{{ o.time }}</td>
              <td><button class="text-btn">View</button></td>
            </tr>
            <tr *ngIf="pagedItems.length === 0"><td colspan="8" class="empty-cell">No orders found</td></tr>
          </tbody>
        </table>
        <div class="pagination" *ngIf="totalPages > 1">
          <span class="page-info">{{ filteredItems.length }} orders · Page {{ currentPage + 1 }} of {{ totalPages }}</span>
          <div class="page-btns">
            <button class="page-btn" [disabled]="currentPage === 0" (click)="prevPage()">‹</button>
            <span class="page-num" *ngFor="let p of pages" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p + 1 }}</span>
            <button class="page-btn" [disabled]="currentPage >= totalPages - 1" (click)="nextPage()">›</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .page { display:flex; flex-direction:column; gap:1.25rem; }
    .page-head { display:flex; justify-content:space-between; align-items:center; }
    .page-head h1 { margin:0; font-size:1.5rem; color:var(--text-primary); }
    .eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.75rem; color:#8fb4ff; margin-bottom:.2rem; }
    .btn { border:none; border-radius:.85rem; padding:.65rem 1.1rem; font-weight:600; cursor:pointer; font-size:.88rem; transition:transform .12s; }
    .btn:active { transform:scale(.97); }
    .btn-primary { background:linear-gradient(135deg,#7c8dff,#52c6ff); color:white; }
    .toolbar { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }
    .search-wrap { display:flex; align-items:center; gap:.5rem; background:var(--bg-card); border:1px solid var(--border-input); border-radius:.85rem; padding:0 .85rem; flex:1; min-width:200px; }
    .search-icon { width:16px; height:16px; color:var(--text-light); flex-shrink:0; }
    .search-wrap input { border:none; padding:.65rem 0; outline:none; flex:1; font:inherit; background:transparent; color:var(--text-primary); }
    select { border:1px solid var(--border-input); border-radius:.85rem; padding:.65rem .85rem; font:inherit; background:var(--bg-card); color:var(--text-primary); outline:none; min-width:150px; }
    .card { background:var(--bg-card); border-radius:1.2rem; overflow:hidden; box-shadow:var(--shadow-card); }
    table { width:100%; border-collapse:collapse; }
    th { text-align:left; padding:.85rem 1rem; font-size:.75rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:.08em; background:var(--bg-table-head); font-weight:600; }
    td { padding:.7rem 1rem; border-top:1px solid var(--border-table); font-size:.88rem; color:var(--text-primary); }
    .cell-id { font-weight:600; font-family:monospace; }
    .cell-price { font-weight:700; }
    .cell-time { color:var(--text-muted); }
    .tag { display:inline-block; font-size:.7rem; padding:.2rem .55rem; border-radius:999px; background:var(--bg-hover); color:var(--text-muted); font-weight:600; }
    .badge { display:inline-flex; padding:.25rem .6rem; border-radius:999px; font-size:.72rem; font-weight:600; }
    .badge.completed { background:#ecfdf3; color:#047857; }
    .badge.progress { background:#fef3c7; color:#b45309; }
    .badge.pending { background:#eef4ff; color:#4756c8; }
    .text-btn { background:none; border:none; color:#4756c8; cursor:pointer; font-weight:600; font-size:.82rem; padding:.3rem; }
    .empty-cell { text-align:center; color:var(--text-light); padding:2rem; font-style:italic; }
    .pagination { display:flex; justify-content:space-between; align-items:center; padding:.75rem 1rem; border-top:1px solid var(--border-table); }
    .page-info { font-size:.78rem; color:var(--text-muted); }
    .page-btns { display:flex; align-items:center; gap:.25rem; }
    .page-btn { background:none; border:1px solid var(--border-input); border-radius:.5rem; padding:.3rem .6rem; cursor:pointer; font-size:.9rem; color:var(--text-secondary); transition:all .15s; }
    .page-btn:hover:not(:disabled) { background:var(--bg-hover); }
    .page-btn:disabled { opacity:.4; cursor:default; }
    .page-num { min-width:28px; height:28px; display:grid; place-items:center; border-radius:.4rem; font-size:.78rem; cursor:pointer; color:var(--text-muted); transition:all .15s; }
    .page-num:hover { background:var(--bg-hover); }
    .page-num.active { background:#4756c8; color:white; }
    @media (max-width: 760px) { .page-head { flex-direction:column; align-items:flex-start; } .card { overflow-x:auto; } }
  `]
})
export class OrdersComponent {
  readonly allItems = orders;
  searchQuery = '';
  statusFilter = '';
  filteredItems = [...orders];
  currentPage = 0;
  pageSize = 5;

  applyFilters() {
    let items = this.allItems;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((o) => o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q));
    }
    if (this.statusFilter) items = items.filter((o) => o.status === this.statusFilter);
    this.filteredItems = items;
    this.currentPage = 0;
  }

  get totalPages() { return Math.ceil(this.filteredItems.length / this.pageSize) || 1; }
  get pages() { return Array.from({ length: this.totalPages }, (_, i) => i); }
  get pagedItems() { const s = this.currentPage * this.pageSize; return this.filteredItems.slice(s, s + this.pageSize); }
  prevPage() { if (this.currentPage > 0) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages - 1) this.currentPage++; }
  goToPage(p: number) { this.currentPage = p; }
}
