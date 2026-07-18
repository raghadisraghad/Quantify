import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { notifications as initialNotifications } from '../data/mock-data';

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface BusinessInfo {
  id: string;
  name: string;
  slug: string;
  type: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
}

export interface EmployeeInfo {
  id: string;
  name: string;
  role: string;
}

export interface SessionState {
  business: BusinessInfo | null;
  employee: EmployeeInfo | null;
  token: string | null;
  userToken: string | null;
  isAuthenticated: boolean;
  mode: 'employee' | 'owner';
  theme: 'dark' | 'light';
  showOwnerModal: boolean;
  pendingRoute: string | null;
  sidebarCollapsed: boolean;
  notifications: typeof initialNotifications;
  showNotifications: boolean;
  toasts: ToastItem[];
  isLoading: boolean;
}

const LS_KEY = 'quantify_session';

function loadSession(): Partial<SessionState> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveSession(state: SessionState) {
  try {
    const { toasts, showNotifications, isLoading, showOwnerModal, pendingRoute, ...persist } = state;
    localStorage.setItem(LS_KEY, JSON.stringify(persist));
  } catch { /* ignore */ }
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly session = signal<SessionState>({
    business: null,
    employee: null,
    token: null,
    userToken: null,
    isAuthenticated: false,
    mode: 'employee',
    theme: 'dark',
    showOwnerModal: false,
    pendingRoute: null,
    sidebarCollapsed: false,
    notifications: initialNotifications,
    showNotifications: false,
    toasts: [],
    isLoading: true,
    ...loadSession()
  });

  constructor(private router: Router) {
    setTimeout(() => this.session.update((s) => ({ ...s, isLoading: false })), 600);
  }

  private persist() {
    saveSession(this.session());
  }

  loginBusiness(business: BusinessInfo, token: string) {
    this.session.update((s) => ({ ...s, business, token, isAuthenticated: true }));
    this.persist();
    this.showToast('Welcome back. Please verify the employee PIN.', 'success');
    this.router.navigate(['/pin']);
  }

  setEmployee(employee: EmployeeInfo, userToken: string) {
    this.session.update((s) => ({ ...s, employee, userToken, mode: 'employee' }));
    this.persist();
    this.showToast(`Signed in as ${employee.name}.`, 'success');
    this.router.navigate(['/dashboard']);
  }

  switchToEmployeeMode() {
    this.session.update((s) => ({ ...s, mode: 'employee' }));
    this.persist();
    this.showToast('Switched to Employee Mode.', 'info');
    this.router.navigate(['/dashboard']);
  }

  switchToOwnerMode() {
    this.session.update((s) => ({ ...s, pendingRoute: '/dashboard', showOwnerModal: true }));
  }

  logoutBusiness() {
    localStorage.removeItem(LS_KEY);
    this.session.update((s) => ({
      ...s, business: null, employee: null, token: null, userToken: null,
      isAuthenticated: false, mode: 'employee',
      showOwnerModal: false, pendingRoute: null, showNotifications: false
    }));
    this.router.navigate(['/']);
    this.showToast('You have been logged out.', 'info');
  }

  openOwnerVerification(route?: string) {
    this.session.update((s) => ({ ...s, pendingRoute: route ?? s.pendingRoute, showOwnerModal: true }));
  }

  verifyOwner(password: string) {
    if (password === 'welcome') {
      this.session.update((s) => ({ ...s, mode: 'owner', showOwnerModal: false }));
      this.showToast('Owner Mode activated.', 'success');
      const route = this.session().pendingRoute ?? '/dashboard';
      this.session.update((s) => ({ ...s, pendingRoute: null }));
      this.router.navigate([route]);
      return true;
    }
    this.showToast('The owner password was incorrect.', 'error');
    return false;
  }

  toggleTheme() {
    this.session.update((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' }));
    this.persist();
  }

  toggleSidebar() {
    this.session.update((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }));
    this.persist();
  }

  toggleNotifications() {
    this.session.update((s) => ({ ...s, showNotifications: !s.showNotifications }));
  }

  closeNotifications() {
    this.session.update((s) => ({ ...s, showNotifications: false }));
  }

  markAllNotificationsRead() {
    this.session.update((s) => ({
      ...s, notifications: s.notifications.map((n) => ({ ...n, unread: false }))
    }));
    this.showToast('All notifications marked as read.', 'success');
  }

  markNotificationRead(id: number) {
    this.session.update((s) => ({
      ...s, notifications: s.notifications.map((n) => n.id === id ? { ...n, unread: false } : n)
    }));
  }

  deleteNotification(id: number) {
    this.session.update((s) => ({
      ...s, notifications: s.notifications.filter((n) => n.id !== id)
    }));
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const toast = { id: Date.now(), message, type };
    this.session.update((s) => ({ ...s, toasts: [...s.toasts, toast] }));
    setTimeout(() => this.dismissToast(toast.id), 3500);
  }

  dismissToast(id: number) {
    this.session.update((s) => ({ ...s, toasts: s.toasts.filter((t) => t.id !== id) }));
  }
}
