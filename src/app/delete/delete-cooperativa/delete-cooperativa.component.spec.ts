import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCooperativaComponent } from './delete-cooperativa.component';

describe('DeleteCooperativaComponent', () => {
  let component: DeleteCooperativaComponent;
  let fixture: ComponentFixture<DeleteCooperativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCooperativaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCooperativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
