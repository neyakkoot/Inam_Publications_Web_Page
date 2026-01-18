const tableBody = document.getElementById('tableBody');
const loader = document.getElementById('loader');
const booksTable = document.getElementById('booksTable');
const totalCount = document.getElementById('total-books');

let allBooks = [];

// தரவுகளைப் பெறுதல்
async function fetchInamBooks() {
    try {
        // Cache-ஐ தவிர்க்க சிறிய timestamp சேர்க்கப்பட்டுள்ளது (வேகமாகத் தரவு மாறும் போது உதவும்)
        const response = await fetch('https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json?' + new Date().getTime());
        const data = await response.json();
        
        allBooks = data.books;
        totalCount.textContent = allBooks.length;
        
        // ஆண்டுகளை வரிசைப்படுத்துதல்
        const years = [...new Set(allBooks.map(b => b.year))].sort().reverse();
        const filter = document.getElementById('yearFilter');
        years.forEach(yr => {
            const opt = document.createElement('option');
            opt.value = yr;
            opt.textContent = yr;
            filter.appendChild(opt);
        });

        renderTable(allBooks);
        loader.classList.add('hidden');
        booksTable.classList.remove('hidden');

    } catch (err) {
        console.error("தரவு பிழை:", err);
        loader.innerHTML = "<p style='color:red'>தரவுகளை ஏற்ற முடியவில்லை. இணையத் தொடர்பைச் சரிபார்க்கவும்.</p>";
    }
}

function renderTable(data) {
    tableBody.innerHTML = '';
    if (data.length === 0) {
        document.getElementById('emptyMsg').classList.remove('hidden');
        booksTable.classList.add('hidden');
        return;
    }
    document.getElementById('emptyMsg').classList.add('hidden');
    booksTable.classList.remove('hidden');

    data.forEach(book => {
        const row = `<tr>
            <td>${book.sr_no}</td>
            <td style="font-weight:600">${book.book_title}</td>
            <td>${book.author_editor}</td>
            <td>${book.isbn_number || '-'}</td>
            <td><span class="badge">${book.year}</span></td>
        </tr>`;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// தேடல் மற்றும் வடிகட்டி செயல்பாடு
function filterBooks() {
    const term = document.getElementById('searchInput').value.toLowerCase();
    const year = document.getElementById('yearFilter').value;

    const filtered = allBooks.filter(b => {
        const matchesText = b.book_title.toLowerCase().includes(term) || b.author_editor.toLowerCase().includes(term);
        const matchesYear = year === 'all' || b.year === year;
        return matchesText && matchesYear;
    });
    renderTable(filtered);
}

document.getElementById('searchInput').addEventListener('input', filterBooks);
document.getElementById('yearFilter').addEventListener('change', filterBooks);
document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('yearFilter').value = 'all';
    renderTable(allBooks);
});

// தொடக்கம்
fetchInamBooks();
