// Sample books data (in a real application, this would come from an API or JSON file)
// For this example, I'm including a subset of the books. In production, you would load the full JSON.
const booksData = [
    {
        "sr_no": 1,
        "book_title": "MOBILE COMPUTING",
        "author_editor": "P.R.PAMEELA RANI, A.LAVANYA, G.YASHODHA",
        "isbn_number": "978-81-938982-9-1",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 2,
        "book_title": "MICRO FINANCE",
        "author_editor": "R.Kanchana, V.Suganya, G.Kowsalya Devi",
        "isbn_number": "978-81-938982-8-4",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 3,
        "book_title": "DATA MINING CONCEPTS AND ITS APPLICATIONS",
        "author_editor": "M.USHA, V.LOGANAYAKI, J.GAYATHRI",
        "isbn_number": "978-81-938982-7-7",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 4,
        "book_title": "COMPANY LAW AND SECRETARIAL PRACTICE",
        "author_editor": "B. KARTHIKEYAN, P. ASHOK, D. MYTHILI",
        "isbn_number": "978-81-938982-6-0",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 5,
        "book_title": "BUSINESS MATHEMATICS",
        "author_editor": "J.NIRMALA, N.RAJA, Y.PREETHI CEON",
        "isbn_number": "978-81-938982-5-3",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 6,
        "book_title": "Madurai kaanjiyin Maanagar Madurai",
        "author_editor": "A.Balakirshnan",
        "isbn_number": "978-81-938982-4-6",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 7,
        "book_title": "Sanga Ilakkiya Katturai Kathampam",
        "author_editor": "Dr.G.Jagadeeswari",
        "isbn_number": "978-81-938982-3-9",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 8,
        "book_title": "THEDAL",
        "author_editor": "S.MUNIYASAMY",
        "isbn_number": "978-81-938982-2-2",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 9,
        "book_title": "MIIKKOTPADU THOLKAAPPIYA MULAMUM URAIYUM",
        "author_editor": "DR.T.SATHIYARAJ",
        "isbn_number": "978-81-938982-1-5",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 10,
        "book_title": "He is mine Remembering the teacher Memorandum of School Students for College Students",
        "author_editor": "M.MUNEESMOORTHY",
        "isbn_number": "978-81-938982-0-8",
        "year": "2018",
        "publication_date": ""
    },
    {
        "sr_no": 11,
        "book_title": "Aram Thirukkuralum Manutharumamum",
        "author_editor": "Dr.M.Uma Maheshwari",
        "isbn_number": "978-81-943402-2-5",
        "year": "2019",
        "publication_date": ""
    },
    {
        "sr_no": 12,
        "book_title": "Thedal",
        "author_editor": "M.Mangai",
        "isbn_number": "978-81-943402-3-2",
        "year": "2020",
        "publication_date": ""
    },
    {
        "sr_no": 13,
        "book_title": "Ayvuch Sirparal 2",
        "author_editor": "Dr.K.S.Paul Chanthiramohan, Dr.S.Samkithiyon, Dr.C.Kalaimikilan, Dr.P.Anand and Dr.R.Rajarajan",
        "isbn_number": "978-81-943402-9-4",
        "year": "2020",
        "publication_date": ""
    },
    {
        "sr_no": 14,
        "book_title": "Innovative Prospects and Technological Developments in Bio-science",
        "author_editor": "Department of Biochemistry and Microbiology",
        "isbn_number": "978-81-943402-8-7",
        "year": "2020",
        "publication_date": ""
    },
    {
        "sr_no": 15,
        "book_title": "ONE MINUTE ELDER",
        "author_editor": "N.NAVEEN PRAKASH, S.SABANA",
        "isbn_number": "978-81-943402-7-0",
        "year": "2020",
        "publication_date": ""
    },
    {
        "sr_no": 16,
        "book_title": "National level Conference on Recent Technologies in Computer Science and its Applications Proceedings",
        "author_editor": "K.Kannan",
        "isbn_number": "978-81-943402-6-3",
        "year": "2020",
        "publication_date": ""
    },
    {
        "sr_no": 17,
        "book_title": "Ayvuch Siruparral 1",
        "author_editor": "Dr.K.S.Paul Chanthiramohan, Dr.S.Samkithiyon, Dr.C.Kalaimikilan, Dr.P.Anand and Dr.R.Rajarajan,",
        "isbn_number": "978-81-943402-5-6",
        "year": "2020",
        "publication_date": ""
    },
    {
        "sr_no": 18,
        "book_title": "Anubavangalin Arthangal",
        "author_editor": "S.TAMIL SELVAN",
        "isbn_number": "978-81-943402-4-9",
        "year": "2020",
        "publication_date": ""
    },
    {
        "sr_no": 19,
        "book_title": "An Analysis of ELT Aids",
        "author_editor": "R. Nithya",
        "isbn_number": "978-81-943402-1-8",
        "year": "2019",
        "publication_date": ""
    },
    {
        "sr_no": 20,
        "book_title": "BASICS OF R PROGRAMMING LANGUAGE",
        "author_editor": "S.Vijaya, P.Lavanya, R.Maneendhar",
        "isbn_number": "978-81-943402-0-1",
        "year": "2019",
        "publication_date": ""
    },
    {
        "sr_no": 44,
        "book_title": "Nedunsaalai Thevathaigal",
        "author_editor": "M. Vikram",
        "isbn_number": "978-93-92293-85-6",
        "year": "2023",
        "publication_date": "01/01/1900"
    },
    {
        "sr_no": 45,
        "book_title": "ENGAL OOR VARALAARU(KARIAPTTIYAI SUTTRIYULLA KIRAMANGAL)",
        "author_editor": "Dr.S.MUNIYASAMY, P.RAMALAKSHMI, A.KARTHIK",
        "isbn_number": "978-93-92293-78-8",
        "year": "2023",
        "publication_date": "14/04/2023"
    },
    {
        "sr_no": 149,
        "book_title": "Development Ethics for Thamizh Wikisource Project",
        "author_editor": "Dr. R. Nithya",
        "isbn_number": "978-93-95137-83-6",
        "year": "2024",
        "publication_date": "20/07/2024"
    },
    {
        "sr_no": 150,
        "book_title": "Development for Thamizh Wikisource Project",
        "author_editor": "Dr. V. Karunya",
        "isbn_number": "978-93-95137-41-6",
        "year": "2024",
        "publication_date": "27/03/2024"
    },
    {
        "sr_no": 151,
        "book_title": "Photography Concepts",
        "author_editor": "S.Abinasha",
        "isbn_number": "978-93-95137-60-7",
        "year": "2024",
        "publication_date": "20/12/2023"
    },
    {
        "sr_no": 152,
        "book_title": "MAYA Shading and Texturing",
        "author_editor": "S.Abinasha",
        "isbn_number": "978-93-95137-59-1",
        "year": "2024",
        "publication_date": "19/12/2023"
    },
    {
        "sr_no": 217,
        "book_title": "Phonological Grammatical Theory (Tamil and Telugu)",
        "author_editor": "Dr. Ch. Savithri",
        "isbn_number": "978-93-95137-00-3",
        "year": "2023",
        "publication_date": "17/03/2022"
    }
];

