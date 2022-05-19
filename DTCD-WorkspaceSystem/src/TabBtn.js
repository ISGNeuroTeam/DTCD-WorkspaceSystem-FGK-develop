import './styles/TabBtn.scss';
import TabBtnHtml from './templates/TabBtn.html';

const STATUS_EDIT = 'edit';
const STATUS_ACTIVE = 'active';

class TabBtn {
  #htmlElement;
  #inputFieldName;
  #tabNameHtml;
  #btnEdit;
  #btnCheck;
  #btnDelete;
  #name;
  #btnLayer
  
  constructor(options) {
    const {
      name = 'Без названия',
    } = options instanceof Object ? options : {};

    this.#htmlElement = document.createElement('div');
    this.#htmlElement.classList.add('TabBtn');
    this.#htmlElement.innerHTML = TabBtnHtml;

    this.#tabNameHtml = this.#htmlElement.querySelector('.TabName-js');
    this.#inputFieldName = this.#htmlElement.querySelector('.InputField-js');
    this.#inputFieldName.addEventListener('input', this.#handleNameFieldInput);

    this.name = name;

    this.#btnEdit = this.#htmlElement.querySelector('.BtnIcon.type_edit-js');
    this.#btnCheck = this.#htmlElement.querySelector('.BtnIcon.type_check-js');
    this.#btnDelete = this.#htmlElement.querySelector('.BtnIcon.type_delete-js');
    this.#btnLayer = this.#htmlElement.querySelector('.BtnLayer-js');

    this.#btnEdit.addEventListener('click', this.#handleBtnEditClick);
    this.#btnCheck.addEventListener('click', this.#handleBtnCheckClick);
    this.#btnDelete.addEventListener('click', this.#handleBtnDeleteClick);
    this.#btnLayer.addEventListener('click', this.#handleBtnLayerClick);
  }

  get htmlElement() {
    return this.#htmlElement;
  }

  get name () {
    return this.#name;
  }

  set name (newValue) {
    this.#name = newValue;
    this.#tabNameHtml.textContent = newValue;
    this.#tabNameHtml.setAttribute('title', newValue);
  }

  setStatus(status, value = true) {
    switch (status) {
      case STATUS_EDIT:
        if (value) {
          this.#htmlElement.classList.add('status_edit');
          this.#inputFieldName.value = this.name;
        } else {
          this.#htmlElement.classList.remove('status_edit');
        }
        break;

      case STATUS_ACTIVE:
        if (value) {
          this.#htmlElement.classList.add('status_active');
        } else {
          this.#htmlElement.classList.remove('status_active');
        }
        break;
    }
  }

  #handleBtnEditClick = (event) => {
    event.preventDefault();
    this.setStatus('edit');
  }

  #handleBtnCheckClick = (event) => {
    event.preventDefault();
    this.setStatus('edit', false);
  }

  #handleBtnDeleteClick = (event) => {
    event.preventDefault();
    this.#htmlElement.dispatchEvent(new CustomEvent('tab-delete', {
      bubbles: true,
      cancelable: true,
    }));
  }

  #handleBtnLayerClick = (event) => {
    event.preventDefault();
    this.#htmlElement.dispatchEvent(new CustomEvent('tab-choose', {
      bubbles: true,
      cancelable: true,
    }));
  }

  #handleNameFieldInput = (event) => {
    this.name = event.target.value;
  }
}

export default TabBtn;