"use strict";

const user = new UserForm();

user.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if(response.success) {
      location.reload();
    } else {
      user.setLoginErrorMessage('Авторизоваться не удалось: неправильный логин или пароль');
    }
  });
}

user.registerFormCallback = data => {
  ApiConnector.register(data, response => {
    if(response.success) {
      location.reload();
    } else {
      user.setRegisterErrorMessage('Зарегистрироваться не удалось');
    }
  });
}