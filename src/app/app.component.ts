import { Component, OnInit } from '@angular/core';
import { HeroesComponent } from './heroes/heroes.component';
import { CommonModule } from '@angular/common';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import { MessagesComponent } from './messages/messages.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeroesComponent,
    CommonModule,
    MessagesComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private heroService: HeroService){}

  title = 'Tour of Heroes';
  heroes: Hero[] = [];
  
  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => this.heroes = heroes
    )
  }
  
}
