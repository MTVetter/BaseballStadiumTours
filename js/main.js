/* Main JavaScript sheet for ExploringBaseballStadiums by Michael Vetter*/

//Add Leaflet map
function createMap(){
    //Hide panel
    $("#panel").hide();
    //Set up the initial location of the map
    var initialLocation = [40, -98.5];

    //Set up the initial zoom of the map
    var initialZoom = 5;

    //create the map
    var map = L.map("map",{zoomControl: false}).setView(initialLocation, initialZoom);

    //Add the home button with the zoom in and zoom out buttons
    var zoomHome = L.Control.zoomHome();
    zoomHome.addTo(map);

    //call getData function
    getData(map);

    //add CartoDB base tilelayer
    var CartoDB_Positron = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.jpg', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        subdomains: 'abcd'
    }).addTo(map);

    //Add ESRI base tilelayer
    var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    //Create the base maps
    var baseLayers = {
        "Grayscale": CartoDB_Positron,
        "Imagery": esri
    };

    //Add the base maps to the map so the user can decide
    L.control.layers(baseLayers).addTo(map);

    //Create a popup for the info button
    var infoPopup = L.popup({maxHeight: '300', className: 'help'}).setContent("<h3>How to operate the map:</h3>" + 
    "<ul><li><p>Use <img align='middle' src='img/zoomInTest.jpg'> to zoom in</p></li>"+
    "<li><p>Use <img align='middle' src='img/zoomOutTest.jpg'> to zoom out</p></li>"+
    "<li><p>Use <img align='middle' src='img/homeTest.jpg'> to return to the inital extent of the map</p></li>"+
    "<li><p>Use <img align='middle' src='img/basemapTest.jpg'> to switch from a gray basemap to an imagery basemap</p></li>"+
    "<li><p>Clicking on <img align='middle' src='img/searchTest.jpg'> expands the search option</p></li>"+
    "<li><p>Search based on team name</p></li>"+
    "<li><p>Teams will display based on what you type.</li> <li>Example:<img align='middle' src='img/searchTypedTest.jpg'></p></li>");
    
    //Create an info button so the user can get information about the map
    L.easyButton('<span class="fas fa-info-circle fa-lg"</span>', function(btn, map){
        infoPopup.setLatLng(map.getCenter()).openOn(map);
        console.log(infoPopup);
    }).addTo(map);
    
    //Remove the welcome splash screen when the user clicks anywhere in the document
    $(document).click(function (){
        $("#welcomePanel").hide();
    });
};

//Function to add a search bar
function search(data, map){
    var featureLayer = L.geoJson(data,{
        pointToLayer: function (feature, latlng){
            return L.marker(latlng, {
                icon: L.icon({
                    iconUrl: getIcon(feature.properties.Team),
                    iconSize: [45, 45]
                })
            });
        },
        onEachFeature: function (feature, layer){
            layer.on('click', function(e){
                $("#panel").show("slide");
                // $("#stadium").text(feature.properties.StadiumName);
                // $("#team").text(feature.properties.Team);
                // $("#year").text(feature.properties.Built);
                // $("#attendence").text(feature.properties.AttenanceperGame);
                // $("#time").text(feature.properties.Time);
                // $("#hr").text(feature.properties.HRperGame);
                // $("#ticket").text(feature.properties.TicketPrice);
                // document.getElementById("newPic").innerHTML = '<img class="stadiumPic" src=" ' + feature.properties.Photo + '">';
                $(".photo1").attr("src", feature.properties.Photo);
                $(".photo2").attr("src", feature.properties.Photo2);
                $(".photo3").attr("src", feature.properties.Photo3);
            });
        }
    }).addTo(map);

    var searchControl = new L.Control.Search(
        {layer: featureLayer,
        propertyName: 'Team',
        zoom: 15,
        textErr: 'Team does not exist',
        textPlaceholder: 'Search for Team Name...',
        marker: false,
        animate: false});
    searchControl.on('search_locationfound', function(e){
        e.layer.setStyle({fillColor: 'black', color: 'black', fillOpacity: 1});
        if (e.layer._popup)
            e.layer.openPopup();
    }).on('search_collapsed', function(e){
        featureLayer.eachLayer(function(layer){
            featureLayer.resetStyle(layer);
        });
    });
    map.addControl(searchControl);
}

//Function to determine the appropriate icon
function getIcon(team){
    if (team == "Diamondbacks"){
        return 'img/diamondbacks.jpg';
    } else if (team == "Braves"){
        return 'img/braves.jpg';
    } else if (team == "Orioles"){
        return 'img/orioles.jpg';
    } else if (team == "Red Sox"){
        return 'img/redsox.jpg';
    } else if (team == "Cubs"){
        return 'img/cubsVisited.png';
    } else if (team == "White Sox"){
        return 'img/whitesoxVisited.png';
    } else if (team == "Reds"){
        return 'img/reds.jpg';
    } else if (team == "Indians"){
        return 'img/indians.jpg';
    } else if (team == "Rockies"){
        return 'img/rockies.jpg';
    } else if (team == "Tigers"){
        return 'img/tigers.jpg';
    } else if (team == "Astros"){
        return 'img/astros.jpg';
    }else if (team == "Royals"){
        return 'img/royals.jpg';
    } else if (team == "Angels"){
        return 'img/angels.jpg';
    } else if (team == "Dodgers"){
        return 'img/dodgers.jpg';
    } else if (team == "Marlins"){
        return 'img/marlins.jpg';
    } else if (team == "Brewers"){
        return 'img/brewersVisited.png';
    } else if (team == "Twins"){
        return 'img/twins.jpg';
    } else if (team == "Mets"){
        return 'img/mets.jpg';
    } else if (team == "Yankees"){
        return 'img/yankees.jpg';
    } else if (team == "As"){
        return 'img/as.jpg';
    } else if (team == "Phillies"){
        return 'img/philliesVisited.png';
    } else if (team == "Pirates"){
        return 'img/pirates.jpg';
    } else if (team == "Padres"){
        return 'img/padresVisited.png';
    } else if (team == "Mariners"){
        return 'img/mariners.jpg';
    } else if (team == "Giants"){
        return 'img/giants.jpg';
    } else if (team == "Cardinals"){
        return 'img/cardinals.jpg';
    } else if (team == "Rays"){
        return 'img/rays.jpg';
    } else if (team == "Rangers"){
        return 'img/rangersVisited.png';
    } else if (team == "Blue Jays"){
        return 'img/bluejays.jpg';
    } else {
        return 'img/nationals.jpg';
    }
};


//function to get the points
function getData(map){
    //Load the data through AJAX
    $.ajax("data/stadiums.geojson", {
        dataType: "json",
        success: function(response){
            search(response, map);
        }
    });
};

//Function to create the slide show for the pictures
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
    showSlides(slideIndex += n);
}

function currentSlide(n){
    showSlides(slideIndex = n);
}

function showSlides(n){
    var i;
    var slides = document.getElementsByClassName("mySlides");
    console.log(slides);
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i<slides.length; i++){
        slides[i].style.display = "none";
    }
    for (i=0; i<dots.length; i++){
        dots[i].className = dots[i].className.replace("active", "");
    }
    dots[slideIndex-1].className += " active";
    slides[slideIndex-1].style.display = "block";
}

//Close the panel after user is done looking at the information
$(".button").on("click", function(e){
    $("#panel").hide("slide");
    $("#graph").empty();
});

$(document).ready(createMap);