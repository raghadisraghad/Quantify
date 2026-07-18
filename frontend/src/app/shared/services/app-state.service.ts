import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { businessProfile, employeeProfiles, notifications as initialNotifications } from '../data/mock-data';

export interface ToastItem {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface SessionState {
  business: typeof businessProfile;
  employee: null | (typeof employeeProfiles)[number];
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

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly session = signal<SessionState>({
    business: businessProfile,
    employee: null,
    isAuthenticated: false,
    mode: 'employee',
    theme: 'dark',
    showOwnerModal: false,
    pendingRoute: null,
    sidebarCollapsed: false,
    notifications: initialNotifications,
    showNotifications: false,
    toasts: [],
    isLoading: true
  });

  constructor(private router: Router) {
    setTimeout(() => this.session.update((s) => ({ ...s, isLoading: false })), 600);
  }

  loginBusiness() {
    this.session.update((s) => ({ ...s, isAuthenticated: true }));
    this.showToast('Welcome back. Please verify the employee PIN.', 'success');
    this.router.navigate(['/pin']);
  }

  setEmployee(employee: (typeof employeeProfiles)[number]) {
    this.session.update((s) => ({ ...s, employee, mode: 'employee' }));
    this.showToast(`Signed in as ${employee.name}.`, 'success');
    this.router.navigate(['/dashboard']);
  }

  switchToEmployeeMode() {
    this.session.update((s) => ({ ...s, mode: 'employee' }));
    this.showToast('Switched to Employee Mode.', 'info');
    this.router.navigate(['/dashboard']);
  }

  switchToOwnerMode() {
    this.session.update((s) => ({ ...s, pendingRoute: '/dashboard', showOwnerModal: true }));
  }

  logoutBusiness() {
    this.session.update((s) => ({
      ...s, isAuthenticated: false, employee: null, mode: 'employee',
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
  }

  toggleSidebar() {
    this.session.update((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed }));
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
