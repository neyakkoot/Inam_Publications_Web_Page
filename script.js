// DOM Elements
const booksTbody = document.getElementById('books-tbody');
const searchInput = document.getElementById('search');
const yearFilter = document.getElementById('year-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const noResultsDiv = document.getElementById('no-results');
const totalBooksSpan = document.getElementById('total-books');
const loadingIndicator = document.getElementById('loading-indicator');
const booksTable = document.getElementById('books-table');

let allBooks = [];

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
    searchInput.addEventListener('input', filterBooks);
    yearFilter.addEventListener('change', filterBooks);
    resetFiltersBtn.addEventListener('click', resetFilters);
});

async function loadBooks() {
    showLoading(true);
    try {
        // நேரடி GitHub URL. CORS பிரச்சனை இருந்தால் proxy பயன்படுத்தலாம்.
        const response = await fetch('https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json');
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        allBooks = data.books || [];
        
        totalBooksSpan.textContent = allBooks.length;
        populateYearFilter(allBooks);
        displayBooks(allBooks);
        showLoading(false);
    } catch (error) {
        console.error('Error:', error);
        showLoading(false);
        displayError();
    }
}

function showLoading(isLoading) {
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
    booksTable.style.display = isLoading ? 'none' : 'table';
}

function populateYearFilter(books) {
    const years = [...new Set(books.map(b => b.year).filter(y => y))].sort((a, b) => b - a);
    years.forEach(year => {
        const opt = document.createElement('option');
        opt.value = year;
        opt.textContent = year;
        yearFilter.appendChild(opt);
    });
}

function displayBooks(books) {
    booksTbody.innerHTML = '';
    
    if (books.length === 0) {
        noResultsDiv.style.display = 'block';
        booksTable.style.display = 'none';
        return;
    }

    noResultsDiv.style.display = 'none';
    booksTable.style.display = 'table';

    books.forEach(book => {
        const row = document.createElement('tr');
        const pubDate = (book.publication_date === "01/01/1900" || !book.publication_date) ? "-" : book.publication_date;
        
        row.innerHTML = `
            <td data-label="வ.எண்">${book.sr_no}</td>
            <td data-label="புத்தகம்">${book.book_title}</td>
            <td data-label="ஆசிரியர்">${book.author_editor}</td>
            <td data-label="ISBN">${book.isbn_number || "-"}</td>
            <td data-label="ஆண்டு">${book.year}</td>
            <td data-label="தேதி">${pubDate}</td>
        `;
        booksTbody.appendChild(row);
    });
}

function filterBooks() {
    const search = searchInput.value.toLowerCase();
    const year = yearFilter.value;

    const filtered = allBooks.filter(book => {
        const matchesSearch = !search || 
            book.book_title.toLowerCase().includes(search) || 
            book.author_editor.toLowerCase().includes(search) || 
            (book.isbn_number && book.isbn_number.includes(search));
        
        const matchesYear = year === 'all' || book.year === year;
        return matchesSearch && matchesYear;
    });
    displayBooks(filtered);
}

function resetFilters() {
    searchInput.value = '';
    yearFilter.value = 'all';
    displayBooks(allBooks);
}

function displayError() {
    booksTbody.innerHTML = `<tr><td colspan="6" class="error-state">தரவுகளைப் பெறுவதில் பிழை!</td></tr>`;
}
