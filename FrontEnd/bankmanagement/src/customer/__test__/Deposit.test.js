import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { customerService } from '../../apiUrls';
import Deposit from '../Deposit';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../apiUrls', () => ({
  customerService: {
    deposit: jest.fn(),
  },
}));

describe('Deposit Component', () => {
  it('submits the deposit form with valid input', async () => {
   
    customerService.deposit.mockResolvedValue({
      data: 'Deposit successful',
    });

   
    const { getByLabelText, getByRole } = render(<MemoryRouter><Deposit /></MemoryRouter>);
   
    fireEvent.change(getByLabelText(/Amount/i), { target: { value: '1000' } });

    fireEvent.click(getByRole('button', { name: /Deposit/i }));

    await waitFor(() => {});

    expect(customerService.deposit).toHaveBeenCalledWith({
      amount: '1000',
    });

    expect(customerService.deposit).toHaveBeenCalledTimes(1)
   
  });

  it('handles errors during deposit', async () => {
    
    customerService.deposit.mockRejectedValue({
      response: {
        data: 'Invalid Amount',
      },
    });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { getByLabelText, getByRole } = render(<MemoryRouter><Deposit /></MemoryRouter>);
    fireEvent.change(getByLabelText(/Amount/i), { target: { value: '-2' } });
    fireEvent.click(getByRole('button', { name: /Deposit/i }));
    await waitFor(() => {});
    expect(customerService.deposit).toHaveBeenCalledWith({
      amount: '-2',
    });
    expect(alertMock).toHaveBeenCalledWith({ data: 'Invalid Amount' });

    
    alertMock.mockRestore();
})
})
