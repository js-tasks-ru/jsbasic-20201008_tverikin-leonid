/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {

    let rows = table.tBodies[0].rows;
  
    for (let i = 0; i < rows.length; i++) {
      
      if (+rows[i].cells[1].textContent < 18) { 
        rows[i].style.textDecoration = 'line-through';
      }
      
      if (rows[i].cells[2].textContent == 'm') { 
        rows[i].classList.add('male');
      } else rows[i].classList.add('female');
      
      if (rows[i].cells[3].hasAttribute('data-available')) {
        
        if (rows[i].cells[3].dataset.available == 'true') {
          rows[i].classList.add('available');
        } else rows[i].classList.add('unavailable');
        
      } else rows[i].hidden = true;
      
    }

}
    
