var storedBrewery = JSON.parse(localStorage.getItem('brewery')) || [];
var storedCity = JSON.parse(localStorage.getItem('city')) || [];

if(storedCity.length > 0){
    storedCity.forEach(city => {
        console.log(city)
        let cityDiv = $('<BUTTON>').append(city)
     $('#cityName').append(cityDiv);
    });
}

$("#brewerySearch").click(function () {

    let searchCity = $('.dropBtn').val();
    let searchState = $('.select').find(":selected").val();

    if (searchCity === '') {
        $('#inputError').text('Please insert at least one city')
        return;
    }   


    $.ajax({
        url: "https://api.openbrewerydb.org/breweries?by_city=" + searchCity + "&by_state=" + searchState,
        method: 'GET'
    })
        .then(function (response) {
            if (response == '') {
                $('#inputError').text('Please insert the right city name or state')
            } else {
                //console.log('success ', response);
                for (let i = 0; i < response.length; i++) {
                    //Cody updated from button to li element here
                    let cityDiv = $('<li>').append(response[i].name, response[i].website_url)
                    $('#breweryName').append(cityDiv);
                    
                    storedBrewery.push(response[i].name, response[i].website_url);
                    localStorage.setItem('brewery', JSON.stringify(storedBrewery));
                }
                let cityDiv = $('<BUTTON>').append(searchCity)
                $('#cityName').append(cityDiv);
            }
        })

        storedCity.push(searchCity)
        localStorage.setItem('city', JSON.stringify(storedCity))
});
//is there a way to update this to where it only clears the breweries when we click clear, not the new city button as well?
$('#clear').on('click', function() {
    localStorage.clear();
    location.reload()
    
})




//need to store and display previously searched cities cities as buttons.
// $("#brewerySearch").click(function () {

//     let searchCity = $('.dropBtn').val();
     let cityDiv = $('<BUTTON>').append(searchCity)
     $('#cityName').append(cityDiv);

//     //console.log('yes', searchCity)

//     //localStorage.setItem('city', searchCity);
//     saveCity(searchCity)

// });


//need to get the cities that have been searched to persist to the page, and when clicked, display the brewery list
//$('document').on('load', function() {
    
//})



// Random Beer Generator

// onclick function for button
var randomBeer = JSON.parse(localStorage.getItem('beer')) || [];

$('#random-beer').on('click', function() {

    //ajax code here with random beer api (No Params needed)
    $(function() {
        $.ajax({
            url: 'https://api.punkapi.com/v2/beers/random',
            method: 'GET'
        })
        .then(function(response) {

            let beerNameDiv = $('#beer-name').text('')
            let beerDescriptionDiv = $('#beer-description').text('')
            let beerTaglineDiv = $('#beer-tagline').text('')
            let beerAbvDiv = $('#beer-abv').text('')

            console.log(response);
            beerNameDiv = $('#beer-name').text('Order This: ').append(response[0].name);
            beerDescriptionDiv = $('#beer-description').text('Description: ').append(response[0].description)
            beerTaglineDiv = $('#beer-tagline').text('This beer is a ').append(response[0].tagline)
            beerAbvDiv = $('#beer-abv').text('ABV: ').append(response[0].abv)
            $('newBeer').append(beerNameDiv, beerDescriptionDiv, beerAbvDiv, beerTaglineDiv);
            
            randomBeer.push(response[0].name, response[0].description)
            localStorage.setItem('beer', JSON.stringify(randomBeer))
        })
    });
});
    


    
   


