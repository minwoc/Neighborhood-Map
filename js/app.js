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
        featureType: "water",
        elementType: "geometry",
        stylers: [
            {
                hue: "#165c64"
            },
            {
                saturation: 34
            },
            {
                lightness: -69
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "landscape",
        elementType: "geometry",
        stylers: [
            {
                hue: "#b7caaa"
            },
            {
                saturation: -14
            },
            {
                lightness: -18
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "landscape.man_made",
        elementType: "all",
        stylers: [
            {
                hue: "#cbdac1"
            },
            {
                saturation: -6
            },
            {
                lightness: -9
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [
            {
                hue: "#8d9b83"
            },
            {
                saturation: -89
            },
            {
                lightness: -12
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [
            {
                hue: "#d4dad0"
            },
            {
                saturation: -88
            },
            {
                lightness: 54
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
            {
                hue: "#bdc5b6"
            },
            {
                saturation: -89
            },
            {
                lightness: -3
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "road.local",
        elementType: "geometry",
        stylers: [
            {
                hue: "#bdc5b6"
            },
            {
                saturation: -89
            },
            {
                lightness: -26
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "poi",
        elementType: "geometry",
        stylers: [
            {
                hue: "#c17118"
            },
            {
                saturation: 61
            },
            {
                lightness: -45
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "poi.park",
        elementType: "all",
        stylers: [
            {
                hue: "#8ba975"
            },
            {
                saturation: -46
            },
            {
                lightness: -28
            },
            {
                visibility: "on"
            }
        ]
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [
            {
                hue: "#a43218"
            },
            {
                saturation: 74
            },
            {
                lightness: -51
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "administrative.province",
        elementType: "all",
        stylers: [
            {
                hue: "#ffffff"
            },
            {
                saturation: 0
            },
            {
                lightness: 100
            },
            {
                visibility: "simplified"
            }
        ]
    },
    {
        featureType: "administrative.neighborhood",
        elementType: "all",
        stylers: [
            {
                hue: "#ffffff"
            },
            {
                saturation: 0
            },
            {
                lightness: 100
            },
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels",
        stylers: [
            {
                hue: "#ffffff"
            },
            {
                saturation: 0
            },
            {
                lightness: 100
            },
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative.land_parcel",
        elementType: "all",
        stylers: [
            {
                hue: "#ffffff"
            },
            {
                saturation: 0
            },
            {
                lightness: 100
            },
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "administrative",
        elementType: "all",
        stylers: [
            {
                hue: "#3a3935"
            },
            {
                saturation: 5
            },
            {
                lightness: -57
            },
            {
                visibility: "off"
            }
        ]
    },
    {
        featureType: "poi.medical",
        elementType: "geometry",
        stylers: [
            {
                hue: "#cba923"
            },
            {
                saturation: 50
            },
            {
                lightness: -46
            },
            {
                visibility: "on"
            }
        ]
    }
];
    // Buttons to show all the locations.
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', function() {
      hideMarkers(markers);
    });
    // Setting the marker icon to default color when there's no action.
    var defaultIcon = makeMarkerIcon('0091ff');

    // mouses over the marker.
    // Setting the marker icon to different color when mouse over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

    var bounds = new google.maps.LatLngBounds();
    var num = 13;
    // Calling a function with zoom and styles variables to create a dynamic map.
    map = setMaps(num, styles);
    // For loop the locations to set each locations's parameters.
    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var position = new google.maps.LatLng(location.lat, location.lng);
      var title = location.info;
      var text = location.name;
      // Create a infowindow inside for loops so it'll be accessible for models in the array any where.
      globalInfowindows = infoWindowCreate();
      // Create a marker inside for loop to create markers for each locations.
      var marker = setMarker(map, position, title, text, defaultIcon, i);

      // Attach a marker to each location, so that markers can be attached to the locations any where.
      location.marker = marker;

      markers.push(marker);
      bounds.extend(markers[i].position);
      // Event listener where user clicks on the marker, it'll call the function View Model to view Wikipedia resources
      // and open up infowindow for the cliciked marker.
      marker.addListener('click', function(id) {
        location = locations[this.id];
        vm.setLocation(location);
        populateInfoWindow(this, globalInfowindows);

      });

      // EVent listener to look for any mouses over the marker icons.
      marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
      });
      marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
      });
  }
  map.fitBounds(bounds);
} //end of init function

// Function to create error message.
function handleError() {
  alert('There is an error with Google Maps!');
}
// Function to create infowindow.
function infoWindowCreate() {
  var infoWindows = new google.maps.InfoWindow();
  return infoWindows
}
// Function to create map.
function setMaps(num, styles) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: locations[0].lat, lng: locations[0].lng},
    zoom: num,
    styles: styles,
    mapTypeControl: false
  });
  return map
}

// Function to create marker.
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

// Function to create infowindow.
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

// Function to show all markers when clicked.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
// Function to hide all markers when clicked.
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

// Function to create colors for the markers.
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

// Function to filter the markers.
function checkMarker(locations, loc) {
  for (var i = 0; i < locations.length; i++) {
    locations[i].marker.setMap(null);
  }

  for (i = 0; i < loc.length; i++) {
    //showListings();
    loc[i].marker.setMap(map);
    if(loc == null ) {
      return showListings();
    }
  }
}

// View Model function.
// View Model creates connections between the HTML and the JavaScript.
var ViewModel = function() {
  var self = this;
  var loc = null;

  self.manyLocationsArray = ko.observableArray([]);
  self.resourcesArray = ko.observableArray([]);
  self.searchItem = ko.observable('');

  // Append each location into the empty array.
  locations.forEach(function(location) {
    self.manyLocationsArray.push(location)
  })

  // Filtering both lists and markers when user types into the input box.
  self.locationList = ko.computed(function() {
    var searchItems = self.searchItem().toLowerCase(); //what user types.
    if (!searchItems) { //If user doesn't type, show the lists's names.
      var power = self.manyLocationsArray();
      return power;
    } else {
      loc = ko.utils.arrayFilter(self.manyLocationsArray(), function(location) {
        return location.name.toLowerCase().includes(searchItems);
      });
    }
   if(loc != null) {
      checkMarker(locations, loc);
    }
    return loc;
  }, self);

  // Opening up the markers and displays the wikipedia resources when lists are clicked on the side.
  self.setLocation = function(clickedLocation) {
     //setLocation's element is locations's name which is clickedLoations..
    populateInfoWindow(clickedLocation.marker, globalInfowindows);
    self.resourcesArray([]);
    var types = clickedLocation.categoryType;
    var wURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + types + '&format=json&callback=wikiCallback';
    var wTimeOut = setTimeout(function(){
        self.resourcesArray.push("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wURL,
        dataType: "jsonp",
        success: function(results) {
            var result = results[1];
            for (var i = 0; i < result.length; i++) {
                givenResult = result[i];
                var url = 'http://en.wikipedia.org/wiki/' + givenResult;
                self.resourcesArray.push('<a href="' + url + '">' + givenResult + '</a>');
            };
            clearTimeout(wTimeOut);
        }
    });
    return false;
  }
}


var vm = new ViewModel()
ko.applyBindings(vm);
