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
            url: 'http://swapi.co/api/people/1',
            success: function(data){
               console.log(data);
            },
        });
    })
});