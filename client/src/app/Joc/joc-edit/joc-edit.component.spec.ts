import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JocEditComponent } from './joc-edit.component';

describe('JocEditComponent', () => {
  let component: JocEditComponent;
  let fixture: ComponentFixture<JocEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JocEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JocEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
