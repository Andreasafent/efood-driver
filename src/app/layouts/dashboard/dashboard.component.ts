import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { AuthService } from '../../services/auth.service';
import { Geolocation } from '@capacitor/geolocation'
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, NgIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    public authService = inject(AuthService);
    public locationGranted = false;
    public location = {
        latitude: 0,
        longitude: 0,
    }

    constructor(){
        this.checkLocationPermission();
    }

    public async checkLocationPermission(){
        const permission = await Geolocation.checkPermissions();
        this.locationGranted = permission.location === 'granted';
        if(this.locationGranted){
            this.watchPosition();
        }
    }

    public async requestLocationPermission(){
        const {coords} = await Geolocation.getCurrentPosition();
        this.setLocation(coords);

        if(this.locationGranted){            
            this.watchPosition();
        }
    }

    public async watchPosition(){
        Geolocation.watchPosition({
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 10000,
        }, (position, err) => {
            if (err) {
                return;
            }
            this.setLocation(position?.coords)
        })
    }

    public setLocation(coords?: {latitude: number, longitude: number}){
        if(!coords || !coords.latitude || !coords.longitude){
            return;
        }
        this.location.latitude = coords.latitude;
        this.location.longitude = coords.longitude;
        this.locationGranted = true;

        localStorage.setItem('location', JSON.stringify(this.location));
    }
}
