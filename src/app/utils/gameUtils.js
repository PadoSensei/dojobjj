export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const flattenMoves = (data) => {
  let allMoves = [];

  // Helper function to recursively process nested arrays
  const processArray = (arr) => {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        processArray(item);
      } else if (typeof item === 'object' && item !== null) {
        allMoves.push(item);
      }
    });
  };

  // Process each top-level category
  Object.values(data).forEach(category => {
    if (Array.isArray(category)) {
      processArray(category);
    } else if (typeof category === 'object' && category !== null) {
      // Handle nested categories
      Object.values(category).forEach(subcategory => {
        if (Array.isArray(subcategory)) {
          processArray(subcategory);
        }
      });
    }
  });

  return allMoves;
};