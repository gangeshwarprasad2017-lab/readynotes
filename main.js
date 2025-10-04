class NoteCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'No Title';
        const content = this.getAttribute('content') || 'No Content';

        this.shadowRoot.innerHTML = `
            <style>
                h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.25rem;
                    color: #4a90e2;
                }
                p {
                    margin: 0;
                    line-height: 1.5;
                }
            </style>
            <h3>${title}</h3>
            <p>${content}</p>
        `;
    }
}

customElements.define('note-card', NoteCard);

const categories = [
    { id: 'math', name: 'Mathematics' },
    { id: 'science', name: 'Science' },
    { id: 'history', name: 'History' },
    { id: 'literature', name: 'Literature' },
];

const notes = [
    { id: 1, category: 'math', title: 'Algebra Basics', content: 'Variables, expressions, and equations.' },
    { id: 2, category: 'math', title: 'Geometry', content: 'Points, lines, planes, and angles.' },
    { id: 3, category: 'science', title: 'Biology', content: 'The study of living organisms.' },
    { id: 4, category: 'science', title: 'Chemistry', content: 'The study of matter and its properties.' },
    { id: 5, category: 'history', title: 'Ancient Rome', content: 'The rise and fall of the Roman Empire.' },
    { id: 6, category: 'literature', title: 'Shakespeare', content: 'The works of William Shakespeare.' },
];

const categoryList = document.querySelector('#category-list ul');
const notesGrid = document.querySelector('#notes-grid');
const menuToggle = document.getElementById('menu-toggle');
const categoryListAside = document.getElementById('category-list');
const menuOverlay = document.getElementById('menu-overlay');

function renderCategories() {
    categoryList.innerHTML = '';
    categories.forEach(category => {
        const li = document.createElement('li');
        li.textContent = category.name;
        li.dataset.categoryId = category.id;
        categoryList.appendChild(li);
    });
    if (categories.length > 0) {
        categoryList.querySelector('li').classList.add('active');
    }
}

function renderNotes(categoryId) {
    notesGrid.innerHTML = '';
    const filteredNotes = notes.filter(note => note.category === categoryId);
    filteredNotes.forEach(note => {
        const noteCard = document.createElement('note-card');
        noteCard.setAttribute('title', note.title);
        noteCard.setAttribute('content', note.content);
        notesGrid.appendChild(noteCard);
    });
}

function toggleMenu() {
    categoryListAside.classList.toggle('show');
    menuOverlay.classList.toggle('hidden');
}

menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

categoryList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const categoryId = e.target.dataset.categoryId;
        document.querySelectorAll('#category-list li').forEach(li => li.classList.remove('active'));
        e.target.classList.add('active');
        renderNotes(categoryId);
        toggleMenu(); // Close menu after selection
    }
});

// Initial Render
renderCategories();
if (categories.length > 0) {
    renderNotes(categories[0].id);
}
