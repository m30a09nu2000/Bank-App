import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { customerService } from '../../apiUrls';
import CreateAccount from '../CreateAccount';

jest.mock('../../apiUrls', () => ({
  customerService: {
    createaccount: jest.fn(),
  },
}));

describe('CreateAccount Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits the create account form with valid input', async () => {
    customerService.createaccount.mockResolvedValue({
      data: 'Account Created Successfully',
    });

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/Account Type/i), { target: { value: 'savings' } });
    fireEvent.click(getByRole('button', { name: /Create Account/i }));

    await waitFor(() => {});

    expect(customerService.createaccount).toHaveBeenCalledWith({ account_type: 'savings' });

  });

  it('shows an alert if no account type is selected', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    fireEvent.click(getByRole('button', { name: /Create Account/i }));

    expect(alertMock).toHaveBeenCalledWith('Please select an account type' );
  });


  it('shows an alert if account creation fails', async () => {
    customerService.createaccount.mockRejectedValue({
      response: {
        data: 'Account Already exist !!!',
      },
    });

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    fireEvent.change(getByLabelText(/Account Type/i), { target: { value: 'savings' } });
   
    fireEvent.click(getByRole('button', { name: /Create Account/i }));
    await waitFor(() => {});
    expect(alertMock).toHaveBeenCalledWith("Account Already exist !!!");
  });

})