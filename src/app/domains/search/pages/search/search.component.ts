import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CocktailService } from '../../../shared/services/cocktail.service';
import { Cocktail } from '../../../shared/models/cocktail.model';
import { CocktailCardComponent } from "../../../cocktails/components/cocktail-card/cocktail-card.component";

@Component({
  selector: 'app-search',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    CocktailCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  
    drinkName : string = ''; 
    cocktail = signal<Cocktail[]>([]);
    searchControl = new FormControl('',{
      nonNullable: true,
      validators:[
        Validators.required
      ]
    });
    queryToLink : string | null = null;

    private routeSubscription : Subscription | null = null;
    private cocktelSubscription : Subscription | null = null;
    private cocktailService = inject(CocktailService);
    
    constructor(private route : ActivatedRoute){
    }

    ngOnInit() : void{
      this.routeSubscription = this.route.queryParamMap.subscribe(
        (params) =>{
          const keyQuery = params.keys[0];
          if (keyQuery) {
            this.queryToLink = `${keyQuery}=${params.get(keyQuery)}`;
          }
        }
      );

      this.cocktelSubscription = this.cocktailService.getCocktailsForQuery( this.queryToLink )
      .subscribe({
        next : (data : { drinks : Cocktail[] }) => {
          this.cocktail.set(data.drinks);
        },
        error : (err : Error) => {
          console.error(err);
        }
      })

    }

    drinkHandler() : void{
      
      if( this.searchControl.invalid ) {
        return;
      }
      this.drinkName = this.searchControl.value;
      this.cocktailService.getCocktailsForInput( `${this.drinkName}` )
      .subscribe({
        next : (data : { drinks : Cocktail[] }) => {
          console.log(data.drinks);
          
          if ( Array.isArray(data.drinks) ) {
            this.cocktail.set(data.drinks);
          } else {
            this.cocktail.set([]);
          }
          console.log(Array.isArray(data.drinks));
          console.log(this.cocktail);
        },
        error : (err : Error) => {
          console.error(err);
        }
      })
    }

    ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe();
      this.cocktelSubscription?.unsubscribe();
    }
}
