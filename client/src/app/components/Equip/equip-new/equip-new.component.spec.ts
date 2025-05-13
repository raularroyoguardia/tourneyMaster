import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipNewComponent } from './equip-new.component';

describe('EquipNewComponent', () => {
  let component: EquipNewComponent;
  let fixture: ComponentFixture<EquipNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
