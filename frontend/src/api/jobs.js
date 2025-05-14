import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/jobs/'; // update if backend is hosted elsewhere

export const fetchJobs = () => axios.get(API_BASE);
export const fetchJob = (id) => axios.get(`${API_BASE}${id}/results/`);
export const createJob = (jobData) => axios.post(API_BASE, jobData);
export const deleteJob = (id) => axios.delete(`${API_BASE}${id}/`)
