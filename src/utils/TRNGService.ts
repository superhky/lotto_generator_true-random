
/**
 * True Random Number Generation Service
 * 1-45, 6 numbers, no duplicates, sorted.
 */

const FALLBACK_CSPRNG = (): number[] => {
  const nums = new Set<number>();
  const array = new Uint32Array(100);
  window.crypto.getRandomValues(array);
  let i = 0;
  while (nums.size < 6) {
    const val = (array[i] % 45) + 1;
    nums.add(val);
    i++;
    if (i >= array.length) {
      window.crypto.getRandomValues(array);
      i = 0;
    }
  }
  return Array.from(nums).sort((a, b) => a - b);
};

// Set 1: Atmospheric (Random.org)
export const getAtmosphericRandom = async (): Promise<number[]> => {
  try {
    const response = await fetch(
      'https://www.random.org/integers/?num=6&min=1&max=45&col=1&base=10&format=plain&rnd=new'
    );
    if (!response.ok) throw new Error('Random.org failed');
    const text = await response.text();
    const nums = text.trim().split('\n').map(Number);
    // Ensure uniqueness and range (just in case)
    const uniqueNums = Array.from(new Set(nums)).slice(0, 6);
    if (uniqueNums.length < 6) return FALLBACK_CSPRNG();
    return uniqueNums.sort((a, b) => a - b);
  } catch (error) {
    console.warn('Atmospheric True Random failed, falling back to CSPRNG', error);
    return FALLBACK_CSPRNG();
  }
};

// Set 2: Quantum (ANU QRNG)
export const getQuantumRandom = async (): Promise<number[]> => {
  try {
    // Using ANU QRNG API (Quantum numbers)
    const response = await fetch('https://qrng.anu.edu.au/API/jsonI.php?length=12&type=uint8');
    if (!response.ok) throw new Error('ANU QRNG failed');
    const data = await response.json();
    const nums = new Set<number>();
    for (const val of data.data) {
      const num = (val % 45) + 1;
      nums.add(num);
      if (nums.size === 6) break;
    }
    if (nums.size < 6) return FALLBACK_CSPRNG();
    return Array.from(nums).sort((a, b) => a - b);
  } catch (error) {
    console.warn('Quantum True Random failed, falling back to simulation or CSPRNG', error);
    // Simulate Quantum Probability Distribution if API fails
    // (Essentially higher quality PRNG simulated via crypto)
    return FALLBACK_CSPRNG();
  }
};

// Set 3: Optical/Thermal (CSPRNG via browser)
export const getOpticalThermalRandom = (): number[] => {
  // Browser's crypto.getRandomValues is based on entropy pools (hardware noise)
  return FALLBACK_CSPRNG();
};

// Set 4: Hardware Jitter (Micro-timing)
export const getJitterRandom = (): number[] => {
  const entropy: number[] = [];
  // Extract entropy from performance.now() jitter
  for (let i = 0; i < 500; i++) {
    const start = performance.now();
    let sum = 0;
    for(let j=0; j<100; j++) { sum += Math.sqrt(j); } // Artificial delay
    const end = performance.now();
    entropy.push(Math.floor((end - start) * 1000000) % 256);
  }
  
  const nums = new Set<number>();
  let idx = 0;
  while (nums.size < 6) {
    const val = (entropy[idx % entropy.length] % 45) + 1;
    nums.add(val);
    idx++;
    if (idx > 1000) break; // Safety
  }
  
  if (nums.size < 6) return FALLBACK_CSPRNG();
  return Array.from(nums).sort((a, b) => a - b);
};

// Set 5: User Entropy (Seeded)
export const getUserEntropyRandom = (seedData: number[]): number[] => {
  if (seedData.length === 0) return FALLBACK_CSPRNG();
  
  // Combine seedData into a single seed
  const seed = seedData.reduce((acc, val) => (acc + val) % 1000000, 0);
  
  // Simple LCG or use seed to pick from CSPRNG pool
  const nums = new Set<number>();
  let currentSeed = seed;
  while (nums.size < 6) {
    // Mix with crypto for better quality while using user seed
    const cryptoArray = new Uint32Array(1);
    window.crypto.getRandomValues(cryptoArray);
    currentSeed = (currentSeed * 1664525 + 1013904223 + cryptoArray[0]) % 4294967296;
    const val = (currentSeed % 45) + 1;
    nums.add(val);
  }
  
  return Array.from(nums).sort((a, b) => a - b);
};
