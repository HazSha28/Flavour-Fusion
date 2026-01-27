// Part 5: Smart Picks & Mood Meals Recipes (8 recipes from smartPicks category)
export const allRecipesPart5 = {
  // Smart Picks & Mood Meals Category
  'smart-spring-rolls': {
    id: 'smart-spring-rolls',
    title: 'CRISPY SPRING ROLLS',
    subtitle: 'Asian Appetizer',
    category: 'Appetizer',
    area: 'Asian',
    difficulty: 'Medium',
    prepTime: '15 min',
    cookTime: '25 min',
    totalTime: '40 min',
    servings: 6,
    calories: 180,
    rating: 4.6,
    reviews: 234,
    description: 'Crispy Asian spring rolls filled with vegetables and served with sweet chili sauce.',
    chef: 'Asian Cuisine Expert',
    image: '/images/smartp/F1.jpg',
    ingredients: [
      { name: 'Spring Roll Wrappers', amount: '12', notes: 'Rice paper' },
      { name: 'Cabbage', amount: '200g', notes: 'Shredded' },
      { name: 'Carrots', amount: '2', notes: 'Julienne cut' },
      { name: 'Bean Sprouts', amount: '100g', notes: 'Fresh' },
      { name: 'Green Onions', amount: '4', notes: 'Thinly sliced' },
      { name: 'Soy Sauce', amount: '2 tbsp', notes: 'For filling' },
      { name: 'Vegetable Oil', amount: 'For frying', notes: 'Deep frying' },
      { name: 'Sweet Chili Sauce', amount: 'For serving', notes: 'Dipping sauce' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Vegetables',
        description: 'Shred cabbage, julienne carrots, and slice green onions. Mix with bean sprouts.',
        time: '10 min'
      },
      {
        title: 'Step 2: Season Filling',
        description: 'Toss vegetables with soy sauce and let marinate for 5 minutes.',
        time: '5 min'
      },
      {
        title: 'Step 3: Roll Spring Rolls',
        description: 'Place filling on wrapper, roll tightly, and seal edges with water.',
        time: '15 min'
      },
      {
        title: 'Step 4: Fry Spring Rolls',
        description: 'Deep fry in hot oil until golden brown and crispy, about 3-4 minutes.',
        time: '10 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Drain on paper towels and serve hot with sweet chili sauce.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 180, protein: '4g', carbs: '22g', fat: '8g', fiber: '3g', sugar: '4g' }
  },

  'smart-spaghetti-bolognese': {
    id: 'smart-spaghetti-bolognese',
    title: 'SPAGHETTI BOLOGNESE',
    subtitle: 'Italian Classic Pasta',
    category: 'Main Course',
    area: 'Italian',
    difficulty: 'Medium',
    prepTime: '15 min',
    cookTime: '30 min',
    totalTime: '45 min',
    servings: 4,
    calories: 480,
    rating: 4.7,
    reviews: 312,
    description: 'Classic Italian pasta with rich meat sauce and parmesan cheese.',
    chef: 'Italian Pasta Master',
    image: '/images/smartp/F2.jpg',
    ingredients: [
      { name: 'Spaghetti', amount: '400g', notes: 'Italian pasta' },
      { name: 'Ground Beef', amount: '500g', notes: 'Lean' },
      { name: 'Tomato Sauce', amount: '400g', notes: 'Crushed tomatoes' },
      { name: 'Onion', amount: '1', notes: 'Diced' },
      { name: 'Garlic', amount: '3 cloves', notes: 'Minced' },
      { name: 'Red Wine', amount: '100ml', notes: 'For sauce' },
      { name: 'Parmesan Cheese', amount: '100g', notes: 'Freshly grated' },
      { name: 'Fresh Basil', amount: 'Handful', notes: 'For garnish' }
    ],
    steps: [
      {
        title: 'Step 1: Cook Pasta',
        description: 'Cook spaghetti in salted boiling water according to package directions until al dente.',
        time: '12 min'
      },
      {
        title: 'Step 2: Prepare Sauce Base',
        description: 'Sauté onion and garlic until soft, add ground beef and brown.',
        time: '10 min'
      },
      {
        title: 'Step 3: Make Bolognese Sauce',
        description: 'Add tomato sauce and red wine, simmer for 15 minutes until thickened.',
        time: '15 min'
      },
      {
        title: 'Step 4: Combine',
        description: 'Toss cooked spaghetti with bolognese sauce.',
        time: '3 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve hot with parmesan cheese and fresh basil.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 480, protein: '28g', carbs: '52g', fat: '18g', fiber: '4g', sugar: '8g' }
  },

  'smart-lasagna': {
    id: 'smart-lasagna',
    title: 'LASAGNA',
    subtitle: 'Layered Italian Bake',
    category: 'Main Course',
    area: 'Italian',
    difficulty: 'Hard',
    prepTime: '25 min',
    cookTime: '45 min',
    totalTime: '1h 10min',
    servings: 8,
    calories: 520,
    rating: 4.8,
    reviews: 289,
    description: 'Traditional Italian lasagna with layers of pasta, meat sauce, and cheese.',
    chef: 'Italian Nonna',
    image: '/images/smartp/F3.jpg',
    ingredients: [
      { name: 'Lasagna Sheets', amount: '12', notes: 'No-boil preferred' },
      { name: 'Ground Beef', amount: '600g', notes: 'For meat sauce' },
      { name: 'Tomato Sauce', amount: '800g', notes: 'Crushed' },
      { name: 'Ricotta Cheese', amount: '400g', notes: 'For filling' },
      { name: 'Mozzarella', amount: '300g', notes: 'Shredded' },
      { name: 'Parmesan', amount: '100g', notes: 'Grated' },
      { name: 'Onion', amount: '1', notes: 'Diced' },
      { name: 'Italian Herbs', amount: '2 tbsp', notes: 'Mixed herbs' }
    ],
    steps: [
      {
        title: 'Step 1: Make Meat Sauce',
        description: 'Brown ground beef with onion, add tomato sauce and herbs, simmer 20 minutes.',
        time: '25 min'
      },
      {
        title: 'Step 2: Prepare Cheese Filling',
        description: 'Mix ricotta with half the mozzarella and parmesan.',
        time: '5 min'
      },
      {
        title: 'Step 3: Layer Lasagna',
        description: 'Layer sauce, pasta sheets, and cheese mixture in baking dish. Repeat layers.',
        time: '15 min'
      },
      {
        title: 'Step 4: Bake',
        description: 'Top with remaining mozzarella and bake at 180°C for 30 minutes until bubbly.',
        time: '35 min'
      },
      {
        title: 'Step 5: Rest and Serve',
        description: 'Let rest 10 minutes before cutting and serving.',
        time: '10 min'
      }
    ],
    nutrition: { calories: 520, protein: '32g', carbs: '42g', fat: '24g', fiber: '4g', sugar: '10g' }
  },

  'smart-tortilla-espanola': {
    id: 'smart-tortilla-espanola',
    title: 'TORTILLA ESPAÑOLA',
    subtitle: 'Spanish Potato Omelette',
    category: 'Main Course',
    area: 'Spanish',
    difficulty: 'Easy',
    prepTime: '15 min',
    cookTime: '25 min',
    totalTime: '40 min',
    servings: 6,
    calories: 280,
    rating: 4.5,
    reviews: 178,
    description: 'Traditional Spanish omelette with potatoes and onions.',
    chef: 'Spanish Home Cook',
    image: '/images/smartp/F4.jpg',
    ingredients: [
      { name: 'Potatoes', amount: '600g', notes: 'Thinly sliced' },
      { name: 'Eggs', amount: '8', notes: 'Large' },
      { name: 'Onion', amount: '1', notes: 'Thinly sliced' },
      { name: 'Olive Oil', amount: '200ml', notes: 'For cooking' },
      { name: 'Salt', amount: 'To taste', notes: 'For seasoning' },
      { name: 'Black Pepper', amount: 'To taste', notes: 'Freshly ground' },
      { name: 'Fresh Parsley', amount: 'Handful', notes: 'For garnish' },
      { name: 'Lemon', amount: '1/2', notes: 'For serving' }
    ],
    steps: [
      {
        title: 'Step 1: Cook Potatoes',
        description: 'Heat olive oil, cook potatoes and onions slowly until tender, not browned.',
        time: '20 min'
      },
      {
        title: 'Step 2: Prepare Eggs',
        description: 'Beat eggs with salt and pepper. Drain potatoes and add to eggs.',
        time: '5 min'
      },
      {
        title: 'Step 3: Cook Tortilla',
        description: 'Heat small amount of oil, pour mixture in pan, cook on medium heat.',
        time: '10 min'
      },
      {
        title: 'Step 4: Flip and Finish',
        description: 'Flip tortilla carefully, cook other side until set.',
        time: '5 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Let cool slightly, garnish with parsley, serve warm or at room temperature.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 280, protein: '14g', carbs: '22g', fat: '16g', fiber: '3g', sugar: '2g' }
  },

  'smart-stuffed-mushroom': {
    id: 'smart-stuffed-mushroom',
    title: 'STUFFED PORTOBELLO MUSHROOMS',
    subtitle: 'Vegetarian Gourmet',
    category: 'Main Course',
    area: 'International',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '30 min',
    totalTime: '50 min',
    servings: 4,
    calories: 220,
    rating: 4.6,
    reviews: 189,
    description: 'Large portobello mushrooms stuffed with savory cheese and herb filling.',
    chef: 'Vegetarian Chef',
    image: '/images/smartp/F5.jpg',
    ingredients: [
      { name: 'Portobello Mushrooms', amount: '4', notes: 'Large caps' },
      { name: 'Cream Cheese', amount: '200g', notes: 'Softened' },
      { name: 'Parmesan', amount: '50g', notes: 'Grated' },
      { name: 'Garlic', amount: '3 cloves', notes: 'Minced' },
      { name: 'Breadcrumbs', amount: '100g', notes: 'For topping' },
      { name: 'Fresh Herbs', amount: '2 tbsp', notes: 'Mixed, chopped' },
      { name: 'Olive Oil', amount: '3 tbsp', notes: 'For cooking' },
      { name: 'Lemon', amount: '1', notes: 'For juice' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Mushrooms',
        description: 'Remove mushroom stems, brush caps with oil, and season with salt.',
        time: '8 min'
      },
      {
        title: 'Step 2: Make Filling',
        description: 'Mix cream cheese, parmesan, garlic, herbs, and lemon juice.',
        time: '5 min'
      },
      {
        title: 'Step 3: Stuff Mushrooms',
        description: 'Fill mushroom caps with cheese mixture, top with breadcrumbs.',
        time: '7 min'
      },
      {
        title: 'Step 4: Bake',
        description: 'Bake at 190°C for 20 minutes until golden and bubbly.',
        time: '25 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve hot with fresh herbs and lemon wedges.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 220, protein: '12g', carbs: '12g', fat: '16g', fiber: '2g', sugar: '3g' }
  },

  'smart-ratatouille': {
    id: 'smart-ratatouille',
    title: 'RATATOUILLE',
    subtitle: 'French Vegetable Medley',
    category: 'Main Course',
    area: 'French',
    difficulty: 'Medium',
    prepTime: '25 min',
    cookTime: '35 min',
    totalTime: '1h',
    servings: 6,
    calories: 180,
    rating: 4.7,
    reviews: 234,
    description: 'Traditional French stewed vegetable dish with herbs and olive oil.',
    chef: 'French Provincial Chef',
    image: '/images/smartp/F6.jpg',
    ingredients: [
      { name: 'Eggplant', amount: '1', notes: 'Large, diced' },
      { name: 'Zucchini', amount: '2', notes: 'Medium, sliced' },
      { name: 'Bell Peppers', amount: '2', notes: 'Mixed colors, diced' },
      { name: 'Tomatoes', amount: '4', notes: 'Ripe, diced' },
      { name: 'Onion', amount: '1', notes: 'Diced' },
      { name: 'Garlic', amount: '4 cloves', notes: 'Minced' },
      { name: 'Fresh Herbs', amount: 'Mixed', notes: 'Thyme, rosemary' },
      { name: 'Olive Oil', amount: '6 tbsp', notes: 'Extra virgin' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Vegetables',
        description: 'Dice all vegetables into similar sizes. Salt eggplant and let drain for 20 minutes.',
        time: '15 min'
      },
      {
        title: 'Step 2: Sauté Base',
        description: 'Sauté onion and garlic in olive oil until fragrant.',
        time: '5 min'
      },
      {
        title: 'Step 3: Cook Vegetables',
        description: 'Add eggplant, peppers, and zucchini. Cook until tender.',
        time: '15 min'
      },
      {
        title: 'Step 4: Add Tomatoes',
        description: 'Add tomatoes and herbs, simmer for 15 minutes until flavors meld.',
        time: '15 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve hot or at room temperature with crusty bread.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 180, protein: '4g', carbs: '18g', fat: '12g', fiber: '6g', sugar: '8g' }
  },

  'smart-beef-stew-dumplings': {
    id: 'smart-beef-stew-dumplings',
    title: 'AFRICAN FUFU',
    subtitle: 'Hearty Comfort Meal',
    category: 'Main Course',
    area: 'African',
    difficulty: 'Hard',
    prepTime: '30 min',
    cookTime: '60 min',
    totalTime: '1h 30min',
    servings: 6,
    calories: 420,
    rating: 4.8,
    reviews: 267,
    description: 'Traditional African beef stew with soft dumplings, rich in flavor and nutrition.',
    chef: 'African Cuisine Expert',
    image: '/images/smartp/F7.jpg',
    ingredients: [
      { name: 'Beef Stew Meat', amount: '800g', notes: 'Cut into chunks' },
      { name: 'Tomatoes', amount: '6', notes: 'Blended' },
      { name: 'Onions', amount: '2', notes: 'Large, diced' },
      { name: 'Yam Flour', amount: '300g', notes: 'For dumplings' },
      { name: 'Hot Water', amount: '400ml', notes: 'For dumplings' },
      { name: 'Palm Oil', amount: '100ml', notes: 'For stew' },
      { name: 'Scotch Bonnet', amount: '2', notes: 'For heat' },
      { name: 'Beef Broth', amount: '500ml', notes: 'For stew' }
    ],
    steps: [
      {
        title: 'Step 1: Make Stew Base',
        description: 'Heat palm oil, sauté onions, add blended tomatoes and scotch bonnet.',
        time: '15 min'
      },
      {
        title: 'Step 2: Cook Beef',
        description: 'Add beef to stew, cook until browned, then add broth and simmer.',
        time: '30 min'
      },
      {
        title: 'Step 3: Make Dumplings',
        description: 'Mix yam flour with hot water to form smooth dough. Shape into balls.',
        time: '10 min'
      },
      {
        title: 'Step 4: Cook Dumplings',
        description: 'Add dumplings to stew, simmer for 15 minutes until cooked through.',
        time: '15 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve hot stew with dumplings and extra broth if desired.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 420, protein: '32g', carbs: '38g', fat: '18g', fiber: '4g', sugar: '8g' }
  },

  'smart-chicken-korma': {
    id: 'smart-chicken-korma',
    title: 'CHICKEN KORMA',
    subtitle: 'Creamy Indian Curry',
    category: 'Main Course',
    area: 'Indian',
    difficulty: 'Medium',
    prepTime: '25 min',
    cookTime: '40 min',
    totalTime: '1h 5min',
    servings: 4,
    calories: 480,
    rating: 4.7,
    reviews: 289,
    description: 'Rich and creamy Indian curry with tender chicken in aromatic spiced sauce.',
    chef: 'North Indian Chef',
    image: '/images/smartp/F8.jpg',
    ingredients: [
      { name: 'Chicken', amount: '800g', notes: 'Cut into pieces' },
      { name: 'Yogurt', amount: '200g', notes: 'Thick' },
      { name: 'Coconut Milk', amount: '400ml', notes: 'Full fat' },
      { name: 'Onion', amount: '2', notes: 'Sliced' },
      { name: 'Ginger-Garlic Paste', amount: '3 tbsp', notes: 'Fresh' },
      { name: 'Korma Masala', amount: '3 tbsp', notes: 'Spice blend' },
      { name: 'Cashews', amount: '50g', notes: 'For garnish' },
      { name: 'Basmati Rice', amount: '2 cups', notes: 'For serving' }
    ],
    steps: [
      {
        title: 'Step 1: Marinate Chicken',
        description: 'Mix chicken with yogurt and half the spices. Marinate for 20 minutes.',
        time: '20 min'
      },
      {
        title: 'Step 2: Prepare Curry Base',
        description: 'Sauté onions until golden, add ginger-garlic paste and remaining spices.',
        time: '10 min'
      },
      {
        title: 'Step 3: Cook Chicken',
        description: 'Add marinated chicken, cook until browned and sealed.',
        time: '10 min'
      },
      {
        title: 'Step 4: Make Gravy',
        description: 'Add coconut milk and simmer for 15 minutes until thick.',
        time: '15 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Garnish with toasted cashews, serve hot with basmati rice.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 480, protein: '36g', carbs: '28g', fat: '26g', fiber: '3g', sugar: '8g' }
  }
};
