import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmembersComponent } from './editmembers.component';

describe('EditmembersComponent', () => {
  let component: EditmembersComponent;
  let fixture: ComponentFixture<EditmembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
