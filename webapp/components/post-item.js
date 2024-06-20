class PostItem extends HTMLElement {
    set post(value) {
      this._post = JSON.parse(value);
      this.render();
    }
  
    get post() {
      return this._post;
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <div class="border p-4 mb-4">
          <h3 class="font-bold">${this.post.title}</h3>
          <p>${this.post.content}</p>
        </div>
      `;
    }
  }
  
  customElements.define('post-item', PostItem);
  