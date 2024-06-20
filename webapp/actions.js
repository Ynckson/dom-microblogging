import { showPostsList } from './screens/feedScreen.js';
import { showUserProfile } from './screens/userFeedScreen.js';

const app = document.getElementById('app');

export function navigateTo(screen, params = {}) {
    app.innerHTML = '';
    switch(screen) {
        case 'postsList':
            showPostsList(app);
            break;
        case 'userProfile':
            showUserProfile(app, params.userId);
            break;
    }
}
