import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders-list',
  imports: [],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  private orderService = inject(OrderService);

  public orders: any = [];

  constructor() {
    this.orderService.getActiveNearbyOrders()
      .subscribe((response) => {
        if(response.success && response.data){
          this.orders = response.data?.orders || [];
        }
      })
  }
}
