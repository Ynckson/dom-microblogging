// webapp/main.js
import { navigateTo } from './actions.js';

window.navigateTo = navigateTo;

document.getElementById('feedButton').addEventListener('click', () => {
    navigateTo('postsList');
});

navigateTo('postsList');
