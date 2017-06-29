function createNewRow (planetObj) {

    var newRow = document.createElement("tr");

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['name'];
    newRow.appendChild(newCell);

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['diameter']+'km';
    newRow.appendChild(newCell);

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['climate'];
    newRow.appendChild(newCell);

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['terrain'];
    newRow.appendChild(newCell);

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['surface_water']+'%';
    newRow.appendChild(newCell);

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['population'];
    newRow.appendChild(newCell);

    return newRow
};

function result(planetList) {
    for (var i = 0; i < planetList.length; i++) {
        var planet = planetList[i];
        var row = createNewRow(planet);
        console.log(planet);

        document.getElementById("planetTable").appendChild(row);
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