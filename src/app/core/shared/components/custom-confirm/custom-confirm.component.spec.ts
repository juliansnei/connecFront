import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConfirmComponent } from './custom-confirm.component';

describe('CustomConfirmComponent', () => {
  let component: CustomConfirmComponent;
  let fixture: ComponentFixture<CustomConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
