const newUserBtn = document.querySelector(".new-user__submit");

newUserBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const newUserName = document.querySelector(".new-user__name"),
    newUserMoney = document.querySelector(".new-user__money");

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
  currentUser = new User(name, money);
}
