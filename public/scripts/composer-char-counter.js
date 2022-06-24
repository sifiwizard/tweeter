$(document).ready(function() {

  $("#tweet-text").keyup(function() {
    const input = $(this).val().length;
    const charLimit = 140 - input; //Caculates character limit
    const output = $(this).parent().find("output");
    $(output).text(charLimit); //Changes text in output to chars left
    if (charLimit < 0) {
      $(output).css({"color" : "red"});
    } else {
      $(output).css({"color" : "#545149"});
    }
  });

});
