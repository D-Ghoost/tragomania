import { Component, inject, Input, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { CocktailDetails } from '../../../shared/models/cocktailDetails.model';
import { CocktailService } from '../../../shared/services/cocktail.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-details',
  imports: [CommonModule],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.css'
})
export class CocktailDetailsComponent {
  @Input() idDrink: number | null = null;

  cocktailDetails =  signal({} as CocktailDetails); 
  private cocktailDetailSubscribe : Subscription | null = null;
  private cocktailDetailService = inject(CocktailService);

  ngOnInit(): void {

    this.cocktailDetailSubscribe = this.cocktailDetailService.getCocktailById( this.idDrink )
      .subscribe({
        next: ( res : CocktailDetails )  => {
          this.cocktailDetails.set(res);
        },
        error: ( err : any ) => {
          console.error('Error fetching cocktail details:', err);
          this.cocktailDetails.set({} as CocktailDetails);
        }
      });

  }

  ngOnDestroy(): void {
    if( this.cocktailDetailSubscribe ){
      this.cocktailDetailSubscribe.unsubscribe();
    }
  }
    
}
