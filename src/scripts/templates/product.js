import {
  load
} from '@shopify/theme-sections';
import '../sections/product';

import $ from 'jquery';


load('*');


$('.swatch :radio').change(function() {
  var optionIndex = $(this).closest('.swatch').attr('data-option-index');
  var optionID = $(this).attr('data-option-id');
  var optionValue = $(this).val();
  var optionTitle = $(this).attr('data-title');
  var position = $(this).attr('data-position');
  // productSwiper.slideTo(position);
  optionIndex = parseInt(optionIndex) + 1;
  var optionIndexOG = parseInt(optionIndex) - 1;
  $('#Option' + optionIndex + '-' + optionValue + '-' + optionID).trigger('click');




  if (optionTitle.indexOf("Nickel") >= 0 || optionTitle.indexOf("Brass") >= 0) {
    optionTitle = $(this).attr('data-title') + ' +$10';
  } else if (optionTitle.indexOf("Standard") >= 0) {
    optionTitle = $(this).attr('data-title') + ' +$0';
  }

  $('.swatch-' + optionIndexOG + '-readout').html(optionTitle);

});


$(document).on('click', '.denom-select', function() {
  var position = $(this).attr('data-position');
  var handle = $(this).attr('data-handle');
  var productID = $(this).attr('data-product-id');
  $('.denom-select').removeClass('active');
  $(this).addClass('active');
  $('#Option' + position + '-' + handle + '-' + productID).trigger('click');

});


// $(document).on('change', '.qty-input', function() {
//   console.log($(this));
// });


// const prodswiper = new Swiper('.product_detail_image .swiper-container', {
//   // Default parameters
//   slidesPerView: 1,
//   spaceBetween: 10,
//   autoHeight: true,
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'bullets',
//   }
//
// });
