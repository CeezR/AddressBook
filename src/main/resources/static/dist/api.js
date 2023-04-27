"use strict";
getContacts();
function displayError(error) {
    errorAlert(error);
}
function handleFetch(url, options) {
    return fetch(url, options)
        .then((response) => {
        checkForErrors(response);
        return getResponseData(response);
    })
        .catch((error) => {
        displayError(error);
    });
}
function checkForErrors(response) {
    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw new Error("Unauthorized. Please check your credentials.");
            case 403:
                throw new Error("Forbidden. You don't have permission to access this resource.");
            case 404:
                throw new Error("Not found. The requested resource could not be found.");
            default:
                throw new Error(`Network response was not ok: ${response.status}`);
        }
    }
}
function getResponseData(response) {
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    }
    return response.text();
}
function getContacts() {
    handleFetch("/api/contacts")
        .then((data) => {
        insertContacts(data);
    });
}
function createContact(contact) {
    return handleFetch("/api/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    }).then((data) => {
        getContacts();
    });
}
function deleteContact(id) {
    return handleFetch("/api/contacts/" + id, {
        method: "DELETE",
    }).then((data) => {
        getContacts();
    });
}
function saveContact(button) {
    var _a, _b;
    const addressItem = button.closest(".address-item");
    const id = (_b = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.id;
    if (addressItem === null || id === null || id === undefined)
        return;
    const nameInput = addressItem.querySelectorAll(".address-info input")[0];
    const emailInput = addressItem.querySelectorAll(".address-info input")[1];
    const name = nameInput.value;
    const email = emailInput.value;
    const contact = {
        id: id,
        name: name,
        email: email,
    };
    handleFetch("/api/contacts/" + contact.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
    }).then(() => {
        getContacts();
    });
}
function searchContactsById(id) {
    return handleFetch("api/contacts/search/id/" + id).then((data) => {
        if (data != undefined) {
            insertContact(data);
        }
    });
}
function searchContactsByName(name) {
    return handleFetch("api/contacts/search/name/" + name).then((data) => {
        insertContacts(data);
    });
}
function searchContactsByEmail(email) {
    return handleFetch("api/contacts/search/email/" + email).then((data) => {
        insertContacts(data);
    });
}
