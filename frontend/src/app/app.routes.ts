import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/public/landing-page/landing-page.component';
import { LoginComponent } from './features/public/login/login.component';
import { PinComponent } from './features/public/pin/pin.component';
import { AppShellComponent } from './features/layout/app-shell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { InventoryComponent } from './features/inventory/inventory.component';
import { ProductsComponent } from './features/products/products.component';
import { SalesComponent } from './features/sales/sales.component';
import { ProcurementComponent } from './features/procurement/procurement.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { ReportsComponent } from './features/reports/reports.component';
import { SettingsComponent } from './features/settings/settings.component';
import { NotificationsComponent } from './features/notifications/notifications.component';
import { ProfileComponent } from './features/profile/profile.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { RecipesComponent } from './features/recipes/recipes.component';
import { SuppliersComponent } from './features/suppliers/suppliers.component';
import { OrdersComponent } from './features/orders/orders.component';
import { PaymentsComponent } from './features/payments/payments.component';
import { MenusComponent } from './features/menus/menus.component';
import { UnauthorizedComponent } from './features/public/unauthorized/unauthorized.component';
import { MaintenanceComponent } from './features/public/maintenance/maintenance.component';
import { SessionGuard } from './shared/services/session-guard.service';
import { OwnerGuard } from './shared/services/owner-guard.service';
import { GuestGuard, PinGuard } from './shared/services/login-guard.service';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [GuestGuard] },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'pin', component: PinComponent, canActivate: [PinGuard] },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [SessionGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'inventory', component: InventoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'menus', component: MenusComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'recipes', component: RecipesComponent },
      { path: 'suppliers', component: SuppliersComponent, canActivate: [OwnerGuard] },
      { path: 'sales', component: SalesComponent, canActivate: [OwnerGuard] },
      { path: 'procurement', component: ProcurementComponent, canActivate: [OwnerGuard] },
      { path: 'employees', component: EmployeesComponent, canActivate: [OwnerGuard] },
      { path: 'reports', component: ReportsComponent, canActivate: [OwnerGuard] },
      { path: 'settings', component: SettingsComponent, canActivate: [OwnerGuard] },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'maintenance', component: MaintenanceComponent },
  { path: '404', component: LandingPageComponent },
  { path: '**', redirectTo: '' }
];
