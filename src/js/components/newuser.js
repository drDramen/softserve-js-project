const newUserBtn = document.querySelector(".new-user__submit");
const newUserName = document.querySelector(".new-user__name");
const newUserMoney = document.querySelector(".new-user__money");

newUserBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (newUserName.value == "" || newUserMoney.value == "") {
    newUserName.value == ""
      ? (newUserName.style.borderColor = "#f00")
      : (newUserName.style.borderColor = "");
    newUserMoney.value == ""
      ? (newUserMoney.style.borderColor = "#f00")
      : (newUserMoney.style.borderColor = "");
    return;
  }
  newUser(newUserName.value, newUserMoney.value);
  closePopup(this.closest(".modal"));
  newUserName.value = "";
  newUserMoney.value = "";
  newUserName.style.borderColor = "";
  newUserMoney.style.borderColor = "";
  setCardCount();
  renderCatalog(loadingQuantity);
});

function newUser(name, money) {
  if (currentUser.name == undefined || currentUser.money == undefined) {
    delete currentUser.id;
    currentUser = serializingUser(currentUser);
    currentUser.name = name;
    currentUser.money = money;
    saveToLS(currentUser);
  }
  currentUser = new User(name, money);
  changeStatusName();
}

function saveToLS(user) {
  window.localStorage.setItem("last session", JSON.stringify(user));
}
