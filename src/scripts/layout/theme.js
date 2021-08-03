import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'lazysizes/plugins/rias/ls.rias';
import 'lazysizes/plugins/bgset/ls.bgset';
import 'lazysizes/plugins/blur-up/ls.blur-up';
import 'lazysizes';
import 'lazysizes/plugins/respimg/ls.respimg';

import '../../styles/theme.scss';
import '../../styles/theme.scss.liquid';




import GoCart from '@bornfight/gocart';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..



import {
  focusHash,
  bindInPageLinks
} from '@shopify/theme-a11y';
import {
  cookiesEnabled
} from '@shopify/theme-cart';
import Cookies from 'js-cookie';

const goCart = new GoCart();

console.log(goCart);

// Common a11y fixes
focusHash();
bindInPageLinks();

// Apply a specific class to the html element for browser support of cookies.
if (cookiesEnabled()) {
  document.documentElement.className = document.documentElement.className.replace(
    'supports-no-cookies',
    'supports-cookies',
  );
}





/**
 * Password Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Password template.
 *
 * @namespace password
 */

const selectors = {
  recoverPasswordFormTriggers: '[data-recover-toggle]',
  recoverPasswordForm: '[data-recover-form]',
  loginForm: '[data-login-form]',
  formState: '[data-form-state]',
  resetSuccess: '[data-reset-success]',
};

function onShowHidePasswordForm(evt) {
  evt.preventDefault();
  toggleRecoverPasswordForm();
}

function checkUrlHash() {
  const hash = window.location.hash;

  // Allow deep linking to recover password form
  if (hash === '#recover') {
    toggleRecoverPasswordForm();
  }
}

/**
 *  Show/Hide recover password form
 */
function toggleRecoverPasswordForm() {
  document.querySelector(selectors.recoverPasswordForm).classList.toggle('hide');
  document.querySelector(selectors.loginForm).classList.toggle('hide');
}

/**
 *  Show reset password success message
 */
function resetPasswordSuccess() {
  // check if reset password form was
  // successfully submitted and show success message.

  if (document.querySelector(selectors.formState)) {
    document.querySelector(selectors.resetSuccess).classList.remove('hide');
  }
}

if (document.querySelector(selectors.recoverPasswordForm)) {
  checkUrlHash();
  resetPasswordSuccess();

  document.querySelectorAll(selectors.recoverPasswordFormTriggers).forEach((trigger) => {
    trigger.addEventListener('click', onShowHidePasswordForm);
  });
}




// @start popup
const $thePopup = $('.popup');
const popupCookie = 'popup_display';
const popupDelay = $thePopup.length > 0 ? parseInt($thePopup.attr('data-delay')) : false;
const popupRemember = $thePopup.length > 0 ? parseInt($thePopup.attr('data-remember')) : false;

$thePopup.on('shown.bs.modal', function() {
  $thePopup.find('input[type="email"]').trigger('focus');
});

if ($thePopup.length > 0) {
  if ('undefined' === typeof Cookies.get(popupCookie) || 'n' != Cookies.get(popupCookie)) {
    setTimeout(function() {
      $thePopup.fadeIn();
      $('body').addClass('modal-open');
    }, popupDelay);

  }
}

$(document).on('click', '.popup', function(e) {

  var container = $(".popup--inner-container");

   // if the target of the click isn't the container nor a descendant of the container
   if (!container.is(e.target) && container.has(e.target).length === 0)
   {
     $thePopup.fadeOut();
     $('body').removeClass('modal-open');
     Cookies.set(popupCookie, 'n', {
       expires: popupRemember
     });
   }

});


$(document).on('click', '.close-modal-popup', function() {
  $thePopup.fadeOut();
  $('body').removeClass('modal-open');
  Cookies.set(popupCookie, 'n', {
    expires: popupRemember
  });
});
// @end popup


/* ---------------------------------------------
Sticky Nav on Scroll
------------------------------------------------ */
$(window).on('scroll', function(e) {
  e.preventDefault();
  stickyNav();
});

stickyNav();

function stickyNav() {

  if ($(window).scrollTop() > 100) {
    $('body').addClass('scrolled');
  } else {
    $('body').removeClass('scrolled');
  }
}


/* ---------------------------------------------
Nav
------------------------------------------------ */
$(".dropdown_has_nav").on({
  mouseenter: function() {
    $('body').addClass('dropdown-active');
  },
  mouseleave: function() {
    $('body').removeClass('dropdown-active');
  }
});



$(document).on('click', '.open-account-modal', function(e) {
  e.preventDefault();
  $('.account-popup').fadeIn();
});

$(document).on('click', '.close-modal-account', function(e) {
  e.preventDefault();
  $('.account-popup').fadeOut();
});


$(document).on('click', '.burger', function(e) {
  e.preventDefault();
  $('body').toggleClass('mobile-nav-open');
  $('.header_main--mobile-nav').slideToggle('fast');
});

$(document).on('click', '.faq-trigger', function(e) {
  e.preventDefault();
  var container = $(this).attr('data-faq');
  $('.faq-trigger').removeClass('active');
  $(this).addClass('active');
  $('.faq_article').addClass('hide');
  $('#'+container).removeClass('hide');
});



