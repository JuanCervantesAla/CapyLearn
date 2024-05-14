$(document).ready(function(){
    $('#FormAjax').submit(function(event){
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: $(this).serialize(),
            success: function(response){
                alert(response);
                $('#response').html(response);
                window.location.href = "home.html";
                console.log(response);
            }
        });
    });
});