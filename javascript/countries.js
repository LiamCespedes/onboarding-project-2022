$(document).ready(function(){
    let dropdown = $('#countries');
    let stateDropdown = $('#states');
    let countryDropdown = $('#country_id')

    dropdown.empty();
    stateDropdown.empty();
    countryDropdown.empty();
    
    dropdown.append('<option selected="true" disabled>Choose Country</option>');
    dropdown.prop('selectedIndex', 0);

    stateDropdown.append('<option selected="true" disabled>Choose State</option>');
    stateDropdown.prop('selectedIndex', 0);

    countryDropdown.append('<option selected="true" disabled>Choose Country</option>');
    countryDropdown.prop('selectedIndex', 0);


    $.getJSON("https://xc-countries-api.herokuapp.com/api/countries/", function(data){
    console.log(data);
    $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('id', entry.code).text(entry.name));
        countryDropdown.append($('<option></option>').attr('id', entry.id).text(entry.name));
        })
    });

    //if countries element (select) is changed, get the currently selected country id, and get the corresponding country's states as a JSON
    //after this, populate the dropdown list with the states
    $('#countries').change(function(){
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

    //add country form functionality
    $( "#countryForm" ).submit(function(e) {
        e.preventDefault();
        var countryCode = $('#ccode').val();
        var countryName = $('#cname').val();
        console.log(countryCode);
        console.log(countryName);

        let data = {
            "code": countryCode,
            "name": countryName
            };

        fetch('https://xc-countries-api.herokuapp.com/api/countries/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            //location.reload();
            loadLists();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
      });

      //add state functionality
      $('#stateForm').submit( function(e){
        e.preventDefault();

        var stateCode = $('#scode').val();
        var stateName = $('#sname').val();
        var countryId = $('#country_id option:selected').attr('id');
        console.log(countryId);

        let data = {
            "code": stateCode,
            "name": stateName,
            "countryId": countryId
            };

        fetch('https://xc-countries-api.herokuapp.com/api/states/', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
            //location.reload();
            loadLists();
        })
        .catch((error) => {
            console.error('Error:', error);
        });

      })

  });

  function loadLists(){
    let dropdown = $('#countries');
    let stateDropdown = $('#states');
    let countryDropdown = $('#country_id')

    dropdown.empty();
    stateDropdown.empty();
    countryDropdown.empty();
    
    dropdown.append('<option selected="true" disabled>Choose Country</option>');
    dropdown.prop('selectedIndex', 0);

    stateDropdown.append('<option selected="true" disabled>Choose State</option>');
    stateDropdown.prop('selectedIndex', 0);

    countryDropdown.append('<option selected="true" disabled>Choose Country</option>');
    countryDropdown.prop('selectedIndex', 0);


    $.getJSON("https://xc-countries-api.herokuapp.com/api/countries/", function(data){
    console.log(data);
    $.each(data, function (key, entry) {
        dropdown.append($('<option></option>').attr('id', entry.code).text(entry.name));
        countryDropdown.append($('<option></option>').attr('id', entry.id).text(entry.name));
        })
    });
  }