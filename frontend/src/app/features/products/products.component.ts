import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { products } from '../../shared/data/mock-data';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">
      <div class="page-header">
        <div>
          <div class="eyebrow">Products</div>
          <h2>Recipes, availability, and profitability ({{ filteredItems.length }})</h2>
        </div>
        <button type="button" class="primary">New Product</button>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search products..." [(ngModel)]="searchQuery" (input)="applyFilters()" />
        </div>
        <select [(ngModel)]="catFilter" (change)="applyFilters()">
          <option value="">All categories</option>
          <option *ngFor="let c of allCats" [value]="c">{{ c }}</option>
        </select>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th></th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Margin</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of pagedItems">
              <td class="img-cell">
                <div class="thumb">
                  <img *ngIf="product.image" [src]="product.image" [alt]="product.name" />
                  <svg *ngIf="!product.image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="thumb-ph"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                </div>
              </td>
              <td class="cell-name">{{ product.name }}</td>
              <td><span class="tag">{{ product.category }}</span></td>
              <td class="cell-price">MAD {{ product.price }}</td>
              <td><span class="stock-badge" [class.low]="product.status === 'Low Stock'">{{ product.stock }} units</span></td>
              <td class="cell-margin">{{ product.margin }}%</td>
              <td><span class="tag" [class.tag-available]="product.status === 'Available'" [class.tag-low]="product.status === 'Low Stock'">{{ product.status }}</span></td>
              <td><button class="view-btn">View</button></td>
            </tr>
            <tr *ngIf="pagedItems.length === 0"><td colspan="8" class="empty-cell">No products found</td></tr>
          </tbody>
        </table>
        <div class="pagination" *ngIf="totalPages > 1">
          <span class="page-info">{{ filteredItems.length }} products · Page {{ currentPage + 1 }} of {{ totalPages }}</span>
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
    .eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.72rem; color:#8fb4ff; margin-bottom:.25rem; font-weight:700; }
    .primary { display:inline-flex; align-items:center; gap:.45rem; background:#4756c8; color:white; border:none; border-radius:.75rem; padding:.65rem 1.1rem; font:inherit; font-size:.85rem; font-weight:600; cursor:pointer; transition:background .15s, transform .15s; }
    .primary:hover { background:#3b48b0; }
    .primary:active { transform:scale(.97); }
    .toolbar { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }
    .search-wrap { display:flex; align-items:center; gap:.5rem; background:var(--bg-card); border:1px solid var(--border-input); border-radius:.85rem; padding:0 .85rem; flex:1; min-width:200px; }
    .search-icon { width:16px; height:16px; color:var(--text-light); flex-shrink:0; }
    .search-wrap input { border:none; padding:.65rem 0; outline:none; flex:1; font:inherit; background:transparent; color:var(--text-primary); }
    select { border:1px solid var(--border-input); border-radius:.85rem; padding:.65rem .85rem; font:inherit; background:var(--bg-card); color:var(--text-primary); outline:none; min-width:150px; }
    .table-wrap { background:var(--bg-card); border-radius:1.2rem; box-shadow:var(--shadow-card); overflow:hidden; }
    table { width:100%; border-collapse:collapse; }
    thead { background:var(--bg-table-head); }
    th { text-align:left; padding:.85rem 1rem; font-size:.72rem; text-transform:uppercase; letter-spacing:.08em; color:var(--text-muted); font-weight:700; }
    td { padding:.75rem 1rem; font-size:.85rem; border-top:1px solid var(--border-table); vertical-align:middle; color:var(--text-primary); }
    tr:hover td { background:var(--bg-hover); }
    .img-cell { width:48px; }
    .thumb { width:40px; height:40px; border-radius:.5rem; background:var(--bg-hover); display:grid; place-items:center; overflow:hidden; }
    .thumb img { width:100%; height:100%; object-fit:cover; }
    .thumb-ph { width:20px; height:20px; color:var(--text-light); }
    .cell-name { font-weight:600; color:var(--text-primary); }
    .cell-price { font-weight:700; color:var(--text-primary); }
    .cell-margin { font-weight:600; color:#059669; }
    .tag { display:inline-block; font-size:.7rem; padding:.2rem .55rem; border-radius:999px; background:var(--bg-hover); color:var(--text-muted); font-weight:600; }
    .tag-available { background:#ecfdf5; color:#059669; }
    .tag-low { background:#fef3c7; color:#b45309; }
    .stock-badge { font-weight:600; }
    .stock-badge.low { color:#b45309; }
    .view-btn { background:transparent; border:1px solid var(--border-input); border-radius:.5rem; padding:.35rem .75rem; font:inherit; font-size:.78rem; font-weight:600; color:var(--text-secondary); cursor:pointer; }
    .view-btn:hover { border-color:#4756c8; color:#4756c8; background:var(--bg-hover); }
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
    @media (max-width: 760px) { .page-header { flex-direction:column; align-items:flex-start; gap:.5rem; } .table-wrap { overflow-x:auto; } }
  `]
})
export class ProductsComponent {
  readonly allItems = products.map((p) => ({ ...p, image: p.image as string | undefined }));
  searchQuery = '';
  catFilter = '';
  filteredItems = [...this.allItems];
  currentPage = 0;
  pageSize = 5;

  get allCats() { return [...new Set(this.allItems.map((p) => p.category))]; }

  applyFilters() {
    let items = this.allItems;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    if (this.catFilter) items = items.filter((p) => p.category === this.catFilter);
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
