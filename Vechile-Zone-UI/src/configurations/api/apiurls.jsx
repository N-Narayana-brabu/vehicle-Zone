// src/configurations/apiUrls.js
import config from '../centralized-configuration';
import { API_ENDPOINTS } from './apiendpoints';

export const API_URLS = {
  DATATYPE: `${config.apiUrl}${API_ENDPOINTS.DATATYPE}`
};
