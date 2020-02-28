import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivroHandlerComponent } from './livro/livro-handler/livro-handler.component';
import { LivroListComponent } from './livro/livro-list/livro-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/livro-list', pathMatch: 'full' },
  { path: 'livro-list', component: LivroListComponent },
  { path: 'livro-handler', component: LivroHandlerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
