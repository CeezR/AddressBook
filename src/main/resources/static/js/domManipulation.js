function insertContacts(contacts) {
  clearContacts();
  contacts.forEach((contact) => {
    insertContact(contact);
  });
}
function insertContact(contact) {
  const addressItem = document.createElement('div');
  addressItem.classList.add('address-item');
  addressItem.id = contact.id;
  container.appendChild(addressItem);

  const addressInfo = document.createElement('div');
  addressInfo.classList.add('address-info');
  addressItem.appendChild(addressInfo);

  const addressButton = document.createElement('div');
  addressButton.classList.add('address-buttons');
  addressItem.appendChild(addressButton);

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = contact.name;
  const nameLength = contact.name.length;
  nameInput.disabled = true;
  nameInput.style.width = nameLength * 10 + 'px';
  addressInfo.appendChild(nameInput);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.value = contact.email;
  const emailLength = contact.email.length;
  emailInput.disabled = true;
  emailInput.style.width = emailLength * 10 + 'px';
  addressInfo.appendChild(emailInput);

  const idInput = document.createElement('input');
  idInput.type = 'string';
  idInput.value = contact.id;
  const idLength = contact.id.length;
  idInput.disabled = true;
  idInput.style.width = idLength * 9 + 'px';
  idInput.classList.add('idInput');
  addressInfo.appendChild(idInput);

  const showCopyId = document.createElement('button');
  showCopyId.classList.add('showId-button');
  showCopyId.classList.add('invertedButton');
  showCopyId.textContent = 'Show ID';
  addressButton.appendChild(showCopyId);

  const editSaveButton = document.createElement('button');
  editSaveButton.classList.add('edit-button');
  editSaveButton.classList.add('invertedButton');
  editSaveButton.textContent = 'Edit';
  addressButton.appendChild(editSaveButton);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.textContent = 'Delete';
  addressButton.appendChild(deleteButton);
}
function handleSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.elements["name"].value.trim();
  const email = form.elements["email"].value.trim();

  if (!name || !email) {
      alert("Please fill in all fields");
      return;
  }

  const contact = {
      id: "",
      name: name,
      email: email,
  };

  // Create a new contact
  createContact(contact)
      .then(() => {
      // Clear form fields
      form.elements["name"].value = '';
      form.elements["email"].value = '';
      })
      .catch((error) => console.error(error));
}
function clearContacts() {
  const container = document.querySelector('.content');
  container.innerHTML = '';
}
function fetchName() {
  return document.querySelector('#name').value;
} 
function fetchEmail() {
  return document.querySelector('#email').value;
}
function editContact(button) {
  button.classList.remove('edit-button');
  button.classList.add('save-button');
  button.textContent = 'Save';
  const addressItem = button.closest('.address-item');
  const nameInput = addressItem.querySelector('input[type="text"]');
  const emailInput = addressItem.querySelector('input[type="email"]');
  nameInput.disabled = false;
  emailInput.disabled = false;
  activeSaveButton = button;
}
function showId(button) {
  const addressItem = button.closest('.address-item');
  const addressInfo = addressItem.querySelector('.address-info');
  const idInput = addressInfo.querySelector('.idInput');
  toggleActiveClass(idInput);
  button.textContent = "Copy ID";
  button.classList.add('copyId-button')
  button.classList.remove('showId-button');
}
function copyId(button) {
  // Get the text field
  const addressItem = button.closest('.address-item');
  const addressInfo = addressItem.querySelector('.address-info');
  const idInput = addressInfo.querySelector('.idInput');
  var copyText = idInput;

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
  resetShowCopyId(button)
}
function resetShowCopyId(button) {
  // 1. Reset ShowCopy-button
  const addressItem = button.closest('.address-item');
  const addressInfo = addressItem.querySelector('.address-info');
  const idInput = addressInfo.querySelector('.idInput');
  toggleActiveClass(idInput);
  button.textContent = "Show ID";
  button.classList.add('showId-button');
  button.classList.remove('copyId-button')

}
function clearFormFields(form) {
  form.elements["name"].value = '';
  form.elements["email"].value = '';
}
function handleSearch(event) {
  event.preventDefault();

  const form = event.target;
  const name = form.elements["searchName"].value.trim();
  const email = form.elements["searchEmail"].value.trim();
  const id = form.elements["searchId"].value.trim();

  // Clear any previous search results
  clearContacts();

  if (name) {
    searchContactsByName(name);
  } else if (email) {
    searchContactsByEmail(email);
  } else if (id) {
    searchContactsById(id);
  } else {
    alert("Please fill in at least one search field");
  }
}
function toggleActiveClass(element) {
  element.classList.toggle('active');
}
function errorAlert(message) {
  // Show the error alert
  var errorAlertContainer = document.getElementById("error-alert");
  errorAlertContainer.style.display = "block";

  // Set the message text
  var errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = message;

  // Add an event listener to the "okay" button to close the alert
  var errorOkay = document.getElementById("error-okay");
  errorOkay.addEventListener("click", function() {
    errorAlertContainer.style.display = "none";
  });
}
function clearSearchFields(currentInput) {
  searchInputFields.forEach(function(input) {
    if(input != document.activeElement) {
      input.value = "";
    }
  });
}