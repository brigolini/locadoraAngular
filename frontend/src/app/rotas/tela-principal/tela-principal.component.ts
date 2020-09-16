import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tela-principal',
  templateUrl: './tela-principal.component.html',
  styleUrls: ['./tela-principal.component.css']
})
export class TelaPrincipalComponent implements OnInit {

  menuOpen = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleMenu = () => {
    if (this.menuOpen) {
      document.getElementById('menu').style.width = '50px';
      document.getElementById('main').style.marginLeft = '50px';
    } else {
      document.getElementById('menu').style.width = '250px';
      document.getElementById('main').style.marginLeft = '250px';
    }
    this.menuOpen = !this.menuOpen;

  }


}
