// DOM Elements
const booksTbody = document.getElementById('books-tbody');
const searchInput = document.getElementById('search');
const yearFilter = document.getElementById('year-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const noResultsDiv = document.getElementById('no-results');
const totalBooksSpan = document.getElementById('total-books');
const loadingIndicator = document.getElementById('loading-indicator');

let allBooks = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load books from GitHub JSON
    loadBooksFromGitHub();
    
    // Setup event listeners
    searchInput.addEventListener('input', filterBooks);
    yearFilter.addEventListener('change', filterBooks);
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Set page title dynamically
    document.title = "INAM PATHIPPAGAM - புத்தகங்களின் பட்டியல்";
});

// Function to show loading indicator
function showLoading() {
    if (loadingIndicator) {
        loadingIndicator.style.display = 'block';
    }
    if (booksTbody) {
        booksTbody.innerHTML = '';
    }
    const table = document.getElementById('books-table');
    if (table) {
        table.style.display = 'none';
    }
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
}

// Function to hide loading indicator
function hideLoading() {
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    const table = document.getElementById('books-table');
    if (table) {
        table.style.display = 'table';
    }
}

// Function to load books from GitHub JSON
async function loadBooksFromGitHub() {
    try {
        showLoading();
        
        // GitHub raw JSON URL
        const githubUrl = 'https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json';
        
        // Try direct fetch first
        let response;
        try {
            response = await fetch(githubUrl, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                }
            });
        } catch (fetchError) {
            console.log('Direct fetch failed, trying CORS proxy...');
            // Fallback to CORS proxy if direct fetch fails
            const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(githubUrl)}`;
            response = await fetch(proxyUrl);
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.books && Array.isArray(data.books)) {
            allBooks = data.books;
            
            // Set total books count
            if (totalBooksSpan) {
                totalBooksSpan.textContent = allBooks.length;
            }
            
            // Hide loading and display books
            hideLoading();
            displayBooks(allBooks);
            
            // Populate year filter with unique years
            populateYearFilter(allBooks);
            
            console.log(`Loaded ${allBooks.length} books successfully from GitHub`);
            
            // Update stats with actual years range
            updateStats(allBooks);
        } else {
            throw new Error('Invalid JSON structure');
        }
    } catch (error) {
        console.error('Error loading books from GitHub:', error);
        hideLoading();
        displayError(error.message);
    }
}

// Function to update stats with actual data
function updateStats(books) {
    if (!books || books.length === 0) return;
    
    // Get years range
    const years = books.map(book => parseInt(book.year)).filter(year => !isNaN(year));
    if (years.length > 0) {
        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);
        
        // Update year range in stats
        const yearSpan = document.querySelector('.stat:nth-child(2) span');
        if (yearSpan) {
            yearSpan.textContent = `${minYear} - ${maxYear}`;
        }
    }
    
    // Estimate number of authors (unique)
    const authors = books.map(book => book.author_editor).filter(author => author);
    const uniqueAuthors = [...new Set(authors)];
    
    const authorSpan = document.querySelector('.stat:nth-child(3) span');
    if (authorSpan && uniqueAuthors.length > 0) {
        authorSpan.textContent = `${uniqueAuthors.length}+`;
    }
}

// Function to populate year filter with unique years
function populateYearFilter(books) {
    if (!yearFilter) return;
    
    // Get unique years from books
    const years = [...new Set(books.map(book => book.year).filter(year => year))];
    
    // Sort years in descending order
    years.sort((a, b) => b - a);
    
    // Clear existing options except the first one
    while (yearFilter.options.length > 1) {
        yearFilter.remove(1);
    }
    
    // Add year options
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

// Function to display books in the table
function displayBooks(books) {
    if (!booksTbody) return;
    
    booksTbody.innerHTML = '';
    
    if (books.length === 0) {
        if (noResultsDiv) {
            noResultsDiv.style.display = 'block';
        }
        return;
    }
    
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
    
    books.forEach(book => {
        const row = document.createElement('tr');
        
        // Format publication date
        let pubDate = book.publication_date || '';
        if (pubDate === "01/01/1900" || pubDate === "") {
            pubDate = "-";
        } else if (pubDate) {
            // Format date to display properly
            pubDate = formatDate(pubDate);
        }
        
        // Format ISBN - show empty string if not available
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

// Function to format date from DD/MM/YYYY to a more readable format
function formatDate(dateString) {
    if (!dateString || dateString === "01/01/1900") return "-";
    
    // Check if date is in DD/MM/YYYY format
    if (dateString.includes('/')) {
        const parts = dateString.split('/');
        if (parts.length === 3) {
            // Return in DD/MM/YYYY format
            return `${parts[0]}/${parts[1]}/${parts[2]}`;
        }
    }
    
    return dateString;
}

// Function to filter books based on search and year
function filterBooks() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedYear = yearFilter ? yearFilter.value : 'all';
    
    const filteredBooks = allBooks.filter(book => {
        // Check if book matches search term
        const matchesSearch = searchTerm === '' || 
            (book.book_title && book.book_title.toLowerCase().includes(searchTerm)) ||
            (book.author_editor && book.author_editor.toLowerCase().includes(searchTerm)) ||
            (book.isbn_number && book.isbn_number.toLowerCase().includes(searchTerm));
        
        // Check if book matches selected year
        const matchesYear = selectedYear === 'all' || book.year === selectedYear;
        
        return matchesSearch && matchesYear;
    });
    
    displayBooks(filteredBooks);
}

// Function to reset all filters
function resetFilters() {
    if (searchInput) searchInput.value = '';
    if (yearFilter) yearFilter.value = 'all';
    displayBooks(allBooks);
}

// Function to display error message
function displayError(errorMessage = '') {
    if (!booksTbody) return;
    
    booksTbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 40px; color: #dc3545;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <h3>தரவுகளை ஏற்ற முடியவில்லை</h3>
                <p>புத்தக பட்டியலை GitHub இலிருந்து ஏற்றுவதில் பிரச்சனை ஏற்பட்டுள்ளது.</p>
                <p>${errorMessage || 'தயவு செய்து பின்னர் முயற்சிக்கவும்.'}</p>
                <button onclick="loadBooksFromGitHub()" style="margin-top: 15px; padding: 10px 20px; background: #1e5799; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    <i class="fas fa-redo"></i> மீண்டும் முயற்சிக்கவும்
                </button>
            </td>
        </tr>
    `;
    
    if (noResultsDiv) {
        noResultsDiv.style.display = 'none';
    }
    
    hideLoading();
}
