import {Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Observable, Subscription, fromEvent, merge} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {Veiculo} from '../../model/Veiculo';
import {VeiculosService} from '../../services/veiculo/veiculos.service';

import {ValidadorNumber} from '../../comum/validador-number';
import {ValidadorGenerico} from '../../comum/validador-generico';

@Component({
  selector: 'app-edicao-veiculo',
  templateUrl: './edicao-veiculo.component.html',
  styleUrls: ['./edicao-veiculo.component.css']
})
export class EdicaoVeiculoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(FormControlName, {read: ElementRef}) formInputElements: ElementRef[];

  pageTitle = 'Novo veículo';
  errorMessage: string;
  veiculoForm: FormGroup;

  veiculo: Veiculo;
  private sub: Subscription;

  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private validadorGenerico: ValidadorGenerico;


  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private veiculosService: VeiculosService) {

    this.validationMessages = {
      placa: {
        required: 'Placa é obrigatória.',
        minlength: 'Tamanho da placa deve ser 7.',
        maxlength: 'Tamanho da placa deve ser 7.'
      },
      chassi: {
        required: 'Chassi é obrigatório.',
        minlength: 'Tamanho do chassi deve ser 13.',
        maxlength: 'Tamanho da placa deve ser 13.'
      },
      renavam: {
        range: 'Número do Renavam deve estar entre 1 e 9999999999999.'
      },
      modelo: {
        required: 'Modelo é obrigatório.',
        minlength: 'Tamanho mínimo do modelo deve ser 1.',
        maxlength: 'Tamanho máximo do modelo deve ser 20.'
      },
      marca: {
        required: 'Marca é obrigatória.',
        minlength: 'Tamanho mínimo da marca deve ser 1.',
        maxlength: 'Tamanho máximo da marca deve ser 40.'
      },
      ano: {
        range: 'Ano dever estar entre 1900 e 2050.'
      },
    };

    this.validadorGenerico = new ValidadorGenerico(this.validationMessages);
  }

  ngOnInit(): void {
    this.veiculoForm = this.fb.group({
      placa: ['', [Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7)]],
      chassi: ['', [Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13)]],
      renavam: ['', [Validators.required,
        ValidadorNumber.range(1, 9999999999999)]],
      modelo: ['', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(20)]],
      marca: ['', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(40)]],
      ano: ['', [Validators.required,
        ValidadorNumber.range(1900, 2050)]]
    });

    this.sub = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        this.getById(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.veiculoForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(1000)
    ).subscribe(value => {
      this.displayMessage = this.validadorGenerico.processMessages(this.veiculoForm);
    });
  }

  getById(id: number): void {
    if (id === 0) {
      return;
    }
    this.veiculosService.getById(id)
      .then(veiculo => {
        this.display(veiculo);
      })
      .catch(erro => this.errorMessage = erro);
  }

  display(veiculo: Veiculo): void {
    if (this.veiculoForm) {
      this.veiculoForm.reset();
    }
    this.veiculo = veiculo;

    if (this.veiculo.id === 0) {
      this.pageTitle = 'Novo veículo';
    } else {
      this.pageTitle = `Editando o veículo de placa: ${this.veiculo.placa}`;
    }

    this.veiculoForm.patchValue({
      placa: this.veiculo.placa,
      ano: this.veiculo.ano,
      chassi: this.veiculo.chassi,
      marca: this.veiculo.marca,
      modelo: this.veiculo.modelo,
      renavam: this.veiculo.renavam,
    });
  }

  delete(): void {
    if (this.veiculo.id === 0) {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza de que deseja excluir o veículo de placa: ${this.veiculo.placa}?`)) {
        this.veiculosService.delete(this.veiculo.id)
          .then(resposta => this.onSaveComplete())
          .catch(erro => this.errorMessage = erro);
      }
    }
  }

  save(): void {
    if (this.veiculoForm.valid) {
      if (this.veiculoForm.dirty) {
        const p = {...this.veiculo, ...this.veiculoForm.value};

        if ((!p.id) || (p.id === 0)) {
          this.veiculosService.create(p)
            .then(response => this.onSaveComplete())
            .catch(erro => {
                this.errorMessage = 'Erro ao salvar os dados';
                console.error(erro);
              }
            );
        } else {
          this.veiculosService.update(p)
            .then(result => this.onSaveComplete())
            .catch(erro => this.errorMessage = erro);
        }
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Atenção, há erros a serem corrigidos antes de salvar.';
    }
  }

  onSaveComplete(): void {
    this.veiculoForm.reset();
    this.router.navigate(['/lista']);
  }

}
