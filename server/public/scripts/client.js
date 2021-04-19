console.log('client.js sourced');

$( document ).ready( onReady );

function onReady() {
    console.log('DOM ready');

    $('#addJokeButton').on('click', function(event) {
        console.log('clicked');

        event.preventDefault();
        addJoke();
    })
}

function addJoke() {
    let newJoke = {
        whoseJoke: $('#whoseJokeIn').val(),
        jokesQuestion: $('#questionIn').val(),
        punchLine: $('#punchLineIn').val(),
    }
    console.log('Adding joke', newJoke);

    $.ajax({
        method: 'POST',
        url: '/jokes',
        data: newJoke
    })
        .then(function(response){
            console.log('Added a joke');
        })
        .catch(function(error){
            console.log('Error from server', error);
            alert('Sorry, could not add your joke. Try again.')
        })
}
