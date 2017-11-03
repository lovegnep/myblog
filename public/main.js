$(document).ready(function () {
  var windowHeight = $(window).height();
  var $backtotop = $('#backtotop');
  var $gotobottom = $('#gotobottom');
  var $new = $('#newtheme');
  var top = windowHeight - $backtotop.height() - 500;
  var realheight = $(document).height();

  console.log('文档高：'+ $(document).height());
  console.log('可视窗口高：'+ $(window).height());

  if($(document).height() - $(window).height() <= 50){
      $gotobottom.css({display:'none'});
      $backtotop.css({display:'none'});
  }else{
      $gotobottom.css({display:'block'});
  }

  function moveBacktotop() {
    $backtotop.css({ top: top, right: 0});
      $gotobottom.css({ top: top+120, right: 0});
      if($new){
        console.log('hehe');
          $new.css({ top: top+60, right: 0});
      }

  }
    if($new){
    $new.click(function(){
      window.location.href = '/newtheme';
    });
    }
  function footerFixBottom() {
      if($(document.body).height() < windowHeight){
          $("#footer").addClass('fix-bottom');
      }else{
          $("#footer").removeClass('fix-bottom');
      }
  }

  $backtotop.click(function () {
    $('html,body').animate({ scrollTop: 0 });
    return false;
  });

    $gotobottom.click(function () {
        $('html,body').animate({scrollTop:$('.end').offset().top});
        return false;
    });

  $(window).scroll(function () {
    var windowHeight = $(window).scrollTop();
    console.log('windowHeight:'+ windowHeight+'  realheight:'+realheight);
    if (windowHeight > 200) {
      $backtotop.fadeIn();
    } else {
      $backtotop.fadeOut();
    }
    if(realheight - windowHeight <800){
      $gotobottom.fadeOut();
    }else{
      $gotobottom.fadeIn();
    }
  });

  moveBacktotop();
  footerFixBottom();
  $(window).resize(moveBacktotop);
  $(window).resize(footerFixBottom);


  // data-loading-text="提交中"
  $('.submit_btn').click(function () {
    $(this).button('loading');
  });

});
