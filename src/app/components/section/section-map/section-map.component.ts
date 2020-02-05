import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-map',
  templateUrl: './section-map.component.html',
  styleUrls: ['./section-map.component.scss'],
})
export class SectionMapComponent implements OnInit {
  mapConfig = {
    zoom: 15,
    scrollwheel: false,
    latitude: 10.798977,
    longitude: 106.746701,
    mapTypeId: 'roadmap',
    styles: [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#e9e9e9',
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5',
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#d5d5d5',
          },
          {
            lightness: 17,
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#d5d5d5',
          },
          {
            lightness: 29,
          },
          {
            weight: 0.2,
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#d5d5d5',
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {
            color: '#d5d5d5',
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f5f5f5',
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#dedede',
          },
          {
            lightness: 21,
          },
        ],
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#ffffff',
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            saturation: 36,
          },
          {
            color: '#333333',
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#f2f2f2',
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#fefefe',
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#fefefe',
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
    ],
  };
  mapMakers = [
    {
      latitude: 10.793522,
      longitude: 106.746634,
      opacity: 1,
      title: 'Location Name',
      icon: {
        url: 'assets/images/marker.png',
        scaledSize: { width: 81, height: 113 },
      }
    },
  ];

  constructor() {}

  ngOnInit() {}

  gotoMap(lat, lng) {
      const url = `https://maps.google.co.uk/maps?q=${lat}, ${lng}`;
      window.open(url, '_blank');
  }
}
