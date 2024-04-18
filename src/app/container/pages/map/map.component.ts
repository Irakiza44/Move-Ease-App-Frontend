/// <reference types="@types/googlemaps" />

import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement!: ElementRef;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    // Load Google Maps
    const loader = new Loader({
      version: 'weekly',
      libraries: ['places'],
      apiKey: '', // Set apiKey to an empty string or null
    });

    loader.load().then(() => {
      this.ngZone.run(() => {
        this.initMap();
      });
    });
  }

  initMap(): void {
    // Initialize the map
    const map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: 40.7128, lng: -74.006 }, // New York City coordinates
      zoom: 10,
    });
  }
}
