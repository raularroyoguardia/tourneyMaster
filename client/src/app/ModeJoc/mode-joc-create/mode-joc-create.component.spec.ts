import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeJocCreateComponent } from './mode-joc-create.component';

describe('ModeJocCreateComponent', () => {
  let component: ModeJocCreateComponent;
  let fixture: ComponentFixture<ModeJocCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeJocCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeJocCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
