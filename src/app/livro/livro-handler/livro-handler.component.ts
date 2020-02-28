import { Component, OnInit } from '@angular/core';
import { LivroService } from '../livro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Livro } from '../livro';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-livro-handler',
  templateUrl: './livro-handler.component.html',
  styleUrls: ['./livro-handler.component.css']
})
export class LivroHandlerComponent implements OnInit {

  public form: FormGroup;
  public livro: Livro = {} as Livro;

  constructor(private fb: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public spinner: NgxSpinnerService,
    private service: LivroService) {
    this.form = fb.group({
      'id': [null],
      'titulo': [null],
      'isbn': [null, [Validators.minLength(13), Validators.maxLength(13)]],
      'autor': [null],
      'editora': [null],
      'ano': [null],
      'idioma': [null],
      'peso': [null],
      'comprimento': [null],
      'largura': [null],
      'altura': [null],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: number = params['id'];
      if (id) {
        this.spinner.show();
        this.service.getById(id).subscribe(obj => {
          this.livro = obj;
          this.form.setValue(this.livro);
          this.spinner.hide();
        });
      }
    });

  }

  public persistObject() {
    this.spinner.show();
    this.persist().subscribe(() => {
      this.spinner.hide();
      console.log('Salvo com sucesso!');
      this.back();
    });
  }

  public persist(): Observable<any> {
    this.livro = this.form.value;
    return this.service.save(this.livro);
  }

  public back() {
    this.router.navigate(['../livro-list']);
  }

  public clear() {
    this.form.reset();
  }

}
