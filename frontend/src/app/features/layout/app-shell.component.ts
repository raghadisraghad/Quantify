import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AppStateService } from '../../shared/services/app-state.service';

interface NavItem { label: string; route: string; icon: string; ownerOnly?: boolean; }

const ALL_NAV: NavItem[] = [
  { label: 'Dashboard', route: '/dashboard', icon: 'layout-dashboard' },
  { label: 'Orders', route: '/orders', icon: 'shopping-cart' },
  { label: 'Payments', route: '/payments', icon: 'credit-card' },
  { label: 'Menus', route: '/menus', icon: 'grid' },
  { label: 'Inventory', route: '/inventory', icon: 'package' },
  { label: 'Categories', route: '/categories', icon: 'folder' },
  { label: 'Products', route: '/products', icon: 'shopping-bag' },
  { label: 'Recipes', route: '/recipes', icon: 'book' },
  { label: 'Sales', route: '/sales', icon: 'trending-up', ownerOnly: true },
  { label: 'Suppliers', route: '/suppliers', icon: 'truck', ownerOnly: true },
  { label: 'Procurement', route: '/procurement', icon: 'clipboard', ownerOnly: true },
  { label: 'Employees', route: '/employees', icon: 'users', ownerOnly: true },
  { label: 'Reports', route: '/reports', icon: 'file-text', ownerOnly: true },
  { label: 'Settings', route: '/settings', icon: 'settings', ownerOnly: true },
  { label: 'Notifications', route: '/notifications', icon: 'bell' },
  { label: 'Profile', route: '/profile', icon: 'user' }
];

