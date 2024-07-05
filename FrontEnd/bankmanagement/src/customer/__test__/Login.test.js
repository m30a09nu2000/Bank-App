

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter,useNavigate } from 'react-router-dom';
import Login from '../Login';
import { customerService } from '../../apiUrls';

jest.mock('../../apiUrls', () => ({
  customerService: {
    login: jest.fn(),
  },
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('Login Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('button in the component', () => {
   
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
      
    );
    expect(screen.getByRole("button")).toBeInTheDocument()

    
});

it("should render button with given name", () => {
  render(<MemoryRouter>
      <Login />
  </MemoryRouter>)
  const loginButton = screen.getByRole("button", { name: /sign in/i })
  expect(loginButton).toBeInTheDocument()

  expect(loginButton).toHaveTextContent(/sign in/i)

  
})

it('updates input fields correctly', () => {
  render(<MemoryRouter>
      <Login />
  </MemoryRouter>)
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'customer@gmail.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'customer123' } });
  expect(screen.getByLabelText(/Email/i)).toHaveValue('customer@gmail.com');
  expect(screen.getByLabelText(/Password/i)).toHaveValue('customer123');
});

it ("password input should be empty", () =>{

  render(<MemoryRouter><Login /></MemoryRouter>)

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput.value).toBe("")
})
  
it ("email input should be empty", () =>{

  render(<MemoryRouter><Login /></MemoryRouter>)

  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput.value).toBe("")
})

  it('submits the login form with valid input', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'jojo@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'jojo123' } });

   
    fireEvent.click(screen.getByRole('button'));

    
    customerService.login.mockResolvedValue({
      data: {
        access: 'yourAccessToken',
        refresh: 'yourRefreshToken',
        user_firstname: 'jojo',
        user_type: 'customer',
        id:1
      },
    });

    await waitFor(() => {

      expect(customerService.login).toHaveBeenCalledTimes(1);

   
      expect(customerService.login).toHaveBeenCalledWith({ email: 'jojo@gmail.com', password: 'jojo123' });

    
    });
  });
  it('handles login failure with invalid credentials', async () => {
    
    jest.spyOn(customerService, 'login').mockRejectedValue(new Error('Invalid credentials'));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

 
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'invalidPassword' } });
    fireEvent.click(screen.getByRole('button'));


    await waitFor(() => {
     
      expect(window.alert).toHaveBeenCalledWith('Invalid Credentials');
    });
  });
  
  it('submits the login form with valid input - Customer', async () => {
    
    customerService.login.mockResolvedValue({
      data: {
        id: '1',
        user_firstname: 'jojo',
        access: 'accessToken',
        refresh: 'refreshToken',
        user_type: 'customer',
      },
    });

   
    const { getByLabelText, getByRole } = render(<Login />);


    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'jojo@gmail.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'jojo123' } });

 
    fireEvent.click(getByRole('button'));


    await waitFor(() => {});

    expect(customerService.login).toHaveBeenCalledWith({
      email: 'jojo@gmail.com',
      password: 'jojo123',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/customerdash');
  });

  it('submits the login form with valid input - Manager', async () => {
    
    customerService.login.mockResolvedValue({
      data: {
        id: '2',
        user_firstname: 'ajay',
        access: 'accessToken',
        refresh: 'refreshToken',
        user_type: 'manager',
      },
    });

   
    const { getByLabelText, getByRole } = render(<Login />);

 
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'ajay@gmail.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'ajay123' } });


    fireEvent.click(getByRole('button'));

  
    await waitFor(() => {});


    expect(customerService.login).toHaveBeenCalledWith({
      email: 'ajay@gmail.com',
      password: 'ajay123',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/managerdash');
  });

  it('submits the login form with valid input - Staff', async () => {
    
    customerService.login.mockResolvedValue({
      data: {
        id: '3',
        user_firstname: 'anju',
        access: 'accessToken',
        refresh: 'refreshToken',
        user_type: 'staff',
      },
    });

   
    const { getByLabelText, getByRole } = render(<Login />);

 
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'anju@gmail.com' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'anju123' } });


    fireEvent.click(getByRole('button'));

  
    await waitFor(() => {});


    expect(customerService.login).toHaveBeenCalledWith({
      email: 'anju@gmail.com',
      password: 'anju123',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/staffdash');
  });
 
});

