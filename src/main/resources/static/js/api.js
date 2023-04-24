getContacts();

function displayError(error) {
  errorAlert(error)
}
function handleFetch(url, options = {}) {
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
  if(!response.ok) {
    switch(response.status) {
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
  if(contentType && contentType.includes("application/json")) {
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
  const addressItem = button.closest(".address-item");
  const name = addressItem.querySelectorAll(".address-info input")[0].value;
  const email = addressItem.querySelectorAll(".address-info input")[1].value;

  const contact = {
    id: button.parentElement.parentElement.id,
    name: name,
    email: email,
  };

  return handleFetch("/api/contacts/" + contact.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact),
  }).then((date) => {
    getContacts();
  }); 
}
function searchContactsById(id) {
  return handleFetch("api/contacts/search/id/" + id, ).then((data) => {
    if(data != undefined) {
      insertContact(data)
    }
  });
}
function searchContactsByName(name) {
  return handleFetch("api/contacts/search/name/" + name, ).then((data) => {
    insertContacts(data)
  });
}
function searchContactsByEmail(email) {
  return handleFetch("api/contacts/search/email/" + email, ).then((data) => {
    insertContacts(data)
  });
}