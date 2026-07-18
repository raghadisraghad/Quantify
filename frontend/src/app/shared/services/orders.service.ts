import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OrderItem {
  id: string;
  orderId: string;
  name: string;
  recipeId: string;
  quantity: number;
  unitPrice: number;
}

export interface Payment {
  id: string;
  businessId: string;
  orderId: string;
  amount: number;
  tenderedAmount: number;
  changeAmount: number;
  paymentMethod: string;
  status: string;
  transactionDate: string;
}

export interface OrderDTO {
  id: string;
  businessId: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  createdAt: string;
  items: OrderItem[];
  payment: Payment | null;
}

export interface PageDTO<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CreateOrderItemRequest {
  name: string;
  recipeId: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateOrderRequest {
  businessId: string;
  customerName: string;
  orderNumber: string;
  totalAmount: number;
  items: CreateOrderItemRequest[];
}

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly base = environment.apiUrl;

  searchOrders(businessId: string, q: string, status: string, page: number, size: number): Observable<PageDTO<OrderDTO>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (q) params = params.set('q', q);
    if (status) params = params.set('status', status);
    return this.http.get<PageDTO<OrderDTO>>(`${this.base}/sales/orders/business/${businessId}/search`, { params });
  }

  getOrder(id: string): Observable<OrderDTO> {
    return this.http.get<OrderDTO>(`${this.base}/sales/orders/${id}`);
  }

  createOrder(req: CreateOrderRequest): Observable<OrderDTO> {
    return this.http.post<OrderDTO>(`${this.base}/sales/orders`, req);
  }
}
