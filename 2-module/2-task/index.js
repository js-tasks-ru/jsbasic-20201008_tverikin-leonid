/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  let arr = Object.keys(obj);
  return arr.length <= 0; 
}
