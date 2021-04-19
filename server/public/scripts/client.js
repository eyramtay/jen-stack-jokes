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

function getJokes() {
    $.ajax({
        method: 'GET',
        url: '/jokes'
    })
        .then(function(response){
            console.log('Response from server', response);
            for (let item of response) {
                console.log(`${item.jokesQuestion} by ${item.whoseJoke}`);

            }
            render(response);
        })
        .catch(function(error){
            console.log('Error from server', error);
            alert('Sorry, could not get jokes. Try again.');
        })
        console.log('After making server request...');
}

function render(jokeList) {
    $('#outputDiv').empty();

    for (let item of jokeList) {
        $('#outputDiv').append(`
        <div class="joke">
            <p>${item.jokesQuestion}</p>
            <p>${item.punchLine}</p>
            <p>${item.whoseJoke}</p>
        </div>`)
        console.log(`${item.jokesQuestion} by ${item.whoseJoke}`);
    }
}
