import axios from 'axios'

const baseUrl = 'https://expenses-app-nucba.herokuapp.com/api/'

export const getExpenses = () => {
    return axios.get(baseUrl + 'expenses/');
  };

  export const createExpenses = () => {
    return axios.post(baseUrl + 'expenses/create');
  };

  export const getCategories = () => {
    return axios.get(baseUrl + 'categories/');
  };

  export const getExpensesByCategory = () => {
    return axios.get(baseUrl + 'expenses/search/category');
  };

  export const createCategories = () => {
    return axios.post(baseUrl + 'categories/create');
  };

  export const getExpensesByName = () => {
    return axios.get(baseUrl + 'expenses/search/name');
  };

