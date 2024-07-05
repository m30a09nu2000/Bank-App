import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios'; // Mocked Axios
import TransactionHistory from '../TransactionHistory';
import { customerService } from '../../apiUrls';
import  axiosPrivate  from '../../interceptor';
import userEvent from '@testing-library/user-event';

jest.mock('../../interceptor', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../apiUrls', () => ({
  customerService: {
    transactionHistory: jest.fn(),
    downloadHistory: jest.fn(),
  },
}));

describe('TransactionHistory Component', () => {

 
  const mockedResponseData = 'mocked CSV data';
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders transaction history data', async () => {
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

    customerService.transactionHistory.mockResolvedValue({ data: mockData });
    
    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );

    
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

  it('handles download correctly', async () => {
    
    customerService.downloadHistory.mockResolvedValue({
      status: 200,
      data: mockedResponseData,
    });
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    const createObjectURLMock = jest.fn(() => 'mockedURL');
    const originalCreateObjectURL = window.URL.createObjectURL;
    window.URL.createObjectURL = createObjectURLMock;

    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    const removeChildSpy = jest.spyOn(document.body, 'removeChild');

    render(<MemoryRouter><TransactionHistory /></MemoryRouter>);

  
    userEvent.click(screen.getByRole('button', { name: 'Download' }));  
    await waitFor(() => {
      expect(customerService.downloadHistory).toHaveBeenCalledTimes(1);
    });
  
    expect(appendChildSpy).toHaveBeenCalled();
    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
    expect(clickSpy).toHaveBeenCalled();
    expect(removeChildSpy).toHaveBeenCalled();

    window.URL.createObjectURL = originalCreateObjectURL;
    
  });
  

  it('handles pagination on button click', async () => {
   
    axiosPrivate.mockResolvedValueOnce({
      data: {
        results: [
          { id: 1, transaction_type: 'Deposit', amount: 100, balance: 200, timestamp: '2023-11-16T12:00:00Z' },
        ],
        next_page: '/api/transactions/?page=2',
        previous_page: null,
      },
    });
  
  
    axiosPrivate.mockResolvedValueOnce({
      data: {
        results: [
          { id: 2, transaction_type: 'Withdraw', amount: 200, balance: 100, timestamp: '2023-12-16T12:00:00Z' },
        ],
        next_page: '/api/transactions/?page=3',
        previous_page: '/api/transactions/?page=1',
      },
    });
  

    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText('Deposit'));

    // Check if the table renders the expected data
    expect(screen.getByText('Deposit')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('2023-11-16T12:00:00Z')).toBeInTheDocument();
    
    
   
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
   
    await waitFor(() => screen.getByText('Withdraw'));
   
    expect(screen.getByText('Withdraw')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    
    
  

  });

  it('displays alert for "Transaction not exist"', async () => {
    
    customerService.transactionHistory.mockResolvedValueOnce({
      data: 'Transaction not exist',
    });

    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );


    
  });  

  it('displays alert for error', async () => {
   
    customerService.transactionHistory.mockRejectedValueOnce({
      data: 'Error message',
    });

 
    const originalAlert = window.alert;
    window.alert = jest.fn();

    render(
      <MemoryRouter>
        <TransactionHistory />
      </MemoryRouter>
    );

  
  });

  it('handles error in download', async () => {
   
    customerService.downloadHistory.mockRejectedValueOnce({
      data : 'Internal Server Error'
    });

   
    const originalError = console.error;
    console.error = jest.fn();

  
    render(<MemoryRouter><TransactionHistory /></MemoryRouter>);


    userEvent.click(screen.getByRole('button', { name: 'Download' }));

  
    await waitFor(() => {});

    
    expect(console.error).toHaveBeenCalledWith({data :'Internal Server Error'});

   
  });

 
})

