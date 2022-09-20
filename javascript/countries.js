$(document).ready(function(){
    let dropdown = $('#countries');
    let stateDropdown = $('#states');

    dropdown.empty();
    stateDropdown.empty();
    
    dropdown.append('<option selected="true" disabled>Choose Country</option>');
    dropdown.prop('selectedIndex', 0);

    stateDropdown.append('<option selected="true" disabled>Choose State</option>');
    stateDropdown.prop('selectedIndex', 0);


    $.getJSON("https://xc-countries-api.herokuapp.com/api/countries/", function(data){
    console.log(data);
    $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('id', entry.code).text(entry.name));
        })
    });

    $('#countryButton').click(function(){
        stateDropdown.empty();
        let countryID = $('#countries option:selected').attr('id');
        console.log(countryID);
        $.getJSON(`https://xc-countries-api.herokuapp.com/api/countries/${countryID}/states/`, function(data){
            console.log(data);
            $.each(data, function (key, entry) {
                stateDropdown.append($('<option></option>').attr('id', entry.id).text(entry.name));
                })
            });
    })


  });