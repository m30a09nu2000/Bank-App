import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UpdateCustomer from '../UpdateCustomer';
import { managerService } from '../../apiUrls';

jest.mock('../../apiUrls', () => ({
  managerService: {
    updateCustomer: jest.fn(),
  },
}));

describe('UpdateCustomer', () => {
  const mockLocationState = {
    user_firstname: 'anil',
    user_lastname: 'tr',
    user_address: 'kochi',
    email: 'anil@gmail.com.com',
    phone: '9872351099',
  };

  it('updates customer data on form submission', async () => {
    
    managerService.updateCustomer.mockResolvedValueOnce({
      data: 'Updated successfully',
    });

    const alertSpy = jest.spyOn(window, 'alert');

    render(
      <MemoryRouter initialEntries={[{ pathname: '/update-customer', state: mockLocationState }]}>
        <Routes>
          <Route path="/update-customer" element={<UpdateCustomer />} />
        </Routes>
      </MemoryRouter>
    );

   

    fireEvent.submit(screen.getByRole('button'));

    
    await waitFor(() => expect(managerService.updateCustomer).toHaveBeenCalledTimes(1))

    expect(alertSpy).toHaveBeenCalledWith('updated successfully');

    
    alertSpy.mockRestore();
  });

  it('updates formValue state on input change', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/update-customer', state: mockLocationState }]}>
        <Routes>
          <Route path="/update-customer" element={<UpdateCustomer />} />
        </Routes>
      </MemoryRouter>
    );

 
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { name: 'user_firstname', value: 'Anil' } });

    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Anil');
  });
 
  it('handles error when updating customer', async () => {
    const errorMessage = 'An error occurred during the update process';
    
    
    managerService.updateCustomer.mockRejectedValueOnce(new Error(errorMessage));
    const alertSpy = jest.spyOn(window, 'alert');
    render(
      <MemoryRouter initialEntries={[{ pathname: '/update-customer', state: mockLocationState }]}>
        <Routes>
          <Route path="/update-customer" element={<UpdateCustomer />} />
        </Routes>
      </MemoryRouter>
    );
    
    fireEvent.submit(screen.getByRole('button'));
    
  });

});
