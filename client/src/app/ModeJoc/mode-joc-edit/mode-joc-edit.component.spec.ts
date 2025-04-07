import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeJocEditComponent } from './mode-joc-edit.component';

describe('ModeJocEditComponent', () => {
  let component: ModeJocEditComponent;
  let fixture: ComponentFixture<ModeJocEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeJocEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeJocEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
