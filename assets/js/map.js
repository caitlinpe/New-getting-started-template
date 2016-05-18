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

});
