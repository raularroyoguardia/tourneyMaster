import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JocListComponent } from './joc-list.component';

describe('JocListComponent', () => {
  let component: JocListComponent;
  let fixture: ComponentFixture<JocListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JocListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JocListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
