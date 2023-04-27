function insertContacts(contacts: Contact[]): void {
    clearContacts();
    contacts.forEach((contact) => {
        insertContact(contact);
    });
}
  
function insertContact(contact: Contact): void {
    const addressItem = document.createElement("div");
    addressItem.classList.add("address-item");
    addressItem.id = contact.id;
    container?.appendChild(addressItem);

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
function handleSubmit(event: Event) {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const nameInput : HTMLInputElement | null = form.querySelector("input[name='name']");
    const emailInput : HTMLInputElement | null = form.querySelector("input[name='email']");
  
    if (!nameInput || !emailInput) {  
      alert("Please fill in all fields");
      return;
    }
  
    const contact: Contact = {
      id: "",
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
    };
  
    // Create a new contact
    createContact(contact)
      .then(() => {
        clearFormFields(form);
      })
      .catch((error) => console.error(error));
  }

function clearContacts(): void {
    const container = document.querySelector(".content");
    if (container) {
        container.innerHTML = "";
    }
}

function editContact(button: HTMLElement): void {
    button.classList.remove("edit-button");
    button.classList.add("save-button");
    button.textContent = "Save";
    const addressItem = button.closest(".address-item");
    if (addressItem) {
        const nameInput = addressItem.querySelector("input[type='text']") as HTMLInputElement;
        const emailInput = addressItem.querySelector("input[type='email']") as HTMLInputElement;
        nameInput.disabled = false;
        emailInput.disabled = false;
        activeSaveButton = button;
    }
}

function showId(button: HTMLElement): void {
    const addressItem = button.closest(".address-item");
    if (addressItem) {
        const addressInfo = addressItem.querySelector(".address-info");
        const idInput = addressInfo?.querySelector(".idInput") as HTMLInputElement;
        if (idInput) {
        toggleActiveClass(idInput);
        }
        button.textContent = "Copy ID";
        button.classList.add("copyId-button");
        button.classList.remove("showId-button");
    }
}

function copyId(button: HTMLElement): void {
    const addressItem = button.closest(".address-item");
    if (addressItem) {
        const addressInfo = addressItem.querySelector(".address-info");
        const idInput = addressInfo?.querySelector(".idInput") as HTMLInputElement;
        if (idInput) {
        navigator.clipboard.writeText(idInput.value);
        }
        resetShowCopyId(button);
    }
}
function resetShowCopyId(button: HTMLElement): void {
    const addressItem = button.closest(".address-item");
    if(addressItem) {
        const addressInfo = addressItem.querySelector('.address-info') as HTMLDivElement;
        const idInput = addressInfo?.querySelector('.idInput') as HTMLInputElement;
        toggleActiveClass(idInput);
        button.textContent = "Show ID";
        button.classList.add('showId-button');
        button.classList.remove('copyId-button')
    }
}
function clearFormFields(form: HTMLFormElement): void {
  (form.querySelector("input[name='name']") as HTMLInputElement).value = "";
  (form.querySelector("input[name='email']") as HTMLInputElement).value = "";
}
  function handleSearch(event : Event): void {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
    const name = (form.querySelector("input[name='searchName']") as HTMLInputElement).value.trim();
    const email = (form.querySelector("input[name='searchEmail']") as HTMLInputElement).value.trim();
    const id = (form.querySelector("input[name='searchId']") as HTMLInputElement).value.trim();
  
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
  function toggleActiveClass(element : HTMLElement) {
    element.classList.toggle('active');
  }
  function errorAlert(message : Error) {
    // Show the error alert
    var errorAlertContainer : HTMLElement = document.getElementById("error-alert") as HTMLDivElement;
    errorAlertContainer.style.display = "block";
  
    // Set the message text
    var errorMessage : HTMLDivElement= document.getElementById("error-message") as HTMLParagraphElement;
    errorMessage.innerHTML = message.message;
  
    // Add an event listener to the "okay" button to close the alert
    var errorOkay = document.getElementById("error-okay") as HTMLButtonElement;
    errorOkay.addEventListener("click", function() {
      errorAlertContainer.style.display = "none";
    });
  }
  function clearSearchFields(currentInput : HTMLInputElement) {
    searchInputFields.forEach(function(input) {
      if(input != document.activeElement && input != null) {
        input.value = "";
      }
    });
  }