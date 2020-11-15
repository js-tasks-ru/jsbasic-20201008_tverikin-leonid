export default class StepSlider {
  constructor({ steps, value = 0 }) {
    
    this.elem = document.createElement('div');
    this.elem.classList.add('slider');
    this.elem.innerHTML = `
    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value">2</span>
   </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 50%;"></div>
        <!--Шаги слайдера-->
        <div class="slider__steps">
        </div>
      </div>`;
    
    let sliderSteps = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < steps; i++) {
      let span = document.createElement('span');
      sliderSteps.append(span);
    }
    sliderSteps.children[0].classList.add('slider__step-active')

    this.elem.addEventListener('click', (event) => { 

      let pointerPosition = event.clientX - this.elem.getBoundingClientRect().left;
      let pointerOverPosition = pointerPosition / this.elem.offsetWidth;
      let closestPosition = pointerOverPosition * (steps - 1);
      let sliderPosition = Math.round(closestPosition);
      let sliderPositionPerc = sliderPosition / (steps - 1) * 100;
      
      let sliderValue = this.elem.querySelector('.slider__value');
      sliderValue.innerHTML = sliderPosition;
      
      let activeStep = sliderSteps.querySelector('.slider__step-active');
      if (activeStep) {
        activeStep.classList.remove('slider__step-active');
        sliderSteps.children[sliderPosition].classList.add('slider__step-active');
      } else {sliderSteps.children[sliderPosition].classList.add('slider__step-active');}

      let sliderThumb = this.elem.querySelector('.slider__thumb');
      sliderThumb.style.left = `${sliderPositionPerc}%`;   
      
      let sliderProgress = this.elem.querySelector('.slider__progress');
      sliderProgress.style.width = `${sliderPositionPerc}%`;

      let sliderChange = new CustomEvent ('slider-change', {  
        detail: sliderPosition, 
        bubbles: true 
      });

      this.elem.dispatchEvent(sliderChange);
    }); 
  }
}
