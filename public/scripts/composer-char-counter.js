$(document).ready(function() {
  // --- our code goes here ---

  $("#tweet-text").on('input', function() {
    
    const $textLength = ($(this).val().length);
    const counter = $(this).closest('form').find('.button .counter');
    const $currentCounter = 140-$textLength;

    counter.html(140-$textLength);

    if ($currentCounter < 0) {
      $(counter).addClass( "counter-red" );
    }
    else {
      $(counter).removeClass( "counter-red" );
    }

  });

});

