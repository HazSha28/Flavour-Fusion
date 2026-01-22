// Complete recipe data for Firebase migration
export const recipeData = {
  // Global Cravings
  'home-pizza': {
    id: 'home-pizza',
    title: 'PIZZA',
    subtitle: 'with Vegetable',
    category: 'Italian',
    area: 'Italian',
    difficulty: 'Easy',
    prepTime: '15 min',
    cookTime: '30 min',
    totalTime: '45 min',
    servings: 4,
    calories: 285,
    rating: 4.5,
    reviews: 128,
    description: 'A classic Italian pizza with fresh vegetables, mozzarella cheese, and a crispy thin crust. Perfect for family dinners and gatherings.',
    chef: 'Italian Nonna',
    image: '/images/global/F1.jpg',
    ingredients: [
      { name: 'Pizza Dough', amount: '500g', notes: 'Store-bought or homemade' },
      { name: 'Tomato Sauce', amount: '200ml', notes: 'Italian marinara' },
      { name: 'Fresh Mozzarella', amount: '250g', notes: 'Shredded' },
      { name: 'Bell Peppers', amount: '2', notes: 'Mixed colors, sliced' },
      { name: 'Red Onion', amount: '1', notes: 'Thinly sliced' },
      { name: 'Mushrooms', amount: '100g', notes: 'Sliced' },
      { name: 'Olives', amount: '50g', notes: 'Black or green' },
      { name: 'Fresh Basil', amount: 'Handful', notes: 'For garnish' },
      { name: 'Olive Oil', amount: '2 tbsp', notes: 'Extra virgin' },
      { name: 'Salt & Pepper', amount: 'To taste', notes: 'Freshly ground' }
    ],
    steps: [
      { title: 'Prepare the Dough', description: 'Prepare pizza dough and let it rise to room temperature.', time: '30 min' },
      { title: 'Add Toppings', description: 'Spread sauce, add cheese and vegetables.', time: '15 min' },
      { title: 'Bake', description: 'Bake at high temperature until crust is golden.', time: '15 min' }
    ],
    nutrition: { calories: 285, protein: '12g', carbs: '35g', fat: '11g', fiber: '3g', sugar: '5g' }
  },
  'home-shawarma': {
    id: 'home-shawarma',
    title: 'SHAWARMA',
    subtitle: 'Middle Eastern Spiced',
    category: 'Middle Eastern',
    area: 'Middle Eastern',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '45 min',
    totalTime: '1h 5min',
    servings: 6,
    calories: 380,
    rating: 4.8,
    reviews: 245,
    description: 'Authentic Middle Eastern shawarma with perfectly spiced meat, wrapped in warm pita bread with fresh vegetables and tahini sauce.',
    chef: 'Middle Eastern Chef',
    image: '/images/global/F2.jpg',
    ingredients: [
      { name: 'Chicken Thighs', amount: '1kg', notes: 'Boneless, skinless' },
      { name: 'Shawarma Spices', amount: '3 tbsp', notes: 'Cumin, coriander, paprika, turmeric' },
      { name: 'Garlic', amount: '4 cloves', notes: 'Minced' },
      { name: 'Lemon Juice', amount: '2 tbsp', notes: 'Fresh' },
      { name: 'Yogurt', amount: '100ml', notes: 'Greek yogurt' },
      { name: 'Pita Bread', amount: '6', notes: 'Large' },
      { name: 'Tomatoes', amount: '3', notes: 'Diced' },
      { name: 'Cucumber', amount: '2', notes: 'Sliced' },
      { name: 'Onions', amount: '2', notes: 'Thinly sliced' },
      { name: 'Tahini Sauce', amount: '200ml', notes: 'For serving' }
    ],
    steps: [
      { title: 'Marinate Chicken', description: 'Mix spices, garlic, lemon juice, and yogurt. Coat chicken pieces and marinate for at least 2 hours.', time: '2h+' },
      { title: 'Cook Chicken', description: 'Grill or pan-fry marinated chicken until cooked through and slightly charred.', time: '45 min' },
      { title: 'Prepare Vegetables', description: 'Prepare all vegetables and warm pita bread.', time: '15 min' },
      { title: 'Assemble Shawarma', description: 'Slice chicken thinly. Place in pita with vegetables and drizzle with tahini sauce.', time: '10 min' }
    ],
    nutrition: { calories: 380, protein: '28g', carbs: '32g', fat: '18g', fiber: '4g', sugar: '6g' }
  }
};
