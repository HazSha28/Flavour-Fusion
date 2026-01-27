// Part 3: Mains & Dinner Recipes (8 recipes from eatYourWay category)
export const allRecipesPart3 = {
  // Mains & Dinner Category
  'dinner-steak-shrimp': {
    id: 'dinner-steak-shrimp',
    title: 'CREAMY GARLIC STEAK & SHRIMP',
    subtitle: 'Luxury Surf & Turf',
    category: 'Main Course',
    area: 'International',
    difficulty: 'Hard',
    prepTime: '25 min',
    cookTime: '45 min',
    totalTime: '1h 10min',
    servings: 4,
    calories: 580,
    rating: 4.9,
    reviews: 312,
    description: 'Luxurious combination of tender steak and succulent shrimp in a rich garlic cream sauce.',
    chef: 'Fine Dining Chef',
    image: '/images/eatw/F1.jpg',
    ingredients: [
      { name: 'Beef Steak', amount: '600g', notes: 'Sirloin or ribeye' },
      { name: 'Shrimp', amount: '400g', notes: 'Large, peeled' },
      { name: 'Heavy Cream', amount: '300ml', notes: 'For sauce' },
      { name: 'Garlic', amount: '8 cloves', notes: 'Minced' },
      { name: 'Butter', amount: '100g', notes: 'Divided' },
      { name: 'White Wine', amount: '100ml', notes: 'For deglazing' },
      { name: 'Fresh Parsley', amount: 'Handful', notes: 'For garnish' },
      { name: 'Parmesan', amount: '50g', notes: 'Freshly grated' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Steak',
        description: 'Season steak with salt and pepper. Sear in hot pan with butter for 3-4 minutes per side for medium-rare. Rest for 10 minutes.',
        time: '15 min'
      },
      {
        title: 'Step 2: Cook the Shrimp',
        description: 'Sauté shrimp in garlic butter until pink and opaque, about 2-3 minutes. Remove and set aside.',
        time: '5 min'
      },
      {
        title: 'Step 3: Make the Sauce',
        description: 'Deglaze pan with white wine, add heavy cream, garlic, and Parmesan. Simmer until thickened.',
        time: '10 min'
      },
      {
        title: 'Step 4: Combine',
        description: 'Return shrimp to sauce. Slice steak and add to pan. Toss gently to coat.',
        time: '5 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Plate steak and shrimp with sauce. Garnish with fresh parsley and serve immediately.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 580, protein: '45g', carbs: '8g', fat: '42g', fiber: '1g', sugar: '2g' }
  },

  'dinner-grilled-salmon': {
    id: 'dinner-grilled-salmon',
    title: 'GRILLED SALMON',
    subtitle: 'Protein Rich Seafood',
    category: 'Main Course',
    area: 'International',
    difficulty: 'Medium',
    prepTime: '30 min',
    cookTime: '35 min',
    totalTime: '1h 5min',
    servings: 4,
    calories: 420,
    rating: 4.6,
    reviews: 267,
    description: 'Perfectly grilled salmon with crispy skin and tender, flaky flesh.',
    chef: 'Seafood Specialist',
    image: '/images/eatw/F2.jpg',
    ingredients: [
      { name: 'Salmon Fillets', amount: '4', notes: '200g each' },
      { name: 'Olive Oil', amount: '4 tbsp', notes: 'For coating' },
      { name: 'Lemon', amount: '2', notes: 'Sliced' },
      { name: 'Garlic', amount: '4 cloves', notes: 'Minced' },
      { name: 'Fresh Dill', amount: '2 tbsp', notes: 'Chopped' },
      { name: 'Salt', amount: 'To taste', notes: 'Sea salt preferred' },
      { name: 'Black Pepper', amount: 'To taste', notes: 'Freshly ground' },
      { name: 'Asparagus', amount: '400g', notes: 'For serving' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Salmon',
        description: 'Pat salmon dry, brush with olive oil, and season with salt, pepper, garlic, and dill.',
        time: '10 min'
      },
      {
        title: 'Step 2: Preheat Grill',
        description: 'Preheat grill to medium-high heat. Clean and oil grates to prevent sticking.',
        time: '10 min'
      },
      {
        title: 'Step 3: Grill Salmon',
        description: 'Place salmon skin-side down. Grill for 4-5 minutes per side until crispy and cooked through.',
        time: '10 min'
      },
      {
        title: 'Step 4: Prepare Asparagus',
        description: 'Toss asparagus with olive oil, salt, and pepper. Grill for 3-4 minutes until tender-crisp.',
        time: '8 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve salmon with grilled asparagus and lemon slices. Garnish with fresh dill.',
        time: '7 min'
      }
    ],
    nutrition: { calories: 420, protein: '38g', carbs: '12g', fat: '26g', fiber: '4g', sugar: '2g' }
  },

  'dinner-pie-mash': {
    id: 'dinner-pie-mash',
    title: 'PIE AND MASH',
    subtitle: 'British Comfort Classic',
    category: 'Main Course',
    area: 'British',
    difficulty: 'Medium',
    prepTime: '15 min',
    cookTime: '30 min',
    totalTime: '45 min',
    servings: 4,
    calories: 480,
    rating: 4.7,
    reviews: 234,
    description: 'Traditional British savory pie with creamy mashed potatoes and rich gravy.',
    chef: 'British Pub Chef',
    image: '/images/eatw/F2.jpg',
    ingredients: [
      { name: 'Puff Pastry', amount: '1 sheet', notes: 'Store-bought' },
      { name: 'Beef Chuck', amount: '600g', notes: 'Diced' },
      { name: 'Potatoes', amount: '1kg', notes: 'For mash' },
      { name: 'Onions', amount: '2', notes: 'Diced' },
      { name: 'Carrots', amount: '2', notes: 'Diced' },
      { name: 'Beef Broth', amount: '500ml', notes: 'For filling' },
      { name: 'Butter', amount: '100g', notes: 'For mash and filling' },
      { name: 'Fresh Thyme', amount: '2 tbsp', notes: 'For flavor' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare the Filling',
        description: 'Brown beef in pot, add onions and carrots, then beef broth and thyme. Simmer for 20 minutes.',
        time: '25 min'
      },
      {
        title: 'Step 2: Make Mashed Potatoes',
        description: 'Boil potatoes until tender, drain, and mash with butter and milk until smooth.',
        time: '20 min'
      },
      {
        title: 'Step 3: Assemble Pie',
        description: 'Place filling in pie dish, cover with puff pastry, and cut vents for steam.',
        time: '10 min'
      },
      {
        title: 'Step 4: Bake Pie',
        description: 'Bake at 200°C (400°F) for 20-25 minutes until pastry is golden and puffed.',
        time: '25 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve pie hot with mashed potatoes and extra gravy if desired.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 480, protein: '32g', carbs: '38g', fat: '24g', fiber: '4g', sugar: '6g' }
  },

  'dinner-fatayer': {
    id: 'dinner-fatayer',
    title: 'TURKISH FATAYER',
    subtitle: 'Middle Eastern Pastry',
    category: 'Main Course',
    area: 'Turkish',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '40 min',
    totalTime: '1h',
    servings: 6,
    calories: 350,
    rating: 4.4,
    reviews: 189,
    description: 'Traditional Turkish stuffed pastries with spinach and cheese filling.',
    chef: 'Turkish Pastry Chef',
    image: '/images/eatw/F3.jpg',
    ingredients: [
      { name: 'Puff Pastry', amount: '2 sheets', notes: 'Store-bought' },
      { name: 'Spinach', amount: '500g', notes: 'Fresh, chopped' },
      { name: 'Feta Cheese', amount: '200g', notes: 'Crumbled' },
      { name: 'Onion', amount: '1', notes: 'Finely diced' },
      { name: 'Sumac', amount: '2 tsp', notes: 'For tang' },
      { name: 'Olive Oil', amount: '4 tbsp', notes: 'For filling' },
      { name: 'Pine Nuts', amount: '50g', notes: 'Toasted' },
      { name: 'Egg', amount: '1', notes: 'For egg wash' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Filling',
        description: 'Sauté onion, add spinach until wilted. Cool, then mix with feta, sumac, olive oil, and pine nuts.',
        time: '15 min'
      },
      {
        title: 'Step 2: Cut Pastry',
        description: 'Cut puff pastry into squares. Place filling in center of each square.',
        time: '10 min'
      },
      {
        title: 'Step 3: Shape Fatayer',
        description: 'Fold pastry into triangle shape, sealing edges well. Place on baking sheet.',
        time: '10 min'
      },
      {
        title: 'Step 4: Bake',
        description: 'Brush with egg wash and bake at 180°C (350°F) for 20-25 minutes until golden.',
        time: '25 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Serve warm with yogurt dip or fresh salad.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 350, protein: '12g', carbs: '28g', fat: '22g', fiber: '3g', sugar: '2g' }
  },

  'dinner-seafood-bowl': {
    id: 'dinner-seafood-bowl',
    title: 'STUFFED SEAFOOD BOWL',
    subtitle: 'Ocean Fresh Feast',
    category: 'Main Course',
    area: 'International',
    difficulty: 'Hard',
    prepTime: '35 min',
    cookTime: '50 min',
    totalTime: '1h 25min',
    servings: 4,
    calories: 520,
    rating: 4.8,
    reviews: 298,
    description: 'Luxurious seafood bowl with multiple seafood types in aromatic broth.',
    chef: 'Seafood Master',
    image: '/images/eatw/F5.jpg',
    ingredients: [
      { name: 'Mixed Seafood', amount: '800g', notes: 'Shrimp, scallops, mussels' },
      { name: 'Fish Stock', amount: '1L', notes: 'For broth' },
      { name: 'Coconut Milk', amount: '400ml', notes: 'Full fat' },
      { name: 'Lemongrass', amount: '2 stalks', notes: 'Bruised' },
      { name: 'Ginger', amount: '50g', notes: 'Sliced' },
      { name: 'Chili', amount: '2', notes: 'Red, sliced' },
      { name: 'Rice Noodles', amount: '300g', notes: 'For base' },
      { name: 'Fresh Herbs', amount: 'Mixed', notes: 'For garnish' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Broth',
        description: 'Simmer fish stock with lemongrass, ginger, and chili for 20 minutes.',
        time: '20 min'
      },
      {
        title: 'Step 2: Cook Noodles',
        description: 'Cook rice noodles according to package directions. Drain and set aside.',
        time: '10 min'
      },
      {
        title: 'Step 3: Cook Seafood',
        description: 'Strain broth, add coconut milk, then cook seafood in order of cooking time.',
        time: '15 min'
      },
      {
        title: 'Step 4: Assemble Bowls',
        description: 'Place noodles in bowls, top with seafood and broth.',
        time: '10 min'
      },
      {
        title: 'Step 5: Garnish and Serve',
        description: 'Garnish with fresh herbs and serve with lime wedges.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 520, protein: '42g', carbs: '45g', fat: '18g', fiber: '3g', sugar: '8g' }
  },

  'dinner-biriyani': {
    id: 'dinner-biriyani',
    title: 'BIRIYANI',
    subtitle: 'Traditional Indian Rice Dish',
    category: 'Main Course',
    area: 'Indian',
    difficulty: 'Hard',
    prepTime: '40 min',
    cookTime: '55 min',
    totalTime: '1h 35min',
    servings: 6,
    calories: 580,
    rating: 4.9,
    reviews: 412,
    description: 'Aromatic Indian rice dish with tender meat and exotic spices.',
    chef: 'Indian Master Chef',
    image: '/images/eatw/F6.jpg',
    ingredients: [
      { name: 'Basmati Rice', amount: '3 cups', notes: 'Long grain' },
      { name: 'Chicken', amount: '800g', notes: 'Cut into pieces' },
      { name: 'Yogurt', amount: '200g', notes: 'For marination' },
      { name: 'Biriyani Masala', amount: '3 tbsp', notes: 'Spice mix' },
      { name: 'Onions', amount: '4', notes: 'Thinly sliced' },
      { name: 'Saffron', amount: '1 pinch', notes: 'For color' },
      { name: 'Ghee', amount: '100g', notes: 'Clarified butter' },
      { name: 'Fresh Herbs', amount: 'Mixed', notes: 'Mint, cilantro' }
    ],
    steps: [
      {
        title: 'Step 1: Marinate Chicken',
        description: 'Mix chicken with yogurt, half the spices, and salt. Marinate for 30 minutes.',
        time: '35 min'
      },
      {
        title: 'Step 2: Cook Rice',
        description: 'Parboil rice with whole spices until 70% done. Drain and set aside.',
        time: '15 min'
      },
      {
        title: 'Step 3: Cook Chicken',
        description: 'Cook marinated chicken with onions until browned and cooked through.',
        time: '20 min'
      },
      {
        title: 'Step 4: Layer Biriyani',
        description: 'Layer rice and chicken in pot, add saffron milk, and seal with foil.',
        time: '10 min'
      },
      {
        title: 'Step 5: Dum Cook',
        description: 'Cook on low heat for 20 minutes. Let rest 10 minutes before serving.',
        time: '30 min'
      }
    ],
    nutrition: { calories: 580, protein: '38g', carbs: '62g', fat: '22g', fiber: '4g', sugar: '8g' }
  },

  'dinner-honey-garlic-chicken': {
    id: 'dinner-honey-garlic-chicken',
    title: 'HONEY GARLIC CHICKEN',
    subtitle: 'Sweet & Savory Glaze',
    category: 'Main Course',
    area: 'Asian Fusion',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '35 min',
    totalTime: '55 min',
    servings: 4,
    calories: 420,
    rating: 4.5,
    reviews: 256,
    description: 'Tender chicken glazed with sweet and savory honey garlic sauce.',
    chef: 'Asian Fusion Chef',
    image: '/images/eatw/F7.jpg',
    ingredients: [
      { name: 'Chicken Thighs', amount: '800g', notes: 'Boneless, skinless' },
      { name: 'Honey', amount: '4 tbsp', notes: 'For glaze' },
      { name: 'Soy Sauce', amount: '4 tbsp', notes: 'For glaze' },
      { name: 'Garlic', amount: '6 cloves', notes: 'Minced' },
      { name: 'Ginger', amount: '2 tbsp', notes: 'Grated' },
      { name: 'Sesame Oil', amount: '2 tbsp', notes: 'For cooking' },
      { name: 'Green Onions', amount: '4', notes: 'For garnish' },
      { name: 'Sesame Seeds', amount: '2 tbsp', notes: 'For garnish' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Chicken',
        description: 'Season chicken with salt and pepper. Sear in hot pan until golden on both sides.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Glaze',
        description: 'Mix honey, soy sauce, garlic, ginger, and sesame oil in a bowl.',
        time: '5 min'
      },
      {
        title: 'Step 3: Glaze Chicken',
        description: 'Pour glaze over chicken, reduce heat and simmer until sauce thickens and coats chicken.',
        time: '15 min'
      },
      {
        title: 'Step 4: Rest Chicken',
        description: 'Remove from heat and let rest for 5 minutes to absorb flavors.',
        time: '5 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Slice chicken, drizzle with remaining glaze, garnish with green onions and sesame seeds.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 420, protein: '35g', carbs: '28g', fat: '18g', fiber: '1g', sugar: '18g' }
  },

  'dinner-butter-chicken': {
    id: 'dinner-butter-chicken',
    title: 'BUTTER CHICKEN WITH NAAN',
    subtitle: 'North Indian Favorite',
    category: 'Main Course',
    area: 'Indian',
    difficulty: 'Medium',
    prepTime: '25 min',
    cookTime: '40 min',
    totalTime: '1h 5min',
    servings: 4,
    calories: 580,
    rating: 4.7,
    reviews: 334,
    description: 'Creamy and rich North Indian curry with tender chicken pieces.',
    chef: 'North Indian Chef',
    image: '/images/eatw/F8.jpg',
    ingredients: [
      { name: 'Chicken', amount: '800g', notes: 'Cut into pieces' },
      { name: 'Tomato Puree', amount: '400g', notes: 'For curry base' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'For richness' },
      { name: 'Butter', amount: '100g', notes: 'For curry' },
      { name: 'Ginger-Garlic Paste', amount: '4 tbsp', notes: 'Fresh' },
      { name: 'Garam Masala', amount: '2 tbsp', notes: 'For flavor' },
      { name: 'Naan Bread', amount: '4', notes: 'For serving' },
      { name: 'Fresh Cream', amount: '50ml', notes: 'For garnish' }
    ],
    steps: [
      {
        title: 'Step 1: Marinate Chicken',
        description: 'Mix chicken with yogurt, ginger-garlic paste, and spices. Marinate for 20 minutes.',
        time: '20 min'
      },
      {
        title: 'Step 2: Cook Chicken',
        description: 'Grill or pan-fry marinated chicken until cooked through and slightly charred.',
        time: '15 min'
      },
      {
        title: 'Step 3: Make Curry Base',
        description: 'Sauté tomato puree with butter and spices until thick and fragrant.',
        time: '10 min'
      },
      {
        title: 'Step 4: Combine',
        description: 'Add cooked chicken to curry base, pour in cream, and simmer for 10 minutes.',
        time: '10 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Garnish with cream, serve hot with naan bread and basmati rice.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 580, protein: '38g', carbs: '42g', fat: '32g', fiber: '4g', sugar: '12g' }
  }
};
