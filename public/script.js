(function() {

    var socket = io();
    socket.emit('auth', userId);

    var ulTweets = document.getElementById('tweets1');

    socket.on('tweet', function(tweet) {
        var firstLi = ulTweets.firstChild;
        // console.log('tweet');

        var li = document.createElement('li');
        li.innerHTML = tweet.text;

        if (!firstLi) {
            ulTweets.appendChild(li);
        }
        else {
            ulTweets.insertBefore(li, firstLi);
        }
        var myDate = new Date(tweet.created_at); 
        var newTweetTime = myDate.getTime(); 
        console.log('heure du tweet ' + newTweetTime);
        var durationBetweenTwoLastTweets =  newTweetTime - window.LastTweetTime; 
        console.log('temps entre deux tweets ' +  durationBetweenTwoLastTweets);
        var nbTweetsParMinute = 60000/durationBetweenTwoLastTweets;
        console.log('tweets par minute ' + nbTweetsParMinute);
        var myP = document.getElementById('ppourTweetParMinute');
        var nbTweetsParMinuteDisplay = Math.round(nbTweetsParMinute);
        console.log('tweets par minute arrondi ' + nbTweetsParMinuteDisplay);
        myP.innerHTML = nbTweetsParMinuteDisplay + " tweets par minute";
    });

    // var myDate = new Date.now();
    window.LastTweetTime = Date.now(); //tu récupères l'heure actuelle dans le script global
    console.log('heure locale ' + LastTweetTime);

    //
    window.myTags = [];
    var myInput = document.getElementById('myInput');
    myInput.addEventListener("submit", function(){console.log("Nlksdhflksjdlfkjsdlkfjsd");})
    var ulTags = document.getElementById('tag');
    for (var i = myTags.length - 1; i >= 0; i--) {

        var li = document.createElement('li');
        li.innerHTML = myTags[i];
        ulTags.appendChild(li);

        /*if (!firstLi) {
            ulTweets.appendChild(li);
        }
        else {
            ulTweets.insertBefore(li, firstLi);
        }*/
    }
})();