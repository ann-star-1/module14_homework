const btn = document.querySelector('.btn');
const message = document.querySelector('.message');
const img = document.querySelector('.img');

const myData = localStorage.getItem('myData');
if (myData) {

}


btn.addEventListener('click', () => {
  let page = document.querySelector('.page').value;
  let limite = document.querySelector('.limite').value;

  let checkPage = true;
  let checkLimite = true;
  if (page < 1 || page > 10 || page.match(/[^0-9]/g)) {
    checkPage = false;
  }

  if (limite < 1 || limite > 10 || limite.match(/[^0-9]/g)) {
    checkLimite = false;
  }

  if (checkPage && checkLimite) {
    message.innerText = '';
    let url = 'https://picsum.photos/v2/list?page=' + page + '&limit=' + limite;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
      if (xhr.status != 200) {
        console.log('Статус ответа: ', xhr.status);
      } else {
        let data = JSON.parse(xhr.response);
        let elements;
        data.forEach(item => {
          localStorage.setItem('myData', JSON.stringify(data));
          let element = document.createElement('img');
          element.setAttribute('src', data['file']);
          elements = elements + element;
        })
        img.innerHTML = elements;
      }
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };
      
    xhr.send();
  } else {
    if (!checkPage && !checkLimite) {
      message.innerText = 'Номер страницы и лимит вне диапазона от 1 до 10';
    } else if (!checkPage) {
      message.innerText = 'Номер страницы вне диапазона от 1 до 10';
    } else if (!checkLimite) {
      message.innerText = 'Лимит вне диапазона от 1 до 10';
    }

  }
});


function createImg (arImg) {

}