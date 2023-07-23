import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../interfaces/book';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, MatListModule, MatGridListModule, MatIconModule, CdkDropList, CdkDrag, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListsComponent {
  // Form group for adding a new book
  addBookForm: FormGroup = new FormGroup({
    bookName: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    auther: new FormControl('', [Validators.required])
  })
  // setup signal for handling list status
  booksList = signal<Book[]>([
    {
      name: "Dune",
      year: "1965",
      auther: "Frank Herbert",
      favorite: false
    },
    {
      name: "Ender's Game",
      year: "1985",
      auther: "Orson Scott Card",
      favorite: false
    },
    {
      name: "1984",
      year: "1949",
      auther: "George Orwell",
      favorite: false
    },
    {
      name: "Fahrenheit 451",
      year: "1953",
      auther: "Ray Bradbury",
      favorite: false
    },
    {
      name: "Brave New World",
      year: "1932",
      auther: "Aldous Huxley",
      favorite: false
    }
  ])
  myFavoriteBooks = signal<Book[]>([])

  // Add new book method
  addBook() {
    const submitedData: Book = {
      name: this.addBookForm.controls['bookName'].value,
      year: this.addBookForm.controls['year'].value,
      auther: this.addBookForm.controls['auther'].value,
      favorite: false
    }

    // Update books list 
    this.booksList.update((books: Book[]) => {
      // using spread operator to add new value to the list.
      books = [...books, submitedData]
      return books
    })

    //Reset all form fields
    this.addBookForm.reset()
  }

  // Delete book from list
  deleteBook(book: Book) {
    //update book list.
    this.booksList.update((books: Book[]) => {

      // remove book from list based on year (we can use any prop).
      books = books.filter(b => b.year != book.year)
      return books
    })
    // Update favorite books when deleting a book
    this.myFavoriteBooks.update((fBooks: Book[]) => {

      // check if this book on this list
      if (fBooks.includes(book)) {
        // remove book from favorite list based on year (we can use any prop).
        fBooks = fBooks.filter(b => b.year != book.year)
      }
      return fBooks;
    })
  }
  // add or remove favorite book 
  addOrRemoveBookToMyFavorite(book: Book) {
    this.myFavoriteBooks.update((value: Book[]) => {
      // check if the favorite list has this book.
      if (!value.includes(book)) {

        // set this book as a favorite
        book.favorite = true

        // using spread operator to add new value to the list.
        value = [...value, book]
      } else {

        // unfavorite this book
        book.favorite = false

        // remove book from favorite list based on year (we can use any prop).
        value = value.filter(b => b.year != book.year)
      }
      return value
    })
  }

  removeBookFromMyFavorite(book: Book) {
    this.myFavoriteBooks.update((value: Book[]) => {
      // remove this book form favorite list
      value = value.filter(b => b.year != book.year)

      // unfavorite this book
      book.favorite = false
      return value
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.myFavoriteBooks(), event.previousIndex, event.currentIndex);
  }

}
