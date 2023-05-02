"use strict";

const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
  ApiConnector.logout(response => {
    if(response.success) {
      location.reload();
    } 
  });
};

ApiConnector.current(response => {
  if(response.success) {
    ProfileWidget.showProfile(response.data);
  } 
});

const currentRatesBoard = new RatesBoard();

function setCurrentRates() { // Отображение курса валют
  ApiConnector.getStocks(response => {
    if(response.success) {
      currentRatesBoard.clearTable();
      currentRatesBoard.fillTable(response.data);
    } 
  });
};

setCurrentRates();

setInterval(() => {
  setCurrentRates();
}, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => { // Пополнение баланса
  ApiConnector.addMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Ваш баланс успешно пополнен');
    } else {
      moneyManager.setMessage(response.success, 'Ошибка пополнения баланса: не указана сумма или валюта');
    };
  });
};

moneyManager.conversionMoneyCallback = (data) => { // Конвертирование валюты
  ApiConnector.convertMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Ваш баланс успешно пополнен');
    } else {
      moneyManager.setMessage(response.success, 'Ошибка: укажите сумму и валюту');
    };
  });
};

moneyManager.sendMoneyCallback = (data) => { // Перевод валюты
  ApiConnector.transferMoney(data, response => {
    if(response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Перевод выполнен успешно');
    } else {
      moneyManager.setMessage(response.success, 'Ошибка: укажите получателя, сумму и валюту перевода');
    };
  });
};

const favoritesList = new FavoritesWidget();

ApiConnector.getFavorites(response => { // Получение начального списка избранного
  if(response.success) {
    favoritesList.clearTable();
    favoritesList.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } 
});

favoritesList.addUserCallback = (data) => { // Добавление пользователя в список избранных
  ApiConnector.addUserToFavorites(data, response => { 
    if(response.success) {
      favoritesList.clearTable();
      favoritesList.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesList.setMessage(response.success, 'Пользователь успешно добавлен в "Избранное"');
    } else {
      favoritesList.setMessage(response.success, 'Ошибка: укажите ID и имя пользователя');
    };
  });
};

favoritesList.removeUserCallback = (data) => { // Удаление пользователя из списка избранных
  ApiConnector.removeUserFromFavorites(data, response => { 
    if(response.success) {
      favoritesList.clearTable();
      favoritesList.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesList.setMessage(response.success, 'Пользователь удален из "Избранного"');
    } else {
      favoritesList.setMessage(response.success, 'Ошибка: укажите ID и имя пользователя');
    };
  });
};