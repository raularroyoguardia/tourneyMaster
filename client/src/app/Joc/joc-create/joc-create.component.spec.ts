import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JocCreateComponent } from './joc-create.component';

describe('JocCreateComponent', () => {
  let component: JocCreateComponent;
  let fixture: ComponentFixture<JocCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JocCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JocCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
