import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {

    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon'); 

    function buttonMaker(className) {
      let button = document.createElement('button');
      button.classList.add('ribbon__arrow', className);
      button.innerHTML = '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
      return button; 
    }

    let leftButton = buttonMaker('ribbon__arrow_left');
    let rightButton = buttonMaker('ribbon__arrow_right');
    rightButton.classList.add('ribbon__arrow_visible');

    let nav = document.createElement('nav');
    nav.classList.add('ribbon__inner');

    for (let i = 0; i < categories.length; i++) {
      let link = document.createElement('a');
      link.href = '#';
      link.classList.add('ribbon__item');
      link.dataset.id = categories[i].id; 
      link.innerHTML = categories[i].name;
      nav.append(link);
    }
     
    this.elem.prepend(leftButton);
    this.elem.append(nav);
    this.elem.append(rightButton);  
    

    rightButton.addEventListener('click', function () { 

      let ribbonInner = document.querySelector('.ribbon__inner');
      let event = new Event('scroll');
      event.preventDefault();
      ribbonInner.addEventListener('scroll', function() {
        
        ribbonInner.scrollBy(350, 0);        
        if (ribbonInner.scrollLeft > 0) {
          rightButton.classList.remove('ribbon__arrow_visible');
          leftButton.classList.add('ribbon__arrow_visible');
        } 
      });

      ribbonInner.dispatchEvent(event); 
    
    });

    leftButton.addEventListener('click', function () { 

      let ribbonInner = document.querySelector('.ribbon__inner');
      let event = new CustomEvent('scroll');
      ribbonInner.addEventListener('scroll', function() {
        
        ribbonInner.scrollBy(-350, 0);
        let scrollWidth = ribbonInner.scrollWidth;
        let scrollLeft = ribbonInner.scrollLeft;
        let clientWidth = ribbonInner.clientWidth;
        let scrollRight = scrollWidth - scrollLeft - clientWidth;

        if (scrollLeft > 0) {
          leftButton.classList.remove('ribbon__arrow_visible');
          rightButton.classList.add('ribbon__arrow_visible');
        }        
      });
      
      ribbonInner.dispatchEvent(event); 
    });

    nav.addEventListener('click', (event) => {
      let target = event.target;
      let targetName = event.target.className;
      
      if (targetName = 'ribbon__item') {
        event.preventDefault();
        
        let active = nav.querySelector('.ribbon__item_active');
        if (active) {active.classList.remove('.ribbon__item_active');}
        
        target.classList.add('.ribbon__item_active');

        let ribbonSelect = new CustomEvent('ribbon-select', { detail: target.dataset.id, bubbles: true });
        this.elem.dispatchEvent(ribbonSelect);
      }
    });
  }
}
