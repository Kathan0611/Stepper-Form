import axios from 'axios';

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // Adjust your API base URL
  timeout: 5000,                    
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;