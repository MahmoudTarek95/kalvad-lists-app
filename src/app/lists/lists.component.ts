import { Component, signal, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { List } from '../interfaces/list';

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [CommonModule,MatListModule,MatGridListModule,MatIconModule],
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ListsComponent {
  booksList = signal<List[]>([
    {
      name:"Dune",
      year:"1965",
      auther:"Frank Herbert"
    },
    {
      name:"Ender's Game",
      year:"1985",
      auther:"Orson Scott Card"
    },
    {
      name:"1984",
      year:"1949",
      auther:"George Orwell"
    },
    {
      name:"Fahrenheit 451",
      year:"1953",
      auther:"Ray Bradbury"
    },
    {
      name:"Brave New World",
      year:"1932",
      auther:"Aldous Huxley"
    }
  ])
  myFavoriteBooks = signal<List[]>([])
  
  constructor(){}

  addBookToMyFavorite(book:List){
    this.myFavoriteBooks.update((value:List[]) => {
      value = [...value, book]
      return value
    })
  }

  removeBookFromMyFavorite(book:List){
    this.myFavoriteBooks.update((value:List[]) => {
      value = value.filter(b => b.year != book.year)
      return value
    })
  }
  
}
