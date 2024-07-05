import { axiosPrivate } from './interceptor'

const registration = (data) => {
  return axiosPrivate.post('register', data);
};


const login = (data) => {
  return axiosPrivate.post('login', data);
};


const createaccount = (data) => {
  return axiosPrivate.post('account', data);
};

const viewaccount = () => {
  return axiosPrivate.get('viewaccount');
};


const pendingaccount = () => {
  return axiosPrivate.get('pending');
};

const updateaccount = (data) => {
  return axiosPrivate.patch('pending', data);
};

const deposit = (data) => {
  return axiosPrivate.post('deposit', data);
};

const withdraw = (data) => {
  return axiosPrivate.post('withdraw', data);
};

const transactionHistory= () => {
  return axiosPrivate.get('viewtransaction');
};

const transactionHistoryMonthly = (data) => {
  return axiosPrivate.get('viewtransactionmonthly',{ params: { data} } )
}

const downloadHistory= () => {
  return axiosPrivate.get('download');
};


const downloadHistoryMonthly= (data) => {
  return axiosPrivate.get('downloadmonthly',{params : { data }});
};

const viewCustomer= () => {
  return axiosPrivate.get('viewcustomer');
};

const updateCustomer = (data) => {
  return axiosPrivate.patch('viewcustomer',data)
}

const viewTransaction = (data) => {
  return axiosPrivate.get('staffmanagertransaction',{ params: { data} } )
}

const viewStaff = () => {
  return axiosPrivate.get('viewstaff')
  
}

const updateStaff = (data) => {
  return axiosPrivate.patch('viewstaff',data)
}


const accountClose = (data) => {
  return axiosPrivate.post('close',data)
}


const downloadStaffManagerTransactionHistory= (data) => {
  return axiosPrivate.get('downloadtransaction',{ params: { data} });
};

const customerService = {
  registration,
  login,
  createaccount,
  viewaccount,
  deposit,
  withdraw,
  transactionHistory,
  downloadHistory,
  accountClose,
  transactionHistoryMonthly,
  downloadHistoryMonthly



};

const staffService = {
  pendingaccount,
  updateaccount,
  viewCustomer,
  viewTransaction,
  downloadStaffManagerTransactionHistory


}


const managerService = {
 
  viewCustomer,
  updateCustomer,
  viewTransaction,
  viewStaff,
  updateStaff,
  downloadStaffManagerTransactionHistory

}

export { managerService,customerService,staffService };


// const logout = () => {
//   return axiosPrivate.get<string>('customers/logout');
// };

// const getUserProfile = () => {
//   return axiosPrivate.get<string>('customers/profile');
// };


// const purchaseTickets = (data: any) => {
//   return axiosPrivate.post('customers/tickets', data);
// };

// const getIndustries = () => {
//   return axiosPrivate.get<any>('customers/industries');
// };

// const getPrefectures = () => {
//   return axiosPrivate.get<any>('customers/prefectures');
// };

// const getProfession = () => {
//   return axiosPrivate.get<any>('customers/occupations');
// };

// const getUserDetails = () => {
//   return axiosPrivate.get<any>('customers/tickets/clients');
// };


// const getInterviewDuration = () => {
//   return axiosPrivate.get<any>('customers/researches/interview-durations');
// };

// const getCampaignStatus = (data: string) => {
//   return axiosPrivate.post<any>('customers/researches/status', data);
// };

// const getCampaigns = () => {
//   return axiosPrivate.get<any>('customers/researches');
// }

// const getCampaignDetail = (campaignId: string) => {
//   return axiosPrivate.get<any>(`customers/researches/${campaignId}`)
// }

// const updateCampaignDetail = (campaignId: string, data: any) => {
//   return axiosPrivate.put<any>(`customers/researches/${campaignId}`, data)





// const ticketService = {
//   getTicketTypes,
//   purchaseTickets,
//   getUserDetails,
// };

// const generalServices = {
//   getIndustries,
//   getPrefectures,
//   getProfession,
// };

// const researchService = {
//   createCampaign,
//   getInterviewDuration,
//   getCampaignStatus,
//   getCampaigns,
//   getCampaignDetail,
//   updateCampaignDetail
// };