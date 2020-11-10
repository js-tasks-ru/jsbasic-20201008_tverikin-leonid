/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    
    this.elem = document.createElement('table');
    this.elem.innerHTML = `<thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>`;
  
    let tbody = document.createElement('tbody');
     
    for (let i = 0; i < rows.length; i++) {   
  
      let tr = document.createElement('tr'); 
   
      for (let key in rows[i]) {
        let td = document.createElement('td');
        td.innerHTML = rows[i][key];
        tr.append(td);
      };
    
     let td = document.createElement('td');
     td.innerHTML = `<button onclick ="this.closest('tr').remove()">X</button>`;
     tr.append(td);
     tbody.append(tr); 
    }    
   
    this.elem.append(tbody); 
  }
  
};
