import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificacioListComponent } from './classificacio-list.component';

describe('ClassificacioListComponent', () => {
  let component: ClassificacioListComponent;
  let fixture: ComponentFixture<ClassificacioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificacioListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificacioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
