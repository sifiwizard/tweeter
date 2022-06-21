$(document).ready(function() {
  console.log("ready");

  $("#tweet-text").keyup( function() {
    const input = $(this).val().length;
    const charLimit = 140 - input;
    const output = $(this).parent().find("output");
    $(output).text(charLimit);
    if (charLimit < 0) {
      $(output).css({"color" : "red"})
    } else {
      $(output).css({"color" : "#545149"})
    }
  });

  // const form = document.getElementById("tweet-text");

  // form.addEventListener('input', () => {
  //   console.log(this);
  // });
});
