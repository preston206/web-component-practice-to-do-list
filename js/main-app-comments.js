class MainApp extends HTMLElement {
  constructor() {
    // Always call super() first in the constructor to properly initialize the parent class.
    super()

    // Attach a shadow DOM to the custom element.
    this.attachShadow({ mode: 'open' })
  }

  _addEventListeners() {
    
  }

  // The connectedCallback() method is called when the custom element is
  // inserted into the DOM. This is the perfect place for initial rendering
  // and attaching event listeners.
  connectedCallback() {
    this.shadowRoot.innerHTML = `<h1>Hello from Main App</h1>`
  }
}

// Define the custom element, linking the HTML tag "main-app" to our MainApp class.
// The name must contain a hyphen to be a valid custom element.
customElements.define("main-app", MainApp)