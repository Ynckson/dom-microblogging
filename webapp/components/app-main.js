import { fetchPosts, createPost } from '../api/api.js';
import './post-list.js';
import './post-item.js';
import './post-form.js';

class AppMain extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  async connectedCallback() {
    this.posts = await fetchPosts();
    this.updatePostList();
  }

  updatePostList() {
    const postList = this.shadowRoot.querySelector('post-list');
    postList.posts = this.posts;
  }

  async handlePostCreate(event) {
    const newPost = await createPost(event.detail);
    this.posts.push(newPost);
    this.updatePostList();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <div class="p-4">
        <post-form></post-form>
        <post-list></post-list>
      </div>
    `;

    this.shadowRoot.querySelector('post-form').addEventListener('post-create', (e) => this.handlePostCreate(e));
  }
}

customElements.define('app-main', AppMain);
