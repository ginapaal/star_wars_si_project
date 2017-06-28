//Fade in the whole page 

$(document).ready(function(){
    $('.container').addClass('hide');
    $('.container').fadeTo('slow', 1);
    $('.container').removeClass('hide');
});

//Pop-up modal when clicked on residents button

$(document).ready(function(){
    $('.resident_btn').click(function(){
        $('#residentModal').modal('toggle');
    });
});

//display people when residents button clicked

$(document).ready(function(){
    $('.resident_btn').click(function(){
        $.ajax({
            type: 'GET',
            url: 'http://swapi.co/api/people/21',
            success: function(data){
                console.log(data);
            },
        });
    })
});