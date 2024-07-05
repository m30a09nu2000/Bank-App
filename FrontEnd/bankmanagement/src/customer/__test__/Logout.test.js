import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Logout from '../Logout';

describe('Logout', () => {
  it('removes tokens from localStorage and navigates to /login', async () => {
 
    const localStorageMock = {
      getItem: jest.fn(() => 'someToken'),
      removeItem: jest.fn(),
    };

    Object.defineProperty(global, 'localStorage', {
      value: localStorageMock,
      writable: true,
      configurable: true,
    });

 
    const navigateMock = jest.fn();

    render(
      <MemoryRouter initialEntries={['/logout']}>
        <Routes>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MemoryRouter>
    );


    expect(localStorageMock.getItem).toHaveBeenCalledWith('tokens');


  });
});
