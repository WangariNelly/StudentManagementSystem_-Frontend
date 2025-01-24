import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerCheckerComponent } from './marker-checker.component';

describe('MarkerCheckerComponent', () => {
  let component: MarkerCheckerComponent;
  let fixture: ComponentFixture<MarkerCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkerCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkerCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
