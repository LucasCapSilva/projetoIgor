import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Parallax2Component } from './parallax2.component';

describe('Parallax2Component', () => {
  let component: Parallax2Component;
  let fixture: ComponentFixture<Parallax2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Parallax2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Parallax2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
