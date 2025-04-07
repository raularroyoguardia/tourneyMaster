import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiEditComponent } from './premi-edit.component';

describe('PremiEditComponent', () => {
  let component: PremiEditComponent;
  let fixture: ComponentFixture<PremiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
