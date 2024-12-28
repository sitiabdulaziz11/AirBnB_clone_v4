$(document).ready(function(){
    const apiUrl = "http://127.0.0.1:5001/api/v1/places_search/";

    // Check API status
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

        // Listen for button clicks
    $('button').click(function () {
        // Send POST request with selected amenities
        $.ajax({
            url: apiUrl,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ amenities: selectedAmenities }),
            success: function (data) {
                const placesSection = $('section.places');
                placesSection.empty(); // Clear previous places

                // Populate with new places
                data.forEach(place => {
                    const article = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guests</div>
                                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>
                    `;
                    placesSection.append(article);
                });
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    });
});
});
