import { v4 as uuidv4 } from "https://esm.sh/uuid";

class Contact {
  constructor(name, phone) {
    this.id = uuidv4();
    this.name = name;
    this.phone = phone;
  }
}

class ContactManager {
  constructor() {
    this.contactList = [];
    this.updatedListLength = 0;

    if (
      localStorage.getItem("contacts") &&
      localStorage.getItem("contacts").length > 0
    ) {
      this.contactList = JSON.parse(localStorage.getItem("contacts"));
      this.updatedListLength = this.contactList.length;
      window.onload = () => {
        this.contactList.forEach((contact) => {
          const li = document.createElement("li");
          li.classList.add("list-item");
          li.innerHTML = `
          <div class="contact-list-div">
            <div class="contact-card-header">
              <span class="material-symbols-outlined user-icon">
                account_circle
              </span>

              <div class="desc-col">
                <p class="name">${contact.name}</p>

                <p class="phone">${contact.phone}</p>
              </div>
            </div>
              <button class="delete-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  class="delete-icon"
                  style="color: red; font-size: 40px"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
          </div>
        `;
          const list = document.getElementById("list");
          list.appendChild(li);
        });
      };

      const emptyListText = document.getElementById("empty-list-text");
      emptyListText.classList.add("hidden");
    }
  }

  adicionarContato(contato) {
    this.contactList.push(contato);
    localStorage.setItem("contacts", JSON.stringify(this.contactList));
  }

  removerContato(contato) {
    this.contactList = this.contactList.filter(
      (contact) => contact.id !== contato.id
    );

    this.atualizarLista();
  }

  deletarLista() {
    const contactList = document.getElementById("list");
    contactList.innerHTML = "";
    this.contactList = [];
  }

  atualizarLista() {
    const emptyListText = document.getElementById("empty-list-text");
    if (this.updatedListLength !== this.contactList.length) {
      const list = document.getElementById("list");
      const newContacts = this.contactList.slice(
        this.updatedListLength,
        this.contactList.length
      );
      emptyListText.classList.contains("hidden")
        ? null
        : emptyListText.classList.add("hidden");
      newContacts.forEach((contact) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.innerHTML = `
        <div class="contact-list-div">
            <div class="contact-card-header">
              <span class="material-symbols-outlined user-icon">
                account_circle
              </span>

              <div class="desc-col">
                <p class="name">${contact.name}</p>

                <p class="phone">${contact.phone}</p>
              </div>
<<<<<<< HEAD

              <button class="delete-button" id="delete-button">
=======
            </div>
              <button class="delete-button">
>>>>>>> ed3877375948aee7ec346b03ba6eda85f0b57937
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  class="delete-icon"
                  style="color: red; font-size: 40px"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
          </div>
        `;
        list.appendChild(li);
      });
      this.updatedListLength = this.contactList.length;
    } else {
      return;
    }
  }
}

const friendNameInput = document.getElementById("friend-name");
const friendPhoneInput = document.getElementById("friend-phone");
const addFriendForm = document.getElementById("add-friend-form");
const updateListButton = document.getElementById("update-list");
const deleteListButton = document.getElementById("delete-list");
const contactManager = new ContactManager();

updateListButton.addEventListener("click", () => {
  contactManager.atualizarLista();
});

addFriendForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const contact = new Contact(friendNameInput.value, friendPhoneInput.value);
  friendNameInput.value = "";
  friendPhoneInput.value = "";
  contactManager.adicionarContato(contact);
});

deleteListButton.addEventListener("click", (e) =>
  contactManager.deletarLista()
);
