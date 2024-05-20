import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.css'
})
export class HeroDetailsComponent implements OnInit {
  hero?: Hero;
  idHero?: number;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.idHero = Number(this.route.snapshot.paramMap.get('id'));
    this.fetchHero(this.idHero);
  }

  fetchHero(id: number): void {
    this.heroService.getHeroById(id).subscribe(
      hero => this.hero = hero
    )
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero){
      this.heroService.updateHero(this.hero).subscribe(
        () => this.goBack()
      )
    }
  }
}
