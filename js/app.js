var locations = [
  { name: "Safeco Field",
    categoryType: "Field",
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
    categoryType: "Asian Soup",
    lat: 47.5964748,
    lng:  -122.3221844,
    address: "3006, 710 8th Ave S, Seattle, WA 98104, USA",
    info: "This is Hot Pot King! This hot pot restaurant is the best food in china town. Their broth is perfect for hangover cure."
  },
];



var map;
var markers = [];
function initMap() {
  var styles = [
          {
            featureType: 'water',
            stylers: [
              { color: '#19a0d8' }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
              { color: '#ffffff' },
              { weight: 6 }
            ]
          },{
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
              { color: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -40 }
            ]
          },{
            featureType: 'transit.station',
            stylers: [
              { weight: 9 },
              { hue: '#e85113' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
              { visibility: 'off' }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
              { lightness: 100 }
            ]
          },{
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
              { lightness: -100 }
            ]
          },{
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
              { visibility: 'on' },
              { color: '#f0e4d3' }
            ]
          },{
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
              { color: '#efe9e4' },
              { lightness: -25 }
            ]
          }
        ];
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', function() {
      hideMarkers(markers);
    });
    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    var bounds = new google.maps.LatLngBounds();
    //var infowindow = infoWindowCreate();
    var num = 13;
    // Constructor creates a new map - only center and zoom are required.
    map = setMap(num, styles);



    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var position = new google.maps.LatLng(location.lat, location.lng);
      var title = location.info;
      var text = location.name;

      globalInfowindows = infoWindowCreate();

      var marker = setMarker(map, position, title, text, defaultIcon, i);

      location.marker = marker;

      markers.push(marker);
      bounds.extend(markers[i].position);

      marker.addListener('click', function(i) {
        if (this.text == location.name) {
          location = locations[i];
        }
        vm.setLocation(location);
        populateInfoWindow(this, globalInfowindows);

      });

      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
  }
  map.fitBounds(bounds);
} //end of init function


function handleError() {
  alert('There is an error with Google Maps!');
}

function infoWindowCreate() {
  var infoWindows = new google.maps.InfoWindow();
  return infoWindows
}

function setMap(num, styles) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: locations[0].lat, lng: locations[0].lng},
    zoom: num,
    styles: styles,
    mapTypeControl: false
  });
  return map
}

function setMarker(map, position, title, text, icon, i) {
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    animation: google.maps.Animation.DROP,
    title: title,
    text: text,
    icon: icon,
    id: i
  });
  return marker;
}

function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent(  '<h2>' + marker.text + '</h2>' + '<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
    infowindow.marker = null;
    });
  }
}

function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

//var Loc = function(data) {

//    this.name = ko.observable(data.name);
//    this.categoryType = ko.observable(data.categoryType);
//    this.lat = ko.observable(data.lat);
//    this.lng = ko.observable(data.lng);
//    this.address = ko.observable(data.address);
//    this.info = ko.observable(data.info);
// }
var ViewModel = function() {
  var self = this;

  this.locationList = ko.observableArray(locations);
  self.wikiElem = ko.observableArray([]);
  //locations.forEach(function(locationItems) {
  //      self.locationList.push( new Loc(locationItems) );
  // });

  //this.currentLocation = ko.observable( this.locationList()[0] );

  self.setLocation = function(clickedLocation) {
     //setLocation's element is locations's name which is clickedLoations..
    populateInfoWindow(clickedLocation.marker, globalInfowindows);
  //  populateInfoWindow(clickedLocation, largeInfowindow, location)
  //  window.alert('clickedLocation');
    //self.loadData(clickedLocation);

  self.wikiElem([]);
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + clickedLocation.categoryType + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        self.wikiElem.push("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response) {

            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                self.wikiElem.push('<a href="' + url + '">' + articleStr + '</a>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });
    return false;
  }
}


var vm = new ViewModel()
ko.applyBindings(vm);
