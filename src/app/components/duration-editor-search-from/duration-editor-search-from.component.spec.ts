import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationEditorSearchFromComponent } from './duration-editor-search-from.component';

describe('DurationEditorSearchFromComponent', () => {
  let component: DurationEditorSearchFromComponent;
  let fixture: ComponentFixture<DurationEditorSearchFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DurationEditorSearchFromComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationEditorSearchFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
