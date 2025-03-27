const library = [];

function Book(title, author, pages, genre) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.id = crypto.randomUUID();
	this.Info = function () {
		return `${title} by ${author}, ${pages} pages, ${genre}`;
	};
}

function addToLibrary(book) {
	library.push(book);
}

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 100, "Fantasy");

const obernewtyn = new Book(
	"Obernewtyn",
	"Isobelle Carmody",
	200,
	"Fantasy",
	"Unkown"
);

function displayUpdate() {
	libraryDisplay.innerHTML = "";
	let bookNum = 1;
	library.forEach((book) => {
		const index = bookNum - 1;
		const bookDisplay = document.createElement("p");
		bookDisplay.textContent = `${bookNum}: ${book.Info()}`;
		libraryDisplay.appendChild(bookDisplay);

		const deleteButton = document.createElement("button");
		deleteButton.textContent = "delete book?";
		bookDisplay.appendChild(deleteButton);

		deleteButton.addEventListener("click", () => {
			libraryDisplay.removeChild(bookDisplay);
			library.splice(index, 1);
			console.log(library);
			displayUpdate();
		});
		bookNum++;
	});
}

addToLibrary(theHobbit);
addToLibrary(obernewtyn);

const libraryDisplay = document.querySelector(".library-display");

const dialog = document.querySelector("dialog");

const addBookButton = document
	.querySelector("#add-book")
	.addEventListener("click", () => {
		dialog.showModal();
	});

const submitBookButton = document
	.querySelector("#submit-book")
	.addEventListener("click", (e) => {
		dialog.close();
		const newBook = new Book(
			document.querySelector("#book-title").value,
			document.querySelector("#book-author").value,
			document.querySelector("#book-pages").value,
			document.querySelector("#book-genre").value
		);
		addToLibrary(newBook);
		displayUpdate();

        const form = document.querySelector('form');
        form.reset();
		e.preventDefault();
	});

const cancelBook = document.querySelector("#cancel-book").addEventListener('click',()=>{
    const form = document.querySelector('form');
    form.reset();
    dialog.close();
})

displayUpdate();
