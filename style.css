:root {
    --primary: #1a237e;
    --accent: #c62828;
    --glass: rgba(255, 255, 255, 0.9);
    --shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

body {
    margin: 0;
    font-family: 'Poppins', 'Noto Sans Tamil', sans-serif;
    background: #eef2f7;
    color: #2c3e50;
    overflow-x: hidden;
}

.glass-bg {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 300px;
    background: linear-gradient(135deg, #1a237e 0%, #3949ab 100%);
    z-index: -1;
    border-radius: 0 0 50% 50% / 20px;
}

.container { max-width: 1100px; margin: 0 auto; padding: 20px; }

/* Logo & Header */
.header-top { display: flex; align-items: center; gap: 20px; padding: 20px 0; color: white; }

.logo-wrapper {
    width: 90px; height: 90px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.8);
    background: white;
    padding: 2px;
    box-shadow: var(--shadow);
}

.brand-logo { width: 100%; height: 100%; border-radius: 50%; object-fit: contain; }

.brand-info h1 { margin: 0; font-size: 2rem; letter-spacing: 1px; }

.disclaimer-card {
    background: var(--glass);
    padding: 25px;
    border-radius: 15px;
    box-shadow: var(--shadow);
    margin-bottom: 20px;
    border-left: 6px solid var(--accent);
}

.archive-btn {
    display: inline-block;
    background: var(--accent);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    margin-top: 15px;
    transition: 0.3s;
}

.archive-btn:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(198,40,40,0.4); }

/* Stats & Controls */
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 25px; }

.stat-card { background: var(--glass); padding: 15px; border-radius: 12px; text-align: center; box-shadow: var(--shadow); }

.stat-val { font-size: 1.5rem; font-weight: 700; color: var(--primary); }

.control-panel { display: flex; gap: 15px; margin-bottom: 20px; flex-wrap: wrap; }

.search-container { flex: 1; position: relative; min-width: 280px; }

.search-container input {
    width: 100%; padding: 14px 14px 14px 45px;
    border: none; border-radius: 10px; box-shadow: var(--shadow); outline: none;
}

.search-container i { position: absolute; left: 15px; top: 18px; color: #7f8c8d; }

/* Table Styling */
.content-card { background: var(--glass); border-radius: 15px; overflow: hidden; box-shadow: var(--shadow); }

table { width: 100%; border-collapse: collapse; }

th { background: #f8f9fa; padding: 18px; text-align: left; color: var(--primary); font-weight: 600; border-bottom: 2px solid #eee; }

td { padding: 16px; border-bottom: 1px solid #f1f1f1; font-size: 0.95rem; }

tr:hover { background: rgba(57, 73, 171, 0.05); }

.hidden { display: none; }

@media (max-width: 768px) {
    .header-top { flex-direction: column; text-align: center; }
    th:nth-child(4), td:nth-child(4) { display: none; } /* மொபைலில் ISBN மறைத்தல் */
}
