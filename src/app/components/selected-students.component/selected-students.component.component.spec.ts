import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedStudentsComponentComponent } from './selected-students.component.component';

describe('SelectedStudentsComponentComponent', () => {
  let component: SelectedStudentsComponentComponent;
  let fixture: ComponentFixture<SelectedStudentsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedStudentsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedStudentsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
