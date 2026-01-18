let allBooks = [];

async function initInamApp() {
    const table = document.getElementById('booksTable');
    const loader = document.getElementById('loader');
    const totalSpan = document.getElementById('total-books');

    try {
        // Cache பிரச்சனையைத் தவிர்க்க Timestamp
        const response = await fetch('https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json?v=' + Date.now());
        const data = await response.json();
        allBooks = data.books;

        totalSpan.textContent = allBooks.length;
        
        // Year Filter
        const years = [...new Set(allBooks.map(b => b.year))].sort().reverse();
        const yFilter = document.getElementById('yearFilter');
        years.forEach(yr => {
            const opt = document.createElement('option');
            opt.value = yr; opt.textContent = yr;
            yFilter.appendChild(opt);
        });

        renderBooks(allBooks);
        loader.classList.add('hidden');
        table.classList.remove('hidden');

    } catch (err) {
        console.error("Loading Error:", err);
        loader.innerHTML = "<p style='color:red'>தரவுகளைப் பெற முடியவில்லை!</p>";
    }
}

function renderBooks(data) {
    const tbody = document.getElementById('tableBody');
    const noData = document.getElementById('noData');
    const table = document.getElementById('booksTable');
    
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        noData.classList.remove('hidden');
        table.classList.add('hidden');
        return;
    }

    noData.classList.add('hidden');
    table.classList.remove('hidden');

    data.forEach(book => {
        const row = `<tr>
            <td>${book.sr_no}</td>
            <td style="color:var(--primary); font-weight:600;">${book.book_title}</td>
            <td>${book.author_editor}</td>
            <td><small>${book.isbn_number || '-'}</small></td>
            <td><span class="year-badge">${book.year}</span></td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

// Search & Filter Listeners
document.getElementById('searchInput').addEventListener('input', e => {
    const term = e.target.value.toLowerCase();
    const year = document.getElementById('yearFilter').value;
    const filtered = allBooks.filter(b => 
        (b.book_title.toLowerCase().includes(term) || b.author_editor.toLowerCase().includes(term)) &&
        (year === 'all' || b.year === year)
    );
    renderBooks(filtered);
});

document.getElementById('yearFilter').addEventListener('change', () => {
    document.getElementById('searchInput').dispatchEvent(new Event('input'));
});

document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearFilter').value = 'all';
    renderBooks(allBooks);
});

initInamApp();
