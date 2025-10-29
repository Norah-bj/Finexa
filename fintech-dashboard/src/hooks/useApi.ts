import { useState } from 'react';
import { userApi } from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleRequest = async (request: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await request();
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    userApi: {
      createUser: (userData: { fullName: string; email: string; age: number; password: string }) =>
        handleRequest(() => userApi.createUser(userData)),
      getUsers: () => handleRequest(userApi.getUsers),
      getUserProfile: (userId: string) => handleRequest(() => userApi.getUserProfile(userId)),
      getFinancialSummary: (userId: string) => 
        handleRequest(() => userApi.getFinancialSummary(userId)),
    },
  };
};

export default useApi;
