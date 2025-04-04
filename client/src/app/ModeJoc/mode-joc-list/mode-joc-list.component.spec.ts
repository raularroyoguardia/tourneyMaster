import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeJocListComponent } from './mode-joc-list.component';

describe('ModeJocListComponent', () => {
  let component: ModeJocListComponent;
  let fixture: ComponentFixture<ModeJocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeJocListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeJocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
