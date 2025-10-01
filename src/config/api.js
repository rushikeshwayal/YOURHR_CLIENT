// API Configuration
const API_CONFIG = {
    // Change this to switch between local and production
    BASE_URL: 'http://localhost:8000', // Local development
    // BASE_URL: 'https://your-hr-rosy.vercel.app', // Production

    ENDPOINTS: {
        USERS: '/users',
        RESUMES: '/resumes',
        JOBS: '/jobs',
        APPLICATIONS: '/applications'
    }
};

export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const API_URLS = {
    USERS: getApiUrl(API_CONFIG.ENDPOINTS.USERS),
    RESUMES: getApiUrl(API_CONFIG.ENDPOINTS.RESUMES),
    JOBS: getApiUrl(API_CONFIG.ENDPOINTS.JOBS),
    APPLICATIONS: getApiUrl(API_CONFIG.ENDPOINTS.APPLICATIONS),

    // Specific endpoints
    CHECK_USER: (email) => getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/check/${email}`),
    GOOGLE_USER: getApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/google`),
    USER_RESUMES: (userId) => getApiUrl(`${API_CONFIG.ENDPOINTS.RESUMES}/user/${userId}`),
    RESUME_BY_ID: (resumeId) => getApiUrl(`${API_CONFIG.ENDPOINTS.RESUMES}/${resumeId}`)
};

export default API_CONFIG;
