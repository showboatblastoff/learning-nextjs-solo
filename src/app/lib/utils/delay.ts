/**
 * Simulates a delay for testing loading states in development
 * @param ms - Milliseconds to delay (default: 1000)
 */
export const simulateDelay = async (ms: number = 1000) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Dev] Simulating ${ms}ms delay...`);
    await new Promise(resolve => setTimeout(resolve, ms));
  }
};

/**
 * Simulates a random delay between min and max milliseconds
 * Useful for testing various loading scenarios
 * @param min - Minimum delay in milliseconds
 * @param max - Maximum delay in milliseconds
 */
export const simulateRandomDelay = async (min: number = 500, max: number = 3000) => {
  if (process.env.NODE_ENV === 'development') {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(`[Dev] Simulating random ${delay}ms delay...`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
};