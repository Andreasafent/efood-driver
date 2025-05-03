import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpResponse } from '../types/general';
import environment from '../../environments/environment';

type Order = {
  id: number;
  preparation_time: number;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient)

  constructor() { }

  public getActiveNearbyOrders() {
    return this.http.get<HttpResponse<{ orders: Order[] }>>(`${environment.endpoint}/orders/nearby`);
  }

  public takeOrder(orderId: string) {
    return this.http.post<HttpResponse>(environment.endpoint + '/orders/take', { order_id: orderId });
  }

  public getOrderDetails(orderId: string) {
    return this.http.get<HttpResponse<{ order: Order }>>(environment.endpoint + '/orders/details/' + orderId);
  }

  public startDelivery(orderId: string) {
    return this.http.post<HttpResponse>(environment.endpoint + '/orders/start-delivery', { order_id: orderId });
  }

  public completePayment(orderId: string) {
    return this.http.post<HttpResponse>(environment.endpoint + '/orders/complete-payment', { order_id: orderId });
  }

  public completeDelivery(orderId: string) {
    return this.http.post<HttpResponse>(environment.endpoint + '/orders/complete-delivery', { order_id: orderId });
  }

}
