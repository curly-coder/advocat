  
  // slider
const prev = document.getElementById('btn-prev');
const next = document.getElementById('btn-next');
const slides = document.querySelectorAll('.slide');

let index = 0;

const activeSlide = n => {
  console.log(n);
for(slide of slides){
    slide.classList.remove('active');
}
slides[n].classList.add('active');
}

const nextSlide = () => {
if(index == slides.length - 1){
    index = 0;
    activeSlide(index);
}else{
    index++;
    activeSlide(index);
}
};
const prevSlide = () => {
if(index == 0){
    index = slides.length - 1;
    activeSlide(index);
}else{
    index--;
    activeSlide(index);
}
};

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);


    
// tabs
const offer = document.getElementById('another-offer');
const tabs = document.getElementById('tabs');
const content = document.querySelectorAll('.content');

function changeClass(el){
 for(let i = 0; i < tabs.children.length; i++){
         tabs.children[i].classList.remove('active');
     }
     el.classList.add('active');
 }

 tabs.addEventListener('click', e=>{
     const currTab = e.target.dataset.btn;
     changeClass (e.target);
     for (let i = 0; i < content.length; i++){
         content[i].classList.remove('active');
         if (content[i].dataset.content == currTab){
             content[i].classList.add('active');
         }
     }
 })

 
//  $('.tab-btn').on('click', function(){
//     let href = $(this).attr('href');
  
//     $('html, body').animate({
//       scrollTop:$(href).offset().top
//     }, {
//       duration: 370,
//       easing: "linear"
//     });
//     return false  
//   })

  $('.btn-questions').click(function(){
    $(this).parent('.questions-wrapper').toggleClass('active');
  });
//   $('.btn-questions').click(function(){
//     $(".questions-wrapper-desc").toggleClass('active');
//   });  

// counter
let valueDisplays = document.querySelectorAll('.counter');
let interval = 1500;
valueDisplays.forEach(valueDisplay => {
let startValue = 0;
let endValue = parseInt(valueDisplay.getAttribute("data-value"));
let duration = Math.floor(interval/endValue);
let counter = setInterval(function(){
            startValue+=1;
            valueDisplay.textContent = startValue;
            if(startValue == endValue){
                clearInterval(counter);
            }
        }, duration);
});

$(document).ready(function(e){
    $('.btn').on('mouseenter', function (e){
        x = e.pageX - $(this).offset().left;
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
    })
    $('.btn').on('mouseout', function (e){
        x = e.pageX - $(this).offset().left;
        y = e.pageY - $(this).offset().top;
        $(this).find('span').css({top:y, left:x})
    })
})


$('#btn-up').on("click", function () {
    $('body,html').animate({
      scrollTop: 0
    }, 400);
    return false;
  });


  $('.btn-map').on('click', function(){
    $('.wrapper-modal').fadeIn();
  })
  $('.btn-map').on('click', function(){
    $('.wrapper-modal').addClass('active')
  })
  $('.form-order').on('click', function(){
    $('.wrapper-modal').fadeOut();
  })
  
  $('.overlay').on('click', function(){
    $('.wrapper-modal').fadeOut();
  })
  
  $('.form-order').children().on('click', function(e){
    e.stopPropagation();
  })
  
  $('.overlay').on('click', function(){
    $('.wrapper-modal').hide();
  })

//   hamburger
$('.hamburger').on('click', function(){
    $('.main-menu').toggle();
  })
  $('.close').on('click', function(){
    $('.main-menu').hide();
  })

  


  // validate
  $('.btn').on('click', function(e){
  e.preventDefault();
  $(this).parent('form').submit();
})

$.validator.addMethod('regex', function(value, element, regexp){
  let regExsp = new RegExp(regexp);
  return regExsp.test(value);
}, 'Заполните форму')

function valEll(el){
  el.validate({
    rules:{
      name : {
        required:true,
        regex: "[A-Za-z]{1,32}"
      },
      surname : {
        required:true,
        regex: "[A-Za-z]{1,32}"
      },
      email : {
        required: true,
        regex: "[0-9A-Za-z]"
      },
      phone : {
        required: true, 
        digits: true,
        minlength: 10,
        maxlength: 13, 
        regex: "[0-9]+"
      }, 
      textarea :{
        regex: "[A-Za-z]{1,32}"
      }
      }, 
      messages : {
        name:{
          required: 'Field is required',
          regexp: 'Заполните поле'
        },
        email : {
          required: 'Field is required',
          regexp: 'Заполните поле'
        },
        phone : {
          required: 'Field is required',
          regexp: 'Заполните поле'
        }
      },
      submitHandler:function(form){
        $('#preloader-active').fadeIn();
        let $form = $(form);
        let $formId = $(form).attr('id');
        switch($formId){
          case 'form-book':
            $.ajax({
              type:'POST',
              url: $form.attr('action'),
              data: $form.serialize()
            })
            .done(function(){
              console.log('Форма отправлена');
            })
            .fail(function(){
              console.log('Fail');
            })
            .always(function(){
              setTimeout(function(){
                $form.trigger('reset');
                $('.wrapper-modal').fadeOut();
              }, 1000);
              setTimeout(function(){
                $('#preloader-active').fadeOut();
              }, 1400)
            });
            break;
            case 'search-box':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data : $form.serialize()
            })
            .done(function(){
              console.log('Success');
            })
            .fail(function(){
              console.log('Fail');
            })
            .always(function(){
              setTimeout(function(){
                $form.trigger('reset');
              }, 1000);
              setTimeout(function(){
                $('#preloader-active').fadeOut();
              }, 1400)
            });
            break;
            case 'search':
            $.ajax({
              type: 'POST',
              url: $form.attr('action'),
              data : $form.serialize()
            })
            .done(function(){
              console.log('Success');
            })
            .fail(function(){
              console.log('Fail');
            })
            .always(function(){
              setTimeout(function(){
                $form.trigger('reset');
              }, 1000);
              setTimeout(function(){
                $('#preloader-active').fadeOut();
              }, 1400)
            });
            break;
        }
        return false;
      }
  })
};
$('.form-val').each(function(){
  valEll($(this));
})
