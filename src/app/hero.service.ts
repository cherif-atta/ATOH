import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { heroesList } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    const heroes = of(heroesList);
    this.messageService.add('heroService: fetched heroes')
    return heroes;
  }
}
