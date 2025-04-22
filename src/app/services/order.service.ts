import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpResponse } from '../types/general';
import environment from '../../environments/environment';

type Order = {
  id: number;
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
}
