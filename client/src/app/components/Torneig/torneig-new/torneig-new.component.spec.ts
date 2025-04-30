import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneigNewComponent } from './torneig-new.component';

describe('TorneigNewComponent', () => {
  let component: TorneigNewComponent;
  let fixture: ComponentFixture<TorneigNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneigNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneigNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
