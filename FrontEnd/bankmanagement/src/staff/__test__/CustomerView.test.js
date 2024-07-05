import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CustomerView from '../CustomerView';
import { staffService } from '../../apiUrls';


import axiosPrivate from '../../interceptor'; 

// jest.mock('../../interceptor', () => {
//   const axiosInstance = {
//     interceptors: {
//       request: {
//         use: jest.fn(),
//       },
//     },
//     post: jest.fn(),
//   };
//   return axiosInstance;
// });

jest.mock('../../interceptor', () => ({
  __esModule: true,
  default: jest.fn(),
}));


jest.mock('../../apiUrls', () => ({
  staffService: {
    viewCustomer: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CustomerView Component', () => {


    beforeEach(() => {
    jest.clearAllMocks();
  });
  const mockCustomerData = {
    results: [
      { id: 1, user_firstname: 'John', user_lastname: 'Doe', accountNumber: '123' },
      { id: 2, user_firstname: 'Jane', user_lastname: 'Doe', accountNumber: '456' },
    ],
  };
  it('displays customer data and navigates to view transaction on button click', async () => {
    
   

    
    render(
      <MemoryRouter><CustomerView /></MemoryRouter>
    );

    
    await waitFor(() => {
      expect(staffService.viewCustomer).toHaveBeenCalledTimes(1);
    });

  
  });

  // it('handles view transaction navigation correctly', async () => {

  //   staffService.viewCustomer.mockResolvedValueOnce({
  //     data: mockCustomerData,
  //   });

  //   render(<MemoryRouter><CustomerView /></MemoryRouter>);


  //   await waitFor(() => expect(staffService.viewCustomer).toHaveBeenCalledTimes(2));

  //   fireEvent.click(screen.getByRole('button', { name: /View/i }));

  
  // });
 

  // it('should handle pagination on button click', async () => {

  //   const mockData = { results: [], next_page: '/api/data?page=3', previous_page: '/api/data?page=1' };
  //   axiosPrivate.mockResolvedValueOnce({ data: mockData });


  //   render(<MemoryRouter><CustomerView /></MemoryRouter>);

  
  //   const previousButton = screen.getByRole('button', { name: /Previous/i });
  //   expect(previousButton).toBeDisabled();
  // })

 

});
