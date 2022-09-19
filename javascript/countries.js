$(document).ready(function(){
    let dropdown = $('#countries');

    dropdown.empty();
    
    dropdown.append('<option selected="true" disabled>Choose Country</option>');
    dropdown.prop('selectedIndex', 0);


    $.getJSON("https://xc-countries-api.herokuapp.com/api/countries/", function(data){
    console.log(data);
    $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('id', entry.id).text(entry.name));
        })
    });
  });