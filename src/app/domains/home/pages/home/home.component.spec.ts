import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of, throwError } from 'rxjs';
import { CocktailService } from '../../../shared/services/cocktail.service';
import { Cocktail } from '../../../shared/models/cocktail.model';
import { RouterTestingModule } from '@angular/router/testing';
import { LucideAngularModule } from 'lucide-angular';
import { CocktailComponent } from '../../../cocktails/components/cocktail/cocktail.component';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCocktailService: jasmine.SpyObj<CocktailService>;

  const mockDrinks: Cocktail[] = Array.from({ length: 15 }, (_, i) => ({
    idDrink: i + 1,
    strDrink: `Drink ${i + 1}`,
    strDrinkThumb: `url_${i + 1}`,
  }));

  beforeEach(async () => {
    mockCocktailService = jasmine.createSpyObj('CocktailService', ['getCocktailsForLetter']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        LucideAngularModule,
        CocktailComponent
      ],
      declarations: [HomeComponent],
      providers: [
        { provide: CocktailService, useValue: mockCocktailService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    mockCocktailService.getCocktailsForLetter.and.returnValue(of({ drinks: mockDrinks }));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar al servicio y cargar los primeros 10 cócteles', () => {
    const result = component.cocktail();
    expect(mockCocktailService.getCocktailsForLetter).toHaveBeenCalled();
    expect(result.length).toBe(10);
    expect(result[0].strDrink).toBe('Drink 1');
  });

  it('debe desuscribirse correctamente al destruirse', () => {
    const spy = spyOn(component['cocktailSubscribe']!, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('debe manejar errores del servicio sin romper', () => {
    mockCocktailService.getCocktailsForLetter.and.returnValue(throwError(() => new Error('error de prueba')));
    const errorSpy = spyOn(console, 'error');

    component.ngOnInit();

    expect(errorSpy).toHaveBeenCalledWith(jasmine.any(Error));
  });
});