/* ---------------------------------------------
TICKER
------------------------------------------------ */
if ($('.ticker').length > 0) {
  $('.ticker').grouploop({
    // animation speed
    velocity: .5,

    // false = from left to right
    forward: false,

    // default selectors
    childNode: '.item',
    childWrapper: '.item-wrap',

    // enable pause on hover
    pauseOnHover: true,

    // stick the first item
    stickFirstItem: false,

    // callback
    complete: null
  });
}


// @start Accordion

$(document).on('click', '.accordion--title', function() {
  $(this).toggleClass('active');
  if ($(this).hasClass('active')) {
    $(this).next().slideDown('fast');

  } else {
    $(this).next().slideUp('fast');

  }
});

// @end Accordion


// @start Accordion

$(document).on('click', '.open-material-modal', function() {
  var sibling = $(this).next();
  $(sibling).fadeIn('fast');
});

$(document).on('click', '.material--close-modal', function() {
  var parent = $(this).closest('.material--point-desc');;
  $(parent).fadeOut('fast');
});



// @end Accordion


/* ---------------------------------------------
CUSTOM BUNDLE QUICK VIEW
------------------------------------------------ */

// @start Accordion

$(document).on('click', '.quick-view', function(e) {
  e.preventDefault();
  var productID = $(this).attr('data-product-id');
  $('.product_quickview[data-product-id=' + productID + ']').fadeIn();

});

$(document).on('click', '.product_quickview--close-modal', function() {
  $('.product_quickview').fadeOut();
});

$(document).on('change', '.subscription-popup__select', function() {

  var select = document.getElementById("subscription-popup__select");
  var value = select.options[select.selectedIndex].value;
  $('.subscription-popup__frequency').hide();
  $('.frequency-' + value).show();
});

// @end Accordion

// @start Accordion

$(document).on('click', '.open-sub-modal', function(e) {
  e.preventDefault();
  $('.subscription-popup').fadeIn();

});

$(document).on('click', '.close-modal-sub', function() {
  $('.subscription-popup').fadeOut();
});


$(document).on('click', '.keep-shopping', function(e) {
  e.preventDefault();
  $('.go-cart__drawer').removeClass('is-open');
  $('.go-cart__overlay').removeClass('is-open');

});


// @end Accordion

/* ---------------------------------------------
CUSTOM BUNDLE
------------------------------------------------ */
var skuArr = [];
var titleArr = [];
var activeID;


//  Input tracker
// $('.cart_item--number-input-wrapper').find('input[type="number"]').hide();
// $('.cart_item--number-input-wrapper .add-one, .cart_item--number-input-wrapper .subtract-one').on('click', function(e) {
//   e.preventDefault();
//
//   $('#addToCartBtn').removeClass('inactive');
//   var $clickedButton = $(this);
//   var $numberInputWrapper = $clickedButton.closest('.cart_item--number-input-wrapper');
//   var $numberInput = $numberInputWrapper.find('input');
//   var $placeholder = $numberInputWrapper.find('.placeholder');
//   var operation = $clickedButton.data('operation');
//   var productTitle = $(this).attr('data-product-title');
//   var sku = $(this).attr('data-sku');
//   var subtract = $(this).find('.subtract-one');
//
//   var currentInputValue = parseInt($numberInput.val(), 10);
//
//
//
//
//   if (operation == 'add' || operation == 'subtract' && currentInputValue > 0) {
//     var newValue = operation == 'add' ? currentInputValue + 1 : currentInputValue - 1;
//     $numberInput.val(newValue);
//     $placeholder.html(newValue);
//
//     if(operation == 'add') {
//       $(subtract).show();
//       if(skuArr.length < 4) {
//         skuArr.push(sku+'-'+newValue);
//       }
//
//       if(titleArr.length < 4) {
//         titleArr.push(productTitle+'-'+newValue);
//       }
//
//     } else if(operation == 'subtract') {
//       skuArr = removeItemAll(skuArr, sku+'-'+currentInputValue);
//       titleArr = removeItemAll(titleArr, productTitle+'-'+currentInputValue);
//     }
//
//     if(skuArr.length == 4) {
//       $('.add-one').hide();
//       $('.test-btn').removeClass('hide');
//       findSku();
//     } else {
//       $('.add-one').show();
//       $('.test-btn').addClass('hide');
//
//     }
//
//     if (newValue == 0) {
//       $(subtract).hide();
//       $('#addToCartBtn').addClass('inactive');
//     }
//   }
//   printScents(titleArr, operation);
// });


$(document).on('click', '.add-to-bundle, .bundle--image', function() {
  var operation = $(this).data('operation');
  var productTitle = $(this).attr('data-product-title');
  var sku = $(this).attr('data-sku');

  var activePosition = parseInt($('.bundle_selection.active').attr('data-position'));

  if (operation == 'add') {

    if (activePosition <= 3 ) {

      skuArr.splice(activePosition, 1, sku + '-' + activePosition);
      titleArr.splice(activePosition, 1, productTitle + '-' + activePosition);
    }

  }

  if (skuArr.length == 4) {
    $('.product_custom_bundles--form').fadeIn();
    findSku();
  } else {
    $('.product_custom_bundles--form').fadeOut();
  }
  if (activePosition == 0) {
    $('#addToCartBtn').addClass('inactive');
  }

  printScents(titleArr, activePosition, operation);


});


