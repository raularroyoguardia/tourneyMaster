import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidaEditComponent } from './partida-edit.component';

describe('PartidaEditComponent', () => {
  let component: PartidaEditComponent;
  let fixture: ComponentFixture<PartidaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartidaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
