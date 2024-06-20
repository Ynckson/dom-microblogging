const API_URL = 'http://localhost:3000';

export async function fetchPosts() {
    const response = await fetch(`${API_URL}/posts.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export async function fetchUser(userId) {
    const response = await fetch(`${API_URL}/users/${userId}.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export async function fetchUserPosts(userId) {
    const response = await fetch(`${API_URL}/users/${userId}/posts.json`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

export async function createPost(userId, body) {
    const response = await fetch(`${API_URL}/posts.json`, {  // Endpunkt auf .json ändern
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post: { user_id: userId, body: body } })  // Struktur korrigieren
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.error}`);
    }
    return await response.json();
}
