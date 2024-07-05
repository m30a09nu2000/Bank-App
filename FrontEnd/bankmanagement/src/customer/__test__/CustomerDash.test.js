import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomerDash from '../CustomerDash';
import { useUser } from '../../context/UserContext';


jest.mock('../../context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('CustomerDash Component', () => {
  it('renders the CustomerDash component with user data', () => {
  
    const mockUser = {
         username: 'JohnDoe',
    };

    // Mock the useUser hook to return the mockUser
    useUser.mockReturnValue(mockUser);

    // Render the CustomerDash component
    render(
      <MemoryRouter>
        <CustomerDash />
      </MemoryRouter>
    );

    expect(screen.getByText(`Welcome ${mockUser.username}`)).toBeInTheDocument();
  });
});
