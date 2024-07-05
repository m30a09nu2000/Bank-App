import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { managerService } from '../../apiUrls';
import ViewCustomer from '../ViewCustomer'; 
import { axiosPrivate } from '../../interceptor';

jest.mock('../../apiUrls');

jest.mock('../../interceptor');


describe('ViewCustomer', () => {

  const mockedError = new Error('Mocked error message');


  const mockedData = {
    results: [
      {
        id: 1,
        user_firstname: 'John',
        user_lastname: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        balance: 1000,
        user_address: '123 Main St',
        accountNumber: 'ABC123',
        accountStatus: 'Active',
      },
    ],
    next_page: '/api/customers/?page=2',
    previous_page: '/api/customers/?page=1',
  };


  beforeEach(() => {
    managerService.viewCustomer.mockResolvedValueOnce({ data: { results: mockedData } });
  });

  it('displays user data in the table', async () => {
    render(
      <MemoryRouter>
        <ViewCustomer />
      </MemoryRouter>
    );


    await waitFor(() => screen.getByTestId('table1'));

    const mockedSecondPageData = {
      results: [
        {
          id: 2,
          user_firstname: 'Jane',
          user_lastname: 'Doe',
          email: 'jane.doe@example.com',
          phone: '9876543210',
          balance: 1500,
          user_address: '456 Oak St',
          accountNumber: 'XYZ789',
          accountStatus: 'Active',
        },
      ],
      next_page: '/api/customers/?page=3',
      previous_page: '/api/customers/?page=1',
    };

    axiosPrivate.mockResolvedValueOnce(mockedSecondPageData);

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

   
  });

 })

 describe('ViewCustomer', () => {
  const mockedError = new Error('Mocked error message');

  beforeEach(() => {
    managerService.viewCustomer.mockRejectedValueOnce(mockedError);
  });

  it('handles error in fetchData', async () => {
    render(
      <MemoryRouter>
        <ViewCustomer />
      </MemoryRouter>
    );
    await waitFor(() => {
     expect(managerService.viewCustomer).toHaveBeenCalledTimes(2)
    });
  });
})