import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Sup { name: string; contact: string; email: string; phone: string; status: string; }
const ALL_SUPPLIERS: Sup[] = [
  { name: 'Golden Grain', contact: 'Karim B.', email: 'karim@goldengrain.ma', phone: '+212 6 12 34 56 78', status: 'Active' },
  { name: 'Aqua Dairy', contact: 'Fatima Z.', email: 'fatima@aguadairy.ma', phone: '+212 6 98 76 54 32', status: 'Active' },
  { name: 'Brew & Bean', contact: 'Hassan M.', email: 'hassan@brewnbean.ma', phone: '+212 6 55 44 33 22', status: 'Pending' },
  { name: 'Fresh Farms', contact: 'Omar T.', email: 'omar@freshfarms.ma', phone: '+212 6 11 22 33 44', status: 'Active' },
  { name: 'Spice Route', contact: 'Leila A.', email: 'leila@spiceroute.ma', phone: '+212 6 77 88 99 00', status: 'Inactive' }
];

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">
      <div class="page-head">
        <div>
          <div class="eyebrow">Procurement</div>
          <h1>Suppliers</h1>
        </div>
        <button class="btn btn-primary">+ New Supplier</button>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search suppliers..." [(ngModel)]="searchQuery" (input)="applyFilters()" />
        </div>
        <select [(ngModel)]="statusFilter" (change)="applyFilters()">
          <option value="">All statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div class="card">
        <table>
          <thead>
            <tr><th>Name</th><th>Contact</th><th>Email</th><th>Phone</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let s of pagedItems">
              <td class="cell-name">{{ s.name }}</td>
              <td>{{ s.contact }}</td>
              <td class="cell-email">{{ s.email }}</td>
              <td class="cell-phone">{{ s.phone }}</td>
              <td><span class="tag" [class.tag-success]="s.status === 'Active'" [class.tag-warning]="s.status === 'Pending'" [class.tag-inactive]="s.status === 'Inactive'">{{ s.status }}</span></td>
              <td><button class="text-btn">Edit</button></td>
            </tr>
            <tr *ngIf="pagedItems.length === 0"><td colspan="6" class="empty-cell">No suppliers found</td></tr>
          </tbody>
        </table>
        <div class="pagination" *ngIf="totalPages > 1">
          <span class="page-info">{{ filteredItems.length }} suppliers · Page {{ currentPage + 1 }} of {{ totalPages }}</span>
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
    .btn { border:none; border-radius:.85rem; padding:.65rem 1.1rem; font-weight:600; cursor:pointer; font-size:.88rem; }
    .btn:active { transform:scale(.97); }
    .btn-primary { background:linear-gradient(135deg,#7c8dff,#52c6ff); color:white; }
    .toolbar { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }
    .search-wrap { display:flex; align-items:center; gap:.5rem; background:var(--bg-card); border:1px solid var(--border-input); border-radius:.85rem; padding:0 .85rem; flex:1; min-width:200px; }
    .search-icon { width:16px; height:16px; color:var(--text-light); flex-shrink:0; }
    .search-wrap input { border:none; padding:.65rem 0; outline:none; flex:1; font:inherit; background:transparent; color:var(--text-primary); }
    select { border:1px solid var(--border-input); border-radius:.85rem; padding:.65rem .85rem; font:inherit; background:var(--bg-card); color:var(--text-primary); outline:none; min-width:150px; }
    .card { background:var(--bg-card); border-radius:1.2rem; overflow:hidden; box-shadow:var(--shadow-card); }
    table { width:100%; border-collapse:collapse; }
    th { text-align:left; padding:.9rem 1.1rem; font-size:.75rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:.08em; background:var(--bg-table-head); font-weight:600; }
    td { padding:.8rem 1.1rem; border-top:1px solid var(--border-table); font-size:.9rem; color:var(--text-primary); }
    .cell-name { font-weight:600; }
    .cell-email { color:var(--text-muted); font-size:.82rem; }
    .cell-phone { font-family:monospace; font-size:.85rem; }
    .tag { font-size:.72rem; padding:.2rem .55rem; border-radius:999px; font-weight:600; }
    .tag-success { background:#dcfce7; color:#16a34a; }
    .tag-warning { background:#fef3c7; color:#b45309; }
    .tag-inactive { background:#f1f5f9; color:#64748b; }
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
export class SuppliersComponent {
  readonly allItems = ALL_SUPPLIERS;
  searchQuery = '';
  statusFilter = '';
  filteredItems = [...ALL_SUPPLIERS];
  currentPage = 0;
  pageSize = 5;

  applyFilters() {
    let items = this.allItems;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((s) => s.name.toLowerCase().includes(q) || s.contact.toLowerCase().includes(q) || s.email.toLowerCase().includes(q));
    }
    if (this.statusFilter) items = items.filter((s) => s.status === this.statusFilter);
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
