// --- State Management ---
let tasks = JSON.parse(localStorage.getItem('dashboardTasks')) || [];
let links = JSON.parse(localStorage.getItem('dashboardLinks')) || [
    { name: 'Google', url: 'https://google.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'Gmail', url: 'https://mail.google.com' },
    { name: 'GitHub', url: 'https://github.com' }
];
let userName = localStorage.getItem('dashboardUser') || 'Friend';
let currentTheme = localStorage.getItem('dashboardTheme') || 'light';

// --- Selectors ---
const themeBtn = document.getElementById('themeBtn');
const greetingText = document.getElementById('greetingText');
const clockText = document.getElementById('currentTimeText');
const dateText = document.getElementById('currentDateText');
const setNameBtn = document.getElementById('setNameBtn');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateClock();
    setInterval(updateClock, 1000);
    renderTasks();
    renderLinks();
    initTimer();
});

// --- Theme Logic (Challenge 1) ---
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeBtn.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('dashboardTheme', currentTheme);
    initTheme();
});

// --- Clock & Greeting (Challenge 2) ---
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    
    // Clock
    clockText.textContent = now.toLocaleTimeString('en-GB');
    
    // Date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateText.textContent = now.toLocaleDateString('en-GB', options);

    // Greeting
    let greeting = "Good Evening";
    if (hours >= 5 && hours < 12) greeting = "Good Morning";
    else if (hours >= 12 && hours < 18) greeting = "Good Afternoon";
    
    greetingText.textContent = `${greeting}, ${userName}`;
}

setNameBtn.addEventListener('click', () => {
    const newName = prompt("Enter your name:", userName);
    if (newName) {
        userName = newName;
        localStorage.setItem('dashboardUser', userName);
        updateClock();
    }
});

// --- Focus Timer ---
let timerInterval;
let timeLeft = 25 * 60;

function initTimer() {
    const display = document.getElementById('timerDisplay');
    const startBtn = document.getElementById('startTimer');
    const stopBtn = document.getElementById('stopTimer');
    const resetBtn = document.getElementById('resetTimer');

    startBtn.addEventListener('click', () => {
        if (timerInterval) return;
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Time is up! Take a break.");
            }
        }, 1000);
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = 25 * 60;
        updateTimerDisplay();
    });

    function updateTimerDisplay() {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

// --- To-Do List (Challenge 3: Prevent Duplicates) ---
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const emptyState = document.getElementById('todoEmptyState');

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = todoInput.value.trim();
    
    if (tasks.some(t => t.text.toLowerCase() === taskText.toLowerCase())) {
        alert("Task already exists!");
        return;
    }

    const newTask = { id: Date.now(), text: taskText, completed: false };
    tasks.push(newTask);
    saveTasks();
    todoInput.value = '';
    renderTasks();
});

function renderTasks() {
    todoList.innerHTML = '';
    emptyState.style.display = tasks.length ? 'none' : 'block';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'done' : ''}`;
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
            <span>${task.text}</span>
            <button class="btn-small" onclick="editTask(${task.id})">✏️</button>
            <button class="btn-small" style="background:var(--danger-color)" onclick="deleteTask(${task.id})">🗑️</button>
        `;
        todoList.appendChild(li);
    });
}

window.toggleTask = (id) => {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveTasks();
    renderTasks();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
};

window.editTask = (id) => {
    const task = tasks.find(t => t.id === id);
    const newText = prompt("Edit task:", task.text);
    if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
    }
};

function saveTasks() {
    localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
}

// --- Quick Links ---
const linksContainer = document.getElementById('linksContainer');
const addLinkBtn = document.getElementById('addLinkBtn');

function renderLinks() {
    linksContainer.innerHTML = '';
    links.forEach((link, index) => {
        const a = document.createElement('div');
        a.className = 'link-card';
        a.innerHTML = `
            <button class="del-link" onclick="deleteLink(${index})">❌</button>
            <a href="${link.url}" target="_blank" rel="noopener">${link.name}</a>
        `;
        linksContainer.appendChild(a);
    });
}

addLinkBtn.addEventListener('click', () => {
    const name = prompt("Link Name (e.g. Netflix):");
    const url = prompt("URL (e.g. https://netflix.com):");
    if (name && url) {
        links.push({ name, url });
        localStorage.setItem('dashboardLinks', JSON.stringify(links));
        renderLinks();
    }
});

window.deleteLink = (index) => {
    links.splice(index, 1);
    localStorage.setItem('dashboardLinks', JSON.stringify(links));
    renderLinks();
};
