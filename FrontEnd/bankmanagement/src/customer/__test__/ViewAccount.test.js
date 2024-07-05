import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import ViewAccount from '../ViewAccount';
import { customerService } from '../../apiUrls';
import Monthly from '../Monthly';

jest.mock('../../apiUrls', () => ({
  customerService: {
    viewaccount: jest.fn(),
    accountClose: jest.fn(),
  },
}));


const mockAlert = jest.fn();
global.alert = mockAlert;

describe('ViewAccount', () => {
  const mockAccountData = {
    'account number': '1234567890',
    status: 'Active',
    balance: 1000,
    account_type: 'Savings',
  };

  beforeEach(() => {
    
    jest.clearAllMocks();
    customerService.viewaccount.mockResolvedValueOnce({ data: mockAccountData });
  });

  it('closes the account successfully and alerts the user', async () => {
    customerService.accountClose.mockResolvedValueOnce({ data: 'account closed successfully' });

    render(
      <MemoryRouter>
        <ViewAccount />
      </MemoryRouter>
    );

    await waitFor(() => expect(customerService.viewaccount).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    await waitFor(() => expect(customerService.accountClose).toHaveBeenCalledTimes(1));

   
    expect(mockAlert).toHaveBeenCalledWith('account closed successfully');
  });

  it('handles the case when account closure fails and alerts the user', async () => {
    customerService.accountClose.mockRejectedValueOnce(new Error('account already closed'));

    render(
      <MemoryRouter>
        <ViewAccount />
      </MemoryRouter>
    );

    await waitFor(() => expect(customerService.viewaccount).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    await waitFor(() => expect(customerService.accountClose).toHaveBeenCalledTimes(1));

  
    expect(mockAlert).toHaveBeenCalledWith('account already closed');
  });

  it('handles the case when account closure requires withdrawal and alerts the user', async () => {
    customerService.accountClose.mockResolvedValueOnce({ data: 'please withdraw money' });

    render(
      <MemoryRouter>
        <ViewAccount />
      </MemoryRouter>
    );

    await waitFor(() => expect(customerService.viewaccount).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    await waitFor(() => expect(customerService.accountClose).toHaveBeenCalledTimes(1));

    
    expect(mockAlert).toHaveBeenCalledWith('please withdraw money then close account');

  });

  
})
 