// DOM Elements
const booksTbody = document.getElementById('books-tbody');
const searchInput = document.getElementById('search');
const yearFilter = document.getElementById('year-filter');
const resetFiltersBtn = document.getElementById('reset-filters');
const noResultsDiv = document.getElementById('no-results');
const totalBooksSpan = document.getElementById('total-books');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set total books count
    totalBooksSpan.textContent = "217";
    
    // Display all books initially
    displayBooks(booksData);
    
    // Setup event listeners
    searchInput.addEventListener('input', filterBooks);
    yearFilter.addEventListener('change', filterBooks);
    resetFiltersBtn.addEventListener('click', resetFilters);
});

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
        let pubDate = book.publication_date;
        if (pubDate === "01/01/1900" || pubDate === "") {
            pubDate = "-";
        }
        
        row.innerHTML = `
            <td>${book.sr_no}</td>
            <td>${book.book_title}</td>
            <td>${book.author_editor}</td>
            <td>${book.isbn_number || "-"}</td>
            <td>${book.year}</td>
            <td>${pubDate}</td>
        `;
        
        booksTbody.appendChild(row);
    });
}

// Function to filter books based on search and year
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedYear = yearFilter.value;
    
    const filteredBooks = booksData.filter(book => {
        // Check if book matches search term
        const matchesSearch = searchTerm === '' || 
            book.book_title.toLowerCase().includes(searchTerm) ||
            book.author_editor.toLowerCase().includes(searchTerm) ||
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
    displayBooks(booksData);
}

// Function to load all books from the provided JSON
// In a real application, you would fetch this from a JSON file
function loadAllBooks() {
    // This is a placeholder function. In a real application, 
    // you would load the full JSON data here.
    console.log("All books would be loaded from JSON in a real application");
}
