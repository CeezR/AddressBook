let activeSaveButton: HTMLElement | null;
const container: HTMLDivElement | null = document.querySelector('.content');
const searchInputName : HTMLInputElement | null = document.querySelector('#searchInput-name');
const searchInputEmail : HTMLInputElement | null = document.querySelector('#searchInput-email');
const searchInputId : HTMLInputElement | null = document.querySelector('#searchInput-id');
const searchInputFields: (HTMLInputElement | null)[] = [searchInputName, searchInputEmail, searchInputId]