var locations = [
  { name: "Safeco Field",
    categoryType: "Athletic Stadium",
    lat: 47.59078179999999,
    lng: -122.3262572,
    address: "1250 1st Ave S, Seattle, WA 98134",
    info: "This is Safeco Field! A favorite place to relax and watch baseball. Safeco field looks over Seattle, and it's beautiful sight!"
  },
  { name: "Wamu Theatre",
    categoryType: "Theatre",
    lat: 47.5933102,
    lng: -122.3322721,
    address: "800 Occidental Ave S, Seattle, WA 98134",
    info: "This is Wamu Theatre! Many artists come here to perform their newest release albums. The dome is so big that a person can actually get lost in there."
  },
  { name: "Seattle Pinball Museum",
    categoryType: "Museum",
    lat: 47.598065,
    lng:  -122.3247875,
    address: "508 Maynard Ave S, Seattle, WA 98104, USA",
    info: "This is Seattle Pinball Museum! There are so much pinball arcades to play for here. I never get to track my time."
  },
  { name: "Uwajimaya",
    categoryType: "Grocery",
    lat: 47.59684299999999,
    lng:  -122.326929,
    address: "600 5th Ave S, Seattle, WA 98104, USA",
    info: "This is a Uwajimaya! My favorite groceries of all time. They have asian food that's so delicious and candies are so sweet."
  },
  { name: "Hot Pot King",
    categoryType: "Restuarant",
    lat: 47.5964748,
    lng:  -122.3221844,
    address: "3006, 710 8th Ave S, Seattle, WA 98104, USA",
    info: "This is Hot Pot King! This hot pot restaurant is the best food in china town. Their broth is perfect for hangover cure."
  },
];


var map;
var markers = [];
function initMap() {
    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: locations[0].lat, lng: locations[0].lng},
      zoom: 13
    });


    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var position = new google.maps.LatLng(location.lat, location.lng);
      var title = location.info;

      var marker = new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        title: title
      });
      markers.push(marker);
      bounds.extend(markers[i].position);
      marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
      });
  }
  map.fitBounds(bounds);
}
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
}

var ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray([]);

  locations.forEach(function(locationItem) {
    self.locationList.push( new locat(locationItem) );
  });

  //this.currentLocation = ko.observable( this.locationList()[0] );

  self.setLocation = function(clickedLocation) { //setLocation's element is locations's name which is clickedLoations..
  //  window.alert(clickedLocation.lat);
    var bounds = new google.maps.LatLngBounds();
    var largeInfowindow = new google.maps.InfoWindow();
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: locations[0].lat, lng: locations[0].lng},
      zoom: 13
    });


    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      if (clickedLocation == location.name) {
        location.lat = clickedLocation.lat;
        location.lng = clickedLocation.lng;
      }

      var position = new google.maps.LatLng(location.lat, location.lng);
      var title = location.info;

      var marker = new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP,
        title: title
      });
      markers.push(marker);
      bounds.extend(markers[i].position);
      clickedLocation.marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow, location);
      });

  }
  //  populateInfoWindow(clickedLocation, largeInfowindow, location)

  }
}

var locat = function(data) {
  this.name = ko.observable(data.name); //data.name = locations's name
  this.lat = ko.observable(data.lat);
  this.lng = ko.observable(data.lng);
}

ko.applyBindings(new ViewModel());
