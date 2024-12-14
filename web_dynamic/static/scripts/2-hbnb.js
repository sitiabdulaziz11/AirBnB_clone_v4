$(document).ready(function(){
    const apiUrl = "http://127.0.0.1:5001/api/v1/status/";

    // Check API status
    // $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    $.get(apiUrl, function(data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });

    let selectedAmenities = [];

    // Listen for changes on each checkbox
    $('input[type="checkbox"]').change(function(){
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            // Add amenity ID and name to the list
            selectedAmenities.push({id: amenityId, name: amenityName});
            // console.log(`Added: ${amenityName} (ID: ${amenityId})`);

        } else {
            // Remove amenity ID from the list
            selectedAmenities = selectedAmenities.filter((amenity) => amenity.id !== amenityId);
            // console.log(`Removed: ${amenityName} (ID: ${amenityId})`);
        }

        // Update the h4 tag with the list of selected amenitie
        const amenityList = selectedAmenities.map(amenity => amenity.name).join(', ');
        // $('.Amenities h4').text(amenityList);
        $('#selected-amenities').text(amenityList);
    });
});
