import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inventoryItems } from '../../shared/data/mock-data';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">

      <!-- HEADER -->
      <div class="page-head">
        <div>
          <div class="eyebrow">Inventory</div>
          <h1>Ingredients & Stock</h1>
        </div>
        <div class="head-actions">
          <button class="btn btn-outline" (click)="showImportModal = true">Import</button>
          <button class="btn btn-primary" (click)="openAddModal()">+ Add Ingredient</button>
        </div>
      </div>

      <!-- TOOLBAR -->
      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search ingredients..." [(ngModel)]="searchQuery" (input)="onSearch()" />
        </div>
        <select [(ngModel)]="categoryFilter" (change)="onFilterChange()">
          <option value="">All categories</option>
          <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
        </select>
      </div>

      <!-- TABLE -->
      <div class="table-card">
        <table>
          <thead>
            <tr><th></th><th>Ingredient</th><th>Category</th><th>Quantity</th><th>Cost</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of pagedItems">
              <td class="img-cell">
                <div class="thumb">
                  <svg *ngIf="!item.image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="thumb-placeholder"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <img *ngIf="item.image" [src]="item.image" [alt]="item.name" />
                </div>
              </td>
              <td><strong>{{ item.name }}</strong></td>
              <td><span class="cat-tag">{{ item.category }}</span></td>
              <td>{{ item.quantity }} {{ item.unit }}</td>
              <td>MAD {{ item.cost }}/{{ item.unit }}</td>
              <td><span class="badge" [class.critical]="item.status === 'Critical'" [class.low]="item.status === 'Low Stock'">{{ item.status }}</span></td>
              <td><button class="text-btn" (click)="openViewModal(item)">View</button></td>
            </tr>
            <tr *ngIf="pagedItems.length === 0">
              <td colspan="7" class="empty-cell">No ingredients found</td>
            </tr>
          </tbody>
        </table>

        <!-- PAGINATION -->
        <div class="pagination" *ngIf="totalPages > 1">
          <span class="page-info">{{ filteredItems.length }} items · Page {{ currentPage + 1 }} of {{ totalPages }}</span>
          <div class="page-btns">
            <button class="page-btn" [disabled]="currentPage === 0" (click)="prevPage()">‹</button>
            <span class="page-num" *ngFor="let p of pages" [class.active]="p === currentPage" (click)="goToPage(p)">{{ p + 1 }}</span>
            <button class="page-btn" [disabled]="currentPage >= totalPages - 1" (click)="nextPage()">›</button>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW MODAL -->
    <div class="modal-overlay" *ngIf="viewItem" (click)="viewItem = null">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-head">
          <h3>{{ viewItem.name }}</h3>
          <button class="modal-close" (click)="viewItem = null">&times;</button>
        </div>
        <div class="modal-body">
          <div class="view-img-row" *ngIf="viewItem.image">
            <img [src]="viewItem.image" [alt]="viewItem.name" class="view-img" />
          </div>
          <div class="detail-grid">
            <div class="detail-field"><span>Category</span><strong>{{ viewItem.category }}</strong></div>
            <div class="detail-field"><span>Quantity</span><strong>{{ viewItem.quantity }} {{ viewItem.unit }}</strong></div>
            <div class="detail-field"><span>Cost per {{ viewItem.unit }}</span><strong>MAD {{ viewItem.cost }}</strong></div>
            <div class="detail-field"><span>Min Threshold</span><strong>{{ viewItem.min }} {{ viewItem.unit }}</strong></div>
            <div class="detail-field"><span>Status</span><strong [class.critical]="viewItem.status === 'Critical'" [class.low]="viewItem.status === 'Low Stock'">{{ viewItem.status }}</strong></div>
            <div class="detail-field"><span>Stock Value</span><strong>MAD {{ viewItem.quantity * viewItem.cost }}</strong></div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" (click)="viewItem = null">Close</button>
          <button class="btn btn-primary" (click)="toast('Edit ingredient — backend not connected')">Edit</button>
        </div>
      </div>
    </div>

    <!-- ADD MODAL -->
    <div class="modal-overlay" *ngIf="showAddModal" (click)="closeAddModal()">
      <div class="modal modal-lg" (click)="$event.stopPropagation()">
        <div class="modal-head">
          <h3>Add Ingredient</h3>
          <button class="modal-close" (click)="closeAddModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-grid">
            <label class="form-field"><span>Name *</span><input type="text" [(ngModel)]="form.name" placeholder="e.g. Whole Milk" /></label>
            <label class="form-field">
              <span>Category *</span>
              <div class="cat-select-row">
                <select [(ngModel)]="form.category">
                  <option value="">Select category</option>
                  <option *ngFor="let c of categories" [value]="c">{{ c }}</option>
                  <option value="__new__">+ Create new category</option>
                </select>
              </div>
              <div class="cat-inline" *ngIf="form.category === '__new__'">
                <input type="text" [(ngModel)]="newCategoryName" placeholder="New category name" />
                <button class="btn btn-sm" (click)="addCategory()">Add</button>
              </div>
            </label>
            <label class="form-field"><span>Quantity *</span><input type="number" [(ngModel)]="form.quantity" placeholder="0" /></label>
            <label class="form-field"><span>Unit *</span>
              <select [(ngModel)]="form.unit">
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">L</option>
                <option value="ml">mL</option>
                <option value="units">units</option>
              </select>
            </label>
            <label class="form-field"><span>Cost per unit *</span><input type="number" [(ngModel)]="form.cost" placeholder="0" /></label>
            <label class="form-field"><span>Min threshold</span><input type="number" [(ngModel)]="form.min" placeholder="0" /></label>
            <label class="form-field"><span>Image (optional)</span>
              <div class="img-upload" (click)="fileInput.click()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>Click to upload image</span>
                <input #fileInput type="file" accept="image/*" style="display:none" (change)="onImageSelect($event)" />
              </div>
            </label>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" (click)="closeAddModal()">Cancel</button>
          <button class="btn btn-primary" (click)="submitAdd()">Save Ingredient</button>
        </div>
      </div>
    </div>

    <!-- IMPORT MODAL -->
    <div class="modal-overlay" *ngIf="showImportModal" (click)="showImportModal = false">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-head">
          <h3>Import Ingredients</h3>
          <button class="modal-close" (click)="showImportModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <p>Upload a CSV or Excel file to bulk-import ingredients.</p>
          <div class="img-upload" (click)="importFileInput.click()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="upload-icon"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            <span>Choose file (.csv, .xlsx)</span>
            <input #importFileInput type="file" accept=".csv,.xlsx" style="display:none" (change)="onImportSelect($event)" />
          </div>
          <div class="import-preview" *ngIf="importFileName">
            <span>Selected: {{ importFileName }}</span>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn btn-outline" (click)="showImportModal = false">Cancel</button>
          <button class="btn btn-primary" (click)="submitImport()">Import</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `.page { display:flex; flex-direction:column; gap:1rem; }`,
    `.page-head { display:flex; justify-content:space-between; align-items:center; gap:1rem; }`,
    `.page-head h1 { margin:0; font-size:1.5rem; }`,
    `.eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.75rem; color:#8fb4ff; margin-bottom:.2rem; }`,
    `.head-actions { display:flex; gap:.6rem; }`,

    `/* buttons */`,
    `.btn { border:none; border-radius:.85rem; padding:.65rem 1.1rem; font-weight:600; cursor:pointer; font-size:.88rem; transition:transform .12s; }`,
    `.btn:active { transform:scale(.97); }`,
    `.btn-primary { background:linear-gradient(135deg,#7c8dff,#52c6ff); color:white; }`,
    `.btn-outline { background:var(--bg-card); border:1px solid var(--border-input); color:var(--text-secondary); }`,
    `.btn-sm { padding:.35rem .7rem; font-size:.78rem; }`,
    `.text-btn { background:none; border:none; color:#4756c8; cursor:pointer; font-weight:600; font-size:.82rem; padding:.3rem; transition:color .15s; }`,
    `.text-btn:hover { color:#1e2a78; }`,

    `/* toolbar */`,
    `.toolbar { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }`,
    `.search-wrap { display:flex; align-items:center; gap:.5rem; background:var(--bg-card); border:1px solid var(--border-input); border-radius:.85rem; padding:0 .85rem; flex:1; min-width:200px; }`,
    `.search-icon { width:16px; height:16px; color:var(--text-light); flex-shrink:0; }`,
    `.search-wrap input { border:none; padding:.65rem 0; outline:none; flex:1; font:inherit; background:transparent; color:var(--text-primary); }`,
    `select { border:1px solid var(--border-input); border-radius:.85rem; padding:.65rem .85rem; font:inherit; background:var(--bg-card); color:var(--text-primary); outline:none; min-width:150px; }`,

    `/* table */`,
    `.table-card { background:var(--bg-card); border-radius:1.2rem; overflow:hidden; box-shadow:var(--shadow-card); }`,
    `table { width:100%; border-collapse:collapse; }`,
    `th { text-align:left; padding:.85rem 1rem; font-size:.75rem; text-transform:uppercase; color:var(--text-muted); letter-spacing:.08em; background:var(--bg-table-head); font-weight:600; }`,
    `td { padding:.7rem 1rem; border-top:1px solid var(--border-table); font-size:.88rem; color:var(--text-primary); }`,
    `.img-cell { width:48px; }`,
    `.thumb { width:40px; height:40px; border-radius:.5rem; background:var(--bg-hover); display:grid; place-items:center; overflow:hidden; }`,
    `.thumb img { width:100%; height:100%; object-fit:cover; }`,
    `.thumb-placeholder { width:20px; height:20px; color:var(--text-light); }`,
    `.cat-tag { background:var(--bg-hover); padding:.2rem .55rem; border-radius:999px; font-size:.78rem; color:var(--text-secondary); }`,
    `.badge { display:inline-flex; padding:.25rem .6rem; border-radius:999px; font-size:.72rem; font-weight:600; background:#ecfdf3; color:#047857; }`,
    `.badge.critical { background:#fef2f2; color:#b91c1c; }`,
    `.badge.low { background:#fef3c7; color:#b45309; }`,
    `.empty-cell { text-align:center; color:#94a3b8; padding:2rem; font-style:italic; }`,

    `/* pagination */`,
    `.pagination { display:flex; justify-content:space-between; align-items:center; padding:.75rem 1rem; border-top:1px solid var(--border-table); }`,
    `.page-info { font-size:.78rem; color:var(--text-muted); }`,
    `.page-btns { display:flex; align-items:center; gap:.25rem; }`,
    `.page-btn { background:none; border:1px solid var(--border-input); border-radius:.5rem; padding:.3rem .6rem; cursor:pointer; font-size:.9rem; color:var(--text-secondary); transition:all .15s; }`,
    `.page-btn:hover:not(:disabled) { background:var(--bg-hover); }`,
    `.page-btn:disabled { opacity:.4; cursor:default; }`,
    `.page-num { min-width:28px; height:28px; display:grid; place-items:center; border-radius:.4rem; font-size:.78rem; cursor:pointer; color:var(--text-muted); transition:all .15s; }`,
    `.page-num:hover { background:var(--bg-hover); }`,
    `.page-num.active { background:#4756c8; color:white; }`,

    `/* modals */`,
    `.modal-overlay { position:fixed; inset:0; background:var(--bg-modal-overlay); backdrop-filter:blur(3px); display:grid; place-items:center; z-index:999; padding:1rem; animation:fadeIn .15s ease-out; }`,
    `.modal { background:var(--bg-card); border-radius:1.2rem; width:min(92vw,500px); max-height:90vh; overflow-y:auto; box-shadow:var(--shadow-modal); animation:slideUp .2s ease-out; }`,
    `.modal-lg { width:min(92vw,620px); }`,
    `.modal-head { display:flex; justify-content:space-between; align-items:center; padding:1.25rem 1.5rem 0; }`,
    `.modal-head h3 { margin:0; font-size:1.15rem; color:var(--text-primary); }`,
    `.modal-close { background:none; border:none; font-size:1.5rem; color:var(--text-light); cursor:pointer; padding:.2rem; line-height:1; }`,
    `.modal-close:hover { color:var(--text-primary); }`,
    `.modal-body { padding:1.25rem 1.5rem; }`,
    `.modal-body p { color:var(--text-muted); margin:0 0 1rem; font-size:.9rem; }`,
    `.modal-actions { display:flex; justify-content:flex-end; gap:.6rem; padding:0 1.5rem 1.25rem; }`,

    `/* detail */`,
    `.view-img-row { margin-bottom:1rem; }`,
    `.view-img { width:100%; max-height:160px; object-fit:cover; border-radius:.75rem; }`,
    `.detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }`,
    `.detail-field { display:flex; flex-direction:column; gap:.2rem; }`,
    `.detail-field span { font-size:.75rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:.06em; }`,
    `.detail-field strong { font-size:1rem; }`,
    `.detail-field strong.critical { color:#dc2626; }`,
    `.detail-field strong.low { color:#b45309; }`,

    `/* form */`,
    `.form-grid { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }`,
    `.form-field { display:flex; flex-direction:column; gap:.25rem; }`,
    `.form-field span { font-size:.78rem; font-weight:600; color:var(--text-secondary); }`,
    `.form-field input, .form-field select { border:1px solid var(--border-input); border-radius:.8rem; padding:.65rem .8rem; font:inherit; outline:none; transition:border-color .15s; background:var(--bg-input); color:var(--text-primary); }`,
    `.form-field input:focus, .form-field select:focus { border-color:#7c8dff; }`,
    `.cat-select-row { display:flex; gap:.35rem; }`,
    `.cat-select-row select { flex:1; }`,
    `.cat-inline { display:flex; gap:.35rem; margin-top:.35rem; }`,
    `.cat-inline input { flex:1; }`,

    `/* image upload */`,
    `.img-upload { display:flex; align-items:center; gap:.5rem; border:1px dashed var(--border-input); border-radius:.8rem; padding:.75rem; cursor:pointer; color:var(--text-muted); font-size:.82rem; transition:border-color .15s; }`,
    `.img-upload:hover { border-color:#7c8dff; color:var(--text-secondary); }`,
    `.upload-icon { width:18px; height:18px; flex-shrink:0; }`,
    `.import-preview { margin-top:.5rem; font-size:.82rem; color:var(--text-secondary); }`,

    `@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }`,
    `@keyframes slideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`,

    `@media (max-width: 700px) { .page-head { flex-direction:column; align-items:flex-start; } .form-grid { grid-template-columns:1fr; } .detail-grid { grid-template-columns:1fr; } .pagination { flex-direction:column; gap:.5rem; } }`
  ]
})
export class InventoryComponent {
  readonly allItems = inventoryItems.map((item) => ({ ...item, image: item.image as string | undefined }));
  searchQuery = '';
  categoryFilter = '';
  currentPage = 0;
  pageSize = 5;

