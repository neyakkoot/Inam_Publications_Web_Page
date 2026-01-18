// Add these functions to your script.js

// Function to show loading indicator
function showLoading() {
    document.getElementById('loading-indicator').style.display = 'block';
    document.getElementById('books-table').style.display = 'none';
    document.getElementById('no-results').style.display = 'none';
}

// Function to hide loading indicator
function hideLoading() {
    document.getElementById('loading-indicator').style.display = 'none';
    document.getElementById('books-table').style.display = 'table';
}

// Update the loadBooksFromGitHub function to include loading indicator
async function loadBooksFromGitHub() {
    try {
        showLoading();
        
        const response = await fetch('https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.books && Array.isArray(data.books)) {
            allBooks = data.books;
            
            // Set total books count
            totalBooksSpan.textContent = allBooks.length;
            
            // Hide loading and display books
            hideLoading();
            displayBooks(allBooks);
            
            // Populate year filter with unique years
            populateYearFilter(allBooks);
            
            console.log(`Loaded ${allBooks.length} books successfully`);
        } else {
            throw new Error('Invalid JSON structure');
        }
    } catch (error) {
        console.error('Error loading books from GitHub:', error);
        hideLoading();
        displayError();
    }
}
// DOM Elements
const booksTbody = document.getElementById('books-tbody');
const searchInput = document.getElementById('search');
const yearFilter = document.getElementById('year-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const noResultsDiv = document.getElementById('no-results');
const totalBooksSpan = document.getElementById('total-books');

let allBooks = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load books from GitHub JSON
    loadBooksFromGitHub();
    
    // Setup event listeners
    searchInput.addEventListener('input', filterBooks);
    yearFilter.addEventListener('change', filterBooks);
    resetFiltersBtn.addEventListener('click', resetFilters);
});

// Function to load books from GitHub JSON
async function loadBooksFromGitHub() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.books && Array.isArray(data.books)) {
            allBooks = data.books;
            
            // Set total books count
            totalBooksSpan.textContent = allBooks.length;
            
            // Display all books initially
            displayBooks(allBooks);
            
            // Populate year filter with unique years
            populateYearFilter(allBooks);
            
            console.log(`Loaded ${allBooks.length} books successfully`);
        } else {
            throw new Error('Invalid JSON structure');
        }
    } catch (error) {
        console.error('Error loading books from GitHub:', error);
        displayError();
    }
}

// Function to populate year filter with unique years
function populateYearFilter(books) {
    const yearSelect = document.getElementById('year-filter');
    
    // Get unique years from books
    const years = [...new Set(books.map(book => book.year).filter(year => year))];
    
    // Sort years in descending order
    years.sort((a, b) => b - a);
    
    // Clear existing options except the first one
    while (yearSelect.options.length > 1) {
        yearSelect.remove(1);
    }
    
    // Add year options
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });
}

// Function to display books in the table
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
    const searchTerm = searchInput.value.toLowerCase();
    const selectedYear = yearFilter.value;
    
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
    searchInput.value = '';
    yearFilter.value = 'all';
    displayBooks(allBooks);
}

// Function to display error message
function displayError() {
    booksTbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 40px; color: #dc3545;">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 15px;"></i>
                <h3>தரவுகளை ஏற்ற முடியவில்லை</h3>
                <p>புத்தக பட்டியலை GitHub இலிருந்து ஏற்றுவதில் பிரச்சனை ஏற்பட்டுள்ளது.</p>
                <p>தயவு செய்து பின்னர் முயற்சிக்கவும்.</p>
            </td>
        </tr>
    `;
    noResultsDiv.style.display = 'none';
}
