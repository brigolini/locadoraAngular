import {Component, Inject, OnInit} from '@angular/core';
import {VeiculosService} from '../../services/veiculo/veiculos.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-lista-veiculo',
  templateUrl: './lista-veiculo.component.html',
  styleUrls: ['./lista-veiculo.component.css']
})
export class ListaVeiculoComponent implements OnInit {
  loading = true;
  veiculos = [];

  constructor(public veiculosService: VeiculosService, private router: Router) {
  }

  ngOnInit(): void {
    this.veiculosService.getAll().then(value => {
      this.loading = false;
      this.veiculos = value;
    });
  }

  editVeiculo(id: number): void {
    this.router.navigate([`/edicao/${id}`]);
  }


}
