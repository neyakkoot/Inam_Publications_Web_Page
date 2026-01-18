// தரவுகளை இங்கே நேரடியாக வழங்கலாம் அல்லது fetch மூலம் பெறலாம்
// ஒருவேளை உங்கள் கோப்பு list.json என்ற பெயரில் அதே போல்டரில் இருந்தால்
// fetch('list.json').then(...) பயன்படுத்தவும்.
// இங்கே எளிமைக்காக தரவுகளை வேரியபிளில் வைக்கிறேன்.

const jsonData = {
    // ... நீங்கள் வழங்கிய முழு json தரவுகளும் இங்கே இருப்பதாகக் கொள்க ...
    // (கீழே உள்ள function அனைத்து தரவுகளையும் கையாளும்)
};

let books = [];

async function loadData() {
    try {
        // ஒருவேளை கோப்பாக இருந்தால்: 
        const response = await fetch('list.json');
        const data = await response.json();
        
        books = data.books;
        document.getElementById('disclaimer-text').innerText = data.disclaimer;
        
        initTable(books);
        setupYearFilter(books);
    } catch (error) {
        console.error("தரவுகளை ஏற்றுவதில் பிழை:", error);
    }
}

function initTable(data) {
    const tableBody = document.getElementById('tableBody');
    const totalCount = document.getElementById('total-count');
    const noResults = document.getElementById('noResults');
    const table = document.getElementById('booksTable');
    
    tableBody.innerHTML = '';
    totalCount.innerText = data.length;

    if (data.length === 0) {
        noResults.classList.remove('hidden');
        table.classList.add('hidden');
        return;
    } else {
        noResults.classList.add('hidden');
        table.classList.remove('hidden');
    }

    data.forEach(book => {
        const row = `
            <tr>
                <td>${book.sr_no}</td>
                <td style="font-weight: 500; color: #1a237e;">${book.book_title}</td>
                <td>${book.author_editor}</td>
                <td><small>${book.isbn_number || '-'}</small></td>
                <td><span class="badge">${book.year}</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// தேடல் வசதி
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = books.filter(book => 
        book.book_title.toLowerCase().includes(term) || 
        book.author_editor.toLowerCase().includes(term) ||
        (book.isbn_number && book.isbn_number.includes(term))
    );
    initTable(filtered);
});

// ஆண்டு வாரியாகப் பிரித்தல்
function setupYearFilter(data) {
    const select = document.getElementById('yearFilter');
    const years = [...new Set(data.map(book => book.year))].sort().reverse();
    
    years.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.innerText = year;
        select.appendChild(option);
    });
}

document.getElementById('yearFilter').addEventListener('change', (e) => {
    const selectedYear = e.target.value;
    if (selectedYear === 'all') {
        initTable(books);
    } else {
        const filtered = books.filter(book => book.year === selectedYear);
        initTable(filtered);
    }
});

// பக்கத்தை ஏற்றும் போது
window.onload = loadData;
