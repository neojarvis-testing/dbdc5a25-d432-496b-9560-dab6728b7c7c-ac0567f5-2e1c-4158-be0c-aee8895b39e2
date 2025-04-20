import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Import the component to be tested

import { UserViewFeedbackComponent } from './user-view-feedback.component';

describe('UserViewFeedbackComponent', () => {
  let component: UserViewFeedbackComponent;
  let fixture: ComponentFixture<UserViewFeedbackComponent>;
// Import necessary modules
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, FormsModule],
      declarations: [ UserViewFeedbackComponent ]
    })
    .compileComponents();// Compile the components
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewFeedbackComponent);
    component = fixture.componentInstance;// Get component instance
    fixture.detectChanges();// Trigger initial data binding and change detection
  });
// Test case to check if the component is created successfully
  fit('Frontend_should_create_user_view_feedback_component', () => {
    expect(component).toBeTruthy();
  });
// Test case to check if the component contains the 'My Feedback' heading
  fit('Frontend_should_contain_my_feedback_heading_in_the_user_view_feedback_component', () => {
    const componentHTML = fixture.debugElement.nativeElement.outerHTML;
    expect(componentHTML).toContain('My Feedback');// Assert that the HTML contains 'My Feedback'
  });
});
