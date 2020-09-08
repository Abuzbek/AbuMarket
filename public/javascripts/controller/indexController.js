//  ============ client qismi eng assosiy qismlar yoziladi ============
app.controller("indexController", ['$scope',  ($scope) => {
    $scope.init = () => {
        //  ========= navbarLeft Animation  ========= 
        $scope.navBtn=($event)=>{
            $('nav.sidenav').toggleClass('active')
            $('#navBack').fadeToggle()
            $('.animated-icon1').toggleClass('open')
            $('#floatLeft').toggleClass('active')
            $('#formAction').toggleClass('active')
        }
        $scope.inputSelectFocus=($event)=>{
          $('#select-options').slideToggle()
        }
        $('#select-options li').click(function(){
          let liText = $(this).text()
          $('#select-options').slideToggle()
          $('input[ng-focus="inputSelectFocus($event)"]').val(liText)
        })
        const swiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination',
              type: 'progressbar',
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            loop:true,
            autoplay:true
          });
        //  ========= navbarLeft Animation  =========
        // ========== slick slider ============
       
        $(".slick-card").slick({
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          prevArrow : '<div class="slider_arrowers prev"><i class="fal fa-chevron-left fa-1x text-white"/></div>',
          nextArrow : '<div class="slider_arrowers next"><i class="fal fa-chevron-right fa-1x text-white"/></div>'
        });
        
    }
    

}])