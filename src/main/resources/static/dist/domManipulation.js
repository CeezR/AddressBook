"use strict";
function insertContacts(contacts) {
    clearContacts();
    contacts.forEach((contact) => {
        insertContact(contact);
    });
}
function insertContact(contact) {
    const addressItem = document.createElement("div");
    addressItem.classList.add("address-item");
    addressItem.id = contact.id;
    container === null || container === void 0 ? void 0 : container.appendChild(addressItem);
    const addressInfo = document.createElement("div");
    addressInfo.classList.add("address-info");
    addressItem.appendChild(addressInfo);
    const addressButton = document.createElement("div");
    addressButton.classList.add("address-buttons");
    addressItem.appendChild(addressButton);
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = contact.name;
    const nameLength = contact.name.length;
    nameInput.disabled = true;
    nameInput.style.width = nameLength * 10 + "px";
    addressInfo.appendChild(nameInput);
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.value = contact.email;
    const emailLength = contact.email.length;
    emailInput.disabled = true;
    emailInput.style.width = emailLength * 10 + "px";
    addressInfo.appendChild(emailInput);
    const idInput = document.createElement("input");
    idInput.type = "text";
    idInput.value = contact.id;
    const idLength = contact.id.length;
    idInput.disabled = true;
    idInput.style.width = idLength * 9 + "px";
    idInput.classList.add("idInput");
    addressInfo.appendChild(idInput);
    const showCopyId = document.createElement("button");
    showCopyId.classList.add("showId-button");
    showCopyId.classList.add("invertedButton");
    showCopyId.textContent = "Show ID";
    addressButton.appendChild(showCopyId);
    const editSaveButton = document.createElement("button");
    editSaveButton.classList.add("edit-button");
    editSaveButton.classList.add("invertedButton");
    editSaveButton.textContent = "Edit";
    addressButton.appendChild(editSaveButton);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "Delete";
    addressButton.appendChild(deleteButton);
}
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const nameInput = form.querySelector("input[name='name']");
    const emailInput = form.querySelector("input[name='email']");
    if (!nameInput || !emailInput) {
        alert("Please fill in all fields");
        return;
    }
    const contact = {
        id: "",
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
    };
    createContact(contact)
        .then(() => {
        clearFormFields(form);
    })
        .catch((error) => console.error(error));
}
function clearContacts() {
    const container = document.querySelector(".content");
    if (container) {
        container.innerHTML = "";
    }
}
function editContact(button) {
    button.classList.remove("edit-button");
    button.classList.add("save-button");
    button.textContent = "Save";
    const addressItem = button.closest(".address-item");
    if (addressItem) {
        const nameInput = addressItem.querySelector("input[type='text']");
        const emailInput = addressItem.querySelector("input[type='email']");
        nameInput.disabled = false;
        emailInput.disabled = false;
        activeSaveButton = button;
    }
}
function showId(button) {
    const addressItem = button.closest(".address-item");
    if (addressItem) {
        const addressInfo = addressItem.querySelector(".address-info");
        const idInput = addressInfo === null || addressInfo === void 0 ? void 0 : addressInfo.querySelector(".idInput");
        if (idInput) {
            toggleActiveClass(idInput);
        }
        button.textContent = "Copy ID";
        button.classList.add("copyId-button");
        button.classList.remove("showId-button");
    }
}
function copyId(button) {
    const addressItem = button.closest(".address-item");
    if (addressItem) {
        const addressInfo = addressItem.querySelector(".address-info");
        const idInput = addressInfo === null || addressInfo === void 0 ? void 0 : addressInfo.querySelector(".idInput");
        if (idInput) {
            navigator.clipboard.writeText(idInput.value);
        }
        resetShowCopyId(button);
    }
}
function resetShowCopyId(button) {
    const addressItem = button.closest(".address-item");
    if (addressItem) {
        const addressInfo = addressItem.querySelector('.address-info');
        const idInput = addressInfo === null || addressInfo === void 0 ? void 0 : addressInfo.querySelector('.idInput');
        toggleActiveClass(idInput);
        button.textContent = "Show ID";
        button.classList.add('showId-button');
        button.classList.remove('copyId-button');
    }
}
function clearFormFields(form) {
    form.querySelector("input[name='name']").value = "";
    form.querySelector("input[name='email']").value = "";
}
function handleSearch(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector("input[name='searchName']").value.trim();
    const email = form.querySelector("input[name='searchEmail']").value.trim();
    const id = form.querySelector("input[name='searchId']").value.trim();
    clearContacts();
    if (name) {
        searchContactsByName(name);
    }
    else if (email) {
        searchContactsByEmail(email);
    }
    else if (id) {
        searchContactsById(id);
    }
    else {
        alert("Please fill in at least one search field");
    }
}
function toggleActiveClass(element) {
    element.classList.toggle('active');
}
function errorAlert(message) {
    var errorAlertContainer = document.getElementById("error-alert");
    errorAlertContainer.style.display = "block";
    var errorMessage = document.getElementById("error-message");
    errorMessage.innerHTML = message.message;
    var errorOkay = document.getElementById("error-okay");
    errorOkay.addEventListener("click", function () {
        errorAlertContainer.style.display = "none";
    });
}
function clearSearchFields(currentInput) {
    searchInputFields.forEach(function (input) {
        if (input != document.activeElement && input != null) {
            input.value = "";
        }
    });
}
