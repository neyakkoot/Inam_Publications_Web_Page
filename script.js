let allBooks = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    
    document.getElementById('search').addEventListener('input', filterData);
    document.getElementById('year-filter').addEventListener('change', filterData);
    document.getElementById('reset-filters').addEventListener('click', () => {
        document.getElementById('search').value = '';
        document.getElementById('year-filter').value = 'all';
        displayBooks(allBooks);
    });
});

async function fetchBooks() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json');
        const data = await response.json();
        allBooks = data.books;
        
        document.getElementById('total-books').textContent = allBooks.length;
        populateYears(allBooks);
        displayBooks(allBooks);
        
        document.getElementById('loading-indicator').style.display = 'none';
        document.getElementById('books-table').style.display = 'table';
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function populateYears(books) {
    const yearSelect = document.getElementById('year-filter');
    const years = [...new Set(books.map(b => b.year))].sort().reverse();
    years.forEach(year => {
        const opt = document.createElement('option');
        opt.value = year;
        opt.textContent = year;
        yearSelect.appendChild(opt);
    });
}

function displayBooks(books) {
    const tbody = document.getElementById('books-tbody');
    const noResults = document.getElementById('no-results');
    tbody.innerHTML = '';
    
    if (books.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    books.forEach(book => {
        const row = `<tr>
            <td>${book.sr_no}</td>
            <td style="font-weight:600">${book.book_title}</td>
            <td>${book.author_editor}</td>
            <td>${book.isbn_number || '-'}</td>
            <td>${book.year}</td>
        </tr>`;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function filterData() {
    const query = document.getElementById('search').value.toLowerCase();
    const year = document.getElementById('year-filter').value;
    
    const filtered = allBooks.filter(b => {
        const matchesSearch = b.book_title.toLowerCase().includes(query) || b.author_editor.toLowerCase().includes(query);
        const matchesYear = year === 'all' || b.year === year;
        return matchesSearch && matchesYear;
    });
    displayBooks(filtered);
}
