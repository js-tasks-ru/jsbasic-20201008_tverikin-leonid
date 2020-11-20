import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = document.createElement('div'); 
    this.elem.classList.add('products-grid');
    this.elem.innerHTML = `
      <div class="products-grid__inner">
      </div>
    `;
    this.render(this.products);
  }

  render(products) {

    let gridInner = this.elem.querySelector('.products-grid__inner');

    for (let i = 0; i < products.length; i++) {
      let product = new ProductCard(products[i]);
      gridInner.append(product.elem); 
    }
  } 

  updateFilter(filters) {
    
    let key = Object.keys(filters);
    let value = filters[key];

    if (!(key in this.filters)) {this.filters[key] = value;} 
    else {delete this.filters[key];}

    let gridInner = this.elem.querySelector('.products-grid__inner');
    gridInner.innerHTML = '';

    let sortedProducts = this.products;
    
    if (('noNuts' in this.filters) && (this.filters['noNuts'] == true)) {
      sortedProducts = sortedProducts.filter((item)=>{
        return (!('nuts' in item) && !(item['nuts'] == true)); 
      });}

    if (('vegeterianOnly' in this.filters) && (this.filters['vegeterianOnly'] == true)) {
      sortedProducts = sortedProducts.filter((item)=>{
        return (('vegeterian' in item) && (item['vegeterian'] == true)); 
      });}

    if (('maxSpiciness' in this.filters)) {
      sortedProducts = sortedProducts.filter((item)=>{
        return (('spiciness' in item) && (item['spiciness'] <= this.filters['maxSpiciness'])); 
      });}
    
    if (('category' in this.filters)) {
      sortedProducts = sortedProducts.filter((item)=>{
        return (('category' in item) && (item['category'] == this.filters['category'])); 
      });}

    this.render(sortedProducts);  
  }
}
