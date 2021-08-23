import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private roter: Router
  ) { }

  ngOnInit() {


  }

  home() {

    window.scroll(0, 0)

  }

  sobreNos() {

    window.scroll(0, 650)

  }

  comoFunciona() {

    window.scroll(0, 1550)

  }

  parceiros() {

    window.scroll(0, 3850)

  }

  contato() {

    window.scroll(0, 5500)

  }



}
