import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL
console.log('====== API CONFIG DEBUG ======');
console.log('import.meta.env.VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('BASE_URL:', BASE_URL);
console.log('All env vars:', import.meta.env);
console.log('============================');

export const IMAGE_URL = BASE_URL + '/upload'
const api = axios.create({
    baseURL: BASE_URL,   // The base URL will be used for all requests
    timeout: 5000,       // Optional: Timeout for requests
    headers: {           // Optional: Set default headers if needed
        'Content-Type': 'application/json',
    },
})

export const CafesAPI = {
    list: async (location) => api.get('/cafes', { params: { location: location } }),
    // const { name, description, logo, location } = req.body
    create: async (payload) => api.post('/cafes', payload),
    // { cafeId, name, description, logo, location }
    update: async (payload) => api.put(`/cafes/`, payload),
    // { cafeId } 
    delete: async (payload) => api.delete(`/cafes/`, { data: payload }),
}


export const EmployeesAPI = {
    list: async (cafe) => api.get('/employees', { params: { cafe: cafe } }),
    // { name, emailAddress, phoneNumber, gender, cafeId }
    create: async (payload) => api.post('/employees', payload),
    // { employeeId, name, emailAddress, phoneNumber, gender, newCafeId, start_date }
    update: async (payload) => api.put(`/employees`, payload),
    // { employeeId } 
    delete: async (payload) => api.delete(`/employees`, { data: payload }),
}

export default api