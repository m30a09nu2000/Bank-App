import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { staffService } from '../../apiUrls'; 
import PendingAccount from '../PendingAccount';
import { MemoryRouter } from 'react-router-dom';



jest.mock('../../apiUrls', () => ({
  staffService: {
    pendingaccount: jest.fn(),
    updateaccount: jest.fn(),
  },
}));


describe('PendingAccount Component', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays pending account data', async () => {
    
    staffService.pendingaccount.mockResolvedValue({
      data: [
        { account_number: '123', status: 'pending', account_type: 'savings' },
        { account_number: '456', status: 'pending', account_type: 'current' },
      ],
    });

   
    render(<MemoryRouter><PendingAccount /></MemoryRouter>);

  
    await waitFor(() => {
        expect(staffService.pendingaccount).toHaveBeenCalledTimes(1);
        
    });
  });
 
  it('handles error  account approval', async () => {
    const mockAccountNumber = '123';
   
    const alertSpy = jest.spyOn(window, 'alert');
    render(<MemoryRouter><PendingAccount /></MemoryRouter>); 
  
    await waitFor(() => {
      const buttons = screen.getAllByTestId('button1');
    
      const button = buttons[0];
      userEvent.click(button);
  
  
    expect(staffService.pendingaccount).toHaveBeenCalledTimes(1);
    expect(staffService.updateaccount).toHaveBeenCalledWith({
      account_number:'123',
      status: 'approved',
    });
    
  });

  expect(alertSpy).toHaveBeenCalledWith('invalid Status');
  })

  it('handles error  account reject', async () => {
    const mockAccountNumber = '123';
  
    const alertSpy = jest.spyOn(window, 'alert');
    render(<MemoryRouter><PendingAccount /></MemoryRouter>); 
  
    await waitFor(() => {
      const buttons = screen.getAllByTestId('button2');
    
      const button = buttons[0];
      userEvent.click(button);
    });

   
  
    await waitFor(() => {
      expect(staffService.pendingaccount).toHaveBeenCalledTimes(1);
      expect(staffService.updateaccount).toHaveBeenCalledWith({
        account_number: mockAccountNumber,
        status: 'rejected',
      });
    });
  

    expect(alertSpy).toHaveBeenCalledWith('invalid Status');
    
  })

  it('handles account approval', async () => {
    const mockAccountNumber = '123';

    staffService.updateaccount.mockResolvedValueOnce({
      data: {
        account_number: mockAccountNumber,
        status: 'approved',
      },
    });

    const alertSpy = jest.spyOn(window, 'alert');

    render(
      <MemoryRouter>
        <PendingAccount />
      </MemoryRouter>
    );

    await waitFor(() => {
          const buttons = screen.getAllByTestId('button1');
        
          const button = buttons[0];
          userEvent.click(button);
    })

    expect(staffService.updateaccount).toHaveBeenCalledWith({
      account_number: mockAccountNumber,
      status: 'approved',
    });

    expect(alertSpy).toHaveBeenCalledWith('account approved successfully');
  });

  it('handles account rejection', async () => {
    const mockAccountNumber = '123';

    staffService.updateaccount.mockResolvedValueOnce({
      data: {
        account_number: mockAccountNumber,
        status: 'rejected',
      },
    });

    const alertSpy = jest.spyOn(window, 'alert');

    render(
      <MemoryRouter>
        <PendingAccount />
      </MemoryRouter>
    );
    await waitFor(() => {
          const buttons = screen.getAllByTestId('button2');
        
          const button = buttons[0];
          userEvent.click(button);
        });
    
    

    expect(staffService.updateaccount).toHaveBeenCalledWith({
      account_number: mockAccountNumber,
      status: 'rejected',
    });

    expect(alertSpy).toHaveBeenCalledWith('account rejected successfully');
  });
})
