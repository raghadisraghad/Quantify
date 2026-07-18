import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppStateService, ToastItem } from '../../shared/services/app-state.service';
import { OrdersService, OrderDTO, CreateOrderRequest, CreateOrderItemRequest } from '../../shared/services/orders.service';

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
        <button class="btn btn-primary" (click)="openCreateModal()">+ New Order</button>
      </div>

      <div class="toolbar">
        <div class="search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="search-icon"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" placeholder="Search orders..." [(ngModel)]="searchQuery" (keyup.enter)="loadOrders()" />
        </div>
        <select [(ngModel)]="statusFilter" (change)="loadOrders()">
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      <div class="card">
        <table>
          <thead>
            <tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Payment</th><th>Status</th><th>Time</th><th></th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let o of page.content">
              <td class="cell-id">{{ o.orderNumber || o.id.slice(0,8) }}</td>
              <td>{{ o.customerName || '-' }}</td>
              <td>{{ (o.items && o.items.length) || 0 }}</td>
              <td class="cell-price">MAD {{ o.totalAmount }}</td>
              <td><span class="tag">{{ o.payment?.paymentMethod || '-' }}</span></td>
              <td><span class="badge" [class.completed]="o.status === 'PAID'" [class.progress]="o.status === 'PENDING'" [class.cancelled]="o.status === 'CANCELLED'">{{ statusLabel(o.status) }}</span></td>
              <td class="cell-time">{{ o.createdAt | date:'short' }}</td>
              <td><button class="text-btn" (click)="openViewModal(o)">View</button></td>
            </tr>
            <tr *ngIf="page.content.length === 0"><td colspan="8" class="empty-cell">No orders found</td></tr>
          </tbody>
        </table>
        <div class="pagination" *ngIf="page.totalPages > 1">
          <span class="page-info">{{ page.totalElements }} orders · Page {{ page.number + 1 }} of {{ page.totalPages }}</span>
          <div class="page-btns">
            <button class="page-btn" [disabled]="page.number === 0" (click)="prevPage()">&lsaquo;</button>
            <span class="page-num" *ngFor="let p of pages" [class.active]="p === page.number" (click)="goToPage(p)">{{ p + 1 }}</span>
            <button class="page-btn" [disabled]="page.number >= page.totalPages - 1" (click)="nextPage()">&rsaquo;</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="showCreateModal" (click)="closeCreateModal($event)">
      <div class="modal" (click)="$event.stopPropagation()">
        <div class="modal-head">
          <h2>New Order</h2>
          <button class="modal-close" (click)="showCreateModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <label class="field">
            <span>Customer Name</span>
            <input type="text" [(ngModel)]="createForm.customerName" placeholder="Walk-in, Table 4, ..." />
          </label>

          <div class="items-section">
            <div class="items-header"><span>Items</span><button class="btn-sm" (click)="addItem()">+ Add Item</button></div>
            <div class="item-row" *ngFor="let item of createForm.items; let i = index">
              <input type="text" [(ngModel)]="item.name" placeholder="Item name" class="item-name" />
              <input type="number" [(ngModel)]="item.quantity" min="1" class="item-qty" placeholder="Qty" />
              <input type="number" [(ngModel)]="item.unitPrice" min="0" class="item-price" placeholder="Price" />
              <span class="item-subtotal">MAD {{ (item.quantity * item.unitPrice).toFixed(2) }}</span>
              <button class="btn-icon" (click)="removeItem(i)">&times;</button>
            </div>
          </div>

          <div class="total-row">
            <span>Total</span>
            <strong>MAD {{ totalCreateAmount.toFixed(2) }}</strong>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn btn-ghost" (click)="showCreateModal = false">Cancel</button>
          <button class="btn btn-primary" (click)="submitOrder()" [disabled]="submitting">{{ submitting ? 'Creating...' : 'Create Order' }}</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" *ngIf="viewOrder" (click)="closeViewModal($event)">
      <div class="modal modal-lg" (click)="$event.stopPropagation()">
        <div class="modal-head">
          <h2>{{ viewOrder.orderNumber || 'Order' }}</h2>
          <button class="modal-close" (click)="viewOrder = null">&times;</button>
        </div>
        <div class="modal-body">
          <div class="detail-grid">
            <div><span class="label">Customer</span><span>{{ viewOrder.customerName || '-' }}</span></div>
            <div><span class="label">Status</span><span class="badge" [class.completed]="viewOrder.status === 'PAID'" [class.progress]="viewOrder.status === 'PENDING'" [class.cancelled]="viewOrder.status === 'CANCELLED'">{{ statusLabel(viewOrder.status) }}</span></div>
            <div><span class="label">Date</span><span>{{ viewOrder.createdAt | date:'medium' }}</span></div>
            <div><span class="label">Payment</span><span>{{ viewOrder.payment?.paymentMethod || '-' }}</span></div>
          </div>

          <h3 class="section-title">Items</h3>
          <table class="items-table">
            <thead><tr><th>Item</th><th>Qty</th><th>Unit Price</th><th>Subtotal</th></tr></thead>
            <tbody>
              <tr *ngFor="let item of viewOrder.items">
                <td>{{ item.name || item.recipeId }}</td>
                <td>{{ item.quantity }}</td>
                <td>MAD {{ item.unitPrice }}</td>
                <td class="cell-price">MAD {{ (item.quantity * item.unitPrice).toFixed(2) }}</td>
              </tr>
            </tbody>
            <tfoot><tr><td colspan="3" class="total-label">Total</td><td class="cell-price">MAD {{ viewOrder.totalAmount }}</td></tr></tfoot>
          </table>

          <div class="payment-detail" *ngIf="viewOrder.payment">
            <h3 class="section-title">Payment</h3>
            <div class="detail-grid">
              <div><span class="label">Method</span><span>{{ viewOrder.payment.paymentMethod }}</span></div>
              <div><span class="label">Amount</span><span>MAD {{ viewOrder.payment.amount }}</span></div>
              <div><span class="label">Tendered</span><span>MAD {{ viewOrder.payment.tenderedAmount }}</span></div>
              <div><span class="label">Change</span><span>MAD {{ viewOrder.payment.changeAmount }}</span></div>
            </div>
          </div>
        </div>
        <div class="modal-foot">
          <button class="btn btn-primary" (click)="viewOrder = null">Close</button>
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
    .btn-primary:disabled { opacity:.5; cursor:default; transform:none; }
    .btn-ghost { background:var(--bg-hover); color:var(--text-secondary); }
    .btn-sm { background:var(--bg-hover); border:none; border-radius:.5rem; padding:.3rem .7rem; cursor:pointer; font-size:.78rem; color:var(--text-secondary); font-weight:600; }
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
    .badge.cancelled { background:#fef2f2; color:#dc2626; }
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

    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,.45); display:grid; place-items:center; z-index:1000; padding:1rem; }
    .modal { background:var(--bg-card); border-radius:1.2rem; width:min(100%,520px); max-height:90vh; overflow-y:auto; box-shadow:0 20px 60px rgba(0,0,0,.25); }
    .modal-lg { width:min(100%,680px); }
    .modal-head { display:flex; justify-content:space-between; align-items:center; padding:1.25rem 1.5rem; border-bottom:1px solid var(--border-table); }
    .modal-head h2 { margin:0; font-size:1.2rem; color:var(--text-primary); }
    .modal-close { background:none; border:none; font-size:1.4rem; color:var(--text-muted); cursor:pointer; padding:.2rem .4rem; }
    .modal-body { padding:1.25rem 1.5rem; display:flex; flex-direction:column; gap:1rem; }
    .modal-foot { display:flex; justify-content:flex-end; gap:.75rem; padding:1rem 1.5rem; border-top:1px solid var(--border-table); }
    .field { display:flex; flex-direction:column; gap:.35rem; }
    .field span { font-size:.82rem; font-weight:600; color:var(--text-secondary); }
    .field input { border:1px solid var(--border-input); border-radius:.75rem; padding:.7rem .85rem; font:inherit; outline:none; background:var(--bg-card); color:var(--text-primary); }
    .field input:focus { border-color:#7c8dff; }
    .items-section { display:flex; flex-direction:column; gap:.5rem; }
    .items-header { display:flex; justify-content:space-between; align-items:center; font-size:.82rem; font-weight:600; color:var(--text-secondary); }
    .item-row { display:flex; gap:.5rem; align-items:center; }
    .item-name { flex:1; border:1px solid var(--border-input); border-radius:.5rem; padding:.5rem .65rem; font:inherit; font-size:.82rem; background:var(--bg-card); color:var(--text-primary); outline:none; }
    .item-qty { width:60px; border:1px solid var(--border-input); border-radius:.5rem; padding:.5rem .65rem; font:inherit; font-size:.82rem; background:var(--bg-card); color:var(--text-primary); outline:none; }
    .item-price { width:80px; border:1px solid var(--border-input); border-radius:.5rem; padding:.5rem .65rem; font:inherit; font-size:.82rem; background:var(--bg-card); color:var(--text-primary); outline:none; }
    .item-subtotal { font-size:.82rem; font-weight:600; color:var(--text-primary); min-width:70px; text-align:right; }
    .btn-icon { background:none; border:none; color:#ef4444; cursor:pointer; font-size:1.1rem; padding:.2rem; }
    .total-row { display:flex; justify-content:space-between; align-items:center; padding-top:.5rem; border-top:1px solid var(--border-table); font-size:.95rem; }
    .total-row strong { font-size:1.15rem; }
    .detail-grid { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; }
    .detail-grid div { display:flex; flex-direction:column; gap:.15rem; }
    .label { font-size:.75rem; color:var(--text-muted); font-weight:600; text-transform:uppercase; letter-spacing:.06em; }
    .section-title { font-size:.95rem; margin:0; color:var(--text-primary); }
    .items-table { width:100%; border-collapse:collapse; margin-top:.5rem; }
    .items-table th { font-size:.72rem; padding:.5rem .75rem; }
    .items-table td { padding:.45rem .75rem; font-size:.82rem; }
    .items-table tfoot td { font-weight:700; border-top:2px solid var(--border-table); }
    .total-label { text-align:right; }
    .payment-detail { padding-top:.75rem; border-top:1px solid var(--border-table); }

    @media (max-width: 760px) { .page-head { flex-direction:column; align-items:flex-start; } .card { overflow-x:auto; } .detail-grid { grid-template-columns:1fr; } }
  `]
})
export class OrdersComponent {
  private readonly appState = inject(AppStateService);
  private readonly ordersService = inject(OrdersService);
  pageSize = 10;

  searchQuery = '';
  statusFilter = '';

  page = { content: [] as OrderDTO[], totalElements: 0, totalPages: 0, number: 0, size: 10 };

  showCreateModal = false;
  submitting = false;
  createForm = { customerName: '', items: [{ name: '', recipeId: '', quantity: 1, unitPrice: 0 }] };

  viewOrder: OrderDTO | null = null;

  constructor() {
    this.loadOrders();
  }

  get pages() { return Array.from({ length: this.page.totalPages }, (_, i) => i); }

  get totalCreateAmount() {
    return this.createForm.items.reduce((sum, it) => sum + (it.quantity || 0) * (it.unitPrice || 0), 0);
  }

  loadOrders() {
    const bid = this.appState.session().business?.id;
    if (!bid) return;
    this.ordersService.searchOrders(bid, this.searchQuery, this.statusFilter, this.page.number, this.pageSize)
      .subscribe({ next: (p) => this.page = p });
  }

  prevPage() { if (this.page.number > 0) { this.page.number--; this.loadOrders(); } }
  nextPage() { if (this.page.number < this.page.totalPages - 1) { this.page.number++; this.loadOrders(); } }
  goToPage(p: number) { this.page.number = p; this.loadOrders(); }

  openCreateModal() {
    this.createForm = { customerName: '', items: [{ name: '', recipeId: 'manual', quantity: 1, unitPrice: 0 }] };
    this.showCreateModal = true;
  }

  closeCreateModal(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.showCreateModal = false;
  }

  addItem() {
    this.createForm.items.push({ name: '', recipeId: 'manual', quantity: 1, unitPrice: 0 });
  }

  removeItem(i: number) {
    if (this.createForm.items.length > 1) this.createForm.items.splice(i, 1);
  }

  submitOrder() {
    const bid = this.appState.session().business?.id;
    if (!bid || this.submitting) return;
    const items = this.createForm.items.filter(it => it.name.trim());
    if (!items.length) { this.appState.showToast('Add at least one item.', 'error'); return; }
    this.submitting = true;
    const req: CreateOrderRequest = {
      businessId: bid,
      customerName: this.createForm.customerName,
      orderNumber: 'ORD-' + Date.now().toString(36).toUpperCase(),
      totalAmount: this.totalCreateAmount,
      items: items.map(it => ({ ...it, recipeId: it.recipeId || 'manual' }))
    };
    this.ordersService.createOrder(req).subscribe({
      next: () => {
        this.submitting = false;
        this.showCreateModal = false;
        this.appState.showToast('Order created successfully.', 'success');
        this.loadOrders();
      },
      error: (err) => {
        this.submitting = false;
        this.appState.showToast(err.error?.error || 'Failed to create order.', 'error');
      }
    });
  }

  openViewModal(order: OrderDTO) {
    this.ordersService.getOrder(order.id).subscribe({
      next: (o) => this.viewOrder = o,
      error: () => this.appState.showToast('Failed to load order details.', 'error')
    });
  }

  closeViewModal(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) this.viewOrder = null;
  }

  statusLabel(s: string) {
    switch (s) {
      case 'PENDING': return 'Pending';
      case 'PAID': return 'Completed';
      case 'CANCELLED': return 'Cancelled';
      default: return s;
    }
  }
}
