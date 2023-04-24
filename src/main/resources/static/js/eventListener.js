document.getElementById("contactForm").addEventListener("submit", handleSubmit);
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-button')) {
    deleteContact(event.target.parentElement.parentElement.id)
      .catch((error) => console.error(error));
  } if (event.target.classList.contains('edit-button')) {
      editContact(event.target);
      return;
  } if (event.target.classList.contains('save-button')) {
      saveContact(event.target);
  } if(event.target.classList.contains('showId-button')) {
      showId(event.target);
      return;
  } if(event.target.classList.contains('copyId-button')) {
      copyId(event.target);
  } else {
      activeSaveButton = null;
  }
});
document.querySelector('.toggle-button').addEventListener('click', function() {
  toggleActiveClass(this);
  toggleActiveClass(document.querySelector('#searchForm'));
});
document.querySelector('.toggle-button-sidebar').addEventListener('click', function() {
  toggleActiveClass(this);
  toggleActiveClass(document.querySelector('#contactForm'));
});
document.getElementById("searchForm").addEventListener("submit", handleSearch);
searchInputFields.forEach((input) => {
  input.addEventListener("input", function() {
    clearSearchFields(this);
  });
});