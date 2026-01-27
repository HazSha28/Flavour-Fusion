// Part 4: Desserts & Drinks Recipes (8 recipes from dessertsDrinks category)
export const allRecipesPart4 = {
  // Desserts & Drinks Category
  'dessert-mousse': {
    id: 'dessert-mousse',
    title: 'CHOCOLATE MOUSSE',
    subtitle: 'Light & Creamy Dessert',
    category: 'Dessert',
    area: 'French',
    difficulty: 'Easy',
    prepTime: '15 min',
    cookTime: '20 min',
    totalTime: '35 min',
    servings: 6,
    calories: 280,
    rating: 4.3,
    reviews: 167,
    description: 'Light and airy chocolate mousse with rich dark chocolate flavor.',
    chef: 'French Pastry Chef',
    image: '/images/dd/F1.jpg',
    ingredients: [
      { name: 'Dark Chocolate', amount: '200g', notes: '70% cocoa' },
      { name: 'Heavy Cream', amount: '400ml', notes: 'Cold' },
      { name: 'Eggs', amount: '4', notes: 'Separated' },
      { name: 'Sugar', amount: '50g', notes: 'For yolks' },
      { name: 'Vanilla Extract', amount: '1 tsp', notes: 'Pure' },
      { name: 'Salt', amount: 'Pinch', notes: 'To enhance flavor' },
      { name: 'Whipped Cream', amount: 'For topping', notes: 'Optional' },
      { name: 'Chocolate Shavings', amount: 'For garnish', notes: 'Optional' }
    ],
    steps: [
      {
        title: 'Step 1: Melt Chocolate',
        description: 'Melt dark chocolate in double boiler until smooth. Let cool slightly.',
        time: '10 min'
      },
      {
        title: 'Step 2: Prepare Egg Yolks',
        description: 'Beat egg yolks with sugar until pale and fluffy. Add vanilla extract.',
        time: '5 min'
      },
      {
        title: 'Step 3: Combine Chocolate and Eggs',
        description: 'Fold melted chocolate into egg yolk mixture gently.',
        time: '3 min'
      },
      {
        title: 'Step 4: Whip Egg Whites',
        description: 'Beat egg whites with salt until stiff peaks form. Fold into chocolate mixture.',
        time: '7 min'
      },
      {
        title: 'Step 5: Chill and Serve',
        description: 'Divide into serving glasses, chill for 2 hours. Top with whipped cream and chocolate shavings.',
        time: '10 min'
      }
    ],
    nutrition: { calories: 280, protein: '6g', carbs: '24g', fat: '18g', fiber: '3g', sugar: '20g' }
  },

  'dessert-baklava': {
    id: 'dessert-baklava',
    title: 'BAKLAVA',
    subtitle: 'Middle Eastern Sweet Pastry',
    category: 'Dessert',
    area: 'Middle Eastern',
    difficulty: 'Hard',
    prepTime: '45 min',
    cookTime: '60 min',
    totalTime: '1h 45min',
    servings: 12,
    calories: 320,
    rating: 4.6,
    reviews: 234,
    description: 'Traditional Middle Eastern layered pastry with nuts and honey syrup.',
    chef: 'Middle Eastern Pastry Master',
    image: '/images/dd/F2.jpg',
    ingredients: [
      { name: 'Phyllo Dough', amount: '1 package', notes: 'Frozen, thawed' },
      { name: 'Mixed Nuts', amount: '300g', notes: 'Walnuts, pistachios, almonds' },
      { name: 'Butter', amount: '200g', notes: 'Melted' },
      { name: 'Honey', amount: '200ml', notes: 'For syrup' },
      { name: 'Sugar', amount: '100g', notes: 'For syrup' },
      { name: 'Lemon Juice', amount: '2 tbsp', notes: 'For syrup' },
      { name: 'Cinnamon', amount: '1 tsp', notes: 'For nuts' },
      { name: 'Clove', amount: '2', notes: 'For syrup' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Nut Filling',
        description: 'Pulse nuts in food processor, mix with cinnamon and sugar.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Syrup',
        description: 'Boil honey, sugar, lemon juice, and cloves for 10 minutes.',
        time: '12 min'
      },
      {
        title: 'Step 3: Layer Phyllo',
        description: 'Brush each phyllo sheet with butter, layer 8 sheets, add nuts, repeat layers.',
        time: '25 min'
      },
      {
        title: 'Step 4: Cut and Bake',
        description: 'Cut into diamond shapes, bake at 180°C for 45 minutes until golden.',
        time: '50 min'
      },
      {
        title: 'Step 5: Add Syrup',
        description: 'Pour hot syrup over hot baklava. Let cool completely before serving.',
        time: '8 min'
      }
    ],
    nutrition: { calories: 320, protein: '6g', carbs: '38g', fat: '18g', fiber: '3g', sugar: '28g' }
  },

  'dessert-basque-cheesecake': {
    id: 'dessert-basque-cheesecake',
    title: 'BASQUE CHEESECAKE',
    subtitle: 'Spanish Burnt Cheesecake',
    category: 'Dessert',
    area: 'Spanish',
    difficulty: 'Medium',
    prepTime: '30 min',
    cookTime: '45 min',
    totalTime: '1h 15min',
    servings: 8,
    calories: 380,
    rating: 4.8,
    reviews: 289,
    description: 'Spanish-style burnt cheesecake with caramelized top and creamy center.',
    chef: 'Spanish Pastry Chef',
    image: '/images/dd/F3.jpg',
    ingredients: [
      { name: 'Cream Cheese', amount: '600g', notes: 'Room temperature' },
      { name: 'Sugar', amount: '200g', notes: 'Granulated' },
      { name: 'Eggs', amount: '4', notes: 'Large' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'Room temperature' },
      { name: 'Flour', amount: '20g', notes: 'All-purpose' },
      { name: 'Vanilla Extract', amount: '1 tsp', notes: 'Pure' },
      { name: 'Salt', amount: '1/4 tsp', notes: 'To enhance flavor' },
      { name: 'Parchment Paper', amount: 'For lining', notes: 'Pan' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Pan',
        description: 'Line 9-inch cake pan with parchment paper, extending above rim.',
        time: '5 min'
      },
      {
        title: 'Step 2: Mix Batter',
        description: 'Beat cream cheese and sugar until smooth. Add eggs one at a time.',
        time: '10 min'
      },
      {
        title: 'Step 3: Add Remaining Ingredients',
        description: 'Fold in cream, flour, vanilla, and salt until just combined.',
        time: '5 min'
      },
      {
        title: 'Step 4: Bake',
        description: 'Pour into pan, bake at 200°C (400°F) for 45 minutes until deeply browned.',
        time: '50 min'
      },
      {
        title: 'Step 5: Cool and Serve',
        description: 'Cool completely, then chill for 4 hours. Serve at room temperature.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 380, protein: '8g', carbs: '28g', fat: '26g', fiber: '1g', sugar: '24g' }
  },

  'dessert-tiramisu': {
    id: 'dessert-tiramisu',
    title: 'TIRAMISU',
    subtitle: 'Italian Coffee Dessert',
    category: 'Dessert',
    area: 'Italian',
    difficulty: 'Medium',
    prepTime: '25 min',
    cookTime: '30 min',
    totalTime: '55 min',
    servings: 8,
    calories: 340,
    rating: 4.9,
    reviews: 345,
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream.',
    chef: 'Italian Pastry Chef',
    image: '/images/dd/F4.jpg',
    ingredients: [
      { name: 'Ladyfingers', amount: '30', notes: 'Savoiardi biscuits' },
      { name: 'Mascarpone', amount: '500g', notes: 'Italian cheese' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'Cold' },
      { name: 'Egg Yolks', amount: '6', notes: 'From large eggs' },
      { name: 'Sugar', amount: '100g', notes: 'For yolks' },
      { name: 'Espresso', amount: '300ml', notes: 'Strong, cooled' },
      { name: 'Coffee Liqueur', amount: '3 tbsp', notes: 'Optional' },
      { name: 'Cocoa Powder', amount: 'For dusting', notes: 'Unsweetened' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Coffee',
        description: 'Brew strong espresso, add coffee liqueur if using, and let cool.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Cream',
        description: 'Beat egg yolks with sugar until pale. Add mascarpone and beat until smooth.',
        time: '8 min'
      },
      {
        title: 'Step 3: Whip Cream',
        description: 'Whip heavy cream to stiff peaks, then fold into mascarpone mixture.',
        time: '7 min'
      },
      {
        title: 'Step 4: Assemble Layers',
        description: 'Dip ladyfingers in coffee, layer in dish, spread cream, repeat twice.',
        time: '15 min'
      },
      {
        title: 'Step 5: Chill and Serve',
        description: 'Refrigerate for 4 hours minimum. Dust with cocoa before serving.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 340, protein: '8g', carbs: '28g', fat: '22g', fiber: '1g', sugar: '20g' }
  },

  'dessert-creme-brulee': {
    id: 'dessert-creme-brulee',
    title: 'CREME BRULEE',
    subtitle: 'French Caramel Dessert',
    category: 'Dessert',
    area: 'French',
    difficulty: 'Hard',
    prepTime: '20 min',
    cookTime: '40 min',
    totalTime: '1h',
    servings: 6,
    calories: 320,
    rating: 4.7,
    reviews: 278,
    description: 'Classic French custard with caramelized sugar topping.',
    chef: 'French Pastry Chef',
    image: '/images/dd/F5.jpg',
    ingredients: [
      { name: 'Heavy Cream', amount: '500ml', notes: 'Heavy whipping cream' },
      { name: 'Egg Yolks', amount: '6', notes: 'From large eggs' },
      { name: 'Sugar', amount: '80g', notes: 'For custard' },
      { name: 'Vanilla Bean', amount: '1', notes: 'Split lengthwise' },
      { name: 'Sugar', amount: '60g', notes: 'For topping' },
      { name: 'Salt', amount: 'Pinch', notes: 'For custard' },
      { name: 'Ramekins', amount: '6', notes: 'For baking' },
      { name: 'Kitchen Torch', amount: '1', notes: 'For caramelizing' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Cream',
        description: 'Heat cream with vanilla bean until just boiling. Remove vanilla bean.',
        time: '10 min'
      },
      {
        title: 'Step 2: Make Custard',
        description: 'Whisk egg yolks with sugar and salt. Slowly add hot cream, whisking constantly.',
        time: '8 min'
      },
      {
        title: 'Step 3: Strain and Fill',
        description: 'Strain custard, divide among ramekins. Place in water bath.',
        time: '7 min'
      },
      {
        title: 'Step 4: Bake',
        description: 'Bake at 150°C (300°F) for 30-35 minutes until just set. Cool completely.',
        time: '40 min'
      },
      {
        title: 'Step 5: Caramelize and Serve',
        description: 'Sprinkle sugar on top, torch until caramelized. Let cool 1 minute before serving.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 320, protein: '6g', carbs: '24g', fat: '22g', fiber: '0g', sugar: '20g' }
  },

  'dessert-mille-feuille': {
    id: 'dessert-mille-feuille',
    title: 'APPLE MILLE FEUILLE',
    subtitle: 'Classic French Pastry',
    category: 'Dessert',
    area: 'French',
    difficulty: 'Medium',
    prepTime: '25 min',
    cookTime: '35 min',
    totalTime: '1h',
    servings: 6,
    calories: 360,
    rating: 4.5,
    reviews: 189,
    description: 'Delicate French pastry with layers of puff pastry, apple, and cream.',
    chef: 'French Pastry Chef',
    image: '/images/dd/F6.jpg',
    ingredients: [
      { name: 'Puff Pastry', amount: '1 sheet', notes: 'Frozen' },
      { name: 'Apples', amount: '4', notes: 'Granny Smith' },
      { name: 'Heavy Cream', amount: '300ml', notes: 'Cold' },
      { name: 'Sugar', amount: '80g', notes: 'Divided' },
      { name: 'Butter', amount: '50g', notes: 'For apples' },
      { name: 'Cinnamon', amount: '1 tsp', notes: 'For apples' },
      { name: 'Vanilla Extract', amount: '1 tsp', notes: 'For cream' },
      { name: 'Powdered Sugar', amount: 'For dusting', notes: 'For serving' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Apples',
        description: 'Slice apples thinly, cook with butter, sugar, and cinnamon until tender.',
        time: '15 min'
      },
      {
        title: 'Step 2: Bake Pastry',
        description: 'Cut puff pastry into rectangles, bake until golden and crisp.',
        time: '20 min'
      },
      {
        title: 'Step 3: Make Cream',
        description: 'Whip heavy cream with sugar and vanilla until stiff peaks form.',
        time: '8 min'
      },
      {
        title: 'Step 4: Assemble Layers',
        description: 'Layer pastry, cream, and apples twice. Top with final pastry layer.',
        time: '7 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Dust with powdered sugar and serve immediately.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 360, protein: '4g', carbs: '38g', fat: '22g', fiber: '3g', sugar: '22g' }
  },

  'dessert-lava-cake': {
    id: 'dessert-lava-cake',
    title: 'CHOCOLATE LAVA CAKE',
    subtitle: 'Molten Center Dessert',
    category: 'Dessert',
    area: 'International',
    difficulty: 'Medium',
    prepTime: '15 min',
    cookTime: '25 min',
    totalTime: '40 min',
    servings: 4,
    calories: 420,
    rating: 4.8,
    reviews: 312,
    description: 'Decadent chocolate cake with warm, gooey molten center.',
    chef: 'Chocolate Specialist',
    image: '/images/dd/F7.jpg',
    ingredients: [
      { name: 'Dark Chocolate', amount: '200g', notes: '70% cocoa' },
      { name: 'Butter', amount: '150g', notes: 'Plus more for ramekins' },
      { name: 'Eggs', amount: '4', notes: 'Large' },
      { name: 'Egg Yolks', amount: '2', notes: 'Additional' },
      { name: 'Sugar', amount: '100g', notes: 'Powdered' },
      { name: 'Flour', amount: '60g', notes: 'All-purpose' },
      { name: 'Vanilla Extract', amount: '1 tsp', notes: 'Pure' },
      { name: 'Powdered Sugar', amount: 'For dusting', notes: 'For serving' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Ramekins',
        description: 'Butter and dust 4 ramekins with cocoa powder. Preheat oven to 200°C (400°F).',
        time: '5 min'
      },
      {
        title: 'Step 2: Melt Chocolate',
        description: 'Melt chocolate and butter together until smooth.',
        time: '5 min'
      },
      {
        title: 'Step 3: Mix Batter',
        description: 'Whisk eggs, egg yolks, and sugar. Fold in chocolate mixture, then flour and vanilla.',
        time: '8 min'
      },
      {
        title: 'Step 4: Bake',
        description: 'Divide batter among ramekins. Bake for 12-14 minutes until edges are firm but center jiggles.',
        time: '15 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Let rest 1 minute, invert onto plates. Dust with powdered sugar and serve immediately.',
        time: '2 min'
      }
    ],
    nutrition: { calories: 420, protein: '8g', carbs: '42g', fat: '26g', fiber: '3g', sugar: '32g' }
  },

  'dessert-berry-tart': {
    id: 'dessert-berry-tart',
    title: 'FRESH BERRY TART',
    subtitle: 'Seasonal Fruit Dessert',
    category: 'Dessert',
    area: 'French',
    difficulty: 'Easy',
    prepTime: '20 min',
    cookTime: '30 min',
    totalTime: '50 min',
    servings: 8,
    calories: 280,
    rating: 4.4,
    reviews: 167,
    description: 'Fresh seasonal berries on creamy vanilla filling in crisp pastry shell.',
    chef: 'French Pastry Chef',
    image: '/images/dd/F8.jpg',
    ingredients: [
      { name: 'Tart Shell', amount: '1', notes: '9-inch, pre-baked' },
      { name: 'Mixed Berries', amount: '400g', notes: 'Fresh, mixed' },
      { name: 'Heavy Cream', amount: '300ml', notes: 'Cold' },
      { name: 'Cream Cheese', amount: '200g', notes: 'Softened' },
      { name: 'Sugar', amount: '80g', notes: 'Powdered' },
      { name: 'Vanilla Extract', amount: '2 tsp', notes: 'Pure' },
      { name: 'Apricot Jam', amount: '3 tbsp', notes: 'For glaze' },
      { name: 'Mint Leaves', amount: 'For garnish', notes: 'Optional' }
    ],
    steps: [
      {
        title: 'Step 1: Prepare Filling',
        description: 'Beat cream cheese and sugar until smooth. Add vanilla and whipped cream.',
        time: '10 min'
      },
      {
        title: 'Step 2: Fill Tart',
        description: 'Spread filling evenly in pre-baked tart shell. Chill for 30 minutes.',
        time: '5 min'
      },
      {
        title: 'Step 3: Prepare Berries',
        description: 'Wash and dry berries. Arrange attractively on top of filling.',
        time: '10 min'
      },
      {
        title: 'Step 4: Make Glaze',
        description: 'Warm apricot jam with 1 tbsp water, strain, and brush over berries.',
        time: '5 min'
      },
      {
        title: 'Step 5: Serve',
        description: 'Garnish with mint leaves if desired. Serve chilled.',
        time: '5 min'
      }
    ],
    nutrition: { calories: 280, protein: '6g', carbs: '32g', fat: '16g', fiber: '2g', sugar: '24g' }
  }
};
