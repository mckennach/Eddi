import {formatMoney} from '@shopify/theme-currency';
import {register} from '@shopify/theme-sections';
import debounce from 'lodash-es/debounce';

const selectors = {
  qtyPlus:   '[data-cart-qty-plus]',
  qtyMinus:  '[data-cart-qty-minus]',
  variant:   '[data-cart-variant]',
  qtyEl:     '[data-cart-qty]',
  cartTotal: '[data-cart-total]',
  itemTotal: '[data-item-total]',
  counter:   '.js-go-cart-counter',
};

register('cart', {
  onLoad() {
    this.incrementInput = this.incrementInput.bind(this);
    this.updateCart  = this.updateCart.bind(this);
    this.container.querySelectorAll(selectors.qtyPlus).forEach((item) => {
      item.addEventListener('click', this.incrementInput);
      item.addEventListener('click', debounce(this.updateCart, 1000));
    });
    this.container.querySelectorAll(selectors.qtyMinus).forEach((item) => {
      item.addEventListener('click', this.incrementInput);
      item.addEventListener('click', debounce(this.updateCart, 1000));
    });
  },

  incrementInput(event) {
    const variantEl    = event.target.closest(selectors.variant);
    const currentQtyEl = variantEl.querySelector(selectors.qtyEl);
    const currentQty = parseInt(currentQtyEl.value);
    let   newQty     = currentQty;

    if(event.target.hasAttribute('data-cart-qty-plus')) {
      newQty = currentQty + 1;
    } else if(event.target.hasAttribute('data-cart-qty-minus')) {
      newQty = currentQty - 1;
    }

    currentQtyEl.value = newQty < 0 ? 0 : newQty;
  },

  updateCart(event) {
    const variantEl = event.target.closest(selectors.variant);

    if(!variantEl) {
      return;
    }

    const variantKey = variantEl.getAttribute('data-cart-variant');
    const qtyEl      = variantEl.querySelector(selectors.qtyEl);
    const qty        = parseInt(qtyEl.value);

    fetch('/cart/change.js', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({id: variantKey, quantity: qty}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if(!response.ok) {
        throw new Error(`An error occured in cart.js: ${response.status}`);
      }
      return response.json();
    })
    .then((cart) => {
      this.updateCartPage(cart);
    })
    .catch((error) => {
      throw new Error(error);
    })
    .finally(() => {
      if(0 == qty) {
        variantEl.classList.add('removed');
        setTimeout(() => {
          variantEl.remove();
        }, 300);
      }
    });
  },

  updateCartPage(cart) {
    cart.items.forEach((item, index) => {
      const row = this.container.querySelector('[data-cart-variant="'+item.key+'"');
      if(item.quantity > 0) {
        row.querySelector(selectors.itemTotal).innerText = formatMoney(item.final_line_price, theme.moneyFormat);
      }
    });
    document.querySelectorAll(selectors.counter).forEach((item, index) => {
      item.innerText = cart.item_count;
      item.setAttribute('data-count', cart.item_count);
    });
    document.querySelectorAll(selectors.cartTotal).forEach((item, index) => {
      item.innerText = formatMoney(cart.total_price, theme.moneyFormat);
    });
  }
});
