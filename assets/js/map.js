$(document).ready(function() {

    var marker;
    var geocoder = new google.maps.Geocoder();
    var myLatLng = new google.maps.LatLng(51.0486, -114.0708);
    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        draggable: false,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false
    };

    var map = new google.maps.Map($("#map").get(0), mapOptions);

    var address = "2500 University Drive NW, Calgary, AB T2N 1N4";
    geocoder.geocode({ address: address}, function(results, status){
        //check if status is ok
        if(status == google.maps.GeocoderStatus.OK) {
            //add marker
            marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map: map
                });

            // reset center and zoom to the geocoded location
            map.setCenter(results[0].geometry.location);
            map.setZoom(12);

            //add info window
            var infoWindow = new google.maps.InfoWindow({
                content: "<b>" + address + "</b>"
            });

            //show info window
            infoWindow.open(map,marker);

        } else {
            alert(status);
        }

    });

    if (navigator.geolocation) {
        getCurrentLocation();
    } else {
        console.error("Geolocation API not avilable in this browser");
    }

});

function getCurrentLocation() {
    //use HTML5 geolocation API to get current position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { timeout : 10000 });
}

function successCallback(result) {
    var lat = result.coords.latitude;
    var lng = result.coords.longitude;
    var myLatLng = new google.maps.LatLng (lat, lng);
    var mapOptions = {
        center: myLatLng,
        zoom: 10,
        draggable: false,
        zoomControl: false,
        scaleControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        mapTypeControl: false
    };

    var map = new google.maps.Map($("#map").get(0), mapOptions);

    //add marker
    new google.maps.Marker({
        position:myLatLng,
        map: map,
        title: "My Current Location"
    })

}


function consoleCallback(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User location permission denied.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("User location unavailable.");
                break;
            case error.PERMISSION_DENIED_TIMEOUT:
                alert("User took too long to grant/deny permission.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown Error Occured.");
                break;
            default:
                alert("An unknown Error Occured.");
                break;

    }
}
