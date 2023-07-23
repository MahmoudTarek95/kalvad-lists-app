import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  {
    path:'', component:ListsComponent
  },
  {
    path:'list', component:ListsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
