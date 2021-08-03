/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 */

import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';
import {formatMoney} from '@shopify/theme-currency';
import {register} from '@shopify/theme-sections';
import {forceFocus} from '@shopify/theme-a11y';

const classes = {
  hide: 'hide',
};

const keyboardKeys = {
  ENTER: 13,
};

const selectors = {
  submitButton: '[data-submit-button]',
  submitButtonText: '[data-submit-button-text]',
  comparePrice: '[data-compare-price]',
  comparePriceText: '[data-compare-text]',
  priceWrapper: '[data-price-wrapper]',
  imageWrapper: '[data-product-image-wrapper]',
  slideImage: '[data-mobile-product-image]',
  thumbnailWrapper: '[data-product-thumbnail-wrapper]',
  visibleThumbnailWrapper: `[data-product-thumbnail-wrapper]:not(.${classes.hide})`,
  visibleImageWrapper: `[data-product-image-wrapper]:not(.${classes.hide})`,
  imageWrapperById: (id) => `${selectors.imageWrapper}[data-image-id='${id}']`,
  slideImageWrapperById: (id) => `${selectors.slideImage}[data-image-id='${id}']`,
  thumbnailWrapperById: (id) => `${selectors.thumbnailWrapper}[data-image-id='${id}']`,
  productForm: '[data-product-form]',
  productPrice: '[data-product-price]',
  productDiscount: '[data-product-discount]',
  thumbnail: '[data-product-single-thumbnail]',
  thumbnailById: (id) => `[data-thumbnail-id='${id}']`,
  thumbnailActive: '[data-product-single-thumbnail][aria-current]',
};

const settings = {
  // Default parameters
  slidesPerView: 1,
  loop: false,
  autoHeight: true,
  observer: true,
  observeSlideChildren: true,
  observeParents: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
}



const productSwiper = new Swiper('.product-detail.swiper-container', settings);



