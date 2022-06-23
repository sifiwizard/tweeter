/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const testTweets =  [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

const createTweetElement = function(tweet) {
  let $tweet = $(`<article class="tweet">
  <header>
    <div>
    <img src="${tweet.user.avatars}"/> ${tweet.user.name}
    </div>
    <div>
      ${tweet.user.handle}
    </div>
  </header>
  ${tweet.content.text} 
  <footer>
    <div>
      ${timeago.format(tweet.created_at)}
    </div>
    <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);

  return $tweet;
}

const renderTweets = function(arr) {
  for (const tweet of arr) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
}

const loadTweets = function() {
  return $.get("/tweets");
}

// Test / driver code (temporary)
$(document).ready(function() {
  loadTweets()
  .then(data => {
    renderTweets(data);
  })
  // .then(renderTweets(testTweets));
  $("form").submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const chars = $(this).find("#tweet-text").val();
    let vaild = true;
    if (chars === "" || chars === null) {
      vaild = false;
      alert("No text entered");
      
    }
    if (chars.length > 140) {
      vaild = false;
      alert("Over Charater Limit");
    }
    if (vaild) {
      $.post("/tweets/", data);
    }
  })
})
