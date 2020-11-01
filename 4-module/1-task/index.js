/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {

    let result = document.createElement('ul'); 
    
    for (let i=0 ; i < friends.length; i++) {
      result.insertAdjacentHTML('beforeend', `<li>${friends[i].firstName} ${friends[i].lastName}` );
    };
    
    return result;

  }
