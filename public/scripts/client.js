/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function(tweet) { //Creates basic tweet element
  let newText = tweet.content.text; //The actual tweet text
  let $tweet = $(`<article class="tweet">
  <header>
    <div class="topLeft">
    <img src="${tweet.user.avatars}"/> <div>${tweet.user.name}</div>
    </div>
    <div>
      ${tweet.user.handle}
    </div>
  </header>
  <div class="info"></div>
  <footer>
    <div>
      ${timeago.format(tweet.created_at)}
    </div>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);

  $($tweet).find('.info').text(newText); //To stop cross site scripting
  return $tweet;
};

const renderTweets = function(arr) { //Renders tweets
  $("#tweets-container").empty(); //Emptys container, copys if left full
  for (const tweet of arr) {
    $('#tweets-container').prepend(createTweetElement(tweet)); //Addpeds to start
  }
};

const loadTweets = function() {
  return $.get("/tweets");
};

$(document).ready(function() {
  loadTweets() //Loads then renders
    .then(data => {
      renderTweets(data);
    });

  $("form").submit(function(event) {
    event.preventDefault();
    $(".error").slideUp("fast"); //Slides error up if visible
    const data = $(this).serialize(); 
    const chars = $(this).find("#tweet-text");
    let vaild = true; // Error checking varible
    if (chars.val() === "" || chars.val() === null) {
      vaild = false;
      $("#errorText").slideDown("fast");
    }
    if (chars.val().length > 140) {
      vaild = false;
      $("#errorLimit").slideDown("fast");
    }
    if (vaild) {
      $(chars).val(''); //Removes text in form
      $.post("/tweets", data) //Post to server then loads and renders
        .then(() => {
          return loadTweets();
        })
        .then(data => {
          renderTweets(data);
        });
    }
  });
});
