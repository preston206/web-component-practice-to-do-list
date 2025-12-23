class TodoTask extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: "open"})
  }

  _addEventListeners() {
    const listItem = this.shadowRoot.querySelector('li')
    const completeCheckbox = this.shadowRoot.querySelector("input")
    const removeBtn = this.shadowRoot.querySelector("button")

    completeCheckbox.addEventListener("change", () => {
      listItem.classList.toggle("completed")
    })

    removeBtn.addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent('remove-task', { bubbles: true, composed: true }))
    })
  }

  get taskText() {
    return this.getAttribute("task")
  }

  set taskText(value) {
    this.setAttribute("task", value)
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        li {
          background-color: #f9f9f9;
          border: 1px solid #eee;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        span {
          flex-grow: 1;
        }
        .completed {
          text-decoration: line-through;
          color: #95a5a6;
        }
        .remove-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          margin-left: 1rem;
        }
        .remove-btn:hover {
          background-color: #c0392b;
        }
        input[type="checkbox"] {
          margin-right: 0.5rem;
        }
      </style>
      <li>
        <input type="checkbox" />
        <span>${this.taskText}</span>
        <button type="button" class="remove-btn">Remove</button>
      </li>
    `

    this._addEventListeners()
  }
}

customElements.define("todo-task", TodoTask)