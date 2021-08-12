$(document).ready(function() {
  // --- our code goes here ---

  $("#tweet-text").on('keydown', function() {
    
    const $textLength = ($(this).val().length);
    const $counter = $(this).closest('form').find('.button .counter');

    $counter.html(140-$textLength);


  });

});

