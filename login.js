const form = document.querySelector('form');
const idInput = document.querySelector('#user-id');
const passwordInput = document.querySelector('#user-password');
const loginButton = document.querySelector('#login-button');

const main = document.querySelector('main');
const userName = document.querySelector('#user-name');
const userInfo = document.querySelector('#user-info');
const logoutButton = document.querySelector('#logout-button');

axios.defaults.withCredentials = true;

form.addEventListener('submit', (e) => {
  e.preventDefault();
})

function login() {
  const userId = idInput.value;
  const userPassword = passwordInput.value;

  return axios.post('http://localhost:3000', {userId, userPassword});
}

function logout() {
  return axios.delete('http://localhost:3000');
}

function getUserInfo() {
  return axios.get('http://localhost:3000');
}

function renderUserInfo(user) {
  main.style.display = 'block';
  form.style.display = 'none';
  userName.textContent = user.user_name;
  userInfo.textContent = user.user_info;
}

function renderLoginForm() {
  main.style.display = 'none';
  form.style.display = 'block';
  userName.textContent = '';
  userInfo.textContent = '';
}

loginButton.onclick = () => {
  login()
    .then(() => getUserInfo())
    .then(res => {
      console.log(res.data)
      renderUserInfo(res.data)
    })
}

logoutButton.onclick = () => {
  logout()
    .then(res => {
      console.log(res);
      renderLoginForm();
    })
}