import { TestBed } from '@angular/core/testing';
import { LOCALE_ID } from '@angular/core';
import { TodoPageComponent } from './todo-page.component';

describe('TodoPageComponent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the source locale content by default', async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Plan your day with a fast, local-first todo board.');
  });

  it('points the locale switch to the French variant for English builds', async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'en-US' }]
    }).compileComponents();

    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const frenchLink = fixture.nativeElement.querySelector('a[hreflang="fr"]') as HTMLAnchorElement;
    expect(frenchLink.getAttribute('href')).toBe('/fr');
  });

  it('points the locale switch back to the English variant for French builds', async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'fr' }]
    }).compileComponents();

    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const englishLink = fixture.nativeElement.querySelector('a[hreflang="en"]') as HTMLAnchorElement;
    expect(englishLink.getAttribute('href')).toBe('/');
  });

  it('renders French copy for French locale builds', async () => {
    await TestBed.configureTestingModule({
      imports: [TodoPageComponent],
      providers: [{ provide: LOCALE_ID, useValue: 'fr' }]
    }).compileComponents();

    const fixture = TestBed.createComponent(TodoPageComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Planifiez votre journee avec un tableau de taches rapide et local.');
  });
});
