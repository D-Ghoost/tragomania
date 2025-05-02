import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CocktailService } from '../../../shared/services/cocktail.service';
import { Cocktail } from '../../../shared/models/cocktail.model';
import { LucideAngularModule } from 'lucide-angular';
import { CocktailComponent } from '../../../cocktails/components/cocktail/cocktail.component';
import { CommonModule } from '@angular/common';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;

  const mockParams = of({
    keys: ['c'],
    get: (key: string) => (key === 'c' ? 'Cocktail' : null)
  } as any);

  const mockDrinks: Cocktail[] = Array.from({ length: 3 }, (_, i) => ({
    idDrink: i + 1,
    strDrink: `Drink ${i + 1}`,
    strDrinkThumb: `url_${i + 1}`,
    strCategory: 'Cocktail',
    strAlcoholic: 'Alcoholic',
    strGlass: 'Highball glass'
  }));

  beforeEach(async () => {
    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getCocktailsForQuery']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        LucideAngularModule,
        CocktailComponent
      ],
      declarations: [SearchComponent],
      providers: [
        { provide: CocktailService, useValue: mockCocktailService },
        { provide: ActivatedRoute, useValue: { queryParamMap: mockParams } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockCocktailService.getCocktailsForQuery.and.returnValue(of({ drinks: mockDrinks }));

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe construir correctamente queryToLink desde los params', () => {
    expect(component['queryToLink']).toBe('c=Cocktail');
  });

  it('debe llamar al servicio con la query y establecer resultados', () => {
    expect(mockCocktailService.getCocktailsForQuery).toHaveBeenCalledWith('c=Cocktail');
    expect(component.cocktail().length).toBe(3);
    expect(component.cocktail()[0].strDrink).toBe('Drink 1');
  });

  it('debe manejar error si el servicio falla', () => {
    mockCocktailService.getCocktailsForQuery.and.returnValue(throwError(() => new Error('error')));
    const errorSpy = spyOn(console, 'error');

    component.ngOnInit();

    expect(errorSpy).toHaveBeenCalledWith(jasmine.any(Error));
  });

  it('debe desuscribirse correctamente en ngOnDestroy', () => {
    const unsubscribe1 = spyOn(component['routeSubscription']!, 'unsubscribe');
    const unsubscribe2 = spyOn(component['cocktelSubscription']!, 'unsubscribe');

    component.ngOnDestroy();

    expect(unsubscribe1).toHaveBeenCalled();
    expect(unsubscribe2).toHaveBeenCalled();
  });
});
