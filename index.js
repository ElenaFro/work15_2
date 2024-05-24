const fs = require('fs');
const path = require('path');
const axios = require('axios');
const http = require('http');

// 1) Используя axios или fetch сделать запрос к одному из моковых API (например, https://jsonplaceholder.typicode.com).
// Полученный JSON записать в файл с помощью модуля fs.
// Сохранить логику задачи в виде функции.

// ;(async ()=> {
//     const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//     fs.writeFile(path.resolve(__dirname, 'users.json'), JSON.stringify(response.data), 'utf-8', (err) =>{
//         if (err) {
//             throw err;
//         }   

//         console.log('Done');
//     });
// })()

// Используя модуль http запустить локальный сервер приложения на порту 3000. 
// Добавить обработчик произвольного маршрута - функцию из п.1.



async function fetchAndWriteData(url, filename) {
  try {
    const res = await axios.get(url);
    fs.writeFile(path.resolve(__dirname, filename), JSON.stringify(res.data), 'utf-8', (err)  => {
      if (err) {
        throw err;
      }
      console.log('Done');
    });
  } catch (error) {
    console.error(error);
  }
}

const server = http.createServer((req, res) => {

  if (req.url === '/users' && req.method.toUpperCase() === 'GET') {
    fetchAndWriteData('https://jsonplaceholder.typicode.com/users', 'users.json');
    res.end('Data written to file users.json');
  } else {
    res.end('Make the right request: localhost:3000/users');
  }
});
server.listen(3000, () => {
  console.log('Server listening on port 3000  at http://localhost:3000/');
  
});
