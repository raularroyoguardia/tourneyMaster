import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiListComponent } from './premi-list.component';

describe('PremiListComponent', () => {
  let component: PremiListComponent;
  let fixture: ComponentFixture<PremiListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
