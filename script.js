// நூல்கள் தரவு
let booksData = [];
let filteredBooks = [];

// DOM உறுப்புகள்
const booksGrid = document.getElementById('books-grid');
const yearFilter = document.getElementById('year-filter');
const sortOrder = document.getElementById('sort-order');
const bookCount = document.getElementById('book-count');
const selectedYear = document.getElementById('selected-year');
const loading = document.getElementById('loading');
const noBooks = document.getElementById('no-books');

// GitHub JSON URL
const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/neyakkoot/Inam_Publications_Web_Page/main/list.json';

// ஆரம்பத்தில் தரவுகளை ஏற்றவும்
document.addEventListener('DOMContentLoaded', () => {
    loadBooksData();
    
    // வடிகட்டு மாற்றங்களைக் கேட்கவும்
    yearFilter.addEventListener('change', filterAndDisplayBooks);
    sortOrder.addEventListener('change', filterAndDisplayBooks);
});

// JSON தரவுகளை ஏற்றவும்
async function loadBooksData() {
    try {
        loading.classList.remove('hidden');
        booksGrid.innerHTML = '';
        
        const response = await fetch(GITHUB_JSON_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        booksData = await response.json();
        
        // தரவுகளைச் சரிபார்த்தல்
        if (!Array.isArray(booksData)) {
            throw new Error('தரவு வடிவம் சரியாக இல்லை. எதிர்பார்க்கப்பட்டது: புத்தகங்களின் வரிசை');
        }
        
        // முதல் புத்தகப் பண்புகளைச் சரிபார்த்தல்
        if (booksData.length > 0) {
            console.log('முதல் புத்தகம்:', booksData[0]);
        }
        
        // முதலில் அனைத்து புத்தகங்களையும் காட்டவும்
        filterAndDisplayBooks();
        
    } catch (error) {
        console.error('தரவுகளை ஏற்றுவதில் பிழை:', error);
        booksGrid.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>தரவுகளை ஏற்ற முடியவில்லை</h3>
                <p>தரவுகளைப் பெறுவதில் பிழை ஏற்பட்டுள்ளது. பிறகு முயற்சிக்கவும்.</p>
                <p>பிழை: ${error.message}</p>
            </div>
        `;
    } finally {
        loading.classList.add('hidden');
    }
}

// புத்தகங்களை வடிகட்டி காட்சிப்படுத்தவும்
function filterAndDisplayBooks() {
    const selectedYearValue = yearFilter.value;
    const sortValue = sortOrder.value;
    
    // ஆண்டு வடிகட்டுதல்
    if (selectedYearValue === 'all') {
        filteredBooks = [...booksData];
        selectedYear.textContent = 'அனைத்து ஆண்டுகள்';
    } else {
        filteredBooks = booksData.filter(book => {
            // வெவ்வேறு தரவு வடிவங்களைக் கையாளவும்
            if (book.year) {
                return book.year.toString() === selectedYearValue;
            } else if (book.publicationYear) {
                return book.publicationYear.toString() === selectedYearValue;
            } else if (book.date && book.date.includes(selectedYearValue)) {
                return true;
            }
            return false;
        });
        selectedYear.textContent = `ஆண்டு: ${selectedYearValue}`;
    }
    
    // வரிசைப்படுத்துதல்
    sortBooks(filteredBooks, sortValue);
    
    // புத்தக எண்ணிக்கையைப் புதுப்பிக்கவும்
    bookCount.textContent = `${filteredBooks.length} நூல்கள்`;
    
    // காட்சிப்படுத்துதல்
    displayBooks(filteredBooks);
}

// புத்தகங்களை வரிசைப்படுத்தவும்
function sortBooks(books, sortValue) {
    switch(sortValue) {
        case 'title-asc':
            books.sort((a, b) => {
                const titleA = a.title || a.name || '';
                const titleB = b.title || b.name || '';
                return titleA.localeCompare(titleB, 'ta');
            });
            break;
        case 'title-desc':
            books.sort((a, b) => {
                const titleA = a.title || a.name || '';
                const titleB = b.title || b.name || '';
                return titleB.localeCompare(titleA, 'ta');
            });
            break;
        case 'year-desc':
            books.sort((a, b) => {
                const yearA = getBookYear(a);
                const yearB = getBookYear(b);
                return yearB - yearA;
            });
            break;
        case 'year-asc':
            books.sort((a, b) => {
                const yearA = getBookYear(a);
                const yearB = getBookYear(b);
                return yearA - yearB;
            });
            break;
    }
}

// புத்தக ஆண்டைப் பெறவும்
function getBookYear(book) {
    if (book.year) return parseInt(book.year);
    if (book.publicationYear) return parseInt(book.publicationYear);
    if (book.date) {
        // YYYY-MM-DD அல்லது YYYY வடிவத்திலிருந்து ஆண்டைப் பிரித்தெடுக்கவும்
        const yearMatch = book.date.match(/\b(\d{4})\b/);
        if (yearMatch) return parseInt(yearMatch[1]);
    }
    return 0;
}

// புத்தகங்களைக் காட்சிப்படுத்தவும்
function displayBooks(books) {
    booksGrid.innerHTML = '';
    
    if (books.length === 0) {
        noBooks.classList.remove('hidden');
        return;
    }
    
    noBooks.classList.add('hidden');
    
    books.forEach(book => {
        const bookCard = createBookCard(book);
        booksGrid.appendChild(bookCard);
    });
}

// புத்தக அட்டையை உருவாக்கவும்
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'book-card';
    
    // புத்தகத் தரவுகளைப் பிரித்தெடுக்கவும்
    const title = book.title || book.name || 'தலைப்பு இல்லை';
    const author = book.author || book.writer || 'ஆசிரியர் தகவல் இல்லை';
    const year = getBookYear(book);
    const description = book.description || book.details || 'விளக்கம் இல்லை';
    const language = book.language || 'தமிழ்';
    const pages = book.pages || book.pageCount || 'தகவல் இல்லை';
    
    // நூல் உறைக்கான சீரற்ற வண்ணம்
    const coverColors = ['#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0', '#fce4ec'];
    const randomColor = coverColors[Math.floor(Math.random() * coverColors.length)];
    
    // நூல் உறை ஐகான்
    const coverIcons = ['fa-book', 'fa-book-open', 'fa-scroll', 'fa-file-alt', 'fa-newspaper'];
    const randomIcon = coverIcons[Math.floor(Math.random() * coverIcons.length)];
    
    card.innerHTML = `
        <div class="book-cover" style="background-color: ${randomColor}">
            <i class="fas ${randomIcon}"></i>
        </div>
        <div class="book-info">
            <h3 class="book-title">${title}</h3>
            <div class="book-details">
                <p><i class="fas fa-user-pen"></i> <span>${author}</span></p>
                <p><i class="fas fa-language"></i> <span>${language}</span></p>
                <p><i class="fas fa-file-lines"></i> <span>${pages} பக்கங்கள்</span></p>
                <p><i class="fas fa-align-left"></i> <span>${truncateText(description, 80)}</span></p>
            </div>
            <div class="book-year">${year}</div>
        </div>
    `;
    
    return card;
}

// உரையை சுருக்கவும்
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// GitHub API இருந்து உண்மையான தரவுகளைப் பெறுவதற்கான விருப்பம்
// (JSON கோப்பு கிடைக்கவில்லை என்றால் உதாரணத் தரவுகளைப் பயன்படுத்தவும்)
if (typeof booksData === 'undefined' || booksData.length === 0) {
    // உதாரணத் தரவுகளை ஏற்றவும்
    setTimeout(() => {
        if (booksData.length === 0) {
            console.log('GitHub இலிருந்து தரவுகளை ஏற்ற முடியவில்லை. உதாரணத் தரவுகளைப் பயன்படுத்துகிறது.');
            loadSampleData();
        }
    }, 3000);
}

function loadSampleData() {
    booksData = [
        {
            title: "தமிழ் இலக்கிய வரலாறு",
            author: "மு. வரதராசன்",
            year: 2021,
            description: "தமிழ் இலக்கியத்தின் விரிவான வரலாறு",
            language: "தமிழ்",
            pages: 350
        },
        {
            title: "கவிதைகளின் உலகம்",
            author: "கவிஞர் சுரதா",
            year: 2020,
            description: "நவீன தமிழ்க் கவிதைகளின் தொகுப்பு",
            language: "தமிழ்",
            pages: 200
        },
        {
            title: "சிறுகதைக் களஞ்சியம்",
            author: "பலர்",
            year: 2022,
            description: "பல சிறுகதை ஆசிரியர்களின் சிறுகதைகள்",
            language: "தமிழ்",
            pages: 280
        },
        {
            title: "இயற்கையின் சாட்சிகள்",
            author: "ராஜேந்திரன்",
            year: 2019,
            description: "இயற்கை மற்றும் சுற்றுச்சூழல் பற்றிய கட்டுரைகள்",
            language: "தமிழ்",
            pages: 180
        },
        {
            title: "தத்துவத்தின் அடிப்படைகள்",
            author: "டாக்டர் செல்வம்",
            year: 2023,
            description: "முக்கிய தத்துவக் கருத்துகளின் விளக்கம்",
            language: "தமிழ்",
            pages: 320
        },
        {
            title: "உளவியல் முன்னோக்குகள்",
            author: "மனோவியல் ரவி",
            year: 2021,
            description: "நவீன உளவியல் கோட்பாடுகள் மற்றும் பயன்பாடுகள்",
            language: "தமிழ்",
            pages: 275
        },
        {
            title: "கணினி தொழில்நுட்ப அடிப்படைகள்",
            author: "தொழில்நுட்ப நிபுணர்",
            year: 2022,
            description: "கணினி அறிவியலின் அடிப்படைக் கருத்துகள்",
            language: "தமிழ்",
            pages: 300
        },
        {
            title: "சமூகவியல் கண்ணோட்டம்",
            author: "சமூக அறிஞர்",
            year: 2020,
            description: "சமூகவியல் கோட்பாடுகள் மற்றும் பயன்பாடுகள்",
            language: "தமிழ்",
            pages: 240
        }
    ];
    
    filterAndDisplayBooks();
    loading.classList.add('hidden');
}
