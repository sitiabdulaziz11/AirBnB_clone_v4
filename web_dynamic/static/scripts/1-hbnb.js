$(doument).ready(function(){
    const selectedAmenities = [];
    // const selectedAmenities = {};

    // Listen for changes on each checkbox
    $('input[type="checkbox"]').change(function(){
        const amenityId = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        if ($(this).is(':checked')) {
            // Add amenity ID and name to the list
            selectedAmenities[amenityId] = amenityName;
        } else {
            // Remove amenity ID from the list
            delete selectedAmenities[amenityId];
        }

        // Update the h4 tag with the list of selected amenities
        const amenityList = Object.values(selectedAmenities).join(', ');
        $('.Amenities h4').text(amenityList);
    });
});