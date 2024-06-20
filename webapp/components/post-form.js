class PostForm extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const title = this.shadowRoot.querySelector('#title').value;
      const content = this.shadowRoot.querySelector('#content').value;
      this.dispatchEvent(new CustomEvent('post-create', {
        detail: { title, content },
        bubbles: true,
        composed: true,
      }));
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <form class="mb-4">
          <input type="text" id="title" placeholder="Title" class="border p-2 mb-2 w-full" required />
          <textarea id="content" placeholder="Content" class="border p-2 mb-2 w-full" required></textarea>
          <button type="submit" class="bg-blue-500 text-white px-4 py-2">Post</button>
        </form>
      `;
  
      this.shadowRoot.querySelector('form').addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  
  customElements.define('post-form', PostForm);
  