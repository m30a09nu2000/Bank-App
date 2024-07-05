import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ViewStaff from '../ViewStaff';
import { managerService } from '../../apiUrls';
import { axiosPrivate } from '../../interceptor';

jest.mock('../../apiUrls', () => ({
  managerService: {
    viewStaff: jest.fn(),
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('../../interceptor', () => ({
  axiosPrivate: jest.fn(),
}));

describe('ViewStaff', () => {

    afterEach(() => {
        jest.clearAllMocks(); // Clears all function mocks between tests
      });
  const mockStaffData = {
    results: [
      { id: 1, user_firstname: 'John', user_lastname: 'Doe', email: 'john.doe@example.com', phone: '555-1234', user_address: '123 Main St' },
      { id: 2, user_firstname: 'Jane', user_lastname: 'Doe', email: 'jane.doe@example.com', phone: '555-5678', user_address: '456 Oak St' },
    ],
    next_page: '/api/staff/?page=2',
    previous_page: null,
  };

  it('fetches and displays staff data on mount', async () => {
    managerService.viewStaff.mockResolvedValueOnce({
      data: mockStaffData,
    });

    render(
      <MemoryRouter initialEntries={['/view-staff']}>
        <Routes>
          <Route path="/view-staff" element={<ViewStaff />} />
        </Routes>
      </MemoryRouter>
    );
  
    await waitFor(() => expect(managerService.viewStaff).toHaveBeenCalledTimes(1));

    
  });

  it('handles pagination on button click', async () => {
    managerService.viewStaff.mockResolvedValueOnce({
      data: mockStaffData,
    });

    axiosPrivate.mockResolvedValueOnce({
      data: {
        results: [
          { id: 3, user_firstname: 'Alice', user_lastname: 'Smith', email: 'alice.smith@example.com', phone: '555-9876', user_address: '789 Pine St' },
        ],
        next_page: '/api/staff/?page=3',
        previous_page: '/api/staff/?page=1',
      },
    });

    render(
      <MemoryRouter initialEntries={['/view-staff']}>
        <Routes>
          <Route path="/view-staff" element={<ViewStaff />} />
        </Routes>
      </MemoryRouter>
    );

    
    await waitFor(() => expect(managerService.viewStaff).toHaveBeenCalledTimes(1));
   
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
   
    await waitFor(() => expect(axiosPrivate).toHaveBeenCalledTimes(1));

    expect(screen.getByRole('button', { name: /Previous/i })).toBeEnabled();
  });

  it('calls handleUpdate when update button is clicked', () => {
    const data = {
      results: [
        { id: 1, user_firstname: 'John', user_lastname: 'Doe', email: 'john.doe@example.com', phone: '1234567890', user_address: '123 Main St' },
       
      ],
    };

    const handleUpdateMock = jest.fn();

    render(<ViewStaff data={data} handleUpdate={handleUpdateMock} />);

    data.results.forEach((item) => {
    
      const updateButton = screen.getByRole('button', { name: /update/i, exact: false, selector: `button[onClick*="handleUpdate(${item.id})"]` });

    
      fireEvent.click(updateButton);

   
      expect(handleUpdateMock).toHaveBeenCalledWith(item);
    });
})


})