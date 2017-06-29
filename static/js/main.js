function result(planetList) {
    for (var i = 0; i < planetList.length; i++) {
        var planet = planetList[i];
        console.log(planet);
    }
}

function getPlanetInfo(link) {
    $.getJSON(link, function(data) {     //shorthand AJAX function
        $("#planetTable").find("tr:gt(0)").remove();   //:gt stands for gretaer than (the index)

        result(data['results']);

    })
};


function main() {
    getPlanetInfo('https://swapi.co/api/planets/?page=1'); 
}

$(document).ready(main);