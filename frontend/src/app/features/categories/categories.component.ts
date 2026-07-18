import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Cat { name: string; items: string; created: string; }
const ALL_CATS: Cat[] = [
  { name: 'Dairy', items: '3 ingredients', created: 'Jan 2026' },
  { name: 'Dry Goods', items: '2 ingredients', created: 'Jan 2026' },
  { name: 'Ingredients', items: '1 ingredient', created: 'Feb 2026' },
  { name: 'Bakery', items: '4 products', created: 'Mar 2026' },
  { name: 'Coffee', items: '2 products', created: 'Mar 2026' },
  { name: 'Pastry', items: '3 products', created: 'Apr 2026' }
];

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">
      <div class="page-head">
        <div>
          <div class="eyebrow">Inventory</div>
          <h1>Categories</h1>
        </div>
        <button class="btn btn-primary">+ New Category</button>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search categories..." [(ngModel)]="searchQuery" (input)="applyFilters()" />
        </div>
      </div>

      <div class="card">
        <table>
          <thead>
            <tr><th>Name</th><th>Items</th><th>Created</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of pagedItems">
              <td class="cell-name">{{ c.name }}</td>
              <td>{{ c.items }}</td>
              <td class="cell-created">{{ c.created }}</td>
              <td><button class="text-btn">Edit</button></td>
            </tr>
            <tr *ngIf="pagedItems.length === 0"><td colspan="4" class="empty-cell">No categories found</td></tr>
          </tbody>
        </table>
        <div class="pagination" *ngIf="totalPages > 1">
          <span class="page-info">{{ filteredItems.length }} categories · Page {{ currentPage + 1 }} of {{ totalPages }}</span>
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
    .card { background:var(--bg-card); border-radius:1.2rem; overflow:hidden; box-shadow:var(--shadow-card); }
    table { width:100%; border-collapse:collapse; }
    th { text-align:left; padding:.9rem 1.1rem; font-size:.75rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:.08em; background:var(--bg-table-head); font-weight:600; }
    td { padding:.8rem 1.1rem; border-top:1px solid var(--border-table); font-size:.9rem; color:var(--text-primary); }
    .cell-name { font-weight:600; }
    .cell-created { color:var(--text-muted); }
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
export class CategoriesComponent {
  readonly allItems = ALL_CATS;
  searchQuery = '';
  filteredItems = [...ALL_CATS];
  currentPage = 0;
  pageSize = 5;

  applyFilters() {
    let items = this.allItems;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((c) => c.name.toLowerCase().includes(q));
    }
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
