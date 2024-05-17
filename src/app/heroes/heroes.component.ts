import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [
    UpperCasePipe,
    FormsModule,
    CommonModule,
    HeroDetailsComponent,
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {

  constructor(private messageService: MessageService) {}

  @Input() hero!: Hero;
  selectedHero?: Hero;

  onSelect(selectedHero: Hero): void {
    this.selectedHero = selectedHero;
    this.messageService.add('selected hero id : '+this.selectedHero.id)
  }
}
