const library = [];

const libraryDisplay = document.querySelector(".library-display");
const bookTable = document.querySelector("#library-table-content");
const cardContainer = document.querySelector("#library-card-container");

const dialog = document.querySelector("dialog");

function Book(title, author, pages, genre, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.genre = genre;
	this.read = read;
	this.info = function () {
		return `${this.title}, ${this.author}, ${this.pages}, ${this.genre}, ${this.read}`;
	};
	if (read == undefined) this.read = false;
	this.toggleRead = function () {
		this.read = !this.read;
	};

}

function addToLibrary(book) {
	book.id = crypto.randomUUID();
	library.push(book);
	console.log(book.info());
	// if(book.read == true); book.toggleRead();
}

function displayUpdate() {
	libraryDisplay.innerHTML = "";
	bookTable.innerHTML = "";
	cardContainer.innerHTML = "";

	let bookNum = 1;

	library.forEach((book) => {
		const index = bookNum - 1;

		const bookDisplay = document.createElement("p");
		bookDisplay.textContent = `${bookNum}: ${book.info()}`;

		updateList(bookDisplay, index);
		updateTable(book, index);
		updateCards(book, index);
		bookNum++;
	});
}

function updateList(bookDisplay, index) {
	libraryDisplay.appendChild(bookDisplay);

	const deleteButton = document.createElement("button");
	deleteButton.className = "delete-button";
	deleteButton.textContent = "X";
	bookDisplay.appendChild(deleteButton);

	// 		if (book[key] == book.read) {
	// 		const bookKeyItem = document.createElement("td");
	// 		bookRow.appendChild(bookKeyItem);

	// 		if (book[key] == book.read) {
	// 			const bookKeyToggle = document.createElement("input");
	// 			bookKeyToggle.type = "checkbox";
	// 			bookKeyToggle.name = "book-read-toggle";
	// 			bookKeyToggle.id = "book-read-toggle";
	// 			bookKeyToggle.value = book.read;
	// 			bookKeyToggle.checked = book.read;

	// 			bookKeyItem.appendChild(bookKeyToggle);
	// 			bookKeyToggle.addEventListener("click", book.toggleRead() );
	// 		}
	// 	}
	// }

	deleteButton.addEventListener("click", () => {
		libraryDisplay.removeChild(bookDisplay);
		library.splice(index, 1);
		console.log(library);
		displayUpdate();
	});
}

function updateTable(book, index) {
	const bookRow = document.createElement("tr");
	bookTable.appendChild(bookRow);

	// const tableNum = document.createElement("td");
	// tableNum.textContent = bookNum;
	// bookRow.appendChild(bookGenreItem);
	for (const key in book) {
		if (
			book[key] == book.title ||
			book[key] == book.author ||
			book[key] == book.pages ||
			book[key] == book.genre
		) {
			const bookKeyItem = document.createElement("td");
			bookKeyItem.textContent = book[key];
			bookRow.appendChild(bookKeyItem);
		}

		if (book[key] == book.read) {
			const bookKeyItem = document.createElement("td");
			bookRow.appendChild(bookKeyItem);

			if (book[key] == book.read) {
				const bookKeyToggle = document.createElement("input");
				bookKeyToggle.type = "checkbox";
				bookKeyToggle.name = "book-read-toggle";
				bookKeyToggle.id = "book-read-toggle";
				bookKeyToggle.value = book.read;
				bookKeyToggle.checked = book.read;

				bookKeyItem.appendChild(bookKeyToggle);
				bookKeyToggle.addEventListener("click", book.toggleRead() );
			}
		}
	}

	const tableButtonContainer = document.createElement("div");
	tableButtonContainer.className = "table-delete-container";

	const tableDeleteButton = document.createElement("button");
	tableDeleteButton.className = "delete-button table-delete-button";
	tableDeleteButton.textContent = "X";

	bookRow.lastChild.appendChild(tableButtonContainer);
	tableButtonContainer.appendChild(tableDeleteButton);

	tableDeleteButton.addEventListener("click", () => {
		library.splice(index, 1);
		console.log(library);
		displayUpdate();
	});
}

function updateCards(book, index) {
	const bookCard = document.createElement("div");
	bookCard.className = "card";
	cardContainer.appendChild(bookCard);

	for (const key in book) {
		if (book[key] == book.title ||
			book[key] == book.author ||
			book[key] == book.pages ||
			book[key] == book.genre) {
			const bookKeyItem = document.createElement("p");
			bookKeyItem.textContent = book[key];
			bookCard.appendChild(bookKeyItem);
		}
	}

	const cardButtonContainer = document.createElement("div");
	cardButtonContainer.className = "card-delete-container";
	bookCard.appendChild(cardButtonContainer);

	const cardDeleteButton = document.createElement("button");
	cardDeleteButton.className = "delete-button card-delete-button";
	cardDeleteButton.textContent = "X";

	cardButtonContainer.appendChild(cardDeleteButton);

	cardDeleteButton.addEventListener("click", () => {
		library.splice(index, 1);
		console.log(library);
		displayUpdate();
	});
}

const addBookButton = document
	.querySelector("#add-book")
	.addEventListener("click", () => {
		dialog.showModal();
	});

const submitBookButton = document
	.querySelector("#submit-book")
	.addEventListener("click", () => {
		dialog.close();
		const newBook = new Book(
			document.querySelector("#book-title").value,
			document.querySelector("#book-author").value,
			document.querySelector("#book-pages").value,
			document.querySelector("#book-genre").value
		);
		addToLibrary(newBook);
		displayUpdate();

		const form = document.querySelector("#dialog-form");
		form.reset();
		e.preventDefault();
	});

const submitBookButtonMain = document
	.querySelector("#submit-book-main")
	.addEventListener("click", () => {
		const newBook = new Book(
			document.querySelector("#book-title-main").value,
			document.querySelector("#book-author-main").value,
			document.querySelector("#book-pages-main").value,
			document.querySelector("#book-genre-main").value
		);
		addToLibrary(newBook);
		displayUpdate();

		const form = document.querySelector("#main-form");
		form.reset();
		e.preventDefault();
	});

const cancelBook = document
	.querySelector("#cancel-book")
	.addEventListener("click", () => {
		const form = document.querySelector("#dialog-form");
		form.reset();
		dialog.close();
	});

const cancelBookMain = document
	.querySelector("#cancel-book-main")
	.addEventListener("click", () => {
		const form = document.querySelector("#main-form");
		form.reset();
		dialog.close();
	});

const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 100, "Fantasy", true);
const obernewtyn = new Book("Obernewtyn", "Isobelle Carmody", 200, "Fantasy");

addToLibrary(theHobbit);
addToLibrary(obernewtyn);

displayUpdate();
