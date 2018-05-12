
// const API_BASE_URL = 'http://54.87.228.197:8070/api';
// const API_BASE_URL = 'http://192.168.2.130:8070/api';
// const API_BASE_URL =// 'http://127.0.0.1:999'
// const API_BASE_URL = 'http://54.205.214.150:8070/api';
const API_BASE_URL = 'https://localhost:8070/api';

const AppConfig = {
    serviceRequests: {
        validateUserByMobileNumber: API_BASE_URL + '/user/verifymobile/',
        signup: API_BASE_URL + '/user/signup',
        resetPassword: API_BASE_URL + '/user/forgot/',
        validateUser: API_BASE_URL + '/users/p/v1/auth/login',
        updateTask: API_BASE_URL + '/users/p/api/v1',
        fetchTask: API_BASE_URL + '/users/s/v1/task/w/create',
        fetchTaskByFilter: API_BASE_URL + '/users/s/v1/task/r/fetchbyGroup/all',
        fetchTaskSummary: API_BASE_URL + '/users/s/v1/task/r/fetch/task/summary',
        fetchMyTaskSummary: '/users/s/v1/task/r/fetch/tasksummary',
        loginUser: API_BASE_URL + '/users/p/v1/auth/login',
        fetchTaskDetails: API_BASE_URL + '/users/s/v1/users/r/fetch/dashboard',
        getWhetherDetails: 'api.openweathermap.org/data/2.5/weather?',
        assignList: API_BASE_URL + '/users/s/v1/users/r/fetch/userslist',
        createTask: API_BASE_URL + '/users/s/v1/task/w/create',
        weatherKey: 'b11c7b33ce8e8e12ecf30c57a7083f5f',
        weatherUrl: 'http://api.openweathermap.org/data/2.5',
        updateTaskStatus: API_BASE_URL + '/users/s/v1/task/update',
        priorityProject: API_BASE_URL + '/users/s/v1/task/w/project/updatepriority',
        updateTaskPriority: API_BASE_URL + '/users/s/v1/task/w/update/priority'
    }
};
const firebaseConfig = {
    apiKey: "AIzaSyAnTQoIqg1WmD4E1uHyBm9lJCf59BKbT3k",
    authDomain: "garmet-6a853.firebaseapp.com",
    databaseURL: "https://garmet-6a853.firebaseio.com",
    projectId: "garmet-6a853",
    storageBucket: "garmet-6a853.appspot.com",
    messagingSenderId: "894672392826"
  };
export interface IRequests {
    fetchTask: string,
    fetchTaskByFilter: string;
    loginUser: string;
    fetchTaskSummary: string;
    fetchMyTaskSummary: string;
    fetchTaskDetails: string;
    assignList: string;
    createTask: string;
    updateTaskStatus: string;
    priorityProject: string;
    updateTaskPriority: string;
}
export { AppConfig, firebaseConfig }
export default [AppConfig];