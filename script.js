// DOM Elements
const booksTbody = document.getElementById('books-tbody');
const searchInput = document.getElementById('search');
const yearFilter = document.getElementById('year-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const noResultsDiv = document.getElementById('no-results');
const loadingDiv = document.getElementById('loading');
const totalBooksSpan = document.getElementById('total-books');
const yearRangeSpan = document.getElementById('year-range');
const authorCountSpan = document.getElementById('author-count');

let allBooks = [];
let filteredBooks = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load books from GitHub
    loadBooksFromGitHub();
    
    // Setup event listeners
    searchInput.addEventListener('input', filterBooks);
    yearFilter.addEventListener('change', filterBooks);
    resetFiltersBtn.addEventListener('click', resetFilters);
});

// Show loading state
function showLoading() {
    loadingDiv.style.display = 'block';
    booksTbody.innerHTML = '';
    noResultsDiv.style.display = 'none';
}

// Hide loading state
function hideLoading() {
    loadingDiv.style.display = 'none';
}

// Load books from GitHub JSON
async function loadBooksFromGitHub() {
    try {
        showLoading();
        
        // GitHub raw JSON URL
        const githubUrl = 'https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json';
        
        // Fetch with error handling
        let response;
        try {
            response = await fetch(githubUrl, {
                headers: {
                    'Accept': 'application/json',
                }
            });
        } catch (error) {
            // Try with CORS proxy if direct fetch fails
            const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(githubUrl)}`;
            response = await fetch(proxyUrl);
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.books && Array.isArray(data.books)) {
            allBooks = data.books;
            filteredBooks = [...allBooks];
            
            // Update statistics
            updateStatistics();
            
            // Populate year filter
            populateYearFilter();
            
            // Display books
            displayBooks(allBooks);
            
            hideLoading();
            
            console.log(`Successfully loaded ${allBooks.length} books from GitHub`);
        } else {
            throw new Error('Invalid JSON structure');
        }
    } catch (error) {
        console.error('Error loading books from GitHub:', error);
        hideLoading();
        displayError('புத்தகங்களை ஏற்றுவதில் பிழை. தயவு செய்து பின்னர் முயற்சிக்கவும்.');
    }
}

// Update statistics
function updateStatistics() {
    if (allBooks.length === 0) return;
    
    // Total books
    totalBooksSpan.textContent = allBooks.length;
    
    // Year range
    const years = allBooks
        .map(book => parseInt(book.year))
        .filter(year => !isNaN(year) && year > 0);
    
    if (years.length > 0) {
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        yearRangeSpan.textContent = `${minYear} - ${maxYear}`;
    }
    
    // Author count estimate
    const authors = allBooks
        .map(book => book.author_editor)
        .filter(author => author && author.trim() !== '');
    
    const uniqueAuthors = new Set();
    authors.forEach(author => {
        // Split multiple authors
        if (author.includes(',')) {
            author.split(',').forEach(a => {
                if (a.trim()) uniqueAuthors.add(a.trim());
            });
        } else {
            if (author.trim()) uniqueAuthors.add(author.trim());
        }
    });
    
    authorCountSpan.textContent = `${uniqueAuthors.size}+`;
}

// Populate year filter with unique years from data
function populateYearFilter() {
    // Clear existing options except the first one
    while (yearFilter.options.length > 1) {
        yearFilter.remove(1);
    }
    
    // Get unique years
    const years = [...new Set(allBooks.map(book => book.year).filter(year => year))];
    
    // Sort years in descending order
    years.sort((a, b) => b - a);
    
    // Add options
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Display books in table
function displayBooks(books) {
    booksTbody.innerHTML = '';
    
    if (books.length === 0) {
        noResultsDiv.style.display = 'block';
        return;
    }
    
    noResultsDiv.style.display = 'none';
    
    books.forEach(book => {
        const row = document.createElement('tr');
        
        // Format publication date
        let pubDate = book.publication_date || '';
        if (pubDate === "01/01/1900" || pubDate === "") {
            pubDate = "-";
        }
        
        // Format ISBN
        const isbn = book.isbn_number || "-";
        
        row.innerHTML = `
            <td>${book.sr_no || "-"}</td>
            <td>${book.book_title || "-"}</td>
            <td>${book.author_editor || "-"}</td>
            <td>${isbn}</td>
            <td>${book.year || "-"}</td>
            <td>${pubDate}</td>
        `;
        
        booksTbody.appendChild(row);
    });
}

// Filter books based on search and year
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedYear = yearFilter.value;
    
    filteredBooks = allBooks.filter(book => {
        // Check search term
        const matchesSearch = searchTerm === '' || 
            (book.book_title && book.book_title.toLowerCase().includes(searchTerm)) ||
            (book.author_editor && book.author_editor.toLowerCase().includes(searchTerm)) ||
            (book.isbn_number && book.isbn_number.toLowerCase().includes(searchTerm));
        
        // Check year filter
        const matchesYear = selectedYear === 'all' || book.year === selectedYear;
        
        return matchesSearch && matchesYear;
    });
    
    displayBooks(filteredBooks);
}

// Reset all filters
function resetFilters() {
    searchInput.value = '';
    yearFilter.value = 'all';
    filteredBooks = [...allBooks];
    displayBooks(allBooks);
}

// Display error message
function displayError(message) {
    booksTbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 40px; color: #dc3545;">
                <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 15px;"></i>
                <h3>பிழை</h3>
                <p>${message}</p>
                <button onclick="loadBooksFromGitHub()" style="
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #1e5799;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">
                    <i class="fas fa-redo"></i> மீண்டும் முயற்சிக்கவும்
                </button>
            </td>
        </tr>
    `;
}
