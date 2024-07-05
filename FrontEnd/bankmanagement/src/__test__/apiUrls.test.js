import { render, screen, waitFor } from '@testing-library/react';
import { customerService,staffService,managerService } from '../apiUrls'
import { axiosPrivate } from '../interceptor';

jest.mock('../interceptor', () => ({
  axiosPrivate: {
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
  },
}));

describe('Customer Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('registers a user successfully', async () => {
    const mockUserData = {
      username: 'testUser',
      password: 'testPassword',
      email: 'test@example.com',
    };

    
    axiosPrivate.post.mockResolvedValueOnce({ data: 'Registration successful' });

    const response = await customerService.registration(mockUserData);

   
    expect(axiosPrivate.post).toHaveBeenCalledWith('register', mockUserData);
    expect(response.data).toBe('Registration successful');
  });

  it('handles registration error', async () => {
    const mockUserData = {
      username: 'testUser',
      password: 'testPassword',
      email: 'test@example.com',
    };

   
    axiosPrivate.post.mockRejectedValueOnce(new Error('Registration failed'));

    await expect(customerService.registration(mockUserData)).rejects.toThrow('Registration failed');

 
    expect(axiosPrivate.post).toHaveBeenCalledWith('register', mockUserData);
  });

  it('logs in a user successfully', async () => {
    const mockLoginData = {
      username: 'testUser',
      password: 'testPassword',
    };

    axiosPrivate.post.mockResolvedValueOnce({ data: 'Login successful' });

    const response = await customerService.login(mockLoginData);

    expect(axiosPrivate.post).toHaveBeenCalledWith('login', mockLoginData);
    expect(response.data).toBe('Login successful');
  });

  it('handles login error', async () => {
    const mockLoginData = {
      username: 'testUser',
      password: 'testPassword',
    };

    axiosPrivate.post.mockRejectedValueOnce(new Error('Login failed'));

    await expect(customerService.login(mockLoginData)).rejects.toThrow('Login failed');

    expect(axiosPrivate.post).toHaveBeenCalledWith('login', mockLoginData);
  });

  it('creates an account successfully', async () => {
    const mockCreateAccountData = {
      // your mock data for account creation
    };

    axiosPrivate.post.mockResolvedValueOnce({ data: 'Account created successfully' });

    const response = await customerService.createaccount(mockCreateAccountData);

    expect(axiosPrivate.post).toHaveBeenCalledWith('account', mockCreateAccountData);
    expect(response.data).toBe('Account created successfully');
  });

  it('handles account creation error', async () => {
    const mockCreateAccountData = {
      // your mock data for account creation
    };

    axiosPrivate.post.mockRejectedValueOnce(new Error('Account creation failed'));

    await expect(customerService.createaccount(mockCreateAccountData)).rejects.toThrow('Account creation failed');

    expect(axiosPrivate.post).toHaveBeenCalledWith('account', mockCreateAccountData);
  });

  it('fetches account information successfully', async () => {
    const mockAccountData = {
      // your mock data for account information
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockAccountData });

    const response = await customerService.viewaccount();

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewaccount');
    expect(response.data).toEqual(mockAccountData);
  });

  it('handles account information fetching error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('Failed to fetch account information'));

    await expect(customerService.viewaccount()).rejects.toThrow('Failed to fetch account information');

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewaccount');
  });

  it('fetches pending accounts successfully', async () => {
    const mockPendingAccountData = {
      // your mock data for pending accounts
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockPendingAccountData });

    const response = await staffService.pendingaccount();

    expect(axiosPrivate.get).toHaveBeenCalledWith('pending');
    expect(response.data).toEqual(mockPendingAccountData);
  });

  it('handles pending accounts fetching error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('Pending accounts fetch failed'));

    await expect(staffService.pendingaccount()).rejects.toThrow('Pending accounts fetch failed');

    expect(axiosPrivate.get).toHaveBeenCalledWith('pending');
  });

  it('updates account successfully', async () => {
    const mockUpdateAccountData = {
      // your mock data for successful account update
    };

    axiosPrivate.patch.mockResolvedValueOnce({ data: mockUpdateAccountData });

    const accountUpdateDetails = {
      // your mock account update details
    };

    const response = await staffService.updateaccount(accountUpdateDetails);

    expect(axiosPrivate.patch).toHaveBeenCalledWith('pending', accountUpdateDetails);
    expect(response.data).toEqual(mockUpdateAccountData);
  });

  it('handles account update error', async () => {
    axiosPrivate.patch.mockRejectedValueOnce(new Error('Account update failed'));

    const accountUpdateDetails = {
      // your mock account update details
    };

    await expect(staffService.updateaccount(accountUpdateDetails)).rejects.toThrow('Account update failed');

    expect(axiosPrivate.patch).toHaveBeenCalledWith('pending', accountUpdateDetails);
  });

  it('successfully deposits amount', async () => {
    const mockDepositData = {
      // your mock data for successful deposit
    };

    axiosPrivate.post.mockResolvedValueOnce({ data: mockDepositData });

    const depositDetails = {
      // your mock deposit details
    };

    const response = await customerService.deposit(depositDetails);

    expect(axiosPrivate.post).toHaveBeenCalledWith('deposit', depositDetails);
    expect(response.data).toEqual(mockDepositData);
  });

  it('handles deposit error', async () => {
    axiosPrivate.post.mockRejectedValueOnce(new Error('Deposit failed'));

    const depositDetails = {
      // your mock deposit details
    };

    await expect(customerService.deposit(depositDetails)).rejects.toThrow('Deposit failed');

    expect(axiosPrivate.post).toHaveBeenCalledWith('deposit', depositDetails);
  });

  it('successfully withdraws amount', async () => {
    const mockWithdrawData = {
      // your mock data for successful withdrawal
    };

    axiosPrivate.post.mockResolvedValueOnce({ data: mockWithdrawData });

    const withdrawDetails = {
      // your mock withdrawal details
    };

    const response = await customerService.withdraw(withdrawDetails);

    expect(axiosPrivate.post).toHaveBeenCalledWith('withdraw', withdrawDetails);
    expect(response.data).toEqual(mockWithdrawData);
  });

  it('handles withdrawal error', async () => {
    axiosPrivate.post.mockRejectedValueOnce(new Error('Withdrawal failed'));

    const withdrawDetails = {
      // your mock withdrawal details
    };

    await expect(customerService.withdraw(withdrawDetails)).rejects.toThrow('Withdrawal failed');

    expect(axiosPrivate.post).toHaveBeenCalledWith('withdraw', withdrawDetails);
  });

  it('fetches transaction history successfully', async () => {
    const mockTransactionHistoryData = {
      // your mock data for transaction history
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockTransactionHistoryData });

    const response = await customerService.transactionHistory();

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewtransaction');
    expect(response.data).toEqual(mockTransactionHistoryData);
  });

  it('handles transaction history fetch error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('Transaction history fetch failed'));

    await expect(customerService.transactionHistory()).rejects.toThrow('Transaction history fetch failed');

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewtransaction');
  });

  it('fetches download history successfully', async () => {
    const mockDownloadHistoryData = {
      // your mock data for download history
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockDownloadHistoryData });

    const response = await customerService.downloadHistory();

    expect(axiosPrivate.get).toHaveBeenCalledWith('download');
    expect(response.data).toEqual(mockDownloadHistoryData);
  });

  it('handles download history fetch error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('Download history fetch failed'));

    await expect(customerService.downloadHistory()).rejects.toThrow('Download history fetch failed');

    expect(axiosPrivate.get).toHaveBeenCalledWith('download');
  });
  it('fetches customer data successfully', async () => {
    const mockViewCustomerData = {
      // your mock data for viewing customer
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockViewCustomerData });

    const response = await managerService.viewCustomer();

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewcustomer');
    expect(response.data).toEqual(mockViewCustomerData);
  });

  it('handles view customer error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('View customer failed'));

    await expect(managerService.viewCustomer()).rejects.toThrow('View customer failed');

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewcustomer');
  });

  it('updates customer data successfully', async () => {
    const mockUpdateCustomerData = {
      // your mock data for updating customer
    };

    axiosPrivate.patch.mockResolvedValueOnce({ data: mockUpdateCustomerData });

    const updateData = {
      // your mock update data
    };

    const response = await managerService.updateCustomer(updateData);

    expect(axiosPrivate.patch).toHaveBeenCalledWith('viewcustomer', updateData);
    expect(response.data).toEqual(mockUpdateCustomerData);
  });

  it('handles update customer error', async () => {
    axiosPrivate.patch.mockRejectedValueOnce(new Error('Update customer failed'));

    const updateData = {
      // your mock update data
    };

    await expect(managerService.updateCustomer(updateData)).rejects.toThrow('Update customer failed');

    expect(axiosPrivate.patch).toHaveBeenCalledWith('viewcustomer', updateData);
  });

  it('fetches staff data successfully', async () => {
    const mockViewStaffData = {
      // your mock data for viewing staff
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockViewStaffData });

    const response = await managerService.viewStaff();

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewstaff');
    expect(response.data).toEqual(mockViewStaffData);
  });

  it('handles view staff error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('View staff failed'));

    await expect(managerService.viewStaff()).rejects.toThrow('View staff failed');

    expect(axiosPrivate.get).toHaveBeenCalledWith('viewstaff');
  });

  it('updates staff data successfully', async () => {
    const mockUpdateStaffData = {
      // your mock data for updating staff
    };

    axiosPrivate.patch.mockResolvedValueOnce({ data: mockUpdateStaffData });

    const updateData = {
      // your mock update data
    };

    const response = await managerService.updateStaff(updateData);

    expect(axiosPrivate.patch).toHaveBeenCalledWith('viewstaff', updateData);
    expect(response.data).toEqual(mockUpdateStaffData);
  });

  it('handles update staff error', async () => {
    axiosPrivate.patch.mockRejectedValueOnce(new Error('Update staff failed'));

    const updateData = {
      // your mock update data
    };

    await expect(managerService.updateStaff(updateData)).rejects.toThrow('Update staff failed');

    expect(axiosPrivate.patch).toHaveBeenCalledWith('viewstaff', updateData);
  });

  it('closes account successfully', async () => {
    const mockCloseAccountData = {
      // your mock data for closing account
    };

    axiosPrivate.post.mockResolvedValueOnce({ data: mockCloseAccountData });

    const closeAccountData = {
      // your mock close account data
    };

    const response = await customerService.accountClose(closeAccountData);

    expect(axiosPrivate.post).toHaveBeenCalledWith('close', closeAccountData);
    expect(response.data).toEqual(mockCloseAccountData);
  });

  it('handles close account error', async () => {
    axiosPrivate.post.mockRejectedValueOnce(new Error('Close account failed'));

    const closeAccountData = {
      // your mock close account data
    };

    await expect(customerService.accountClose(closeAccountData)).rejects.toThrow('Close account failed');

    expect(axiosPrivate.post).toHaveBeenCalledWith('close', closeAccountData);
  });

  it('fetches staff/manager transaction history successfully', async () => {
    const mockDownloadStaffManagerTransactionData = {
      // your mock data for downloading staff/manager transaction history
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockDownloadStaffManagerTransactionData });

    const downloadData = {
      // your mock download data
    };

    const response = await managerService.downloadStaffManagerTransactionHistory(downloadData);

    expect(axiosPrivate.get).toHaveBeenCalledWith('downloadtransaction', { params: { data: downloadData } });
    expect(response.data).toEqual(mockDownloadStaffManagerTransactionData);
  });

  it('handles staff/manager transaction history fetch error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('Download staff/manager transaction history failed'));

    const downloadData = {
      // your mock download data
    };

    await expect(managerService.downloadStaffManagerTransactionHistory(downloadData)).rejects.toThrow(
      'Download staff/manager transaction history failed'
    );

    expect(axiosPrivate.get).toHaveBeenCalledWith('downloadtransaction', { params: { data: downloadData } });
  });
  it('fetches staff/manager transaction data successfully', async () => {
    const mockViewTransactionData = {
      // your mock data for viewing transaction
    };

    axiosPrivate.get.mockResolvedValueOnce({ data: mockViewTransactionData });

    const requestData = {
      // your mock request data
    };

    const response = await managerService.viewTransaction(requestData);

    expect(axiosPrivate.get).toHaveBeenCalledWith('staffmanagertransaction', { params: { data: requestData } });
    expect(response.data).toEqual(mockViewTransactionData);
  });

  it('handles view transaction error', async () => {
    axiosPrivate.get.mockRejectedValueOnce(new Error('View transaction failed'));

    const requestData = {
      // your mock request data
    };

    await expect(managerService.viewTransaction(requestData)).rejects.toThrow('View transaction failed');

    expect(axiosPrivate.get).toHaveBeenCalledWith('staffmanagertransaction', { params: { data: requestData } });
  });

});
