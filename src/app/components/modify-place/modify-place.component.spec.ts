import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPlaceComponent } from './modify-place.component';

describe('ModifyPlaceComponent', () => {
  let component: ModifyPlaceComponent;
  let fixture: ComponentFixture<ModifyPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPlaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
