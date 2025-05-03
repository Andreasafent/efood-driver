import { Component, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { TimeFromNowPipe } from '../../pipes/time-from-now.pipe';

@Component({
  selector: 'app-orders-list',
  imports: [TimeFromNowPipe, NgIcon, CurrencyPipe, DecimalPipe, SweetAlert2Module],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.scss'
})
export class OrdersListComponent {
  private orderService = inject(OrderService);
  private router = inject(Router);

  public orders: any = [];

  constructor() {
    this.orderService.getActiveNearbyOrders()
      .subscribe((response) => {
        if (response.success && response.data) {
          this.orders = response.data?.orders || [];
        }
      })
  }

  takeOrder(orderId: string) {
    this.orderService.takeOrder(orderId)
      .subscribe((response) => {
        console.log(response);
        if (response.success) {
          this.router.navigate(['/dashboard/order-details', orderId]);
        }
      });
  }
}
