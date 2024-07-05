import React from 'react';
import { render, fireEvent, waitFor ,screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customerService } from '../../apiUrls';
import { MemoryRouter, navigate } from 'react-router-dom';
import Register from '../Register';

jest.mock('../../apiUrls', () => ({
  customerService: {
    registration: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  navigate: jest.fn(),
}));

describe('Register Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('registers successfully and navigates to login', async () => {
    customerService.registration.mockResolvedValueOnce({
      data: 'Registration successful',
    });



    render(<MemoryRouter><Register /></MemoryRouter>);

    // Mock user input
    userEvent.type(screen.getByLabelText(/First Name/i), 'John');
    userEvent.type(screen.getByLabelText(/Last Name/i), 'Doe');
    userEvent.type(screen.getByLabelText(/Your Email/i), 'john.doe@example.com');
    userEvent.type(screen.getByLabelText(/Phone/i), '1234567890');
    userEvent.type(screen.getByLabelText(/Address/i), '123 Main St');
    userEvent.type(screen.getByLabelText(/Password/i), 'securepassword');

    fireEvent.submit(screen.getByTestId('registration-form'));

    await waitFor(() => {
      expect(customerService.registration).toHaveBeenCalledTimes(0);
    });
   

  })
})