function fadeIn() {
    $(".container").addClass("hide");
    $(".container").fadeTo('slow', 1);
    $(".container").removeClass("hide");
}

function modal() {
    $('#residentsModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var planetname = button.data('planetname'); 
        
        var modal = $(this);
        var residents = button.data('residents');

        var residentsLinks = residents.split(',');
        $("#residentsTable").find("tr:gt(0)").remove(); 
        
        for (var i = 0; i < residentsLinks.length; i++) {
            var apiLink = residentsLinks[i];
            var apiHttpsLink = apiLink.replace('http', 'https');
            $.getJSON(apiHttpsLink, function(data) {
                var residentObj = data;
                var newRow = document.createElement("tr");

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['name'];
                newRow.appendChild(newCell);

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['height'];
                newRow.appendChild(newCell);

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['mass'];
                newRow.appendChild(newCell);

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['hair_color'];
                newRow.appendChild(newCell);

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['skin_color'];
                newRow.appendChild(newCell);

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['eye_color'];
                newRow.appendChild(newCell);

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['birth_year'];
                newRow.appendChild(newCell);

                var newCell = document.createElement('td');
                newCell.textContent = residentObj['gender'];
                newRow.appendChild(newCell);

                document.getElementById("residentsTable").appendChild(newRow);
            });
        }
        modal.find('.modal-title').text('Of ' + planetname + ' residents');
    });
}


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
            alert('Go further, do not, no more planets, there are.');
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
        } else {
            alert('Go further, do not, no more planets, there are.');
        }
    });
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
    newCell.textContent = planetObj['surface_water']+' %';
    newRow.appendChild(newCell);

    var newCell = document.createElement("td");
    newCell.textContent = planetObj['population'];
    newRow.appendChild(newCell);

    var newCell = document.createElement("td");
    if (planetObj['residents'].length != 0) {
        var button = document.createElement("button");

        button.setAttribute("type", "button"); 
        button.setAttribute("id", "residentsModalButton"); 
        button.setAttribute("class", "btn btn-info"); 
        button.setAttribute("data-toggle", "modal"); 
        button.setAttribute("data-target", "#residentsModal"); 
        button.setAttribute("data-planetname", planetObj['name']); 
        button.setAttribute("data-residents", planetObj['residents']);

        var buttonText = document.createTextNode(planetObj['residents'].length + ' resident(s)');

        button.appendChild(buttonText);
        newCell.appendChild(button);
    } else {
        newCell.textContent = "This planet no known residents on.";
    }
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


function main() {
    fadeIn();
    getPlanetInfo('https://swapi.co/api/planets/?page=1');
    previousButton();
    nextButton();
    modal();
}

$(document).ready(main);