import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService } from '../../shared/services/app-state.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page page-fade">
      <div class="page-header">
        <div>
          <div class="eyebrow">Notifications</div>
          <h2>Inbox, filters, and action center</h2>
        </div>
        <div class="actions">
          <button type="button" class="btn-outline" (click)="markAllRead()">Mark all as read</button>
          <button type="button" class="btn-primary">Archive</button>
        </div>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search notifications..." [(ngModel)]="searchQuery" (input)="applyFilters()" />
        </div>
      </div>

      <div class="card">
        <div class="item" *ngFor="let n of pagedItems">
          <div class="item-left">
            <div class="item-dot" *ngIf="n.unread"></div>
            <div>
              <div class="item-title">{{ n.title }}</div>
              <div class="item-meta">{{ n.message }}</div>
              <div class="item-footer"><span class="cat-tag">{{ n.category }}</span> · {{ n.time }}</div>
            </div>
          </div>
          <div class="item-actions">
            <span class="badge" *ngIf="n.unread">Unread</span>
            <button class="text-btn" (click)="markRead(n.id)">Read</button>
            <button class="text-btn danger" (click)="deleteItem(n.id)">Delete</button>
          </div>
        </div>
        <div class="empty-cell" *ngIf="pagedItems.length === 0">No notifications found</div>
        <div class="pagination" *ngIf="totalPages > 1">
          <span class="page-info">{{ filteredItems.length }} notifications · Page {{ currentPage + 1 }} of {{ totalPages }}</span>
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
    .page-header { display:flex; justify-content:space-between; align-items:center; gap:1rem; }
    .page-header h2 { margin:0; font-size:1rem; font-weight:600; color:var(--text-secondary); }
    .eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.72rem; color:#8fb4ff; margin-bottom:.2rem; font-weight:700; }
    .actions { display:flex; gap:.6rem; }
    .btn-outline { border:1px solid var(--border-input); border-radius:.75rem; padding:.6rem .95rem; background:var(--bg-card); color:var(--text-secondary); cursor:pointer; font-weight:600; font-size:.82rem; }
    .btn-outline:hover { border-color:#4756c8; color:#4756c8; }
    .btn-primary { background:#4756c8; color:white; border:none; border-radius:.75rem; padding:.6rem .95rem; cursor:pointer; font-weight:600; font-size:.82rem; }
    .toolbar { display:flex; gap:.75rem; align-items:center; flex-wrap:wrap; }
    .search-wrap { display:flex; align-items:center; gap:.5rem; background:var(--bg-card); border:1px solid var(--border-input); border-radius:.85rem; padding:0 .85rem; flex:1; min-width:200px; }
    .search-icon { width:16px; height:16px; color:var(--text-light); flex-shrink:0; }
    .search-wrap input { border:none; padding:.65rem 0; outline:none; flex:1; font:inherit; background:transparent; color:var(--text-primary); }
    .card { background:var(--bg-card); border-radius:1.2rem; overflow:hidden; box-shadow:var(--shadow-card); }
    .item { display:flex; justify-content:space-between; align-items:center; gap:1rem; padding:.8rem 1rem; border-bottom:1px solid var(--border-table); }
    .item:last-child { border-bottom:none; }
    .item-left { display:flex; align-items:flex-start; gap:.65rem; flex:1; }
    .item-dot { width:8px; height:8px; min-width:8px; border-radius:50%; background:#7c8dff; margin-top:6px; }
    .item-title { font-weight:700; color:var(--text-primary); }
    .item-meta { color:var(--text-muted); margin-top:.15rem; font-size:.85rem; }
    .item-footer { display:flex; align-items:center; gap:.35rem; margin-top:.25rem; font-size:.75rem; color:var(--text-light); }
    .cat-tag { font-size:.65rem; color:#4756c8; font-weight:600; }
    .item-actions { display:flex; align-items:center; gap:.5rem; flex-shrink:0; }
    .badge { background:#eef4ff; color:#4756c8; border-radius:999px; padding:.25rem .6rem; font-size:.72rem; font-weight:600; }
    .text-btn { background:none; border:none; color:#4756c8; cursor:pointer; font-weight:600; font-size:.82rem; padding:.3rem; }
    .text-btn.danger { color:#dc2626; }
    .text-btn:hover { text-decoration:underline; }
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
    @media (max-width: 760px) { .page-header { flex-direction:column; align-items:flex-start; } .item { flex-direction:column; align-items:flex-start; gap:.5rem; } }
  `]
})
export class NotificationsComponent {
  private readonly appState = inject(AppStateService);
  private readonly allNotifications = this.appState.session().notifications;
  searchQuery = '';
  filteredItems = [...this.allNotifications];
  currentPage = 0;
  pageSize = 5;

  applyFilters() {
    let items = this.allNotifications;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      items = items.filter((n) => n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q));
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

  markAllRead() { this.appState.markAllNotificationsRead(); }
  markRead(id: number) { this.appState.markNotificationRead(id); }
  deleteItem(id: number) { this.appState.deleteNotification(id); }
}