register('product', {
  async onLoad() {
    const productFormElement = document.querySelector(selectors.productForm);

    this.product = await this.getProductJson(
      productFormElement.dataset.productHandle,
    );
    this.productForm = new ProductForm(productFormElement, this.product, {
      onOptionChange: this.onFormOptionChange.bind(this),
    });

    this.onThumbnailClick = this.onThumbnailClick.bind(this);
    this.onThumbnailKeyup = this.onThumbnailKeyup.bind(this);

    this.container.addEventListener('click', this.onThumbnailClick);
    this.container.addEventListener('keyup', this.onThumbnailKeyup);
  },

  onUnload() {
    this.productForm.destroy();
    this.removeEventListener('click', this.onThumbnailClick);
    this.removeEventListener('keyup', this.onThumbnailKeyup);
  },

  getProductJson(handle) {
    return fetch(`/products/${handle}.js`).then((response) => {
      return response.json();
    });
  },

  onFormOptionChange(event) {

    const variant = event.dataset.variant;
    this.renderImages(variant);
    this.renderPrice(variant);
    this.renderComparePrice(variant);
    this.renderSubmitButton(variant);
    this.renderThumbnailView(variant);
    this.updateBrowserHistory(variant);
    this.renderSwatch(variant);
  },

  renderSwatch(variant) {
    var productTitle = this.product.title;
    productTitle = productTitle.toLowerCase();

    var swatchColor;

    if(productTitle.indexOf("starter set") >= 0 || productTitle.indexOf("dispenser") >= 0) {
      swatchColor = variant.option1;
      swatchColor = swatchColor.toLowerCase();
      if(swatchColor.indexOf("coconut") >= 0) {
        $('.swatch-matte').css('background', '#f4f3ee');
      } else if(swatchColor.indexOf("cornflower") >= 0) {
        $('.swatch-matte').css('background', '#a9c0e7');

      } else if(swatchColor.indexOf("midnight") >= 0) {
        $('.swatch-matte').css('background', '#246993');

      } else if(swatchColor.indexOf("terracotta") >= 0) {
        $('.swatch-matte').css('background', '#cf8c75');

      }
    }
  },

  onThumbnailClick(event) {
    const thumbnail = event.target.closest(selectors.thumbnail);

    if (!thumbnail) {
      return;
    }

    event.preventDefault();

    this.renderFeaturedImage(thumbnail.dataset.thumbnailId);
    this.renderActiveThumbnail(thumbnail.dataset.thumbnailId);
  },

  onThumbnailKeyup(event) {
    if (
      event.keyCode !== keyboardKeys.ENTER ||
      !event.target.closest(selectors.thumbnail)
    ) {
      return;
    }

    const visibleFeaturedImageWrapper = this.container.querySelector(
      selectors.visibleImageWrapper,
    );

    forceFocus(visibleFeaturedImageWrapper);
  },

  renderSubmitButton(variant) {
    var productTitle = this.product.title;
    productTitle = productTitle.toLowerCase();
    const submitButton = this.container.querySelector(selectors.submitButton);
    const submitButtonText = this.container.querySelector(
      selectors.submitButtonText,
    );

    submitButton.setAttribute("data-id", variant.id);

    if (!variant) {
      submitButton.disabled = true;
      submitButtonText.innerText = theme.strings.unavailable;
    } else if (variant.available) {
      submitButton.disabled = false;

      if(productTitle.indexOf("gift card") >= 0) {
        submitButtonText.innerText = 'Purchase';
      } else {
        submitButtonText.innerText = theme.strings.addToCart;

      }

    } else {
      submitButton.disabled = true;
      submitButtonText.innerText = theme.strings.soldOut;
    }
  },

  renderImages(variant) {
    if (!variant || variant.featured_image === null) {
      return;
    }

    this.renderFeaturedImage(variant.featured_image.id, variant);
    this.renderActiveThumbnail(variant.featured_image.id);
  },

  renderPrice(variant) {
    const priceElement = this.container.querySelector(selectors.productPrice);
    const priceWrapperElement = this.container.querySelector(
      selectors.priceWrapper,
    );

    priceWrapperElement.classList.toggle(classes.hide, !variant);

    if (variant) {
      priceElement.innerText = formatMoney(variant.price, '${{ amount_no_decimals }}');
    }
  },

  renderComparePrice(variant) {
    if (!variant) {
      return;
    }
    const comparePriceElement = this.container.querySelector(
      selectors.comparePrice,
    );
    const compareTextElement = this.container.querySelector(
      selectors.comparePriceText,
    );

    const productDiscount = this.container.querySelector(
      selectors.productDiscount,
    );

    if (!comparePriceElement || !compareTextElement) {
      return;
    }



    var percentOff = variant.price / variant.compare_at_price;
    percentOff = 1 - percentOff;
    percentOff = percentOff.toFixed(2) * 100;


    if(percentOff) {
      productDiscount.innerText = percentOff + '% SAVINGS';
    }

    if (variant.compare_at_price > variant.price) {
      comparePriceElement.innerText = formatMoney(
        variant.compare_at_price,
        '${{ amount_no_decimals }}',
      );
      compareTextElement.classList.remove(classes.hide);
      comparePriceElement.classList.remove(classes.hide);
    } else {
      comparePriceElement.innerText = '';
      compareTextElement.classList.add(classes.hide);
      comparePriceElement.classList.add(classes.hide);
    }
  },

  renderActiveThumbnail(id) {
    const activeThumbnail = this.container.querySelector(
      selectors.thumbnailById(id),
    );
    const inactiveThumbnail = this.container.querySelector(
      selectors.thumbnailActive,
    );

    if (activeThumbnail === inactiveThumbnail) {
      return;
    }

    inactiveThumbnail.removeAttribute('aria-current');
    activeThumbnail.setAttribute('aria-current', true);
  },

  renderFeaturedImage(id, variant) {

    const activeImage = this.container.querySelector(
      selectors.visibleImageWrapper,
    );
    const inactiveImage = this.container.querySelector(
      selectors.imageWrapperById(id),
    );

    // const inactiveSlideImage = this.container.querySelector(
    //   selectors.slideImageWrapperById(id),
    // );



    if(this.product.title == '1111') {
      const inactiveSlideImage = this.container.querySelector(
        selectors.slideImageWrapperById(id),
      );


      const slideIndex = inactiveSlideImage.getAttribute('data-index');

      // console.log(inactiveSlideImage.getAttribute('data-index'));

      productSwiper.slideTo(slideIndex);
    } else {
      if(variant) {
        var swipersToHide = document.querySelectorAll('.swiper-container.product-detail');
        var swipeEl = document.getElementById('swiper-'+variant.id);

        for (var i = 0; i < swipersToHide.length; i++) {
            swipersToHide[i].classList.add(classes.hide);
        }
        swipeEl.classList.remove(classes.hide);
        // productSwiper.update();
      }

    }



    activeImage.classList.add(classes.hide);
    inactiveImage.classList.remove(classes.hide);

  },

  renderThumbnailView(variant) {

    if (!variant || variant.featured_image === null) {
      return;
    }



    const id = variant.featured_image.id;


    // return;

    const activeThumbnail = this.container.querySelector(
      selectors.visibleThumbnailWrapper,
    );
    const inactiveThumbnail = this.container.querySelector(
      selectors.thumbnailWrapperById(id),
    );

    activeThumbnail.classList.add(classes.hide);
    inactiveThumbnail.classList.remove(classes.hide);

    if(this.product.title != 'Gift Card') {

    }

  },

  updateBrowserHistory(variant) {
    const enableHistoryState = this.productForm.element.dataset
      .enableHistoryState;

    if (!variant || enableHistoryState !== 'true') {
      return;
    }

    const url = getUrlWithVariant(window.location.href, variant.id);
    window.history.replaceState({path: url}, '', url);
  },
});
