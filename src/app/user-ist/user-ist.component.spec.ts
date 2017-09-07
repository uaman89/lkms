import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserIstComponent } from './user-ist.component';

describe('UserIstComponent', () => {
  let component: UserIstComponent;
  let fixture: ComponentFixture<UserIstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserIstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
