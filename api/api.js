const API_URL = 'http://localhost:3000';

export async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts`);
  return response.json();
}

export async function createPost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  return response.json();
}
