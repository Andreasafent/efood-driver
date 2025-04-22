import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NgIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    public authService = inject(AuthService);
    public locationService = inject(LocationService);
    

    constructor(){
        this.locationService.checkLocationPermission();
    }

    
}
