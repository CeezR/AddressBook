getContacts();

type Contact = {
    id: string;
    name: string;
    email: string;
};

function displayError(error : Error): void {
  errorAlert(error);
}
function handleFetch(url: string, options?: RequestInit): Promise<any> {
  return fetch(url, options)
    .then((response) => {
      checkForErrors(response);
      return getResponseData(response);
    })
    .catch((error) => {
      displayError(error);
    });
}
function checkForErrors(response : Response): void {
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
function getResponseData(response: Response): Promise<any> {
  const contentType = response.headers.get("content-type");
  if(contentType && contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
}
function getContacts(): void {
  handleFetch("/api/contacts")
  .then((data) => {
    insertContacts(data);
  });
}
function createContact(contact : Contact) : Promise<void> {  
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
function deleteContact(id : String): Promise<void> {
  return handleFetch("/api/contacts/" + id, {
    method: "DELETE",
  }).then((data) => {
    getContacts();
  });
}
  
function saveContact(button: HTMLButtonElement): void {
    const addressItem: HTMLDivElement | null = button.closest(".address-item");
    const id: string | null | undefined = button.parentElement?.parentElement?.id;

    if (addressItem === null || id === null || id === undefined) return;
  
    const nameInput: HTMLInputElement = addressItem.querySelectorAll(".address-info input")[0] as HTMLInputElement;
    const emailInput: HTMLInputElement = addressItem.querySelectorAll(".address-info input")[1] as HTMLInputElement;
    const name: string = nameInput.value;
    const email: string = emailInput.value;
  
    const contact: Contact = {
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
function searchContactsById(id : String): Promise<void> {
  return handleFetch("api/contacts/search/id/" + id, ).then((data) => {
    if(data != undefined) {
      insertContact(data)
    }
  });
}
function searchContactsByName(name : String): Promise<void> {
  return handleFetch("api/contacts/search/name/" + name, ).then((data) => {
    insertContacts(data)
  });
}
function searchContactsByEmail(email : String): Promise<void> {
  return handleFetch("api/contacts/search/email/" + email, ).then((data) => {
    insertContacts(data)
  });
}