import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cocktail-details',
  imports: [],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.css'
})
export class CocktailDetailsComponent {
  @Input() idDrink: number | null = null;
}
