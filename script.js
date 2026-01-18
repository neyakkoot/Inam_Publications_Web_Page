let allBooks = [];

async function startApp() {
    const tbody = document.getElementById('tableBody');
    const table = document.getElementById('booksTable');
    const loading = document.getElementById('loading');

    try {
        // Cache பிரச்சனையைத் தவிர்க்க Timestamp சேர்க்கப்பட்டுள்ளது
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

        renderData(allBooks);
        loading.style.display = 'none';
        table.style.display = 'table';

    } catch (err) {
        console.error("Error:", err);
        loading.innerHTML = "<p style='color:red'>தகவல்களை ஏற்ற முடியவில்லை!</p>";
    }
}

function renderData(data) {
    const tbody = document.getElementById('tableBody');
    tbody.innerHTML = '';
    
    if (data.length === 0) {
        document.getElementById('no-data').style.display = 'block';
        document.getElementById('booksTable').style.display = 'none';
        return;
    }
    
    document.getElementById('no-data').style.display = 'none';
    document.getElementById('booksTable').style.display = 'table';

    data.forEach(book => {
        const row = `<tr>
            <td>${book.sr_no}</td>
            <td style="font-weight:600; color:#1a237e;">${book.book_title}</td>
            <td>${book.author_editor}</td>
            <td>${book.isbn_number || '-'}</td>
            <td>${book.year}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

// Search & Filter
document.getElementById('searchInput').addEventListener('input', () => {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const year = document.getElementById('yearFilter').value;
    const filtered = allBooks.filter(b => 
        (b.book_title.toLowerCase().includes(term) || b.author_editor.toLowerCase().includes(term)) &&
        (year === 'all' || b.year === year)
    );
    renderData(filtered);
});

document.getElementById('yearFilter').addEventListener('change', () => {
    document.getElementById('searchInput').dispatchEvent(new Event('input'));
});

startApp();
