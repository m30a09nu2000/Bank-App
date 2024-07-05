import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProvider, useUser } from '../UserContext'; // Replace with your actual file path

// Mock a component that uses the useUser hook to display the username
const UserContext = () => {
  const { username } = useUser();
  return <div>{username}</div>;
};

describe('UserProvider', () => {
  it('provides the username to components using the useUser hook', () => {
    const testUsername = 'testUser';

    // Render the component within the UserProvider
    render(
      <UserProvider>
        <UserContext />
      </UserProvider>
    );

    // Set the username in the context
    localStorage.setItem(testUsername, JSON.stringify({ username: testUsername }));
;
  });

  it('renders the username correctly', () => {
    // Mock the stored tokens
    const storedTokens = JSON.stringify({ username: 'testUser' });
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => storedTokens),
      },
      writable: true,
    });

    // Render the component with the UserProvider
    render(
      <UserProvider>
        <div>Test Component</div>
      </UserProvider>
    );


  });
});
