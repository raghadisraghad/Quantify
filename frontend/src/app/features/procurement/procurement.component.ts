import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { purchaseOrders } from '../../shared/data/mock-data';

@Component({
  selector: 'app-procurement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">
      <div class="page-header">
        <div>
          <div class="eyebrow">Procurement</div>
          <h2>Purchase orders and supplier coordination</h2>
        </div>
        <button type="button" class="btn-primary">Create PO</button>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search purchase orders..." [(ngModel)]="searchQuery" (input)="applyFilters()" />
        </div>
        <select [(ngModel)]="statusFilter" (change)="applyFilters()">
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Received">Received</option>
          <option value="Draft">Draft</option>
        </select>
      </div>

      <div class="card">
        <table>
          <thead>
            <tr><th>PO ID</th><th>Supplier</th><th>Total</th><th>Status</th><th>ETA</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let o of pagedItems">
              <td class="cell-id">{{ o.id }}</td>
              <td>{{ o.supplier }}</td>
              <td class="cell-price">MAD {{ o.total }}</td>
              <td><span class="badge" [class.pending]="o.status === 'Pending'" [class.received]="o.status === 'Received'" [class.draft]="o.status === 'Draft'">{{ o.status }}</span></td>
              <td class="cell-eta">{{ o.eta }}</td>
              <td><button class="text-btn">View</button></td>
            </tr>
            <tr *ngIf="pagedItems.length === 0"><td colspan="6" class="empty-cell">No purchase orders found</td></tr>
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
    .page-header { display:flex; justify-content:space-between; align-items:center; }
    .page-header h2 { margin:0; font-size:1rem; font-weight:600; color:var(--text-secondary); }
    .eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.72rem; color:#8fb4ff; margin-bottom:.2rem; font-weight:700; }
    .btn-primary { background:#4756c8; color:white; border:none; border-radius:.75rem; padding:.6rem 1rem; font:inherit; font-weight:600; cursor:pointer; }
    .toolbar { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }
    .search-wrap { display:flex; align-items:center; gap:.5rem; background:var(--bg-card); border:1px solid var(--border-input); border-radius:.85rem; padding:0 .85rem; flex:1; min-width:200px; }
    .search-icon { width:16px; height:16px; color:var(--text-light); flex-shrink:0; }
    .search-wrap input { border:none; padding:.65rem 0; outline:none; flex:1; font:inherit; background:transparent; color:var(--text-primary); }
    select { border:1px solid var(--border-input); border-radius:.85rem; padding:.65rem .85rem; font:inherit; background:var(--bg-card); color:var(--text-primary); outline:none; min-width:150px; }
    .card { background:var(--bg-card); border-radius:1.2rem; overflow:hidden; box-shadow:var(--shadow-card); }
    table { width:100%; border-collapse:collapse; }
    th { text-align:left; padding:.85rem 1rem; font-size:.75rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:.08em; background:var(--bg-table-head); font-weight:600; }
    td { padding:.75rem 1rem; border-top:1px solid var(--border-table); font-size:.88rem; color:var(--text-primary); }
    .cell-id { font-weight:600; font-family:monospace; }
    .cell-price { font-weight:700; }
    .cell-eta { color:var(--text-muted); }
    .badge { display:inline-flex; padding:.25rem .6rem; border-radius:999px; font-size:.72rem; font-weight:600; }
    .badge.pending { background:#fef3c7; color:#b45309; }
    .badge.received { background:#ecfdf3; color:#047857; }
    .badge.draft { background:#f1f5f9; color:#64748b; }
    .text-btn { background:none; border:none; color:#4756c8; cursor:pointer; font-weight:600; font-size:.82rem; padding:.3rem; }
    .empty-cell { text-align:center; color:var(--text-light); padding:2rem; font-style:italic; }
    .pagination { display:flex; justify-content:space-between; align-items:center; padding:.75rem 1rem; border-top:1px solid var(--border-table); }
    .page-info { font-size:.78rem; color:var(--text-muted); }
    .page-btns { display:flex; align-items:center; gap:.25rem; }
    .page-btn { background:none; border:1px solid var(--border-input); border-radius:.5rem; padding:.3rem .6rem; cursor:pointer; font-size:.9rem; color:var(--text-secondary); }
    .page-btn:hover:not(:disabled) { background:var(--bg-hover); }
    .page-btn:disabled { opacity:.4; cursor:default; }
    .page-num { min-width:28px; height:28px; display:grid; place-items:center; border-radius:.4rem; font-size:.78rem; cursor:pointer; color:var(--text-muted); }
    .page-num:hover { background:var(--bg-hover); }
    .page-num.active { background:#4756c8; color:white; }
  `]
})
export class ProcurementComponent {
  readonly allItems = purchaseOrders;
  searchQuery = '';
  statusFilter = '';
  filteredItems = [...purchaseOrders];
  currentPage = 0;
  pageSize = 5;

  applyFilters() {
    let items = this.allItems;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((o) => o.id.toLowerCase().includes(q) || o.supplier.toLowerCase().includes(q));
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
