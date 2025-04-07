import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneigEditComponent } from './torneig-edit.component';

describe('TorneigEditComponent', () => {
  let component: TorneigEditComponent;
  let fixture: ComponentFixture<TorneigEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorneigEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
