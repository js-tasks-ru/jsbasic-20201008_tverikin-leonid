/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let arr = [];
  let str = '';
  for (let i = 0; i < users.length; i++) {
    if (users[i].age <= age) {
      str = `${users[i].name}, ${users[i].balance}`; 
      arr.push(str);
      arr.push(`\n`);  
    }  
  }
  arr.length -= 1;
  return arr.join('');
}