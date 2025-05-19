import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JocNewComponent } from './joc-new.component';

describe('JocNewComponent', () => {
  let component: JocNewComponent;
  let fixture: ComponentFixture<JocNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JocNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JocNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
