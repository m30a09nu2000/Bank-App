import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';



describe('App Component', () => {
  it('renders the App component correctly', () => {
   
    render(<MemoryRouter><App /></MemoryRouter>);

 
  });

 
});
