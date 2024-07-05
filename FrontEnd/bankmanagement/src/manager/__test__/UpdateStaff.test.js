import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import UpdateStaff from '../UpdateStaff';
import { managerService } from '../../apiUrls';

jest.mock('../../apiUrls', () => ({
  managerService: {
    updateStaff: jest.fn(),
  },
}));

describe('UpdateStaff', () => {
  const mockLocationState = {
    user_firstname: 'sanil',
    user_lastname: 'das',
    user_address: 'kochi',
    email: 'sanil@gmail.com',
    phone: '9823678211',
  };

  it('updates formValue state on input change', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/update-staff', state: mockLocationState }]}>
        <Routes>
          <Route path="/update-staff" element={<UpdateStaff />} />
        </Routes>
      </MemoryRouter>
    );

 
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { name: 'user_firstname', value: 'Sanil' } });

    
    expect(screen.getByLabelText(/First Name/i)).toHaveValue('Sanil');
  });

  it('submits form and displays success message', async () => {
    managerService.updateStaff.mockResolvedValueOnce({
      data: 'Updated successfully',
    });

    render(
      <MemoryRouter initialEntries={[{ pathname: '/update-staff', state: mockLocationState }]}>
        <Routes>
          <Route path="/update-staff" element={<UpdateStaff />} />
        </Routes>
      </MemoryRouter>
    );


    fireEvent.submit(screen.getByRole('button', { name: /Update/i }));

  
    await waitFor(() => expect(managerService.updateStaff).toHaveBeenCalledTimes(1));


  });

  it('handles error when updating staff', async () => {
    const errorMessage = 'An error occurred during the update process'; 
    
    managerService.updateStaff.mockRejectedValueOnce(new Error(errorMessage));
    const alertSpy = jest.spyOn(window, 'alert');
    render(
      <MemoryRouter initialEntries={[{ pathname: '/update-staff', state: mockLocationState }]}>
        <Routes>
          <Route path="/update-staff" element={<UpdateStaff />} />
        </Routes>
      </MemoryRouter>
    );
    
    fireEvent.submit(screen.getByRole('button'));
    
  });
})