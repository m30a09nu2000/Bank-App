import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import StaffDash from '../StaffDash';
import { useUser } from '../../context/UserContext';


jest.mock('../../context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('CustomerDash Component', () => {
  it('renders the CustomerDash component with user data', () => {
  
    const mockUser = {
         username: 'Ajay',
    };

   
    useUser.mockReturnValue(mockUser);

    
    render(
      <MemoryRouter>
        <StaffDash />
      </MemoryRouter>
    );

    expect(screen.getByText(`Welcome ${mockUser.username}`)).toBeInTheDocument();
  });
});
