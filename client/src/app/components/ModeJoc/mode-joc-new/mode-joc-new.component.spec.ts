import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeJocNewComponent } from './mode-joc-new.component';

describe('ModeJocNewComponent', () => {
  let component: ModeJocNewComponent;
  let fixture: ComponentFixture<ModeJocNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeJocNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeJocNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
