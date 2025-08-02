// Mock useAuth hook for demonstration
export const useAuth = () => ({
  user: {
    location: "CONAKRY",
    email: "ahmed.hassan@email.com",
    role: "student",
  },
  logout: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  },
  isLoading: false,
});