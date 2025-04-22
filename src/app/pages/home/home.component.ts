import { Component, inject } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { OrdersListComponent } from '../../components/orders-list/orders-list.component';

@Component({
  selector: 'app-home',
  imports: [OrdersListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public locationService = inject(LocationService);

}
