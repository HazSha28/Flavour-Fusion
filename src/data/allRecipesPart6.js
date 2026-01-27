// Part 6: Soups & Drinks Recipes (8 recipes from soupsDrinks category)
export const allRecipesPart6 = {
  // Soups & Drinks Category
  'soup-mushroom': {
    id: 'soup-mushroom',
    title: 'CREAM MUSHROOM SOUP',
    subtitle: 'European Comfort Soup',
    category: 'Soup',
    area: 'European',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '35 min',
    totalTime: '55 min',
    servings: 6,
    calories: 180,
    rating: 4.7,
    reviews: 234,
    description: 'Rich and creamy mushroom soup with European herbs and fresh cream.',
    chef: 'European Soup Master',
    image: '/images/sd/F1.jpg',
    ingredients: [
      { name: 'Mushrooms', amount: '500g', notes: 'Mixed varieties' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'For richness' },
      { name: 'Onion', amount: '1', notes: 'Diced' },
      { name: 'Garlic', amount: '3 cloves', notes: 'Minced' },
      { name: 'Vegetable Broth', amount: '1L', notes: 'For base' },
      { name: 'Butter', amount: '50g', notes: 'For sautéing' },
      { name: 'Fresh Thyme', amount: '2 tbsp', notes: 'For flavor' },
      { name: 'Croutons', amount: 'For serving', notes: 'Optional' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Mushrooms',
        description: 'Clean and slice mushrooms. Sauté half in butter until golden for garnish.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Soup Base',
        description: 'Sauté onion and garlic, add remaining mushrooms and cook until soft.',
        time: '10 min'
      },
      {
        title: 'Step 3: Add Broth',
        description: 'Add vegetable broth and thyme. Simmer for 15 minutes.',
        time: '15 min'
      },
      {
        title: 'Step 4: Blend and Cream',
        description: 'Blend soup until smooth, return to pot, add cream and heat through.',
        time: '10 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve hot with sautéed mushrooms and croutons on top.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 180, protein: '6g', carbs: '12g', fat: '12g', fiber: '2g', sugar: '4g' }
  },

  'soup-hot-sour': {
    id: 'soup-hot-sour',
    title: 'HOT & SOUR SOUP',
    subtitle: 'Asian Spicy Soup',
    category: 'Soup',
    area: 'Asian',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '30 min',
    totalTime: '50 min',
    servings: 4,
    calories: 160,
    rating: 4.7,
    reviews: 189,
    description: 'Traditional Asian soup with perfect balance of spicy and sour flavors.',
    chef: 'Asian Soup Specialist',
    image: '/images/sd/F2.jpg',
    ingredients: [
      { name: 'Chicken Broth', amount: '1L', notes: 'For base' },
      { name: 'Tofu', amount: '200g', notes: 'Firm, cubed' },
      { name: 'Mushrooms', amount: '100g', notes: 'Wood ear, sliced' },
      { name: 'Bamboo Shoots', amount: '100g', notes: 'Sliced' },
      { name: 'Rice Vinegar', amount: '3 tbsp', notes: 'For sourness' },
      { name: 'Soy Sauce', amount: '2 tbsp', notes: 'For umami' },
      { name: 'Chili Oil', amount: '1 tsp', notes: 'For heat' },
      { name: 'Green Onions', amount: 'For garnish', notes: 'Sliced' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Ingredients',
        description: 'Cube tofu, slice mushrooms and bamboo shoots. Prepare garnishes.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Soup Base',
        description: 'Heat chicken broth, add mushrooms and bamboo shoots, simmer 5 minutes.',
        time: '8 min'
      },
      {
        title: 'Step 3: Add Tofu',
        description: 'Gently add tofu to soup, being careful not to break it.',
        time: '5 min'
      },
      {
        title: 'Step 4: Season',
        description: 'Add vinegar, soy sauce, and chili oil. Adjust taste to preference.',
        time: '7 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve hot with green onions and additional chili oil if desired.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 160, protein: '12g', carbs: '8g', fat: '8g', fiber: '2g', sugar: '2g' }
  },

  'soup-pumpkin': {
    id: 'soup-pumpkin',
    title: 'CREAM PUMPKIN SOUP',
    subtitle: 'Seasonal European Soup',
    category: 'Soup',
    area: 'European',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '35 min',
    totalTime: '55 min',
    servings: 6,
    calories: 170,
    rating: 4.7,
    reviews: 201,
    description: 'Creamy seasonal pumpkin soup with European herbs and warm spices.',
    chef: 'European Seasonal Chef',
    image: '/images/sd/F3.jpg',
    ingredients: [
      { name: 'Pumpkin', amount: '800g', notes: 'Sugar pumpkin' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'For richness' },
      { name: 'Onion', amount: '1', notes: 'Diced' },
      { name: 'Garlic', amount: '3 cloves', notes: 'Minced' },
      { name: 'Vegetable Broth', amount: '800ml', notes: 'For base' },
      { name: 'Nutmeg', amount: '1/2 tsp', notes: 'Freshly grated' },
      { name: 'Butter', amount: '50g', notes: 'For sautéing' },
      { name: 'Pumpkin Seeds', amount: 'For garnish', notes: 'Toasted' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Pumpkin',
        description: 'Peel and cube pumpkin. Roast at 200°C for 25 minutes until tender.',
        time: '30 min'
      },
      {
        title: 'Step 2: Make Soup Base',
        description: 'Sauté onion and garlic in butter until soft.',
        time: '8 min'
      },
      {
        title: 'Step 3: Combine',
        description: 'Add roasted pumpkin and broth. Simmer for 10 minutes.',
        time: '10 min'
      },
      {
        title: 'Step 4: Blend and Cream',
        description: 'Blend until smooth, return to pot, add cream and nutmeg.',
        time: '7 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve hot with toasted pumpkin seeds and extra cream.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 170, protein: '4g', carbs: '18g', fat: '10g', fiber: '3g', sugar: '8g' }
  },

  'soup-chicken': {
    id: 'soup-chicken',
    title: 'CHICKEN SOUP',
    subtitle: 'Hearty Comfort Bowl',
    category: 'Soup',
    area: 'International',
    difficulty: 'Medium',
    prepTime: '25 min',
    cookTime: '40 min',
    totalTime: '1h 5min',
    servings: 6,
    calories: 190,
    rating: 4.7,
    reviews: 267,
    description: 'Classic comforting chicken soup with vegetables and herbs.',
    chef: 'Comfort Food Expert',
    image: '/images/sd/F4.jpg',
    ingredients: [
      { name: 'Chicken', amount: '600g', notes: 'Boneless, cut into pieces' },
      { name: 'Chicken Broth', amount: '2L', notes: 'For base' },
      { name: 'Carrots', amount: '2', notes: 'Diced' },
      { name: 'Celery', amount: '2 stalks', notes: 'Diced' },
      { name: 'Onion', amount: '1', notes: 'Diced' },
      { name: 'Egg Noodles', amount: '200g', notes: 'For serving' },
      { name: 'Fresh Dill', amount: 'Handful', notes: 'For flavor' },
      { name: 'Black Pepper', amount: 'To taste', notes: 'Freshly ground' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Chicken',
        description: 'Season chicken with salt and pepper. Sear in pot until golden.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Soup Base',
        description: 'Add broth, onion, carrots, and celery. Simmer for 20 minutes.',
        time: '20 min'
      },
      {
        title: 'Step 3: Cook Chicken',
        description: 'Add chicken back to soup, simmer until cooked through, about 15 minutes.',
        time: '15 min'
      },
      {
        title: 'Step 4: Cook Noodles',
        description: 'Cook egg noodles separately according to package directions.',
        time: '10 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Place noodles in bowls, add soup and chicken, garnish with fresh dill.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 190, protein: '18g', carbs: '15g', fat: '8g', fiber: '2g', sugar: '3g' }
  },

  'drink-orange-curacao': {
    id: 'drink-orange-curacao',
    title: 'ORANGE CURACAO MOJITO',
    subtitle: 'Citrus Mocktail',
    category: 'Drink',
    area: 'International',
    difficulty: 'Easy',
    prepTime: '5 min',
    cookTime: '10 min',
    totalTime: '15 min',
    servings: 2,
    calories: 120,
    rating: 4.6,
    reviews: 156,
    description: 'Refreshing citrus mocktail with orange curacao and mint.',
    chef: 'Mixologist',
    image: '/images/sd/F5.jpg',
    ingredients: [
      { name: 'Orange Curacao Syrup', amount: '60ml', notes: 'For flavor' },
      { name: 'Fresh Lime', amount: '2', notes: 'For juice' },
      { name: 'Fresh Mint', amount: 'Handful', notes: 'For muddling' },
      { name: 'Club Soda', amount: '200ml', notes: 'For fizz' },
      { name: 'Orange Slices', amount: '2', notes: 'For garnish' },
      { name: 'Ice Cubes', amount: 'For serving', notes: 'Crushed preferred' },
      { name: 'Sugar', amount: '1 tsp', notes: 'For rim' },
      { name: 'Mint Sprigs', amount: 'For garnish', notes: 'Fresh' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Glasses',
        description: 'Rim glasses with lime juice and sugar. Fill with ice.',
        time: '3 min'
      },
      {
        title: 'Step 2: Muddle Mint',
        description: 'Muddle mint leaves in glasses to release oils.',
        time: '2 min'
      },
      {
        title: 'Step 3: Add Liquids',
        description: 'Add orange curacao syrup and fresh lime juice.',
        time: '2 min'
      },
      {
        title: 'Step 4: Top with Soda',
        description: 'Top with club soda and stir gently.',
        time: '3 min'
      },
      {
        title: 'Step 5: Garnish and Serve',
        description: 'Garnish with orange slices and mint sprigs.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 120, protein: '0g', carbs: '28g', fat: '0g', fiber: '1g', sugar: '25g' }
  },

  'drink-blue-curacao': {
    id: 'drink-blue-curacao',
    title: 'BLUE CURACAO MOJITO',
    subtitle: 'Refreshing Mocktail',
    category: 'Drink',
    area: 'International',
    difficulty: 'Easy',
    prepTime: '5 min',
    cookTime: '10 min',
    totalTime: '15 min',
    servings: 2,
    calories: 110,
    rating: 4.6,
    reviews: 134,
    description: 'Beautiful blue mocktail with tropical flavors and fresh mint.',
    chef: 'Mixologist',
    image: '/images/sd/F6.jpg',
    ingredients: [
      { name: 'Blue Curacao Syrup', amount: '60ml', notes: 'For color and flavor' },
      { name: 'Fresh Lime', amount: '2', notes: 'For juice' },
      { name: 'Fresh Mint', amount: 'Handful', notes: 'For muddling' },
      { name: 'Club Soda', amount: '200ml', notes: 'For fizz' },
      { name: 'Pineapple Juice', amount: '50ml', notes: 'For tropical flavor' },
      { name: 'Ice Cubes', amount: 'For serving', notes: 'Crushed preferred' },
      { name: 'Blueberries', amount: 'For garnish', notes: 'Fresh' },
      { name: 'Mint Sprigs', amount: 'For garnish', notes: 'Fresh' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Glasses',
        description: 'Fill glasses with crushed ice.',
        time: '2 min'
      },
      {
        title: 'Step 2: Muddle Mint',
        description: 'Muddle mint leaves in glasses to release oils.',
        time: '2 min'
      },
      {
        title: 'Step 3: Add Liquids',
        description: 'Add blue curacao syrup, lime juice, and pineapple juice.',
        time: '3 min'
      },
      {
        title: 'Step 4: Top with Soda',
        description: 'Top with club soda and stir gently to maintain color.',
        time: '3 min'
      },
      {
        title: 'Step 5: Garnish and Serve',
        description: 'Garnish with blueberries and mint sprigs.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 110, protein: '0g', carbs: '26g', fat: '0g', fiber: '1g', sugar: '23g' }
  },

  'shake-avocado': {
    id: 'shake-avocado',
    title: 'AVOCADO SHAKE',
    subtitle: 'Creamy Health Shake',
    category: 'Drink',
    area: 'International',
    difficulty: 'Easy',
    prepTime: '5 min',
    cookTime: '10 min',
    totalTime: '15 min',
    servings: 2,
    calories: 280,
    rating: 4.7,
    reviews: 189,
    description: 'Creamy and nutritious avocado shake with natural sweetness.',
    chef: 'Health Drink Specialist',
    image: '/images/sd/F7.jpg',
    ingredients: [
      { name: 'Avocado', amount: '1', notes: 'Ripe' },
      { name: 'Milk', amount: '300ml', notes: 'Whole or almond' },
      { name: 'Honey', amount: '2 tbsp', notes: 'For sweetness' },
      { name: 'Vanilla Extract', amount: '1/2 tsp', notes: 'For flavor' },
      { name: 'Ice Cubes', amount: '1 cup', notes: 'For thickness' },
      { name: 'Spinach', amount: '1 cup', notes: 'Optional, for nutrients' },
      { name: 'Chia Seeds', amount: '1 tbsp', notes: 'For fiber' },
      { name: 'Avocado Slice', amount: 'For garnish', notes: 'Optional' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Ingredients',
        description: 'Pit and scoop avocado, measure all ingredients.',
        time: '3 min'
      },
      {
        title: 'Step 2: Blend Base',
        description: 'Blend avocado, milk, honey, and vanilla until smooth.',
        time: '5 min'
      },
      {
        title: 'Step 3: Add Ice',
        description: 'Add ice cubes and blend until thick and creamy.',
        time: '2 min'
      },
      {
        title: 'Step 4: Optional Add-ins',
        description: 'Add spinach and chia seeds for extra nutrition.',
        time: '2 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Pour into glasses, garnish with avocado slice if desired.',
        time: '1 min'
      }
    ],
    nutrition: { calories: 280, protein: '8g', carbs: '24g', fat: '18g', fiber: '6g', sugar: '18g' }
  },

  'shake-dates': {
    id: 'shake-dates',
    title: 'DATES SHAKE',
    subtitle: 'Natural Energy Drink',
    category: 'Drink',
    area: 'International',
    difficulty: 'Easy',
    prepTime: '5 min',
    cookTime: '10 min',
    totalTime: '15 min',
    servings: 2,
    calories: 260,
    rating: 4.7,
    reviews: 201,
    description: 'Natural energy shake with sweet dates and creamy texture.',
    chef: 'Health Drink Specialist',
    image: '/images/sd/F8.jpg',
    ingredients: [
      { name: 'Dates', amount: '10', notes: 'Pitted' },
      { name: 'Milk', amount: '300ml', notes: 'Whole or almond' },
      { name: 'Banana', amount: '1', notes: 'Ripe, for creaminess' },
      { name: 'Almond Butter', amount: '2 tbsp', notes: 'For richness' },
      { name: 'Ice Cubes', amount: '1 cup', notes: 'For thickness' },
      { name: 'Cinnamon', amount: '1/4 tsp', notes: 'For flavor' },
      { name: 'Vanilla Extract', amount: '1/2 tsp', notes: 'For flavor' },
      { name: 'Date Slices', amount: 'For garnish', notes: 'Optional' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Dates',
        description: 'Soak dates in warm water for 5 minutes to soften.',
        time: '5 min'
      },
      {
        title: 'Step 2: Blend Base',
        description: 'Blend dates, banana, milk, and almond butter until smooth.',
        time: '4 min'
      },
      {
        title: 'Step 3: Add Flavor',
        description: 'Add vanilla extract and cinnamon, blend to combine.',
        time: '2 min'
      },
      {
        title: 'Step 4: Add Ice',
        description: 'Add ice cubes and blend until thick and frothy.',
        time: '3 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Pour into glasses, garnish with date slices if desired.',
        time: '1 min'
      }
    ],
    nutrition: { calories: 260, protein: '6g', carbs: '42g', fat: '8g', fiber: '5g', sugar: '35g' }
  }
};
