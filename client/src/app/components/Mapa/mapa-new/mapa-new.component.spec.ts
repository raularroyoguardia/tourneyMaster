import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaNewComponent } from './mapa-new.component';

describe('MapaNewComponent', () => {
  let component: MapaNewComponent;
  let fixture: ComponentFixture<MapaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
