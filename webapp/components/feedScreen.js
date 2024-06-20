import { fetchPosts, fetchUser } from '../api.js';
import { navigateTo } from '../actions.js';

async function getUserName(userId) {
    const user = await fetchUser(userId);
    return user.name;
}

export async function showPostsList(container) {
    try {
        const posts = await fetchPosts();

        // Fetch user names for each post
        const postsWithUserNames = await Promise.all(posts.map(async post => {
            const userName = await getUserName(post.user_id);
            return { ...post, userName };
        }));

        const postsHtml = postsWithUserNames.map(post => `
            <div class="p-4 bg-neutral-100 border border-black shadow-md rounded mb-4 cursor-pointer" onclick="navigateTo('userProfile', { userId: ${post.user_id} })">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold text-lg text-black-500">
                        ${post.userName}
                    </span>
                    <span class="text-sm text-gray-500">${new Date(post.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'long' })}</span>
                </div>
                <p>${post.body}</p>
            </div>
        `).join('');
        
        container.innerHTML = `
            <h1 class="text-2xl font-bold mb-4">Feed</h1>
            ${postsHtml}
        `;
    } catch (error) {
        console.error('Error fetching posts:', error);
        container.innerHTML = `<p class="text-red-500">Failed to load posts.</p>`;
    }
}
