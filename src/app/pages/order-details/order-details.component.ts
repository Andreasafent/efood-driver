import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { JsonPipe } from '@angular/common';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-order-details',
  imports: [JsonPipe],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  private orderService = inject(OrderService)
  private route = inject(ActivatedRoute);
  private locationService = inject(LocationService);
  private orderId: string = '';
  public order: any = null;

  constructor() {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.fetchOrderDetails();
    });
  }

  fetchOrderDetails() {
    this.orderService
      .getOrderDetails(this.orderId)
      .subscribe((response)=>{
        this.order = response.data?.order || null;
      })
  }
}
