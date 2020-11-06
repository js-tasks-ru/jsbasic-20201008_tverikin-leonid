function initCarousel() {
  
  let carousel = document.querySelector('.carousel__inner');
  let rightButton = document.querySelector('.carousel__arrow_right');
  let leftButton = document.querySelector('.carousel__arrow_left');
  let slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  let position = 0;

  leftButton.style.display = 'none';

  rightButton.addEventListener('click', function(){

    position += slideWidth;
    carousel.style.transform = `translateX(-${position}px)`;
  
    if (position >= slideWidth*3) rightButton.style.display = 'none';
    if (position > 0) leftButton.style.display = '';
  })

  leftButton.addEventListener('click', function(){

    position -= slideWidth;
    carousel.style.transform = `translateX(-${position}px)`;
    
    if (position <= slideWidth*3) rightButton.style.display = '';
    if (position == 0) leftButton.style.display = 'none';
  })

}
