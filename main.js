const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');
let menuOpen = false;
menuBtn.addEventListener('click', ()=> {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        navigation.classList.add('show')

        menuOpen=true;
    }
    else {
        menuBtn.classList.remove('open');
        navigation.classList.remove('show');

      
        menuOpen=false;
    }
})
$(function() {
    $('#geburtsdatum').datepicker({
        dateFormat: 'dd.mm.yy',
        changeYear: true,
        changeMonth: true,
        showAnim: 'slideDown',
        yearRange: '-120:+0',
    });

    $('#geburtsdatum').on('change', function() {
        const inputValue = $('#geburtsdatum').val();
        // split String of DE Format Date
        const dateParts = inputValue.split('.');
        // re-order dateParts
        const reformatDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        // Test Parts: console.log(dateParts[2], dateParts[1], dateParts[0]);
        // reformat date to UTC
        const inputValueUTC = Date.parse(reformatDate);
        const maxDate = Date.now();
       //const minDate = Date.now()-120;
        const minDate = new Date();
                            minDate.setFullYear(minDate.getFullYear() - 120);
        
                    // now comparing the reformated date with maxDate
        if (inputValueUTC > maxDate) {
        // alert('Future dates are not allowed')
            alert('Das Datum darf nicht in der Zukunft sein');
            $('#geburtsdatum').val('');
        } else if (!validDateFormat(inputValue)) {
        // alert('Invalid Date Format')
            alert('Ungültiges Format für das Geburtsdatum');
            $('#geburtsdatum').val('');
        } else if (inputValueUTC < minDate) {
        // date is not allowed to be less than 120 years from now
            alert('Das Datum darf nicht mehr als 120 Jahre zurückliegen.')
            $('#geburtsdatum').val('');
        }
    });
});

function validDateFormat(input) {
       var regEx = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.[12][0-9]{3}$/;
     //var regEx = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(17|18|19|20)\d{2}$/;
    // var regEx = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d{2} $/;


    return input.match(regEx) != null;
}

    function loadInputText() {
    document.getElementById("geburtsdatum").value = "date picker";
}


$('.slider').each(function() {
    var $this = $(this);
    var $group = $this.find('.slide_group');
    var $slides = $this.find('.slide');
    var bulletArray = [];
    var currentIndex = 0;
    var timeout;
    
    function move(newIndex) {
      var animateLeft, slideLeft;
      
      advance();
      
      if ($group.is(':animated') || currentIndex === newIndex) {
        return;
      }
      
      bulletArray[currentIndex].removeClass('active');
      bulletArray[newIndex].addClass('active');
      
      if (newIndex > currentIndex) {
        slideLeft = '100%';
        animateLeft = '-100%';
      } else {
        slideLeft = '-100%';
        animateLeft = '100%';
      }
      
      $slides.eq(newIndex).css({
        display: 'block',
        left: slideLeft
      });
      $group.animate({
        left: animateLeft
      }, function() {
        $slides.eq(currentIndex).css({
          display: 'none'
        });
        $slides.eq(newIndex).css({
          left: 0
        });
        $group.css({
          left: 0
        });
        currentIndex = newIndex;
      });
    }
    
    function advance() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        if (currentIndex < ($slides.length - 1)) {
          move(currentIndex + 1);
        } else {
          move(0);
        }
      }, 4000);
    }
    
    $('.next_btn').on('click', function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    });
    
    $('.previous_btn').on('click', function() {
      if (currentIndex !== 0) {
        move(currentIndex - 1);
      } else {
        move(3);
      }
    });
    
    $.each($slides, function(index) {
      var $button = $('<a class="slide_btn">&bull;</a>');
      
      if (index === currentIndex) {
        $button.addClass('active');
      }
      $button.on('click', function() {
        move(index);
      }).appendTo('.slide_buttons');
      bulletArray.push($button);
    });
    
    advance();
  });