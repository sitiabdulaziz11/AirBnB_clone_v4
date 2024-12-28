$(document).ready(function(){
    let selectedAmenities = [];
    // const selectedAmenities = {};

    // Listen for changes on each checkbox
    $('input[type="checkbox"]').change(function(){
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');
        // const amenityId = $(this).attr('id');
        // const amenityName = $(this).attr('name');

        if ($(this).is(':checked')) {
            // Add amenity ID and name to the list
            // selectedAmenities[amenityId] = amenityName;
            selectedAmenities.push({id: amenityId, name: amenityName});
            // console.log(`Added: ${amenityName} (ID: ${amenityId})`);

        } else {
            // Remove amenity ID from the list
            // delete selectedAmenities[amenityId];
            selectedAmenities = selectedAmenities.filter((amenity) => amenity.id !== amenityId);
            // console.log(`Removed: ${amenityName} (ID: ${amenityId})`);
        }

        // Update the h4 tag with the list of selected amenities
        // const amenityList = Object.values(selectedAmenities).join(', ');
        const amenityList = selectedAmenities.map(amenity => amenity.name).join(', ');
        // $('.Amenities h4').text(amenityList);
        $('#selected-amenities').text(amenityList);

        // Log the current list of selected amenities
        // console.log('Current Selected Amenities:', selectedAmenities);
    });
});
