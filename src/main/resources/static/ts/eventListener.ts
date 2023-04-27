document.getElementById("contactForm")?.addEventListener("submit", handleSubmit);

document.addEventListener("click", (event: Event): void => {
  const target = event.target as HTMLElement;

  if (target?.classList.contains("delete-button")) {
    deleteContact(target.parentElement?.parentElement?.id || "").catch((error) =>
      console.error(error)
    );
  } else if (target.classList.contains("edit-button")) {
    editContact(target);
  } else if (target.classList.contains("save-button")) {
    saveContact(target as HTMLButtonElement);
  } else if (target.classList.contains("showId-button")) {
    showId(target);
  } else if (target.classList.contains("copyId-button")) {
    copyId(target);
  } else {
    activeSaveButton = null;
  }
});

document.querySelector(".toggle-button")?.addEventListener("click", function (this: HTMLElement) {
  toggleActiveClass(this);
  toggleActiveClass(document.querySelector("#searchForm") as HTMLElement);
});
document.querySelector(".toggle-button-sidebar")?.addEventListener("click", function (this: HTMLElement) {
  toggleActiveClass(this);
  toggleActiveClass(document.querySelector("#contactForm") as HTMLElement);
});
document.getElementById("searchForm")?.addEventListener("submit", handleSearch);

searchInputFields.forEach((input) => {
  input?.addEventListener("input", function(this : HTMLInputElement) {
    clearSearchFields(this);
  });
});