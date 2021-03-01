let preloader = document.getElementById('preloader');
let name = prompt('Введите имя пользователя:');
let user = `https://api.github.com/users/${name}`;
let date = new Date();

setTimeout(function(){
	preloader.classList.add('none');
}, 2000);

let getDate = new Promise((resolve, reject) => {
	setTimeout(() => date ? resolve(document.body.append(date)) : reject('Ошибка.'), 2000)
});

let getUser = new Promise((resolve, reject) => {
	setTimeout(() => user ? resolve(user) : reject('Ссылка не найдена.'), 2000)
});

Promise.all([getUser, getDate])
	.then(() => fetch(`${user}`))
  .then(res => res.json())
  .then(json => {
  				let bio = document.createElement('p');
          if (json.bio != null) {
            bio.innerHTML = json.bio;
        } else {
            bio.innerHTML = 'Описание пользователя не найдено.';
        }
    document.body.append(bio);
   })
   .catch(err => document.body.append('Информация о пользователе не доступна.'));
