/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let arr = str.split(',');
  arr = arr.concat(str.split(' '));
  
  arr = arr.map(item => parseFloat(item))
  .filter(item => !isNaN(item));
  
  let result = {
    'min': Math.min.apply(null, arr),
    'max': Math.max.apply(null, arr),    
  };
  return result;  
}