  categories = ['Dairy', 'Dry Goods', 'Ingredients'];
  newCategoryName = '';

  filteredItems = [...this.allItems];

  // Modals
  viewItem: (typeof this.allItems)[number] | null = null;
  showAddModal = false;
  showImportModal = false;
  importFileName = '';

  // Form
  form = { name: '', category: '', quantity: 0, unit: 'kg', cost: 0, min: 0 };
  selectedImage: File | null = null;

  onSearch() {
    this.applyFilters();
    this.currentPage = 0;
  }

  onFilterChange() {
    this.applyFilters();
    this.currentPage = 0;
  }

  applyFilters() {
    let items = this.allItems;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    }
    if (this.categoryFilter) {
      items = items.filter((i) => i.category === this.categoryFilter);
    }
    this.filteredItems = items;
  }

  get totalPages() { return Math.ceil(this.filteredItems.length / this.pageSize) || 1; }
  get pages() { return Array.from({ length: this.totalPages }, (_, i) => i); }
  get pagedItems() {
    const start = this.currentPage * this.pageSize;
    return this.filteredItems.slice(start, start + this.pageSize);
  }

  prevPage() { if (this.currentPage > 0) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages - 1) this.currentPage++; }
  goToPage(p: number) { this.currentPage = p; }

  openViewModal(item: (typeof this.allItems)[number]) { this.viewItem = item; }

  openAddModal() {
    this.form = { name: '', category: '', quantity: 0, unit: 'kg', cost: 0, min: 0 };
    this.selectedImage = null;
    this.showAddModal = true;
  }

  closeAddModal() { this.showAddModal = false; }

  onImageSelect(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.selectedImage = file;
  }

  onImportSelect(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) this.importFileName = file.name;
  }

  addCategory() {
    const name = this.newCategoryName.trim();
    if (name && !this.categories.includes(name)) {
      this.categories.push(name);
      this.form.category = name;
      this.newCategoryName = '';
    }
  }

  submitAdd() {
    console.log('Add ingredient (not connected):', this.form, this.selectedImage);
    this.showAddModal = false;
    this.toast('Ingredient saved — backend not connected');
  }

  submitImport() {
    console.log('Import (not connected):', this.importFileName);
    this.showImportModal = false;
    this.importFileName = '';
    this.toast('Import done — backend not connected');
  }

  toast(msg: string) {
    // simple inline toast
    const el = document.createElement('div');
    el.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;background:#0f172a;color:white;padding:.75rem 1rem;border-radius:.85rem;font-size:.85rem;z-index:1001;animation:fadeIn .2s;box-shadow:0 8px 30px rgba(0,0,0,.15);';
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity .3s'; setTimeout(() => el.remove(), 300); }, 2500);
  }
}
