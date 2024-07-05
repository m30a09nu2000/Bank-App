import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { customerService } from '../../apiUrls';
import userEvent from '@testing-library/user-event';
import Monthly from '../Monthly';
import { axiosPrivate } from '../../interceptor';

jest.mock('../../apiUrls', () => ({
  customerService: {
    transactionHistoryMonthly:jest.fn(),
  downloadHistoryMonthly: jest.fn(),
  },
}));

jest.mock('../../interceptor', () => ({
    __esModule: true,
    default: jest.fn(),
  }));
  

describe('Monthly Transaction History', () => {
    const mockedResponseData = 'mocked CSV data';
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('monthly transactions', async () => {
    const mockData = {
        results: [
          {
            id: 1,
            transaction_type: 'Deposit',
            amount: 100,
            balance: 200,
            timestamp: '2023-11-16T12:00:00Z',
          },
          
        ],
        next_page:'/api/transactions/?page=2',
        previous_page: null,
      };
      customerService.transactionHistoryMonthly.mockResolvedValue({ data: mockData });

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Monthly />
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/Monthly Transaction History/i), { target: { value: '10' } });
    fireEvent.click(getByRole('button', { name: /View/i }));

    await waitFor(() => {});

    expect(customerService.transactionHistoryMonthly).toHaveBeenCalledTimes(1)
    await waitFor(() => {
        expect(screen.getByText('Transaction Type')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('Balance')).toBeInTheDocument();
        expect(screen.getByText('Timestamp')).toBeInTheDocument();
        expect(screen.getByText('Deposit')).toBeInTheDocument();
        expect(screen.getByText('100')).toBeInTheDocument();
        expect(screen.getByText('200')).toBeInTheDocument();
        expect(screen.getByText('2023-11-16T12:00:00Z')).toBeInTheDocument();
      });
  });

  it('shows an alert if month is not selected', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <Monthly />
      </MemoryRouter>
    );

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    fireEvent.click(getByRole('button', { name: /View/i }));

    expect(alertMock).toHaveBeenCalledWith('Please select month' );
  });

it('it calls download service and performs download logic', async () => {
    const mockData = {
      data: ' CSV data', 
    };

 
    customerService.downloadHistoryMonthly.mockResolvedValueOnce(mockData);

    render(<Monthly />);

   
    fireEvent.change(screen.getByLabelText(/Monthly Transaction History/i), { target: { value: '10' } });

 
    fireEvent.click(screen.getByText(/Download/i));
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const createObjectURLMock = jest.fn(() => 'mockedURL');
    const originalCreateObjectURL = window.URL.createObjectURL;
    window.URL.createObjectURL = createObjectURLMock;

    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');
    await waitFor(() => {
        expect(customerService.downloadHistoryMonthly).toHaveBeenCalledTimes(1);
    });
   
    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

   
    window.URL.createObjectURL = originalCreateObjectURL;
    

})



  
})