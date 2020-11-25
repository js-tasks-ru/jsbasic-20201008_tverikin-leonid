import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
  
    function isExists (item) {
      return item.product.id == product.id; 
    }

    let productIndex = this.cartItems.findIndex(isExists);

    if (productIndex >= 0) {
      this.cartItems[productIndex].count += 1; 
    } else {
      this.cartItems.push({product, count: 1});
    }

    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {

    function isExists (item) {
      return item.product.id == productId; 
    }

    let productIndex = this.cartItems.findIndex(isExists);
    
    this.cartItems[productIndex].count += amount;

    if (this.cartItems[productIndex].count <= 0) {
      this.cartItems.splice(productIndex, 1);
    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length == 0;
  }

  getTotalCount() {
    if (this.cartItems.length == 0) {return 0;}  
    return this.cartItems.reduce((acc, item) => {return acc + item.count;}, 0);
  }

  getTotalPrice() {
    if (this.cartItems.length == 0) {return 0;}
    let result = this.cartItems.reduce((acc, item) => {return acc + item.product.price * item.count;}, 0);
    return result;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal(); 

    modal.setTitle('Your order');
    
    let modalBody = modal.elem.querySelector('.modal__body');
    let modalBodyList = document.createElement('div');
    let modalForm = this.renderOrderForm();

    for (let i = 0; i < this.cartItems.length; i++) {
      let modalBodyElement = this.renderProduct(this.cartItems[i].product, this.cartItems[i].count);
      modalBodyList.append(modalBodyElement);
    }
    modalBodyList.append(modalForm);
    
    modal.setBody(modalBodyList);

    modalBody.addEventListener('click', (event) => {

      if (event.target.closest('.cart-counter__button_minus')) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, -1);
      }
      
      if (event.target.closest('.cart-counter__button_plus')) {
        let productId = event.target.closest('.cart-product').dataset.productId;
        this.updateProductCount(productId, 1);
      }
      
    });

    modal.open();

    modalBody.querySelector('.cart-form').addEventListener('submit', () => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    
    let modal = document.querySelector('.modal');

    if (!document.body.className.includes('is-modal-open')) {return;}
    if (cartItem.length == 0) {
      modal.remove();
      document.body.classList.remove('is-modal-open');
    }
    
    let modalBody = modal.querySelector('.modal__body');
    
    for (let i = 0; i < cartItem.length; i++) {
      let products = modalBody.querySelectorAll('.cart-product');
        
      for (let elem of products) {
        let productId = cartItem[i].product.id;
        let productIndex = cartItem.findIndex((item) => {return item.product.id == elem.dataset.productId;});

        if (productIndex >= 0) {
          let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
          let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
          let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

          productCount.innerHTML = cartItem[i].count;
          productPrice.innerHTML = `€${(cartItem[i].count * cartItem[i].product.price).toFixed(2)}`;
          infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        }
        else {elem.remove();}
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    document.querySelector(`[type="submit"]`).classList.add('is-loading');

    let cartForm = document.forms[0];
    let cartFormData = new FormData(cartForm);
    let promise = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: cartFormData  
    });

    promise.then(() => {
      document.querySelector('.modal__title').innerHTML = 'Success!';
      this.cartItems.length = 0; 
      document.querySelector('.modal__body').innerHTML = `
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
           </p>
        </div>`;
      this.cartIcon.update(this);  
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}