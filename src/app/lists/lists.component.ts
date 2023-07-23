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
import { List } from '../interfaces/list';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule, MatListModule, MatGridListModule, MatIconModule, CdkDropList, CdkDrag, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListsComponent {
  addBookForm: FormGroup = new FormGroup({
    bookName: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    auther: new FormControl('', [Validators.required])
  })
  booksList = signal<List[]>([
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
  myFavoriteBooks = signal<List[]>([])

  addBook() {
    const submitedData: List = {
      name: this.addBookForm.controls['bookName'].value,
      year: this.addBookForm.controls['year'].value,
      auther: this.addBookForm.controls['auther'].value,
      favorite: false
    }
    this.booksList.update((books: List[]) => {
      books = [...books, submitedData]
      return books
    })
    this.addBookForm.reset()
  }
  deleteBook(book: List) {
    this.booksList.update((books: List[]) => {
      books = books.filter(b => b.year != book.year)
      return books
    })
    this.myFavoriteBooks.update((fBooks: List[]) => {
      if (fBooks.includes(book)) {
        fBooks = fBooks.filter(b => b.year != book.year)
      }
      return fBooks;
    })
  }

  addOrRemoveBookToMyFavorite(book: List) {
    this.myFavoriteBooks.update((value: List[]) => {
      if (!value.includes(book)) {
        book.favorite = true
        value = [...value, book]
      } else {
        book.favorite = false
        value = value.filter(b => b.year != book.year)
      }
      return value
    })
  }

  removeBookFromMyFavorite(book: List) {
    this.myFavoriteBooks.update((value: List[]) => {
      value = value.filter(b => b.year != book.year)
      book.favorite = false
      return value
    })
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.myFavoriteBooks(), event.previousIndex, event.currentIndex);
  }

}
