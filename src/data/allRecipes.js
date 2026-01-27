// Complete recipe data for all 47 recipes from Home.jsx
export const allRecipes = {
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
      {
        title: 'Step 1: Prepare the Dough',
        description: 'Take the pizza dough out of the refrigerator and let it come to room temperature for about 30 minutes. On a lightly floured surface, roll out the dough to your desired thickness, typically about 1/4 inch thick for a classic crust.',
        time: '30 min'
      },
      {
        title: 'Step 2: Preheat the Oven',
        description: 'Preheat your oven to its highest temperature, usually between 475-500°F (245-260°C). If you have a pizza stone, place it in the oven while preheating to get a crispy crust.',
        time: '15 min'
      },
      {
        title: 'Step 3: Prepare the Sauce',
        description: 'Spread a thin layer of tomato sauce evenly over the dough, leaving about 1/2 inch border around the edges for the crust. Use the back of a spoon to spread it smoothly.',
        time: '5 min'
      },
      {
        title: 'Step 4: Add Cheese',
        description: 'Sprinkle shredded mozzarella cheese evenly over the sauce. Don\'t overload with cheese as it can make the pizza soggy. Leave some areas showing the sauce for traditional appearance.',
        time: '3 min'
      },
      {
        title: 'Step 5: Add Vegetables',
        description: 'Distribute your sliced vegetables evenly over the cheese. Bell peppers, red onions, mushrooms, and olives work great. Make sure not to overcrowd the pizza.',
        time: '5 min'
      },
      {
        title: 'Step 6: Season and Bake',
        description: 'Drizzle with olive oil and season with salt, pepper, and dried herbs like oregano or basil. Transfer to the preheated oven or pizza stone and bake for 12-15 minutes.',
        time: '15 min'
      },
      {
        title: 'Step 7: Finish and Serve',
        description: 'Bake until the crust is golden brown and the cheese is bubbly and slightly browned. Let it rest for 2-3 minutes before slicing. Garnish with fresh basil if desired.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 285, protein: '12g', carbs: '35g', fat: '11g', fiber: '3g', sugar: '5g' }
  },
  'home-shawarma': {
    id: 'home-shawarma',
    title: 'SHAWARMA',
    subtitle: 'with Spiced Chicken',
    category: 'Middle Eastern',
    area: 'Middle Eastern',
    difficulty: 'Easy',
    prepTime: '20 min',
    cookTime: '25 min',
    totalTime: '45 min',
    servings: 4,
    calories: 360,
    rating: 4.7,
    reviews: 198,
    description: 'A simple and delicious chicken shawarma made with basic spices, cooked to perfection and wrapped in warm flatbread. Perfect for quick meals and family dinners.',
    chef: 'Street Food Classic',
    image: '/images/global/F2.jpg',

    ingredients: [
      { name: 'Chicken', amount: '500g', notes: 'Boneless, thinly sliced' },
      { name: 'Yogurt', amount: '3 tbsp', notes: 'Thick' },
      { name: 'Olive Oil', amount: '2 tbsp', notes: 'For marination' },
      { name: 'Garlic', amount: '3 cloves', notes: 'Minced' },
      { name: 'Lemon Juice', amount: '1 tbsp', notes: 'Fresh' },
      { name: 'Shawarma Spice Mix', amount: '2 tsp', notes: 'Cumin, paprika, pepper' },
      { name: 'Onion', amount: '1', notes: 'Thinly sliced' },
      { name: 'Tomato', amount: '1', notes: 'Sliced' },
      { name: 'Flatbread / Pita', amount: '4', notes: 'For serving' },
      { name: 'Salt', amount: 'To taste', notes: 'As needed' }
    ],

    steps: [
      {
        title: 'Marinate Chicken',
        description: 'Mix yogurt, olive oil, garlic, lemon juice, spices, and salt. Coat chicken well.',
        time: '15 min'
      },
      {
        title: 'Cook Chicken',
        description: 'Cook marinated chicken in a hot pan until golden and fully cooked.',
        time: '20 min'
      },
      {
        title: 'Prepare Filling',
        description: 'Slice onions and tomatoes. Warm the flatbread.',
        time: '5 min'
      },
      {
        title: 'Assemble Shawarma',
        description: 'Place chicken and vegetables on flatbread, roll tightly, and serve.',
        time: '5 min'
      }
    ],

    nutrition: {
      calories: 360,
      protein: '26g',
      carbs: '30g',
      fat: '16g',
      fiber: '3g',
      sugar: '4g'
    }
  },
  'home-birria-tacos': {
    id: 'home-birria-tacos',
    title: 'BIRRIA TACOS',
    subtitle: 'Slow Cooked Beef',
    category: 'Mexican',
    area: 'Mexican',
    difficulty: 'Hard',
    prepTime: '30 min',
    cookTime: '60 min',
    totalTime: '1h 30min',
    servings: 6,
    calories: 420,
    rating: 4.9,
    reviews: 312,
    description: 'Slow-cooked beef tacos with rich, flavorful broth and traditional Mexican toppings.',
    chef: 'Mexican Abuela',
    image: '/images/global/F3.jpg',
    ingredients: [
      { name: 'Beef Brisket', amount: '2kg', notes: 'For slow cooking' },
      { name: 'Dried Chilies', amount: '5', notes: 'Guajillo or ancho' },
      { name: 'Mexican Spices', amount: '2 tbsp', notes: 'Cumin, oregano, paprika' },
      { name: 'Corn Tortillas', amount: '12', notes: 'Small size' },
      { name: 'Onion', amount: '2', notes: 'Diced' },
      { name: 'Cilantro', amount: '1 bunch', notes: 'Fresh' },
      { name: 'Lime', amount: '3', notes: 'For serving' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Beef',
        description: 'Cut the beef brisket into large chunks and season with salt and pepper. Heat oil in a large pot and brown the beef on all sides.',
        time: '15 min'
      },
      {
        title: 'Step 2: Make the Chili Sauce',
        description: 'Toast dried chilies in a dry pan until fragrant. Soak in hot water for 15 minutes, then blend with garlic, vinegar, and spices.',
        time: '20 min'
      },
      {
        title: 'Step 3: Slow Cook the Beef',
        description: 'Add chili sauce to the pot with beef, cover with beef broth, and simmer for 2-3 hours until tender.',
        time: '2h 30min'
      },
      {
        title: 'Step 4: Prepare Toppings',
        description: 'Dice onions, chop cilantro, and prepare lime wedges while beef cooks.',
        time: '10 min'
      },
      {
        title: 'Step 5: Assemble Tacos',
        description: 'Dip tortillas in the consommé, fill with shredded beef, and serve with onions, cilantro, and lime.',
        time: '15 min'
      }
    ],
    nutrition: { calories: 420, protein: '35g', carbs: '28g', fat: '22g', fiber: '4g', sugar: '8g' }
  },
  'home-dumplings': {
    id: 'home-dumplings',
    title: 'DUMPLINGS',
    subtitle: 'Steamed Perfection',
    category: 'Chinese',
    area: 'Chinese',
    difficulty: 'Medium',
    prepTime: '25 min',
    cookTime: '40 min',
    totalTime: '1h 5min',
    servings: 8,
    calories: 320,
    rating: 4.3,
    reviews: 189,
    description: 'Traditional Chinese dumplings with savory filling and delicate wrappers, steamed to perfection.',
    chef: 'Chinese Grandma',
    image: '/images/global/F4.jpg',
    ingredients: [
      { name: 'Dumpling Wrappers', amount: '50', notes: 'Round or square' },
      { name: 'Ground Pork', amount: '500g', notes: 'Lean' },
      { name: 'Cabbage', amount: '200g', notes: 'Finely chopped' },
      { name: 'Green Onions', amount: '3', notes: 'Finely chopped' },
      { name: 'Ginger', amount: '2 tbsp', notes: 'Minced' },
      { name: 'Soy Sauce', amount: '3 tbsp', notes: 'For seasoning' },
      { name: 'Sesame Oil', amount: '2 tbsp', notes: 'For cooking' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Filling',
        description: 'Mix ground pork with finely chopped cabbage, green onions, minced ginger, and soy sauce. Season with salt and pepper.',
        time: '15 min'
      },
      {
        title: 'Step 2: Wrap the Dumplings',
        description: 'Place a small amount of filling in the center of each wrapper. Moisten edges with water, fold in half, and pinch to seal. Create pleats for traditional look.',
        time: '25 min'
      },
      {
        title: 'Step 3: Steam the Dumplings',
        description: 'Arrange dumplings in a steamer lined with parchment paper. Steam for 15-20 minutes until wrappers are translucent and filling is cooked.',
        time: '20 min'
      },
      {
        title: 'Step 4: Prepare Dipping Sauce',
        description: 'Mix soy sauce with sesame oil, minced garlic, and a touch of vinegar for dipping.',
        time: '5 min'
      },
      {
        title: 'Step 5: Serve Hot',
        description: 'Serve dumplings immediately with dipping sauce and garnish with additional green onions.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 320, protein: '18g', carbs: '32g', fat: '12g', fiber: '3g', sugar: '4g' }
  },
  'home-paratha-curry': {
    id: 'home-paratha-curry',
    title: 'PARATHA CURRY',
    subtitle: 'Spicy Chicken',
    category: 'Indian',
    area: 'Indian',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '35 min',
    totalTime: '55 min',
    servings: 4,
    calories: 380,
    rating: 4.6,
    reviews: 234,
    description: 'Flaky paratha bread served with spicy chicken curry in authentic Indian style.',
    chef: 'Indian Spice Master',
    image: '/images/global/F5.jpg',
    ingredients: [
      { name: 'Chicken', amount: '600g', notes: 'Cut into pieces' },
      { name: 'Onions', amount: '2', notes: 'Sliced' },
      { name: 'Tomatoes', amount: '3', notes: 'Pureed' },
      { name: 'Ginger-Garlic Paste', amount: '3 tbsp', notes: 'Fresh' },
      { name: 'Indian Spices', amount: '2 tbsp', notes: 'Garam masala, turmeric' },
      { name: 'Yogurt', amount: '100ml', notes: 'For marination' },
      { name: 'Fresh Coriander', amount: 'Handful', notes: 'For garnish' },
      { name: 'Paratha', amount: '4', notes: 'Store-bought or homemade' }
    ],
    steps: [
      {
        title: 'Step 1: Marinate the Chicken',
        description: 'Mix chicken pieces with yogurt, ginger-garlic paste, turmeric, and salt. Let marinate for 20 minutes.',
        time: '20 min'
      },
      {
        title: 'Step 2: Prepare the Curry Base',
        description: 'Heat oil in a pan, add sliced onions and sauté until golden brown. Add ginger-garlic paste and cook for 2 minutes.',
        time: '10 min'
      },
      {
        title: 'Step 3: Cook the Chicken',
        description: 'Add marinated chicken to the pan and cook until browned. Add tomato puree and garam masala. Simmer for 15 minutes.',
        time: '15 min'
      },
      {
        title: 'Step 4: Finish the Curry',
        description: 'Add water to achieve desired consistency and simmer until chicken is fully cooked. Adjust seasoning.',
        time: '10 min'
      },
      {
        title: 'Step 5: Prepare and Serve',
        description: 'Warm paratha on a griddle with butter. Serve hot curry with paratha and garnish with fresh coriander.',
        time: '10 min'
      }
    ],
    nutrition: { calories: 380, protein: '28g', carbs: '35g', fat: '16g', fiber: '4g', sugar: '6g' }
  },
  'home-alfredo-pasta': {
    id: 'home-alfredo-pasta',
    title: 'ALFREDO PASTA',
    subtitle: 'Cheese Loaded',
    category: 'Italian',
    area: 'Italian',
    difficulty: 'Easy',
    prepTime: '10 min',
    cookTime: '25 min',
    totalTime: '35 min',
    servings: 4,
    calories: 450,
    rating: 4.7,
    reviews: 267,
    description: 'Creamy alfredo pasta loaded with cheese and served with garlic bread.',
    chef: 'Italian Nonna',
    image: '/images/global/F6.jpg',
    ingredients: [
      { name: 'Fettuccine Pasta', amount: '400g', notes: 'Fresh or dried' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'For sauce' },
      { name: 'Parmesan Cheese', amount: '100g', notes: 'Freshly grated' },
      { name: 'Butter', amount: '50g', notes: 'For sauce' },
      { name: 'Garlic', amount: '4 cloves', notes: 'Minced' },
      { name: 'Black Pepper', amount: 'To taste', notes: 'Freshly ground' },
      { name: 'Parsley', amount: '2 tbsp', notes: 'Fresh, chopped' }
    ],
    steps: [
      {
        title: 'Step 1: Cook the Pasta',
        description: 'Bring a large pot of salted water to boil. Add fettuccine and cook according to package directions until al dente. Reserve 1 cup pasta water.',
        time: '15 min'
      },
      {
        title: 'Step 2: Prepare the Sauce Base',
        description: 'In a large pan, melt butter over medium heat. Add minced garlic and sauté for 1 minute until fragrant.',
        time: '3 min'
      },
      {
        title: 'Step 3: Make the Alfredo Sauce',
        description: 'Pour heavy cream into the pan with garlic. Simmer gently for 2-3 minutes, then gradually add Parmesan cheese while stirring.',
        time: '10 min'
      },
      {
        title: 'Step 4: Combine Pasta and Sauce',
        description: 'Drain pasta and add to the sauce. Toss well to coat. Add pasta water if needed to achieve desired consistency.',
        time: '5 min'
      },
      {
        title: 'Step 5: Season and Serve',
        description: 'Season with black pepper and garnish with fresh parsley. Serve immediately while hot.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 450, protein: '18g', carbs: '45g', fat: '25g', fiber: '2g', sugar: '4g' }
  },
  'home-dahi-poori': {
    id: 'home-dahi-poori',
    title: 'DAHI POORI',
    subtitle: 'Crispy Street Food',
    category: 'Indian',
    area: 'Indian',
    difficulty: 'Easy',
    prepTime: '15 min',
    cookTime: '20 min',
    totalTime: '35 min',
    servings: 6,
    calories: 280,
    rating: 4.2,
    reviews: 156,
    description: 'Crispy hollow puri filled with spiced yogurt and topped with chutneys.',
    chef: 'French Chef',
    image: '/images/global/F7.jpg',
    ingredients: [
      { name: 'Puri', amount: '12', notes: 'Store-bought or homemade' },
      { name: 'Yogurt', amount: '300g', notes: 'Thick yogurt' },
      { name: 'Boiled Potatoes', amount: '200g', notes: 'Mashed' },
      { name: 'Spices', amount: '2 tsp', notes: 'Cumin, chaat masala' },
      { name: 'Tamarind Chutney', amount: '100ml', notes: 'Sweet and tangy' },
      { name: 'Mint Chutney', amount: '100ml', notes: 'Fresh mint' },
      { name: 'Sev', amount: '50g', notes: 'Crispy noodles' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Yogurt Filling',
        description: 'Whisk thick yogurt until smooth. Add mashed potatoes, cumin powder, chaat masala, and salt. Mix well.',
        time: '10 min'
      },
      {
        title: 'Step 2: Prepare the Puri',
        description: 'Gently tap each puri to create a small opening on top. Check that all puris are crisp and hollow.',
        time: '5 min'
      },
      {
        title: 'Step 3: Fill the Puri',
        description: 'Carefully spoon the yogurt mixture into each puri through the opening. Don\'t overfill to prevent breaking.',
        time: '10 min'
      },
      {
        title: 'Step 4: Add Toppings',
        description: 'Drizzle tamarind chutney and mint chutney over filled puris. Sprinkle with sev for crunch.',
        time: '5 min'
      },
      {
        title: 'Step 5: Serve Immediately',
        description: 'Arrange dahi poori on a plate and serve immediately while puris are still crispy.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 280, protein: '8g', carbs: '42g', fat: '10g', fiber: '3g', sugar: '6g' }
  },
  'home-sushi': {
    id: 'home-sushi',
    title: 'SUSHI',
    subtitle: 'Fresh Japanese',
    category: 'Japanese',
    area: 'Japanese',
    difficulty: 'Hard',
    prepTime: '40 min',
    cookTime: '50 min',
    totalTime: '1h 30min',
    servings: 4,
    calories: 320,
    rating: 4.8,
    reviews: 289,
    description: 'Fresh Japanese sushi with premium fish, perfectly seasoned rice, and traditional accompaniments.',
    chef: 'Japanese Sushi Master',
    image: '/images/global/F8.jpg',
    ingredients: [
      { name: 'Sushi Rice', amount: '300g', notes: 'Short grain rice' },
      { name: 'Nori Sheets', amount: '8', notes: 'For rolling' },
      { name: 'Fresh Salmon', amount: '200g', notes: 'Sashimi grade' },
      { name: 'Cucumber', amount: '1', notes: 'Julienne cut' },
      { name: 'Avocado', amount: '1', notes: 'Ripe' },
      { name: 'Cream Cheese', amount: '100g', notes: 'For rolls' },
      { name: 'Soy Sauce', amount: 'For serving', notes: 'Quality soy sauce' },
      { name: 'Wasabi', amount: 'To taste', notes: 'Fresh wasabi' },
      { name: 'Pickled Ginger', amount: '20g', notes: 'For serving' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Sushi Rice',
        description: 'Rinse sushi rice until water runs clear. Cook with water in rice cooker. Season with rice vinegar, sugar, and salt while warm. Cool to room temperature.',
        time: '40 min'
      },
      {
        title: 'Step 2: Prepare the Fillings',
        description: 'Cut salmon into long strips. Julienne cucumber and avocado. Slice cream cheese into strips. Keep all fillings chilled.',
        time: '20 min'
      },
      {
        title: 'Step 3: Roll the Sushi',
        description: 'Place nori sheet on bamboo mat, spread rice evenly, leaving 1cm border. Add fillings, roll tightly using mat. Apply gentle pressure.',
        time: '30 min'
      },
      {
        title: 'Step 4: Cut the Rolls',
        description: 'Use a sharp wet knife to cut rolls into 8 equal pieces. Clean knife between cuts for clean edges.',
        time: '10 min'
      },
      {
        title: 'Step 5: Serve with Accompaniments',
        description: 'Arrange sushi on plate. Serve with soy sauce, wasabi, and pickled ginger. Garnish with sesame seeds.',
        time: '10 min'
      }
    ],
    nutrition: { calories: 320, protein: '22g', carbs: '38g', fat: '8g', fiber: '2g', sugar: '3g' }
  }
};
