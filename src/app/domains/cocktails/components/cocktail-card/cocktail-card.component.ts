import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cocktail',
  imports: [CommonModule],
  templateUrl: './cocktail-card.component.html'
})
export class CocktailCardComponent {
  @Input() idDrink : number = 0;
  @Input() name : string = '';
  @Input() imgUrl : string = '';
  @Input() alt : string = `Image to ${this.name}`;
  @Input() additionalClass : string  = '';
  private router : Router = inject(Router);

  cocktailDetails( idDrink : number){
      this.router.navigate(['cocktail', idDrink]);
  }
}
