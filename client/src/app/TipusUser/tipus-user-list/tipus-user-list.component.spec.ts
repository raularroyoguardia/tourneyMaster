import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipusUserListComponent } from './tipus-user-list.component';

describe('TipusUserListComponent', () => {
  let component: TipusUserListComponent;
  let fixture: ComponentFixture<TipusUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipusUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipusUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
