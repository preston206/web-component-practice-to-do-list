class MainApp extends HTMLElement {
  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
  }

  _createTask(task) {
    const todoTask = document.createElement("todo-task")
    todoTask.setAttribute("task", task)

    return todoTask
  }

  _addEventListeners() {
    const form = this.shadowRoot.querySelector("form")
    const input = this.shadowRoot.querySelector("input")
    const todoList = this.shadowRoot.querySelector("ul")

    form.addEventListener("submit", event => {
      event.preventDefault()

      const task = input.value.trim()

      if (!task) return

      console.log('TASK', task)

      const todoTask = this._createTask(task)
      todoList.appendChild(todoTask)

      input.value = ""
    })

    todoList.addEventListener("remove-task", event => {
      console.log('---REM TASK EVENT TARGET', event.target)
      event.target.remove()
    })

    // todoList.addEventListener("click", event => {
    //   const target = event.target
    //   if (target.classList.contains("remove-btn")) {
    //     const listItem = target.closest("li")
    //     listItem.remove()
    //   }
    // })

    // todoList.addEventListener("change", event => {
    //   const target = event.target
    //   if (target.type === "checkbox") {
    //     const listItem = target.closest("li")
    //     listItem.classList.toggle("completed")
    //   }
    // })
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          max-width: 400px;
          margin: 2rem auto;
          font-family: sans-serif;
          border: 1px solid #ddd;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2c3e50;
          text-align: center;
          margin-top: 0;
        }
        form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        input[type="text"] {
          flex-grow: 1;
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        button {
          padding: 0.5rem 1rem;
          border: none;
          background-color: #3498db;
          color: white;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #2980b9;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
      </style>

      <div>
        <h1>My To-Do List</h1>

        <form>
          <input type="text" placeholder="Add a new task..." />
          <button type="submit">Add</button>
        </form>

        <ul id="todo_list">
          <!-- To-do items will be added here -->
        </ul>
      </div>
    `

    this._addEventListeners()
  }
}

customElements.define("main-app", MainApp)