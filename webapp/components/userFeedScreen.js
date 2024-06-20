import { fetchUser, fetchUserPosts, createPost } from '../api.js';

export async function showUserProfile(container, userId) {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(userId);

    const postsHtml = posts.map(post => `
        <div class="p-4 bg-neutral-100 border border-gray-300 shadow-md rounded mb-4">
            <div class="flex justify-between items-center mb-2">
                <span class="font-bold text-lg text-black-500 cursor-pointer">
                    ${user.name}
                </span>
                <span class="text-sm text-gray-500">${new Date(post.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}</span>
            </div>
            <p>${post.body}</p>
        </div>
    `).join('');

    container.innerHTML = `
        <h1 class="text-2xl font-bold mb-4">${user.name}'s Profile</h1>
        <form id="createPostForm" class="bg-neutral-100 p-4 shadow-md rounded mb-4">
            <textarea id="body" placeholder="What is happening?!" class="bg-neutral-100 block w-full mb-2 p-2 rounded resize-none"></textarea>
            <div class="text-right">
                <button type="submit" class="bg-black text-white px-4 py-2 rounded">Post</button>
            </div>
        </form>
        <h2 class="text-xl font-bold mb-4">Recent Posts</h2>
        ${postsHtml}
    `;

    const form = document.getElementById('createPostForm');
    form.onsubmit = async (event) => {
        event.preventDefault();
        const body = form.body.value;
        try {
            await createPost(userId, body);
            showUserProfile(container, userId); // Refresh the user profile to show the new post
        } catch (error) {
            console.error('Error creating post:', error);
            // Optionally display an error message to the user
        }
    };
}
