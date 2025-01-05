$(document).ready(function(){
    const apiUrl1 = "http://127.0.0.1:5001/api/v1/status/";
    const apiUrl = "http://127.0.0.1:5001/api/v1/places_search/";

    // Check API status
    $.get(apiUrl1, function(data) {
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

        // Extract only the IDs of selected amenities
const amenityIds = selectedAmenities.map(amenity => amenity.id);

// Send POST request to the API
$.post(apiUrl, JSON.stringify({ amenities: amenityIds }), function(data) {
    const places = data;
    const placesSection = $('.places');
    placesSection.empty();

    places.forEach(place => {
        const article = $(`<article>
            <div class="title_box">
                <h2>${place.name}</h2>
                <div class="price_by_night">${place.price_by_night}</div>
            </div>
            <div class="information">
                <div class="max_guest">${place.max_guest} Guests</div>
                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
            </div>
            <div class="description">${place.description}</div>
        </article>`);
        placesSection.append(article);
    });
}, 'json');
    });

});
