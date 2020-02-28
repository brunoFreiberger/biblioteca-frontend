import { Component, OnInit } from '@angular/core';
import { Livro } from '../livro';
import { LivroFilter } from '../livro-filter';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SortDirection } from '@swimlane/ngx-datatable';
import { LivroService } from '../livro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-livro-list',
  templateUrl: './livro-list.component.html',
  styleUrls: ['./livro-list.component.css']
})
export class LivroListComponent implements OnInit {

  public livros: Array<Livro> = [];
  public datatableMessageConfig: any;
  public filterForm: FormGroup;
  public livrosSelecionados: Array<Livro> = [];

  public pageable: any;

  public columns: Array<any> = [
    { prop: 'titulo', name: 'Título' },
    { prop: 'isbn', name: 'ISBN' },
    { prop: 'autor', name: 'Autor' },
    { prop: 'editora', name: 'Editora' },
    { prop: 'ano', name: 'Ano' }
  ];

  constructor(private fb: FormBuilder,
    private livroService: LivroService,
    public spinner: NgxSpinnerService,
    private router: Router) {

    this.filterForm = fb.group({
      'termo': [null],
      'anoPublicacaoInicio': [null],
      'anoPublicacaoFim': [null],
    });

  }

  ngOnInit() {

    this.pageable = { total: 0, size: 5, page: 0, sort: { properties: ['titulo'], direction: 'ASC' } };

    this.datatableMessageConfig = {
      emptyMessage: 'Nenhum registro encontrado!',
      totalMessage: 'registro(s) encontrados.'
    }

    this.loadPaginatedData();
  }

  public loadPaginatedData(): void {
    this.spinner.show();
    const filter: LivroFilter = this.filterForm.value;
    this.livroService.getPaginatedDataFiltered(this.pageable, filter).subscribe(data => {
      this.spinner.hide();
      if (data) {
        this.livros = data.content;
        this.pageable.total = data.totalElements;
      }
    });
  }

  public setPage(pageNumber: number): void {
    this.pageable.page = pageNumber;
    this.loadPaginatedData();
  }

  public onSelect({ selected }): void {
    if (selected) {
      this.livrosSelecionados = selected;
    }
  }

  onSort(event) {
    const evtSort = event.sorts[0];
    const sort = { properties: evtSort.prop, direction: evtSort.dir === 'asc' ? 'ASC' : 'DESC' };
    this.pageable.sort = sort;
    this.loadPaginatedData();
  }

  public resetFilter(): void {
    this.filterForm.reset();
    this.loadPaginatedData();
  }

  public remove(id: number): void {
    this.livroService.remove(id).subscribe(res => {
      this.loadPaginatedData();
    });
  }

  public edit(id: number): void {
    this.router.navigate(['../livro-handler', { id }]);
  }

  public search(): void {
    this.loadPaginatedData();
  }

}
