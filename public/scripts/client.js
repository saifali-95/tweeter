/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //All the errors must be hidden at the time of loading the website
  $('.error').hide();

  $("form").submit(function(event) {
    $('.error').hide();
    event.preventDefault();
    const data = $(this).serialize();
    const textLength = $('#tweet-text').val().length;
    $errorContainer = $('.error')

    if (textLength === 0) {
      $errorContainer.text('Please Type Something');
      $('.error').slideDown('slow'); 
      return;
    }

    if (textLength > 140) {
      $errorContainer.text('Type less than 140 characters');
      $('.error').slideDown('slow'); 
      return;
    }
    
    $.ajax('/tweets', { method: "POST" , data})
      .then(function () {
        $loadTweets();
        $('#tweet-text').val('');
        $('#tweet-text').closest('form').find('.footer .counter').html(140);
       })
      .catch(error => {
        console.log('error......',error)
      })
  });

  const $loadTweets = function() {

    $.ajax('/tweets', { method: 'GET' })
      .then(function (tweetData) {
      $('.posted-tweet').html('');
      renderTweets(tweetData.reverse()); 
    });
  }

  $loadTweets();
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Function will create a tweet in a HTML format for the provided object. Later on will be rendered on the website. 
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
        ${escape(tweetData['content']['text'])}
     </div>
    <footer>
      <h6>${timeago.format(tweetData['created_at'])}</h6>
      <div class = "icons">
        <i class="flag fas fa-flag"></i>
        <i class="retweet fas fa-retweet"></i>
        <i class="heart fas fa-heart"></i>
      </div>
    </footer>
  </sarticle>
  `
  return $outputTweet;
}

// Render HTML format tweets on the website.
const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  for (const item of tweets) { 
    const $tweet = createTweetElement(item);
    $('.posted-tweet').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
}