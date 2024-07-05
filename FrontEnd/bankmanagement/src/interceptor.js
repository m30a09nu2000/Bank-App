import axios from "axios";



const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/' // our API base URL
});
axiosInstance.interceptors.request.use(
  (config) => {
    const userId = 3
    const authTokens = JSON.parse(localStorage.getItem('tokens') || '{}');
    const token = authTokens?.accessToken;
    if (token) {
      console.log(token);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401){
        console.log(error.response);
        // alert(error.response.statusText)
        // const accessToken = await refreshAccessToken();
       
    }else {
      throw error;
     }
   
  }
);


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status === 401
     ) {
      console.log('Refresh token expired!');
      localStorage.clear();
      window.location.replace('/login');
    }
    // const accessToken = await refreshAccessToken();
    // axiosInstance.defaults.headers.common['Authorization'] =
    //   'Bearer ' + accessToken;
    // return axiosPrivate(originalRequest);
  })


  // const refreshAccessToken = async () => {
  //   const authTokens = JSON.parse(localStorage.getItem('tokens') || '{}');
  //   const refreshToken = authTokens.refreshToken;
  //   const data = { refreshToken: refreshToken };
  //   try {
  //     const response = await axios.post(
  //       `${apiEndpoint}customers/refresh-token`,
  //       data
  //     );
  //     console.log(response);
  //     const accessToken = response?.data?.data?.accessToken;
  //     let authTokens = JSON.stringify({
  //       accessToken: accessToken,
  //       refreshToken: refreshToken,
  //     });
  //     localStorage.setItem('authTokens', authTokens);
  //     return accessToken;
  //   } catch (err) {
  //     console.log('Error occured in generating refresh token: ', err);
  //     localStorage.clear();
  //     toastMsg();
  //     setTimeout(() => {
  //       window.location.replace('/login');
  //     }, 1000);
  //   }
  // };
const axiosPrivate = axiosInstance;



export { axiosPrivate };
