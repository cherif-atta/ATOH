import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeroService } from '../hero.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300 ms after each keystrouk before considering the new term
      debounceTime(300),

      // ignore new terms if same as previous term
      distinctUntilChanged(),

      // switch to new observable search each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term))
    )
  }
}
