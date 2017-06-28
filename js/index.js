jQuery(document).ready(function($) {

  $(".scroll").click(function(event) {
    event.preventDefault();
    $('html,body').animate({
      scrollTop: $(this.hash).offset().top
    }, 500);
  });

  $(document).scroll(function() {
    if (window.scrollY > 50) {
      $(".navbar-brand").stop().animate({
        fontSize: '2rem'
      }, 75, 'linear');
      $(".navbar-default").stop().animate({
        padding: '0'
      }, 75, 'linear');
    } else {
      $(".navbar-brand").stop().animate({
        fontSize: '2.5rem'
    }, 75, 'linear');
      $(".navbar-default").stop().animate({
        padding: '1rem 1rem'
      }, 75, 'linear');
    }
  });
  
  $(".expand", this).click(function(){
        $("div", this).fadeToggle().removeClass("portfolioExtra");
        
  });

});