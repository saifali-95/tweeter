$(document).ready(function() {
  // --- our code goes here ---
  
  //Event Lister whenever the user types a new tweet 
  $('#tweet-text').on('input', function() {
    //-- hide the error everytime the user type or correct the input
    $('.error').hide();

    const $textLength = ($(this).val().length);
    const counter = $(this).closest('form').find('.footer .counter');
    const $currentCounter = 140 - $textLength;

    counter.html(140 - $textLength);

    //change the color of the counter upon exceeding 140 characters.
    if ($currentCounter < 0) {
      $(counter).addClass('counter-red');
    }else {
      $(counter).removeClass('counter-red');
    }
  });
});

