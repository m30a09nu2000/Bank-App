import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { customerService } from '../../apiUrls';
import { MemoryRouter } from 'react-router-dom';
import Withdraw from '../Withdraw';

jest.mock('../../apiUrls', () => ({
  customerService: {
    withdraw: jest.fn(),
  },
}));



const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Withdraw Component', () => {
 
  it('submits the withdraw form with valid input', async () => {
    customerService.withdraw.mockResolvedValue({
      data: 'Withdraw success',
    });

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Withdraw />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/Amount/i), { target: { value: '100' } });

    fireEvent.click(getByRole('button', { name: /Withdraw/i }));

    await waitFor(() => {});

    expect(customerService.withdraw).toHaveBeenCalledWith({
      amount: '100',
    });
   
    expect(customerService.withdraw).toHaveBeenCalledTimes(1);

    

  })

  it('handles errors during withdraw', async () => {
    
    customerService.withdraw.mockRejectedValue({
      response: {
        data: 'Insufficient balance',
      },
    });
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    const { getByLabelText, getByRole } = render(<MemoryRouter><Withdraw /></MemoryRouter>);
    fireEvent.change(getByLabelText(/Amount/i), { target: { value: '2000' } });
    fireEvent.click(getByRole('button', { name: /Withdraw/i }));
    await waitFor(() => {});
    expect(customerService.withdraw).toHaveBeenCalledWith({
      amount: '2000',
    });
    expect(alertMock).toHaveBeenCalledWith({ data: 'Insufficient balance' });

    
    alertMock.mockRestore();
})

})