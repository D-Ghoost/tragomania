import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Martini, Beer, WineOff } from 'lucide-angular';
import { CocktailComponent } from '../../../cocktails/components/cocktail/cocktail.component';
import { Cocktail } from '../../../shared/models/cocktail.model';
import { CocktailService } from '../../../shared/services/cocktail.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    LucideAngularModule, 
    CocktailComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    readonly Martini = Martini;
    readonly Beer = Beer;
    readonly WineOff = WineOff;

    cocktail = signal<Cocktail[]>([]);
    private cocktailService = inject(CocktailService);

    ngOnInit(): void {
        this.cocktailService.getCocktailsForLetter()
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
}
