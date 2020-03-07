import { Component } from '@angular/core';
import { Plugins } from "@capacitor/core";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lat: number;
  lng: number;
  address: string;

  constructor(  private http: HttpClient,
    public toastController: ToastController) {
    // this.getCurrentLocation();
  }

  ngOnInit() {
    // call get current location function on initializing

    this.getCurrentLocation();
  }


  getCurrentLocation() {
    
    Plugins.Geolocation.getCurrentPosition().then(result => {
      this.lat = result.coords.latitude;
      this.lng = result.coords.longitude;
      console.log("result",result)
      // calling getAddress function to decode the address

      this.getAddress(this.lat, this.lng).subscribe(decodedAddress => {
        this.address = decodedAddress;
        console.log(this.address);
      });
    });
  }

  
  private getAddress(lat: number, lan: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lan}&key=${
          environment.googleMapsAPIKey
        }`
      )
      .pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results === 0) {
            return null;
          }
          console.log("geoData", geoData)
          return geoData
          // return geoData.results[0].formatted_address;
        })
      );
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: this.address,

      position: "middle",
      buttons: [
        {
          icon: "close-circle",
          role: "cancel"
        }
      ]
    });
    toast.present();
  }

  onMarkerClick() {
    this.presentToast();
  }
  
}
