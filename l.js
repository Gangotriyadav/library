document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const booksContainer = document.getElementById('booksContainer');
    const authorContainer = document.getElementById('authorContainer');

    searchButton.addEventListener('click', () => {
        performSearch();
    });

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchBooks(searchTerm); 
        }
    }

    function searchBooks(query) {
        const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => displayBooks(data.docs))
            .catch(error => console.error('Error fetching books:', error));
    }

    function displayBooks(books) {
        booksContainer.innerHTML = '';
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            const coverImageUrl = book.cover_i 
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` 
                : 'https://via.placeholder.com/128x195.png?text=No+Cover';

            bookElement.innerHTML = `
                <img src="${coverImageUrl}" alt="${book.title}" class="book-cover">
                <h3>${book.title}</h3>
                <p>Author: ${book.author_name ? book.author_name.join(', ') : 'N/A'}</p>
                <p>Genre: ${book.subject ? book.subject.slice(0, 3).join(', ') : 'N/A'}</p>
                <button onclick="getAuthorDetails('${book.author_key[0]}')">View Author</button>
            `;
            booksContainer.appendChild(bookElement);
        });
    }

    window.getAuthorDetails = function (authorKey) {
        const authorUrl = `https://openlibrary.org/authors/${authorKey}.json`;

        fetch(authorUrl)
            .then(response => response.json())
            .then(author => displayAuthorDetails(author))
            .catch(error => console.error('Error fetching author details:', error));
    };

    function displayAuthorDetails(author) {
        authorContainer.innerHTML = '';
        const authorImageUrl = `https://covers.openlibrary.org/a/olid/${author.key}-M.jpg`;

        const authorElement = document.createElement('div');
        authorElement.className = 'author-card';
        authorElement.innerHTML = `
            <div class="author-image">
                <img src="${authorImageUrl}" alt="${author.name}" onclick="window.open('${authorImageUrl}', '_blank')">
            </div>
            <div class="author-info">
                <h3>${author.name}</h3>
                <p><strong>Birth Date:</strong> ${author.birth_date ? author.birth_date : 'N/A'}</p>
                <p><strong>Death Date:</strong> ${author.death_date ? author.death_date : 'N/A'}</p>
                <p><strong>Bio:</strong> ${author.bio ? (typeof author.bio === 'string' ? author.bio : author.bio.value) : 'N/A'}</p>
                <p><strong>Works:</strong> ${author.work_count ? author.work_count : 'N/A'} books</p>
            </div>
        `;
        authorContainer.appendChild(authorElement);
    }
});






function displayAuthorDetails(author) {
    authorContainer.innerHTML = '';
    const authorImageUrl = `https://covers.openlibrary.org/a/olid/${author.key}-M.jpg`;

    const authorElement = document.createElement('div');
    authorElement.className = 'author-card';
    authorElement.innerHTML = `
        <div class="author-image">
            <img src="${authorImageUrl}" alt="${author.name}" onclick="window.open('${authorImageUrl}', '_blank')">
        </div>
        <div class="author-info">
            <h3>${author.name}</h3>
            <p><strong>Birth Date:</strong> ${author.birth_date ? author.birth_date : 'N/A'}</p>
            <p><strong>Death Date:</strong> ${author.death_date ? author.death_date : 'N/A'}</p>
            <p><strong>Bio:</strong> ${author.bio ? (typeof author.bio === 'string' ? author.bio : author.bio.value) : 'N/A'}</p>
            <p><strong>Works:</strong> ${author.work_count ? author.work_count : 'N/A'} books</p>
        </div>
    `;
    authorContainer.appendChild(authorElement);
}
