import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ManagerDash from '../ManagerDash'
import { useUser } from '../../context/UserContext';


jest.mock('../../context/UserContext', () => ({
  useUser: jest.fn(),
}));

describe('ManagerDash Component', () => {
  it('renders the CustomerDash component with user data', () => {
  
    const mockUser = {
         username: 'Anju',
    };

   
    useUser.mockReturnValue(mockUser);

    
    render(
      <MemoryRouter>
        <ManagerDash />
      </MemoryRouter>
    );

    expect(screen.getByText(`Welcome ${mockUser.username}`)).toBeInTheDocument();
  });
});
