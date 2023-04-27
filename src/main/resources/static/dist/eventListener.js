"use strict";
var _a, _b, _c, _d;
(_a = document.getElementById("contactForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", handleSubmit);
document.addEventListener("click", (event) => {
    var _a, _b;
    const target = event.target;
    if (target === null || target === void 0 ? void 0 : target.classList.contains("delete-button")) {
        deleteContact(((_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.id) || "").catch((error) => console.error(error));
    }
    else if (target.classList.contains("edit-button")) {
        editContact(target);
    }
    else if (target.classList.contains("save-button")) {
        saveContact(target);
    }
    else if (target.classList.contains("showId-button")) {
        showId(target);
    }
    else if (target.classList.contains("copyId-button")) {
        copyId(target);
    }
    else {
        activeSaveButton = null;
    }
});
(_b = document.querySelector(".toggle-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    toggleActiveClass(this);
    toggleActiveClass(document.querySelector("#searchForm"));
});
(_c = document.querySelector(".toggle-button-sidebar")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    toggleActiveClass(this);
    toggleActiveClass(document.querySelector("#contactForm"));
});
(_d = document.getElementById("searchForm")) === null || _d === void 0 ? void 0 : _d.addEventListener("submit", handleSearch);
searchInputFields.forEach((input) => {
    input === null || input === void 0 ? void 0 : input.addEventListener("input", function () {
        clearSearchFields(this);
    });
});
