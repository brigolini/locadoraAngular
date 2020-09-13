import {Component, Inject, OnInit} from '@angular/core';
import {VeiculosService} from '../../services/veiculo/veiculos.service';

@Component({
  selector: 'app-lista-veiculo',
  templateUrl: './lista-veiculo.component.html',
  styleUrls: ['./lista-veiculo.component.css']
})
export class ListaVeiculoComponent implements OnInit {
  loading = true;
  veiculos = [];

  constructor(public veiculosService: VeiculosService) {
  }

  ngOnInit(): void {
    this.veiculosService.getVeiculos().then(value => {
      this.loading = false;
      this.veiculos = value;
    });
  }

}
