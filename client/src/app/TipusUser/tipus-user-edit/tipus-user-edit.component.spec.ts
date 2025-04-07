import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipusUserEditComponent } from './tipus-user-edit.component';

describe('TipusUserEditComponent', () => {
  let component: TipusUserEditComponent;
  let fixture: ComponentFixture<TipusUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipusUserEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipusUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