const ICONS: Record<string, string> = {
  'layout-dashboard': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
  'package': '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>',
  'shopping-bag': '<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  'bell': '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  'user': '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  'truck': '<rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>',
  'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
  'settings': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
  'log-out': '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  'chevron-left': '<polyline points="15 18 9 12 15 6"/>',
  'chevron-right': '<polyline points="9 18 15 12 9 6"/>',
  'sun': '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  'moon': '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
  'folder': '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
  'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  'clipboard': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="12" y2="15"/>',
  'shopping-cart': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
  'credit-card': '<rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/><line x1="7" y1="15" x2="11" y2="15"/>',
  'grid': '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>'
};

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="layout" [class.dark]="session().theme === 'dark'" [class.light]="session().theme === 'light'">
      <aside class="sidebar" [class.collapsed]="session().sidebarCollapsed">
        <div class="sidebar-inner">
          <div class="brand-block">
            <div class="brand-mark">Q</div>
            <div class="brand-text" *ngIf="!session().sidebarCollapsed">
              <div class="brand-name">Quantify</div>
              <div class="brand-sub">{{ session().mode === 'owner' ? 'Owner Mode' : 'Employee Mode' }}</div>
            </div>
          </div>

          <nav class="nav-links">
            <a *ngFor="let item of navItems"
               [routerLink]="item.route"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{exact: item.route === '/dashboard'}"
               class="nav-item">
              <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [innerHTML]="safeHtml(ICONS[item.icon])"></svg>
              <span class="nav-label" *ngIf="!session().sidebarCollapsed">{{ item.label }}</span>
            </a>
          </nav>
        </div>

        <div class="sidebar-footer-area">
          <div class="sb-user">
            <div class="sb-avatar">{{ session().employee?.name?.charAt(0) || '?' }}</div>
            <div class="sb-user-text" *ngIf="!session().sidebarCollapsed">
              <strong>{{ session().employee?.name || 'User' }}</strong>
              <span>{{ session().employee?.role || '' }}</span>
            </div>
          </div>
          <button class="collapse-btn" type="button" (click)="toggleSidebar()" [title]="session().sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-sidem" [innerHTML]="safeHtml(ICONS[session().sidebarCollapsed ? 'chevron-right' : 'chevron-left'])"></svg>
          </button>
        </div>
      </aside>

      <div class="main-panel">
        <header class="topbar">
          <div class="topbar-left">
            <button class="tb-icon-btn" type="button" (click)="toggleSidebar()" title="Toggle sidebar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-md"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <div class="eyebrow">Good {{ timeOfDay }}, {{ session().employee?.name || 'User' }}</div>
              <h1>{{ session().business.name }}</h1>
            </div>
          </div>

          <div class="topbar-right">
            <button class="tb-icon-btn" type="button" (click)="toggleTheme()" [title]="session().theme === 'dark' ? 'Light mode' : 'Dark mode'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-md"><g [innerHTML]="safeHtml(ICONS[session().theme === 'dark' ? 'sun' : 'moon'])"></g></svg>
            </button>

            <div class="notif-wrap">
              <button class="tb-icon-btn" type="button" (click)="toggleNotifications()" title="Notifications">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-md"><g [innerHTML]="safeHtml(ICONS['bell'])"></g></svg>
                <span class="tb-badge" *ngIf="unseen > 0">{{ unseen }}</span>
              </button>
            </div>

            <button class="tb-icon-btn" type="button" (click)="logout()" title="Logout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-md"><g [innerHTML]="safeHtml(ICONS['log-out'])"></g></svg>
            </button>

            <div class="mode-indicator" [class.owner]="session().mode === 'owner'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-xs"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="mode-label">{{ session().mode === 'owner' ? 'Owner' : 'Employee' }} Mode</span>
              <button class="mode-switch" type="button" (click)="switchMode()">
                {{ session().mode === 'owner' ? '⇄ Employee' : '⇄ Owner' }}
              </button>
            </div>
          </div>
        </header>

        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>

    <div class="notif-panel" *ngIf="session().showNotifications">
      <div class="notif-backdrop" (click)="closeNotifications()"></div>
      <div class="notif-dropdown">
        <div class="notif-header">
          <strong>Notifications</strong>
          <button class="text-btn" type="button" (click)="markAllRead()">Mark all read</button>
        </div>
        <div class="notif-list">
          <div class="notif-item" *ngFor="let n of session().notifications" [class.unread]="n.unread" (click)="markRead(n.id)">
            <div class="notif-dot" *ngIf="n.unread"></div>
            <div class="notif-body">
              <div class="notif-title">{{ n.title }}</div>
              <div class="notif-msg">{{ n.message }}</div>
              <div class="notif-meta">
                <span class="notif-cat">{{ n.category }}</span>
                <span class="notif-time">{{ n.time }}</span>
              </div>
            </div>
            <button class="notif-dismiss" type="button" (click)="deleteNotif(n.id); $event.stopPropagation()">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-xs"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>
        <div class="notif-footer">
          <a routerLink="/notifications" class="text-btn" (click)="closeNotifications()">View all notifications</a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }`,
    `@keyframes slideDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`,

    `.layout { min-height:100vh; display:grid; grid-template-columns:auto 1fr; background:var(--bg-page); color:var(--text-primary); }`,

    `.sidebar { width:260px; background:#08111f; display:flex; flex-direction:column; transition:width .3s cubic-bezier(.4,0,.2,1); position:sticky; top:0; height:100vh; }`,
    `.sidebar.collapsed { width:72px; }`,
    `.sidebar-inner { display:flex; flex-direction:column; flex:1; overflow:hidden; min-height:0; }`,

    `.brand-block { display:flex; align-items:center; justify-content:center; gap:.75rem; padding:1rem .85rem 0; flex-shrink:0; }`,
    `.sidebar.collapsed .brand-block { padding:.8rem .4rem 0; }`,
    `.brand-mark { width:38px; height:38px; min-width:38px; border-radius:11px; background:linear-gradient(135deg,#7c8dff,#49b8ff); display:grid; place-items:center; font-weight:800; font-size:1.1rem; color:#07111f; }`,
    `.brand-text { overflow:hidden; white-space:nowrap; }`,
    `.brand-name { font-weight:800; font-size:1rem; color:#f3f6ff; }`,
    `.brand-sub { color:#8fb4ff; font-size:.7rem; text-transform:uppercase; letter-spacing:.08em; }`,

    `.nav-links { display:flex; flex-direction:column; gap:.15rem; padding:.6rem .6rem; overflow-y:auto; flex:1; scrollbar-width:none; -ms-overflow-style:none; }`,
    `.nav-links::-webkit-scrollbar { display:none; }`,
    `.sidebar.collapsed .nav-links { padding:.6rem .35rem; align-items:center; }`,
    `.nav-item { display:flex; align-items:center; gap:.7rem; padding:.6rem .7rem; border-radius:.75rem; text-decoration:none; color:#b9c7e6; transition:all .18s ease; position:relative; white-space:nowrap; flex-shrink:0; }`,
    `.sidebar.collapsed .nav-item { justify-content:center; padding:.6rem; gap:0; }`,
    `.nav-item:hover { background:rgba(255,255,255,.08); color:white; }`,
    `.nav-item:active { transform:scale(.96); }`,
    `.nav-item.active { background:rgba(124,141,255,.15); color:#7c8dff; }`,
    `.nav-item.active::before { content:''; position:absolute; left:0; top:50%; transform:translateY(-50%); width:3px; height:18px; border-radius:0 3px 3px 0; background:#7c8dff; }`,
    `.nav-icon { width:20px; height:20px; min-width:20px; display:block; }`,
    `.sidebar.collapsed .nav-icon { width:22px; height:22px; min-width:22px; }`,
    `.nav-label { font-size:.85rem; font-weight:500; }`,

    `.sidebar-footer-area { display:flex; align-items:center; gap:.5rem; padding:.6rem .8rem; border-top:1px solid rgba(255,255,255,.08); flex-shrink:0; }`,
    `.sidebar.collapsed .sidebar-footer-area { padding:.6rem .35rem; justify-content:center; }`,
    `.sb-user { display:flex; align-items:center; gap:.6rem; flex:1; min-width:0; }`,
    `.sidebar.collapsed .sb-user { justify-content:center; }`,
    `.sb-avatar { width:32px; height:32px; min-width:32px; border-radius:50%; background:linear-gradient(135deg,#7c8dff,#49b8ff); display:grid; place-items:center; font-weight:700; font-size:.85rem; color:#07111f; }`,
    `.sb-user-text { display:flex; flex-direction:column; overflow:hidden; }`,
    `.sidebar.collapsed .sb-user-text { display:none; }`,
    `.sb-user-text strong { font-size:.82rem; color:#f3f6ff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }`,
    `.sb-user-text span { font-size:.68rem; color:#8fb4ff; }`,
    `.collapse-btn { background:rgba(255,255,255,.06); border:none; color:#b9c7e6; cursor:pointer; padding:.35rem; border-radius:.5rem; display:grid; place-items:center; transition:all .15s; flex-shrink:0; }`,
    `.collapse-btn:hover { background:rgba(255,255,255,.12); color:white; }`,
    `.sidebar.collapsed .collapse-btn { margin-left:auto; }`,
    `.icon-sidem { width:16px; height:16px; }`,

    `.main-panel { display:flex; flex-direction:column; min-height:100vh; }`,

    `.topbar { display:flex; justify-content:space-between; align-items:center; background:var(--bg-topbar); padding:.55rem 1.25rem; border-bottom:1px solid var(--border-light); position:sticky; top:0; z-index:100; }`,
    `.topbar-left { display:flex; align-items:center; gap:.85rem; }`,
    `.topbar-right { display:flex; align-items:center; gap:.5rem; }`,
    `.eyebrow { text-transform:uppercase; letter-spacing:.12em; font-size:.65rem; color:#8fb4ff; margin-bottom:.1rem; }`,
    `.topbar-left h1 { margin:0; font-size:1rem; font-weight:700; color:var(--text-primary); }`,

    `.tb-icon-btn { background:transparent; border:none; color:var(--text-secondary); cursor:pointer; padding:.4rem; border-radius:.5rem; display:grid; place-items:center; transition:all .15s; position:relative; }`,
    `.tb-icon-btn:hover { background:var(--bg-hover); color:var(--text-primary); }`,
    `.tb-icon-btn:active { transform:scale(.92); }`,
    `.icon-md { width:20px; height:20px; display:block; }`,
    `.icon-xs { width:13px; height:13px; }`,
    `.tb-badge { position:absolute; top:1px; right:1px; min-width:15px; height:15px; border-radius:50%; background:#ef4444; color:white; font-size:.6rem; font-weight:700; display:grid; place-items:center; padding:0 3px; }`,

    `.notif-wrap { position:relative; }`,

    `.mode-indicator { display:flex; align-items:center; gap:.4rem; background:var(--bg-hover); padding:.25rem .45rem .25rem .6rem; border-radius:999px; font-size:.72rem; font-weight:600; color:var(--text-secondary); }`,
    `.mode-indicator.owner { background:#eef4ff; color:#4756c8; }`,
    `.mode-label { white-space:nowrap; }`,
    `.mode-switch { background:none; border:1px solid currentColor; border-radius:999px; padding:.15rem .45rem; font-size:.62rem; font-weight:600; cursor:pointer; color:inherit; opacity:.7; transition:opacity .2s; white-space:nowrap; }`,
    `.mode-switch:hover { opacity:1; }`,

    `.content { padding:1.25rem 1.5rem; flex:1; animation:fadeIn .25s ease-out; }`,

    `.notif-panel { position:fixed; inset:0; z-index:900; }`,
    `.notif-backdrop { position:absolute; inset:0; }`,
    `.notif-dropdown { position:absolute; top:3.2rem; right:1.25rem; width:380px; background:var(--bg-card); border-radius:1rem; box-shadow:var(--shadow-modal); border:1px solid var(--border-light); animation:slideDown .2s ease-out; max-height:480px; display:flex; flex-direction:column; }`,
    `.notif-header { display:flex; justify-content:space-between; align-items:center; padding:1rem 1.1rem .5rem; flex-shrink:0; }`,
    `.notif-header strong { font-size:.95rem; color:var(--text-primary); }`,
    `.notif-list { overflow-y:auto; flex:1; }`,
    `.notif-item { display:flex; gap:.65rem; padding:.65rem 1.1rem; cursor:pointer; transition:background .15s; border-left:3px solid transparent; }`,
    `.notif-item:hover { background:var(--bg-hover); }`,
    `.notif-item.unread { border-left-color:#7c8dff; background:var(--bg-hover); }`,
    `.notif-dot { width:8px; height:8px; min-width:8px; border-radius:50%; background:#7c8dff; margin-top:6px; }`,
    `.notif-body { flex:1; min-width:0; }`,
    `.notif-title { font-size:.85rem; font-weight:600; margin-bottom:.1rem; color:var(--text-primary); }`,
    `.notif-msg { font-size:.78rem; color:var(--text-muted); line-height:1.3; }`,
    `.notif-meta { display:flex; gap:.5rem; margin-top:.25rem; }`,
    `.notif-cat { font-size:.65rem; color:#4756c8; font-weight:600; }`,
    `.notif-time { font-size:.65rem; color:#94a3b8; }`,
    `.notif-dismiss { background:none; border:none; color:#94a3b8; cursor:pointer; padding:.2rem; border-radius:.3rem; opacity:0; transition:opacity .15s; }`,
    `.notif-item:hover .notif-dismiss { opacity:1; }`,
    `.notif-dismiss:hover { color:var(--text-primary); }`,
    `.notif-footer { padding:.5rem 1.1rem .8rem; text-align:center; border-top:1px solid var(--border-table); flex-shrink:0; }`,
    `.text-btn { background:none; border:none; color:#4756c8; font-size:.8rem; cursor:pointer; font-weight:600; padding:0; }`,
    `.text-btn:hover { text-decoration:underline; }`,

    `@media (max-width: 900px) { .notif-dropdown { width:340px; } }`,
    `@media (max-width: 760px) { .layout { grid-template-columns:1fr; } .sidebar { display:none; } .topbar { flex-wrap:wrap; gap:.35rem; } .mode-label { display:none; } .notif-dropdown { width:calc(100vw - 2rem); right:.5rem; } }`
  ]
})
export class AppShellComponent {
  private readonly appState = inject(AppStateService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly session = this.appState.session;
  readonly ICONS = ICONS;

  get navItems() {
    return ALL_NAV.filter((n) => !n.ownerOnly || this.session().mode === 'owner');
  }

  get unseen() {
    return this.session().notifications.filter((n) => n.unread).length;
  }

  get timeOfDay() {
    const h = new Date().getHours();
    if (h < 12) return 'morning';
    if (h < 17) return 'afternoon';
    return 'evening';
  }

  safeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  toggleSidebar() { this.appState.toggleSidebar(); }
  toggleTheme() { this.appState.toggleTheme(); }
  toggleNotifications() {
    this.session().showNotifications
      ? this.appState.closeNotifications()
      : this.appState.toggleNotifications();
  }
  closeNotifications() { this.appState.closeNotifications(); }

  switchMode() {
    this.session().mode === 'owner'
      ? this.appState.switchToEmployeeMode()
      : this.appState.switchToOwnerMode();
  }

  markAllRead() { this.appState.markAllNotificationsRead(); }
  markRead(id: number) { this.appState.markNotificationRead(id); }
  deleteNotif(id: number) { this.appState.deleteNotification(id); }
  logout() { this.appState.logoutBusiness(); }
}
