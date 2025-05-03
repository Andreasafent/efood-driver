import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { JsonPipe } from '@angular/common';
import { LocationService } from '../../services/location.service';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-order-details',
  imports: [JsonPipe, GoogleMap, MapMarker],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  private orderService = inject(OrderService)
  private route = inject(ActivatedRoute);
  public locationService = inject(LocationService);
  private orderId: string = '';
  public order: any = null;

  public loader = {
    startDelivery: false,
    completeDelivery: false,
    completePayment: false,
  }

  public marker: Record<string, any> = {
    driver: {
      icon: {
        label: 'D',
        url: '/images/pin-driver.png',
        scaledSize: {
          width: 26,
          height: 26
        }
      },
    },
    store: {
      icon: {
        url: '/images/pin-store.png',
        scaledSize: {
          width: 26,
          height: 26
        }
      },
    },
    client: {
      icon: {
        url: '/images/pin-client.png',
        scaledSize: {
          width: 26,
          height: 26
        }
      },
    }
  }



  constructor() {
    this.route.params.subscribe(params => {
      this.orderId = params['id'];
      this.fetchOrderDetails();
    });
  }

  fetchOrderDetails() {
    this.orderService
      .getOrderDetails(this.orderId)
      .subscribe((response) => {
        this.order = response.data?.order || null;
      })
  }

  startDelivery() {
    this.loader.startDelivery = true;
    this.orderService
      .startDelivery(this.orderId)
      .pipe(finalize(() => this.loader.startDelivery = false))
      .subscribe((response) => {
        if (response.success === true) {
          this.fetchOrderDetails();
        }
      });
  }

  completePayment() {
    this.loader.completePayment = true;
    this.orderService
      .completePayment(this.orderId)
      .pipe(finalize(() => this.loader.completePayment = false))
      .subscribe((response) => {
        if (response.success === true) {
          this.fetchOrderDetails();
        }
      });
  }

  completeDelivery() {
    this.loader.completeDelivery = true;
    this.orderService
      .completeDelivery(this.orderId)
      .pipe(finalize(() => this.loader.completeDelivery = false))
      .subscribe((response) => {
        if (response.success === true) {
          this.fetchOrderDetails();
        }
      });
  }

}
