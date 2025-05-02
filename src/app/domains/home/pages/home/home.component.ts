import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Martini, Beer, WineOff } from 'lucide-angular';
import { CocktailComponent } from '../../../cocktails/components/cocktail/cocktail.component';
import { Cocktail } from '../../../shared/models/cocktail.model';
import { CocktailService } from '../../../shared/services/cocktail.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    LucideAngularModule, 
    CocktailComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    readonly Martini = Martini;
    readonly Beer = Beer;
    readonly WineOff = WineOff;

    cocktail = signal<Cocktail[]>([]);
    private cocktailSubscribe : Subscription | null = null;
    private cocktailService = inject(CocktailService);

    ngOnInit(): void {
      this.cocktailSubscribe = this.cocktailService.getCocktailsForLetter()
        .subscribe({
          next : (data : { drinks : Cocktail[] }) => {
            const initDriks : Cocktail[] = data.drinks.slice(0, 10);
            this.cocktail.set(initDriks);
          },
          error : (err : Error) => {
            console.error(err);
          }
        });
    }

    ngOnDestroy() : void{
      if (this.cocktailSubscribe) {
        this.cocktailSubscribe.unsubscribe();
      }
    }
}