$(document).on('click', '.bundle_selection', function() {

  if ($(this).hasClass('disabled')) {
    return;
  } else {
    $('.bundle_selection').removeClass('active');
    $(this).addClass('active');
  }

});



// button click
$(document).on('click', '.product_custom_bundles--add-to-cart', function(e) {
  e.preventDefault();
  var selling_plan = getSub();
  addToCart(activeID, selling_plan);
});

// button click
$(document).on('click', '.add-to-cart-main', function(e) {
  e.preventDefault();
  const selling_plan = getSub();
  const id = $(this).attr('data-id');
  addToCart(id, selling_plan);
});

// $(document).on('click', '.product_custom_bundles--input', function() {
//
// });

$(document).on('change', '.product_custom_bundles--input', function() {
  console.log(this.value);
  if(this.value == 'true') {
    $('.product_custom_bundles--frequency-container').fadeIn();
  } else {
    $('.product_custom_bundles--frequency-container').fadeOut();
  }
});

function getSub() {
  var select;
  var value;
  var isSub = document.querySelector('input[name="subscription"]:checked').value;
  if (isSub == 'true') {
    select = document.getElementById("select");
    value = select.options[select.selectedIndex].value;
  } else {
    value = false;
  }
  return value;
}


function findSku() {
  var newArr = [];
  var sku;
  var sorted;
  var skuToCheck;
  var id;

  for (var i = 0; i < skuArr.length; i++) {
    sku = skuArr[i];
    sku = sku.charAt(10);


    newArr.push(sku);
    console.log(newArr);
  }
  sorted = newArr.sort(function(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  });

  skuToCheck = sorted.join('');
  // skuToCheck = 'SOAP-4PAC-'+skuToCheck;
  console.log(skuToCheck);
  id = parseVariants(skuToCheck, 'id');
  id = parseVariants(skuToCheck, 'name');

  printScents(newArr, 'add')

  activeID = id;

}

function printScents(arr, activePosition, operation) {



  var position;
  var nextPosition;
  var title;
  var handle;
  activePosition = parseInt(activePosition);
  var count = 0;
  for (var i = 0; i < 4; i++) {
    if (arr[i]) {
      position = i;
      title = arr[i];
      title = title.replace('-' + position, '');
      handle = title.toLowerCase();
      handle = handle.replace(' ', '-');
      $('.readout-' + position).html(title);
      $('.swatch-' + position).attr('data-handle', handle);
    } else {
      position = i + 1;
      title = 'Scent ' + position;
      $('.readout-' + i).html(title);
    }
  }

  nextPosition = activePosition + 1;

  $('.bundle_selection').removeClass('active');
  $('.bundle_selection--' + nextPosition).removeClass('disabled');
  $('.bundle_selection--' + nextPosition).addClass('active');


}

function parseVariants(sku, type) {
  var variants = product.variants;
  var selectedSku = 'Not Found';
  var available;
  variants.forEach(function(value) {
    if (value.title == sku) {
      selectedSku = value;
      available = value.available;
    }
  });


  if (available) {
    $('.custom-add-to-cart').html('Pre-Order');
    $('.custom-add-to-cart').attr('data-id', selectedSku.id);
    // $('.test-btn').prop('disabled', true);


  } else {
    $('.custom-add-to-cart').html('Sold Out');
    $('.custom-add-to-cart').prop("disabled", false);
  }

  return selectedSku.id

}

function addToCart(id, selling_plan) {

  if (selling_plan) {
    selling_plan = parseInt(selling_plan);
    var data = {
      "id": id,
      "quantity": 1,
      "selling_plan": selling_plan
    }
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: data,
      dataType: 'json',
      success: function(data) {
        console.log(data);
      },
      error: function(req, status, error) {
        console.log(req);
        console.log(status);
        console.log(error);
      }
    });
  } else {
    CartJS.addItem(id, 1, {}, {
      // Define a success callback to display a success message.
      "success": function(data, textStatus, jqXHR) {

        $.get('/cart.js', '', function(data) {
          $('.cart-count').html(data.item_count);
          CartJS.getCart();
        }, 'json');
      },

      // Define an error callback to display an error message.
      "error": function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
      }

    });
  }




}



// sort alphabetically
function sortAlph(arr) {
  arr.sort(function(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  })
}

// remove from array
function removeItemAll(arr, value) {

  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }

  return arr;
}




const swiper = new Swiper('.press .swiper-container', {
  // Default parameters
  slidesPerView: 1,
  spaceBetween: 10,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  }

});

const iconSwiper = new Swiper('.icon-list-swiper .swiper-container', {
  // Default parameters
  slidesPerView: 3,
  spaceBetween: 20,
});


if(window.location.search == '?cart-open') {
  $('.go-cart__trigger').trigger('click');
}

anime({
  targets: '#stars path',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'easeInOutSine',
  duration: 1500,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});
