import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTerminarDerivarComponent } from './form-terminar-derivar.component';

describe('FormTerminarDerivarComponent', () => {
  let component: FormTerminarDerivarComponent;
  let fixture: ComponentFixture<FormTerminarDerivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTerminarDerivarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTerminarDerivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
