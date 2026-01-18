let allBooks = [];

async function loadInamData() {
    try {
        // Cache பிரச்சனையைத் தவிர்க்க
        const response = await fetch('https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json?v=' + Date.now());
        const data = await response.json();
        allBooks = data.books;

        // Year Filter
        const years = [...new Set(allBooks.map(b => b.year))].sort().reverse();
        const yFilter = document.getElementById('yearFilter');
        years.forEach(yr => {
            const opt = document.createElement('option');
            opt.value = yr; opt.textContent = yr;
            yFilter.appendChild(opt);
        });

        renderTable(allBooks);
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('booksTable').classList.remove('hidden');

    } catch (err) {
        console.error("Data fetch error:", err);
    }
}

function renderTable(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    data.forEach(book => {
        const row = `<tr>
            <td>${book.sr_no}</td>
            <td style="font-weight:600; color:var(--primary);">${book.book_title}</td>
            <td>${book.author_editor}</td>
            <td>${book.isbn_number || '-'}</td>
            <td>${book.year}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

// Search and Filter logic
function applyFilters() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const year = document.getElementById('yearFilter').value;
    
    const filtered = allBooks.filter(b => 
        (b.book_title.toLowerCase().includes(term) || b.author_editor.toLowerCase().includes(term)) &&
        (year === 'all' || b.year === year)
    );
    renderTable(filtered);
}

document.getElementById('searchInput').addEventListener('input', applyFilters);
document.getElementById('yearFilter').addEventListener('change', applyFilters);
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearFilter').value = 'all';
    renderTable(allBooks);
});

loadInamData();
