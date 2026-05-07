<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Life Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <header class="dashboard-header card">
            <div class="theme-toggle">
                <button id="themeBtn" aria-label="Toggle Theme">🌙</button>
            </div>
            <div class="greeting-container">
                <h1 id="greetingText">Good Morning</h1>
                <p id="currentDateText">Wednesday, 6 May 2026</p>
                <h2 id="currentTimeText">00:00:00</h2>
            </div>
            <div class="settings">
                <button id="setNameBtn" title="Change Name">⚙️</button>
            </div>
        </header>

        <main class="dashboard-grid">
            <section class="card focus-timer">
                <h3>Focus Timer</h3>
                <div class="timer-display" id="timerDisplay">25:00</div>
                <div class="timer-controls">
                    <button id="startTimer" class="btn btn-primary">▶️ Start</button>
                    <button id="stopTimer" class="btn btn-secondary">⏸️ Stop</button>
                    <button id="resetTimer" class="btn btn-danger">🔄 Reset</button>
                </div>
            </section>

            <section class="card quick-links">
                <div class="section-header">
                    <h3>Quick Links</h3>
                    <button id="addLinkBtn" class="btn-small">➕ Add</button>
                </div>
                <div id="linksContainer" class="links-grid">
                    </div>
            </section>

            <section class="card todo-section">
                <h3>Daily Tasks</h3>
                <form id="todoForm" class="todo-input-group">
                    <input type="text" id="todoInput" placeholder="Add a new task..." required>
                    <button type="submit" class="btn btn-primary">Add</button>
                </form>
                <ul id="todoList" class="todo-list">
                    </ul>
                <div id="todoEmptyState" class="empty-state">No tasks yet. Add one to get started!</div>
            </section>
        </main>
    </div>

    <script src="js/script.js"></script>
</body>
</html>
