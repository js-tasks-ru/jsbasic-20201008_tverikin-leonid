/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (n === 0) return 1;
  
  let result = 1; 
  
  for (i = n; i > 1; i--) {
    
    result *= i;
    
  }
  
  return result;
}

