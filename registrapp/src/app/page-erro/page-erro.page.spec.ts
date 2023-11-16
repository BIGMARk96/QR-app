import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageErroPage } from './page-erro.page';

describe('PageErroPage', () => {
  let component: PageErroPage;
  let fixture: ComponentFixture<PageErroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PageErroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
