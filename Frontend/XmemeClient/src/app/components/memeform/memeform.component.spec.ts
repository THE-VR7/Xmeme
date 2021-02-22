import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemeformComponent } from './memeform.component';

describe('MemeformComponent', () => {
  let component: MemeformComponent;
  let fixture: ComponentFixture<MemeformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemeformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemeformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
