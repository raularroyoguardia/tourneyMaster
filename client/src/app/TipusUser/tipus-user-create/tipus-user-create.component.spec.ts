import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipusUserCreateComponent } from './tipus-user-create.component';

describe('TipusUserCreateComponent', () => {
  let component: TipusUserCreateComponent;
  let fixture: ComponentFixture<TipusUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipusUserCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipusUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
