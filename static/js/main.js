function previousButton() {
    //add button to html
    var button = document.createElement("button");
    var buttonText = document.createTextNode('Previous');
    button.appendChild(buttonText);
    document.getElementById("buttonsPlace").appendChild(button);

    button.setAttribute('id', 'prev');
    button.setAttribute('class', 'btn btn-info');

    //define action of button
    button.addEventListener('click', function(){
        if (button.getAttribute('data-link') != null) {
            var previousLink = button.getAttribute("data-link");
            var previousHttpsLink = previousLink.replace('http', 'https');
            getPlanetInfo(previousHttpsLink); 
        } else  {
            alert('Go further, do not, no more planets, there are. ');
        }
    });
};

function nextButton() {
    var button = document.createElement('button');
    var buttonText = document.createTextNode('Next');
    button.appendChild(buttonText);
    document.getElementById("buttonsPlace").appendChild(button);

    button.setAttribute('id', 'next');
    button.setAttribute('class', 'btn btn-info');

    button.addEventListener('click', function(){
        if (button.getAttribute('data-link') != null) {
            var nextLink = button.getAttribute("data-link");
            var nextHttpsLink = nextLink.replace('http', 'https');
            getPlanetInfo(nextHttpsLink); 
        } 
        if (button.getAttribute('data-link') === null) {
            alert('Go further, do not, no more planets, there are. ');
        }
    });
}


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

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['residents'].length;
    newRow.appendChild(newCell);

    return newRow
}

function result(planetList) {
    for (var i = 0; i < planetList.length; i++) {
        var planet = planetList[i];
        var row = createNewRow(planet);
        

        document.getElementById("planetTable").appendChild(row);
    }
}

function getPlanetInfo(link) {
    $.getJSON(link, function(data) {     //shorthand AJAX function
        $("#planetTable").find("tr:gt(0)").remove();   //:gt stands for gretaer than (the index)

        result(data['results']);

        var previousButton = document.getElementById('prev');
        var previousLink = data['previous'];
        previousButton.setAttribute("data-link", previousLink);

        var nextButton = document.getElementById('next');
        var nextLink = data['next'];
        nextButton.setAttribute('data-link', nextLink)

    })
}


function main() {
    getPlanetInfo('https://swapi.co/api/planets/?page=1');
    previousButton();
    nextButton();
}

$(document).ready(main);