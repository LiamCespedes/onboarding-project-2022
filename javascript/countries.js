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
        dropdown.append($('<option></option>').attr('id', entry.code).text(entry.name + ", " + entry.id));
        countryDropdown.append($('<option></option>').attr('id', entry.id).text(entry.name + ", " + entry.id));
        })
    });

    //if countryButton is clicked, get the currently selected country id, and get the corresponding country's states as a JSON
    //after this, populate the dropdown list with the states
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

    //add country form functionality
    $( "#countryForm" ).submit(function(e) {
        e.preventDefault();
        var countryCode = $('#ccode').val();
        var countryName = $('#cname').val();
        console.log(countryCode);
        console.log(countryName);
        

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://xc-countries-api.herokuapp.com/api/countries/");

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => console.log(xhr.responseText);

        let data = `{
        "code": "${countryCode}",
        "name": "${countryName}"
        }`;

        xhr.send(data);
      });

      //add state functionality
      $('#stateForm').submit( function(e){
        e.preventDefault();

        var stateCode = $('#scode').val();
        var stateName = $('#sname').val();
        var countryId = $('#country_id option:selected').attr('id');
        console.log(countryId);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://xc-countries-api.herokuapp.com/api/states/");

        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = () => console.log(xhr.responseText);

        let data = `{
        "code": "${stateCode}",
        "name": "${stateName}",
        "countryId": "${countryId}"
        }`;

        xhr.send(data);
      })
  });