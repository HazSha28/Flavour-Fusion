// Part 2: Breakfast & Brunch Recipes (8 recipes from bitesBrunch category)
export const allRecipesPart2 = {
  // Breakfast & Brunch Category
  'brunch-protein-bowl': {
    id: 'brunch-protein-bowl',
    title: 'HIGH PROTEIN BOWL',
    subtitle: 'Power Packed Breakfast',
    category: 'Breakfast',
    area: 'International',
    difficulty: 'Easy',
    prepTime: '10 min',
    cookTime: '15 min',
    totalTime: '25 min',
    servings: 2,
    calories: 380,
    rating: 4.4,
    reviews: 145,
    description: 'A nutritious breakfast bowl packed with protein, fresh vegetables, and healthy fats to start your day strong.',
    chef: 'Fitness Nutritionist',
    image: '/images/bitesbb/F1.jpg',
    ingredients: [
      { name: 'Greek Yogurt', amount: '200g', notes: 'High protein' },
      { name: 'Eggs', amount: '2', notes: 'Hard-boiled' },
      { name: 'Quinoa', amount: '1 cup', notes: 'Cooked' },
      { name: 'Spinach', amount: '2 cups', notes: 'Fresh' },
      { name: 'Avocado', amount: '1/2', notes: 'Sliced' },
      { name: 'Almonds', amount: '30g', notes: 'Toasted' },
      { name: 'Chia Seeds', amount: '1 tbsp', notes: 'For topping' },
      { name: 'Honey', amount: '1 tsp', notes: 'For drizzle' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Base',
        description: 'Cook quinoa according to package directions and let it cool slightly. Place Greek yogurt in the bottom of two bowls.',
        time: '10 min'
      },
      {
        title: 'Step 2: Cook the Eggs',
        description: 'Hard-boil eggs for 10 minutes, then cool in ice water. Peel and slice in half.',
        time: '15 min'
      },
      {
        title: 'Step 3: Prepare Vegetables',
        description: 'Wash and dry spinach. Slice avocado and toast almonds lightly.',
        time: '5 min'
      },
      {
        title: 'Step 4: Assemble the Bowl',
        description: 'Layer quinoa, spinach, sliced eggs, and avocado over yogurt. Top with almonds and chia seeds.',
        time: '5 min'
      },
      {
        title: 'Step 5: Finish and Serve',
        description: 'Drizzle with honey and serve immediately while fresh.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 380, protein: '28g', carbs: '32g', fat: '18g', fiber: '8g', sugar: '12g' }
  },

  'brunch-smoothie-bowl': {
    id: 'brunch-smoothie-bowl',
    title: 'PEACH BANANA SMOOTHIE BOWL',
    subtitle: 'Healthy Morning Start',
    category: 'Breakfast',
    area: 'International',
    difficulty: 'Easy',
    prepTime: '5 min',
    cookTime: '10 min',
    totalTime: '15 min',
    servings: 1,
    calories: 290,
    rating: 4.6,
    reviews: 178,
    description: 'A refreshing smoothie bowl with peaches, banana, and nutritious toppings for a healthy breakfast.',
    chef: 'Health Coach',
    image: '/images/bitesbb/F2.jpg',
    ingredients: [
      { name: 'Frozen Peaches', amount: '1 cup', notes: 'Sliced' },
      { name: 'Banana', amount: '1', notes: 'Frozen' },
      { name: 'Greek Yogurt', amount: '100g', notes: 'Plain' },
      { name: 'Almond Milk', amount: '200ml', notes: 'Unsweetened' },
      { name: 'Granola', amount: '30g', notes: 'For topping' },
      { name: 'Fresh Berries', amount: '50g', notes: 'Mixed berries' },
      { name: 'Coconut Flakes', amount: '1 tbsp', notes: 'Toasted' },
      { name: 'Honey', amount: '1 tsp', notes: 'Optional' }
    ],
    steps: [
      {
        title: 'Step 1: Blend the Base',
        description: 'Blend frozen peaches, banana, Greek yogurt, and almond milk until smooth and thick.',
        time: '5 min'
      },
      {
        title: 'Step 2: Prepare Toppings',
        description: 'Wash fresh berries, toast coconut flakes, and measure granola.',
        time: '3 min'
      },
      {
        title: 'Step 3: Pour the Smoothie',
        description: 'Pour smoothie into a bowl and create a smooth surface with the back of a spoon.',
        time: '2 min'
      },
      {
        title: 'Step 4: Add Toppings',
        description: 'Arrange berries, granola, and coconut flakes in sections over the smoothie.',
        time: '3 min'
      },
      {
        title: 'Step 5: Serve Fresh',
        description: 'Drizzle with honey if desired and serve immediately.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 290, protein: '12g', carbs: '45g', fat: '8g', fiber: '6g', sugar: '28g' }
  },

  'brunch-turkish-eggs': {
    id: 'brunch-turkish-eggs',
    title: 'TURKISH POACHED EGGS',
    subtitle: 'Mediterranean Egg Dish',
    category: 'Breakfast',
    area: 'Turkish',
    difficulty: 'Medium',
    prepTime: '12 min',
    cookTime: '20 min',
    totalTime: '32 min',
    servings: 2,
    calories: 320,
    rating: 4.7,
    reviews: 203,
    description: 'Traditional Turkish poached eggs in spicy tomato sauce with yogurt and herbs.',
    chef: 'Turkish Chef',
    image: '/images/bitesbb/F3.jpg',
    ingredients: [
      { name: 'Eggs', amount: '4', notes: 'Fresh' },
      { name: 'Tomatoes', amount: '4', notes: 'Ripe, diced' },
      { name: 'Red Peppers', amount: '2', notes: 'Diced' },
      { name: 'Garlic', amount: '3 cloves', notes: 'Minced' },
      { name: 'Greek Yogurt', amount: '200g', notes: 'Thick' },
      { name: 'Chili Flakes', amount: '1 tsp', notes: 'To taste' },
      { name: 'Cumin', amount: '1 tsp', notes: 'Ground' },
      { name: 'Fresh Parsley', amount: 'Handful', notes: 'For garnish' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Sauce',
        description: 'Sauté garlic, then add diced tomatoes and peppers. Cook until soft, about 10 minutes.',
        time: '12 min'
      },
      {
        title: 'Step 2: Season the Sauce',
        description: 'Add cumin, chili flakes, salt, and pepper. Simmer for 5 minutes.',
        time: '5 min'
      },
      {
        title: 'Step 3: Poach the Eggs',
        description: 'Make small wells in the sauce and crack eggs into them. Cover and cook until whites are set.',
        time: '8 min'
      },
      {
        title: 'Step 4: Prepare Yogurt',
        description: 'Mix Greek yogurt with a pinch of salt and spread on plates.',
        time: '2 min'
      },
      {
        title: 'Step 5: Serve and Garnish',
        description: 'Place eggs and sauce over yogurt. Garnish with fresh parsley and serve with bread.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 320, protein: '22g', carbs: '18g', fat: '20g', fiber: '4g', sugar: '8g' }
  },

  'brunch-frittata': {
    id: 'brunch-frittata',
    title: 'MINI FRITTATA',
    subtitle: 'Italian Egg Bake',
    category: 'Breakfast',
    area: 'Italian',
    difficulty: 'Easy',
    prepTime: '15 min',
    cookTime: '25 min',
    totalTime: '40 min',
    servings: 4,
    calories: 280,
    rating: 4.3,
    reviews: 156,
    description: 'Individual Italian-style baked egg cups with vegetables and cheese, perfect for brunch.',
    chef: 'Italian Cook',
    image: '/images/bitesbb/F4.jpg',
    ingredients: [
      { name: 'Eggs', amount: '8', notes: 'Large' },
      { name: 'Milk', amount: '100ml', notes: 'Whole milk' },
      { name: 'Bell Peppers', amount: '1', notes: 'Diced' },
      { name: 'Spinach', amount: '2 cups', notes: 'Fresh' },
      { name: 'Feta Cheese', amount: '100g', notes: 'Crumbled' },
      { name: 'Parmesan', amount: '50g', notes: 'Grated' },
      { name: 'Olive Oil', amount: '2 tbsp', notes: 'For greasing' },
      { name: 'Fresh Basil', amount: 'Handful', notes: 'For garnish' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Vegetables',
        description: 'Sauté diced bell peppers until soft, then add spinach and wilt. Cool slightly.',
        time: '8 min'
      },
      {
        title: 'Step 2: Mix Egg Batter',
        description: 'Whisk eggs with milk, salt, and pepper until well combined.',
        time: '5 min'
      },
      {
        title: 'Step 3: Fill Muffin Tins',
        description: 'Grease muffin tin, divide vegetables and cheese among cups, then pour egg mixture over.',
        time: '7 min'
      },
      {
        title: 'Step 4: Bake',
        description: 'Bake at 375°F (190°C) for 15-18 minutes until set and golden.',
        time: '18 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Let cool for 2 minutes, then remove from tin. Garnish with fresh basil.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 280, protein: '18g', carbs: '8g', fat: '20g', fiber: '2g', sugar: '3g' }
  },

  'brunch-shakshuka': {
    id: 'brunch-shakshuka',
    title: 'SHAKSHUKA WITH FETA',
    subtitle: 'Middle Eastern Skillet',
    category: 'Breakfast',
    area: 'Middle Eastern',
    difficulty: 'Medium',
    prepTime: '18 min',
    cookTime: '30 min',
    totalTime: '48 min',
    servings: 4,
    calories: 340,
    rating: 4.8,
    reviews: 267,
    description: 'Traditional Middle Eastern dish of eggs poached in spicy tomato sauce with feta cheese.',
    chef: 'Middle Eastern Specialist',
    image: '/images/bitesbb/F5.jpg',
    ingredients: [
      { name: 'Eggs', amount: '6', notes: 'Fresh' },
      { name: 'Canned Tomatoes', amount: '800g', notes: 'Crushed' },
      { name: 'Onion', amount: '1', notes: 'Diced' },
      { name: 'Bell Pepper', amount: '1', notes: 'Red, diced' },
      { name: 'Garlic', amount: '4 cloves', notes: 'Minced' },
      { name: 'Feta Cheese', amount: '150g', notes: 'Crumbled' },
      { name: 'Cumin', amount: '2 tsp', notes: 'Ground' },
      { name: 'Fresh Cilantro', amount: 'Handful', notes: 'For garnish' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Base',
        description: 'Sauté onion and bell pepper until soft, then add garlic and cook for 1 minute.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make the Sauce',
        description: 'Add crushed tomatoes, cumin, salt, and pepper. Simmer for 15 minutes.',
        time: '15 min'
      },
      {
        title: 'Step 3: Add Eggs',
        description: 'Make wells in the sauce and crack eggs into them. Cover and cook until whites are set.',
        time: '8 min'
      },
      {
        title: 'Step 4: Add Feta',
        description: 'Sprinkle crumbled feta cheese over the eggs and sauce.',
        time: '2 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Garnish with fresh cilantro and serve with crusty bread.',
        time: '3 min'
      }
    ],
    nutrition: { calories: 340, protein: '20g', carbs: '22g', fat: '20g', fiber: '6g', sugar: '10g' }
  },

  'brunch-garlic-rice-chicken': {
    id: 'brunch-garlic-rice-chicken',
    title: 'GARLIC RICE WITH WHITE SAUCE CHICKEN',
    subtitle: 'Asian Fusion Bowl',
    category: 'Breakfast',
    area: 'Asian Fusion',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '35 min',
    totalTime: '55 min',
    servings: 3,
    calories: 420,
    rating: 4.5,
    reviews: 189,
    description: 'Fusion dish combining garlic rice with tender chicken in creamy white sauce.',
    chef: 'Asian Fusion Chef',
    image: '/images/bitesbb/F6.jpg',
    ingredients: [
      { name: 'Chicken Breast', amount: '500g', notes: 'Cut into pieces' },
      { name: 'Jasmine Rice', amount: '2 cups', notes: 'Uncooked' },
      { name: 'Garlic', amount: '8 cloves', notes: 'Minced' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'For sauce' },
      { name: 'Mushrooms', amount: '200g', notes: 'Sliced' },
      { name: 'Soy Sauce', amount: '3 tbsp', notes: 'For rice' },
      { name: 'Green Onions', amount: '3', notes: 'For garnish' },
      { name: 'White Pepper', amount: 'To taste', notes: 'Ground' }
    ],
    steps: [
      {
        title: 'Step 1: Cook the Rice',
        description: 'Cook jasmine rice with garlic and soy sauce according to package directions.',
        time: '20 min'
      },
      {
        title: 'Step 2: Prepare Chicken',
        description: 'Season chicken with salt and pepper, then pan-sear until golden brown.',
        time: '10 min'
      },
      {
        title: 'Step 3: Make White Sauce',
        description: 'Sauté mushrooms, add heavy cream, and simmer until thickened. Season with white pepper.',
        time: '10 min'
      },
      {
        title: 'Step 4: Combine',
        description: 'Add cooked chicken to white sauce and heat through.',
        time: '5 min'
      },
      {
        title: 'Step 5: Assemble and Serve',
        description: 'Serve garlic rice topped with chicken and white sauce. Garnish with green onions.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 420, protein: '32g', carbs: '38g', fat: '18g', fiber: '3g', sugar: '4g' }
  },

  'brunch-coleslaw': {
    id: 'brunch-coleslaw',
    title: 'COLESLAW',
    subtitle: 'Classic Crunchy Side',
    category: 'Side Dish',
    area: 'American',
    difficulty: 'Easy',
    prepTime: '10 min',
    cookTime: '15 min',
    totalTime: '25 min',
    servings: 6,
    calories: 180,
    rating: 4.1,
    reviews: 134,
    description: 'Classic creamy coleslaw with crunchy cabbage and carrots in tangy dressing.',
    chef: 'American Cook',
    image: '/images/bitesbb/F7.jpg',
    ingredients: [
      { name: 'Cabbage', amount: '1 medium', notes: 'Shredded' },
      { name: 'Carrots', amount: '2', notes: 'Grated' },
      { name: 'Mayonnaise', amount: '100g', notes: 'For dressing' },
      { name: 'Apple Cider Vinegar', amount: '2 tbsp', notes: 'For tang' },
      { name: 'Sugar', amount: '1 tbsp', notes: 'To balance' },
      { name: 'Celery Seeds', amount: '1 tsp', notes: 'For flavor' },
      { name: 'Salt', amount: 'To taste', notes: 'For seasoning' },
      { name: 'Black Pepper', amount: 'To taste', notes: 'Freshly ground' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Vegetables',
        description: 'Shred cabbage finely and grate carrots. Place in a large bowl.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Dressing',
        description: 'Mix mayonnaise, vinegar, sugar, celery seeds, salt, and pepper until smooth.',
        time: '5 min'
      },
      {
        title: 'Step 3: Combine',
        description: 'Pour dressing over cabbage and carrots. Toss well to coat evenly.',
        time: '3 min'
      },
      {
        title: 'Step 4: Chill',
        description: 'Cover and refrigerate for at least 30 minutes to let flavors meld.',
        time: '15 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Stir before serving and adjust seasoning if needed.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 180, protein: '2g', carbs: '12g', fat: '14g', fiber: '3g', sugar: '8g' }
  },

  'brunch-avocado-toast': {
    id: 'brunch-avocado-toast',
    title: 'AVOCADO TOAST WITH EGGS',
    subtitle: 'Modern Brunch Favorite',
    category: 'Breakfast',
    area: 'Modern',
    difficulty: 'Easy',
    prepTime: '8 min',
    cookTime: '12 min',
    totalTime: '20 min',
    servings: 2,
    calories: 350,
    rating: 4.6,
    reviews: 223,
    description: 'Trendy avocado toast topped with perfectly poached eggs and seasonings.',
    chef: 'Modern Brunch Chef',
    image: '/images/bitesbb/F8.jpg',
    ingredients: [
      { name: 'Avocado', amount: '1', notes: 'Ripe' },
      { name: 'Sourdough Bread', amount: '4 slices', notes: 'Thick cut' },
      { name: 'Eggs', amount: '2', notes: 'For poaching' },
      { name: 'Lemon', amount: '1/2', notes: 'Fresh juice' },
      { name: 'Red Pepper Flakes', amount: '1/4 tsp', notes: 'For heat' },
      { name: 'Everything Bagel Seasoning', amount: '1 tsp', notes: 'For topping' },
      { name: 'Microgreens', amount: 'Handful', notes: 'For garnish' },
      { name: 'Olive Oil', amount: '2 tbsp', notes: 'For toasting' }
    ],
    steps: [
      {
        title: 'Step 1: Toast Bread',
        description: 'Brush sourdough with olive oil and toast until golden and crispy.',
        time: '5 min'
      },
      {
        title: 'Step 2: Prepare Avocado',
        description: 'Mash avocado with lemon juice, salt, and pepper until smooth but slightly chunky.',
        time: '5 min'
      },
      {
        title: 'Step 3: Poach Eggs',
        description: 'Poach eggs in simmering water with vinegar for 3-4 minutes for soft yolks.',
        time: '7 min'
      },
      {
        title: 'Step 4: Assemble',
        description: 'Spread avocado on toast, top with poached eggs.',
        time: '2 min'
      },
      {
        title: 'Step 5: Garnish and Serve',
        description: 'Sprinkle with red pepper flakes, everything seasoning, and microgreens.',
        time: '1 min'
      }
    ],
    nutrition: { calories: 350, protein: '16g', carbs: '28g', fat: '22g', fiber: '8g', sugar: '2g' }
  }
};
