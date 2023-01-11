import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TryAppComponent } from './try-app.component';

describe('TryAppComponent', () => {
  let component: TryAppComponent;
  let fixture: ComponentFixture<TryAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TryAppComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TryAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
