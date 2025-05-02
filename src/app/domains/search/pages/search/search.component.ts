import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LucideAngularModule, Search } from 'lucide-angular';
import { CocktailService } from '../../../shared/services/cocktail.service';
import { Cocktail } from '../../../shared/models/cocktail.model';
import { CocktailComponent } from "../../../cocktails/components/cocktail/cocktail.component";

@Component({
  selector: 'app-search',
  imports: [CommonModule, LucideAngularModule, CocktailComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  

    readonly Search = Search;

    cocktail = signal<Cocktail[]>([]);
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

    ngOnDestroy() : void{
      if (this.routeSubscription || this.cocktelSubscription) {
        this.routeSubscription?.unsubscribe();
        this.cocktelSubscription?.unsubscribe();
      }
    }
}
