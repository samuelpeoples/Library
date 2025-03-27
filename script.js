const library = []

function Book(title, author, pages, genre){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.id = crypto.randomUUID();
    this.Info = function() {
        return `${title} by ${author} is ${pages} pages long and is ${genre}`;
    }
}

function AddToLibrary(book){
    library.push(book);
}
const theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 100, "Fantasy" );

const obernewtyn = new Book("Obernewtyn", "Isobelle Carmody", 200, "Fantasy", "Unkown");


AddToLibrary(theHobbit);
AddToLibrary(obernewtyn);

console.log(library[0].id);
console.log(library[1].id);
console.log(library[1].title);
