// /Users/webasebrandings/Downloads/new_far-main 2/src/util/backendConfig.tsx
import axios from 'axios';

// LOCAL + SOCKET URL = NGROK URL
const NGROK_URL = "https://701dcc86fbd5.ngrok-free.app";

// USE LOCALHOST MODE
const useLocalhost = false;

// Backend URL
const API_BASE_URL = useLocalhost ? NGROK_URL : "https://bba-a8lu.onrender.com";

// Test backend
export const testBackendConnection = async () => {
  try {
    console.log("Testing:", API_BASE_URL);
    const r = await axios.get(`${API_BASE_URL}/api/health`, { timeout: 5000 });
    console.log("Connected:", r.data);
    return true;
  } catch (e) {
    console.error("Failed:", e);
    return false;
  }
};

export const getBackendUrl = () => API_BASE_URL;

// New function to get correct image URL
export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return 'https://via.placeholder.com/150';
  
  // If image path already includes the full URL, return it as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If image path starts with /uploads/, prepend the base URL
  if (imagePath.startsWith('/uploads/')) {
    return `${API_BASE_URL}${imagePath}`;
  }
  
  // Otherwise, assume it's a relative path and prepend the base URL with /uploads/
  return `${API_BASE_URL}/uploads/${imagePath}`;
};

export const getEnvironmentInfo = () => ({
  isLocalhost: useLocalhost,
  currentBackend: API_BASE_URL,
});


//Users/webasebrandings/Downloads/new_far-main 2/src/util/backendConfig.js









































































































































// import axios from 'axios';

// // LOCAL + SOCKET URL = NGROK URL
// const NGROK_URL = "https://701dcc86fbd5.ngrok-free.app";

// // USE LOCALHOST MODE
// const useLocalhost = false;

// // Backend URL
// const API_BASE_URL = useLocalhost ? NGROK_URL : "https://bbaacckkend.onrender.com";

// // Test backend
// export const testBackendConnection = async () => {
//   try {
//     console.log("Testing:", API_BASE_URL);
//     const r = await axios.get(`${API_BASE_URL}/api/health`, { timeout: 5000 });
//     console.log("Connected:", r.data);
//     return true;
//   } catch (e) {
//     console.error("Failed:", e);
//     return false;
//   }
// };

// export const getBackendUrl = () => API_BASE_URL;

// export const getEnvironmentInfo = () => ({
//   isLocalhost: useLocalhost,
//   currentBackend: API_BASE_URL,
// });

