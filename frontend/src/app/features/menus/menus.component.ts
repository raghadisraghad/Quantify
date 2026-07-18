import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { menus } from '../../shared/data/mock-data';

@Component({
  selector: 'app-menus',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">
      <div class="page-head">
        <div>
          <div class="eyebrow">Menus</div>
          <h1>Menu Management</h1>
        </div>
        <button class="btn btn-primary">+ New Menu</button>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search menus..." [(ngModel)]="searchQuery" (input)="applyFilters()" />
        </div>
        <select [(ngModel)]="catFilter" (change)="applyFilters()">
          <option value="">All categories</option>
          <option *ngFor="let c of allCats" [value]="c">{{ c }}</option>
        </select>
      </div>

      <div class="grid">
        <div class="menu-card" *ngFor="let m of pagedItems">
          <div class="menu-head">
            <h3>{{ m.name }}</h3>
            <span class="badge" [class.active]="m.status === 'Active'" [class.inactive]="m.status === 'Inactive'">{{ m.status }}</span>
          </div>
          <div class="menu-meta">{{ m.category }} · MAD {{ m.price }}</div>
          <div class="menu-items">
            <span class="menu-item-tag" *ngFor="let i of m.items">{{ i }}</span>
          </div>
          <div class="menu-actions">
            <button class="text-btn">Edit</button>
            <button class="text-btn danger">Delete</button>
          </div>
        </div>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <span class="page-info">{{ filteredItems.length }} menus · Page {{ currentPage + 1 }} of {{ totalPages }}</span>
        <div class="page-btns">
          <button class="page-btn" [disabled]="currentPage === 0" (click)="prevPage()">‹</button>
          <span class="page-num" *ngFor="let p of pages" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p + 1 }}</span>
          <button class="page-btn" [disabled]="currentPage >= totalPages - 1" (click)="nextPage()">›</button>
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
    .grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1rem; }
    .menu-card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); }
    .menu-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:.3rem; }
    .menu-head h3 { margin:0; font-size:1rem; color:var(--text-primary); }
    .badge { font-size:.7rem; padding:.2rem .55rem; border-radius:999px; font-weight:600; }
    .badge.active { background:#ecfdf3; color:#047857; }
    .badge.inactive { background:#f1f5f9; color:#64748b; }
    .menu-meta { font-size:.82rem; color:var(--text-muted); margin-bottom:.65rem; }
    .menu-items { display:flex; flex-wrap:wrap; gap:.35rem; margin-bottom:.75rem; }
    .menu-item-tag { font-size:.75rem; padding:.2rem .5rem; border-radius:999px; background:var(--bg-hover); color:var(--text-secondary); }
    .menu-actions { display:flex; gap:.75rem; }
    .text-btn { background:none; border:none; color:#4756c8; cursor:pointer; font-weight:600; font-size:.82rem; padding:.3rem; }
    .text-btn.danger { color:#dc2626; }
    .pagination { display:flex; justify-content:space-between; align-items:center; }
    .page-info { font-size:.78rem; color:var(--text-muted); }
    .page-btns { display:flex; align-items:center; gap:.25rem; }
    .page-btn { background:none; border:1px solid var(--border-input); border-radius:.5rem; padding:.3rem .6rem; cursor:pointer; font-size:.9rem; color:var(--text-secondary); transition:all .15s; }
    .page-btn:hover:not(:disabled) { background:var(--bg-hover); }
    .page-btn:disabled { opacity:.4; cursor:default; }
    .page-num { min-width:28px; height:28px; display:grid; place-items:center; border-radius:.4rem; font-size:.78rem; cursor:pointer; color:var(--text-muted); transition:all .15s; }
    .page-num:hover { background:var(--bg-hover); }
    .page-num.active { background:#4756c8; color:white; }
    @media (max-width: 1100px) { .grid { grid-template-columns:repeat(2, minmax(0,1fr)); } }
    @media (max-width: 760px) { .grid { grid-template-columns:1fr; } .page-head { flex-direction:column; align-items:flex-start; } }
  `]
})
export class MenusComponent {
  readonly allItems = menus;
  searchQuery = '';
  catFilter = '';
  filteredItems = [...menus];
  currentPage = 0;
  pageSize = 6;

  get allCats() { return [...new Set(menus.map((m) => m.category))]; }

  applyFilters() {
    let items = this.allItems;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((m) => m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q));
    }
    if (this.catFilter) items = items.filter((m) => m.category === this.catFilter);
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
