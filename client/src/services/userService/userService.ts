import axios from 'axios';

export const addUser = async (formData: { firstName: string; lastName: string; email: string }) => {
  try {
    const response = await axios.post('http://localhost:9000/user/add', formData);
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:9000/user');
      return response.data;
    } catch (error) {
        console.error('Error getting user(s):', error);
      throw error;
    }
  };