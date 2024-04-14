import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  lat = 51.678418;
  lng = 7.809007;

  latitude = 51.678418;
  longitude = 7.809007;
  locationChosen = false;

  // onChoseLocation(event) {
  //   this.latitude = event.coords.lat;
  //   this.longitude = event.coords.lng;
  //   this.locationChosen = true;
  // }
}
