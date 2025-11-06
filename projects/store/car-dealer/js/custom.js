(function ($) {

  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').fadeOut(1000); // set duration in brackets    
    });


    // MENU
    $('.navbar-collapse a').on('click',function(){
      $(".navbar-collapse").collapse('hide');
    });

    $(window).scroll(function() {
      if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
          } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
          }
    });


    // HOME SLIDER & COURSES & CLIENTS
    $('.home-slider').owlCarousel({
      animateOut: 'fadeOut',
      items:1,
      loop:true,
      dots:false,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
    })

    $('.owl-courses').owlCarousel({
      animateOut: 'fadeOut',
      loop: true,
      autoplayHoverPause: false,
      autoplay: false,
      dots: false,
      nav:true,
      navText: [
          '<i class="fa fa-angle-left"></i>',
          '<i class="fa fa-angle-right"></i>'
      ],
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        1000: {
          items: 3,
        }
      }
    });

    $('.owl-client').owlCarousel({
      animateOut: 'fadeOut',
      loop: true,
      autoplayHoverPause: false,
      autoplay: true,
      smartSpeed: 1000,
      responsiveClass: true,
      responsive: {
        0: {
          items: 1,
        },
        1000: {
          items: 3,
        }
      }
    });


    // SMOOTHSCROLL
    $(function() {
      $('.custom-navbar a, #home a').on('click', function(event) {
        var $anchor = $(this);
          $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 49
          }, 1000);
            event.preventDefault();
      });
    });  

    // كود إرسال بيانات الشراء إلى السيرفر
    $(document).ready(function() {
      $('#purchaseForm').on('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted!');
        
        var fullName = $('#fullName').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var payment = $('#payment').val();
        
        console.log('Form data:', { fullName, email, phone, payment });
        
        if (!fullName || !email || !phone || !payment) {
          console.log('Missing required fields');
          $('#successAlert').show().text('يرجى ملء جميع الحقول المطلوبة');
          return;
        }
        
        console.log('Sending data to server...');
        
        $.ajax({
          url: 'http://localhost:8080/api/buy',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            name: fullName,
            email: email,
            phone: phone,
            payment: payment
          }),
          success: function(response) {
            console.log('Success response:', response);
            $('#successAlert').show().text('تم تسجيل طلبك بنجاح!');
            $('#purchaseForm')[0].reset();
          },
          error: function(xhr) {
            console.log('Error response:', xhr);
            var msg = 'حدث خطأ أثناء التسجيل';
            if (xhr.responseJSON && xhr.responseJSON.error) {
              msg = xhr.responseJSON.error;
            }
            $('#successAlert').show().text(msg);
          }
        });
      });
    });

})(jQuery);
