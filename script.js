// Book data from GitHub
let books = [];
let filteredBooks = [];

// DOM Elements
const booksTbody = document.getElementById('books-tbody');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const yearFilter = document.getElementById('year-filter');
const resetBtn = document.getElementById('reset-btn');
const loadingDiv = document.getElementById('loading');
const noResultsDiv = document.getElementById('no-results');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    
    // Event listeners
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterBooks();
        }
    });
    
    searchBtn.addEventListener('click', filterBooks);
    yearFilter.addEventListener('change', filterBooks);
    resetBtn.addEventListener('click', resetFilters);
});

// Load books from GitHub
async function loadBooks() {
    try {
        loadingDiv.style.display = 'block';
        
        // Use CORS proxy to avoid CORS issues
        const proxyUrl = 'https://api.allorigins.win/raw?url=';
        const githubUrl = 'https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json';
        
        const response = await fetch(proxyUrl + encodeURIComponent(githubUrl));
        
        if (!response.ok) {
            throw new Error('Failed to load books');
        }
        
        const data = await response.json();
        books = data.books;
        
        // Populate year filter
        populateYearFilter();
        
        // Display all books
        displayBooks(books);
        
        loadingDiv.style.display = 'none';
        
    } catch (error) {
        console.error('Error loading books:', error);
        loadingDiv.innerHTML = `<p style="color: red;">புத்தகங்களை ஏற்றுவதில் பிழை: ${error.message}</p>`;
    }
}

// Populate year filter with unique years
function populateYearFilter() {
    const years = [...new Set(books.map(book => book.year).filter(year => year))];
    years.sort((a, b) => b - a); // Sort descending
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Display books in table
function displayBooks(bookList) {
    booksTbody.innerHTML = '';
    
    if (bookList.length === 0) {
        noResultsDiv.style.display = 'block';
        return;
    }
    
    noResultsDiv.style.display = 'none';
    
    bookList.forEach(book => {
        const row = document.createElement('tr');
        
        // Format date
        let pubDate = book.publication_date || '';
        if (pubDate === '01/01/1900' || pubDate === '') {
            pubDate = '-';
        }
        
        row.innerHTML = `
            <td>${book.sr_no || ''}</td>
            <td>${book.book_title || ''}</td>
            <td>${book.author_editor || ''}</td>
            <td>${book.isbn_number || ''}</td>
            <td>${book.year || ''}</td>
            <td>${pubDate}</td>
        `;
        
        booksTbody.appendChild(row);
    });
}

// Filter books
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedYear = yearFilter.value;
    
    filteredBooks = books.filter(book => {
        // Search term filter
        const matchesSearch = searchTerm === '' || 
            (book.book_title && book.book_title.toLowerCase().includes(searchTerm)) ||
            (book.author_editor && book.author_editor.toLowerCase().includes(searchTerm)) ||
            (book.isbn_number && book.isbn_number.toLowerCase().includes(searchTerm));
        
        // Year filter
        const matchesYear = selectedYear === 'all' || book.year === selectedYear;
        
        return matchesSearch && matchesYear;
    });
    
    displayBooks(filteredBooks);
}

// Reset filters
function resetFilters() {
    searchInput.value = '';
    yearFilter.value = 'all';
    displayBooks(books);
}
