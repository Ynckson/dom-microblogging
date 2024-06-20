import './post-item.js';

class PostList extends HTMLElement {
  set posts(value) {
    this._posts = value;
    this.render();
  }

  get posts() {
    return this._posts;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div>
        ${this.posts.map(post => `<post-item post='${JSON.stringify(post)}'></post-item>`).join('')}
      </div>
    `;
  }
}

customElements.define('post-list', PostList);
