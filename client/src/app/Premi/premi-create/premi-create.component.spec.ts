import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiCreateComponent } from './premi-create.component';

describe('PremiCreateComponent', () => {
  let component: PremiCreateComponent;
  let fixture: ComponentFixture<PremiCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremiCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
