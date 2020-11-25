import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);
    this.ribbonMenu = new RibbonMenu(categories);
    this.stepSlider = new StepSlider({steps: 5, value: 2});
    this.cartIcon = new CartIcon();
    this.cart = new Cart(this.cartIcon);

    let carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.append(this.carousel.elem);

    let ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.append(this.ribbonMenu.elem);

    let sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.append(this.stepSlider.elem);

    let cartHolder = document.querySelector('[data-cart-icon-holder]');
    cartHolder.append(this.cartIcon.elem);

    let url = 'products.json';
    let response = await fetch(url);
    let products = await response.json();
    
    this.productsGrid = new ProductsGrid(products);
    let prodctsGridHolder = document.querySelector('[data-products-grid-holder]');
    prodctsGridHolder.innerHTML = '';
    prodctsGridHolder.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });

    document.body.addEventListener('product-add', (event) => {

      function isExists (item) {
        return item.id == event.detail; 
      }

      let productIndex = products.findIndex(isExists);
      this.cart.addProduct(products[productIndex]);
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({maxSpiciness: event.detail});
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({category: event.detail});
    });

    document.body.addEventListener('change', (event) => {
      if (event.target == document.getElementById('nuts-checkbox')) {
        this.productsGrid.updateFilter({noNuts: document.getElementById('nuts-checkbox').checked});
      } 

      if (event.target == document.getElementById('vegeterian-checkbox')) {
        this.productsGrid.updateFilter({vegeterianOnly: document.getElementById('vegeterian-checkbox').checked});
      }

    });
  }
}
