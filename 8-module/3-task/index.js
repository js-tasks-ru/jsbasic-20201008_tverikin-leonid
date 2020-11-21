export default class Cart {
  cartItems = []; // [product: {...}, count: N] 
  //А в тексте задачника: cartItems = [{product: {...}, count: N}]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

