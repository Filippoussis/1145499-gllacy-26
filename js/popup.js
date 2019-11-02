var link = document.querySelector(".letter-link");

var popup = document.querySelector(".modal-letter");
var close = popup.querySelector(".modal-close");

var form = popup.querySelector("form");
var senderName = popup.querySelector("[name=name]");
var senderEmail = popup.querySelector("[name=email]");
var senderText = popup.querySelector("[name=letter-text]");

var isStorageSupport = true;
var storageName = "";
var storageEmail = "";

try {
  storageName = localStorage.getItem("senderName");
  storageEmail = localStorage.getItem("senderEmail");
} catch (err) {
  isStorageSupport = false;
}

link.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.add("modal-show");

  if (storageName) {
    senderName.value = storageName;
    if (storageEmail) {
      senderEmail.value = storageEmail;
    }
    senderText.focus();
  } else {
    senderName.focus();
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  popup.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!senderName.value || !senderEmail.value || !senderText.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("senderName", senderName.value);
      localStorage.setItem("senderEmail", senderEmail.value);
    }
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (popup.classList.contains("modal-show")) {
      popup.classList.remove("modal-show");
      popup.classList.remove("modal-error");
    }
  }
});
