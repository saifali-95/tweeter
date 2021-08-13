/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  renderTweets(data);

  $("form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize(); 
    const text = $('#tweet-text').val();
    // if length > 140
    // empty do not submit
    // text.length
  
    $.ajax('/tweets', { method: "POST" , data})
    .then()
    .catch(console.log(error))
  });
  

});



const createTweetElement = function(tweetData) {
  const $outputTweet = `
  <article>
  <header>
  <div class="profile">
  <img src=${tweetData['user']['avatars']}> 
  <h2>${tweetData['user']['name']}</h2> 
  </div>
  <h2 class = "account">${tweetData['user']['handle']}</h2>
  </header>
  <div class="text">
  ${tweetData['content']['text']}
  </div>
  <footer>
    <h6>${timeago.format(tweetData['created_at'])}</h6>
    <div class = "icons">
      <i class="flag fas fa-flag"></i>
      <i class="retweet fas fa-retweet"></i>
      <i class="heart fas fa-heart"></i>
    </div>
  </footer>
  </article>
  `
  return $outputTweet;
}

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const item of tweets) { 
    const $tweet = createTweetElement(item);
      //prepend
      $('.posted-tweet').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}