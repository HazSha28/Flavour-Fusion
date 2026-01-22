import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaClock, 
  FaUsers, 
  FaHeart, 
  FaShare, 
  FaBookmark, 
  FaShoppingCart, 
  FaUtensils, 
  FaFire,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaStar,
  FaRegStar,
  FaPrint,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram
} from 'react-icons/fa';
import Header from '../components/Header';
import './RecipeDetails.css';

// Hardcoded recipe database
const recipeDatabase = {
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
    rating: 4.5,
    description: 'Classic Italian pizza with fresh vegetables and mozzarella cheese on a crispy crust.',
    images: ['/images/global/F1.jpg'], // Global Cravings
    ingredients: [
      { name: 'Pizza Dough', amount: '500g', notes: 'Store-bought or homemade' },
      { name: 'Tomato Sauce', amount: '200ml', notes: 'Italian marinara' },
      { name: 'Fresh Mozzarella', amount: '250g', notes: 'Shredded' },
      { name: 'Bell Peppers', amount: '2', notes: 'Mixed colors, sliced' },
      { name: 'Red Onion', amount: '1', notes: 'Thinly sliced' }
    ],
    instructions: [
      { step: 1, instruction: 'Preheat your oven to 220°C (425°F).', time: '5 min' },
      { step: 2, instruction: 'Roll out the pizza dough on a floured surface to desired thickness.', time: '10 min' },
      { step: 3, instruction: 'Spread tomato sauce evenly over the dough, leaving 1cm border.', time: '2 min' },
      { step: 4, instruction: 'Sprinkle mozzarella cheese over the sauce.', time: '1 min' },
      { step: 5, instruction: 'Add sliced vegetables and distribute evenly.', time: '3 min' },
      { step: 6, instruction: 'Bake for 12-15 minutes until crust is golden and cheese is bubbly.', time: '15 min' }
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
    totalTime: '65 min',
    servings: 4,
    rating: 4.8,
    description: 'Tender marinated meat slow-cooked on a vertical rotisserie, served in warm pita bread.',
    images: ['/images/fly3-removebg-preview.png'],
    ingredients: [
      { name: 'Chicken Thighs', amount: '1kg', notes: 'Boneless, skinless' },
      { name: 'Yogurt', amount: '200ml', notes: 'Full fat' },
      { name: 'Lemon Juice', amount: '50ml', notes: 'Fresh' },
      { name: 'Garlic', amount: '6 cloves', notes: 'Minced' },
      { name: 'Pita Bread', amount: '4', notes: 'Warm' }
    ],
    instructions: [
      { step: 1, instruction: 'Marinate chicken in yogurt mixture for at least 4 hours.', time: '240 min' },
      { step: 2, instruction: 'Thread chicken onto skewers for even cooking.', time: '15 min' },
      { step: 3, instruction: 'Grill on rotisserie or barbecue for 45-60 minutes.', time: '60 min' },
      { step: 4, instruction: 'Warm pita bread and prepare tahini sauce.', time: '5 min' },
      { step: 5, instruction: 'Shave cooked meat and assemble in pita with vegetables.', time: '10 min' }
    ],
    nutrition: { calories: 380, protein: '28g', carbs: '32g', fat: '18g', fiber: '4g', sugar: '6g' }
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
    totalTime: '90 min',
    servings: 4,
    rating: 4.9,
    description: 'Slow-cooked beef tacos with rich, flavorful broth and traditional Mexican toppings.',
    images: ['/images/fly4-removebg-preview (1).png'],
    ingredients: [
      { name: 'Beef Brisket', amount: '2kg', notes: 'For slow cooking' },
      { name: 'Dried Chilies', amount: '5', notes: 'Guajillo or ancho' },
      { name: 'Mexican Spices', amount: '2 tbsp', notes: 'Cumin, oregano, paprika' },
      { name: 'Corn Tortillas', amount: '12', notes: 'Small size' },
      { name: 'Onion', amount: '2', notes: 'Diced' }
    ],
    instructions: [
      { step: 1, instruction: 'Season beef and sear on all sides.', time: '20 min' },
      { step: 2, instruction: 'Cook beef low and slow with spices until tender.', time: '180 min' },
      { step: 3, instruction: 'Prepare tortillas, onions, cilantro, and limes.', time: '15 min' },
      { step: 4, instruction: 'Shred beef and assemble tacos with toppings.', time: '10 min' }
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
    totalTime: '65 min',
    servings: 8,
    rating: 4.3,
    description: 'Traditional Chinese dumplings with savory filling and delicate wrappers, steamed to perfection.',
    images: ['/images/head-removebg-preview.png'],
    ingredients: [
      { name: 'Dumpling Wrappers', amount: '50', notes: 'Round or square' },
      { name: 'Ground Pork', amount: '500g', notes: 'Lean' },
      { name: 'Cabbage', amount: '200g', notes: 'Finely chopped' },
      { name: 'Green Onions', amount: '3', notes: 'Finely chopped' },
      { name: 'Ginger', amount: '2 tbsp', notes: 'Minced' }
    ],
    instructions: [
      { step: 1, instruction: 'Mix pork, cabbage, green onions, ginger, and soy sauce.', time: '15 min' },
      { step: 2, instruction: 'Place filling in wrappers and seal properly.', time: '25 min' },
      { step: 3, instruction: 'Steam dumplings for 15-20 minutes until cooked through.', time: '20 min' }
    ],
    nutrition: { calories: 320, protein: '18g', carbs: '32g', fat: '12g', fiber: '3g', sugar: '4g' }
  },
  'home-carbonara': {
    id: 'home-carbonara',
    title: 'CREAMY CARBONARA',
    subtitle: 'Classic Roman',
    category: 'Italian',
    area: 'Italian',
    difficulty: 'Medium',
    prepTime: '10 min',
    cookTime: '25 min',
    totalTime: '35 min',
    servings: 4,
    rating: 4.8,
    description: 'Traditional Roman pasta with eggs, cheese, and pancetta in a creamy sauce.',
    images: ['/images/global/F2.jpg'], // Global Cravings
    ingredients: [
      { name: 'Spaghetti', amount: '400g', notes: 'Italian pasta' },
      { name: 'Pancetta', amount: '200g', notes: 'Diced' },
      { name: 'Eggs', amount: '4', notes: 'Large' },
      { name: 'Parmesan Cheese', amount: '100g', notes: 'Freshly grated' },
      { name: 'Black Pepper', amount: '2 tsp', notes: 'Freshly ground' }
    ],
    instructions: [
      { step: 1, instruction: 'Cook spaghetti according to package directions.', time: '12 min' },
      { step: 2, instruction: 'Cook pancetta until crispy.', time: '8 min' },
      { step: 3, instruction: 'Whisk eggs and cheese together.', time: '2 min' },
      { step: 4, instruction: 'Toss hot pasta with pancetta, then egg mixture off heat.', time: '3 min' }
    ],
    nutrition: { calories: 420, protein: '22g', carbs: '48g', fat: '18g', fiber: '2g', sugar: '2g' }
  },
  'home-high-protein-bowl': {
    id: 'home-high-protein-bowl',
    title: 'HIGH PROTEIN BOWL',
    subtitle: 'Power Breakfast',
    category: 'Breakfast',
    area: 'American',
    difficulty: 'Easy',
    prepTime: '10 min',
    cookTime: '15 min',
    totalTime: '25 min',
    servings: 2,
    rating: 4.4,
    description: 'Nutritious high-protein bowl packed with eggs, quinoa, and fresh vegetables for a powerful start to your day.',
    images: ['/images/bitesbb/F1.jpg'],
    ingredients: [
      { name: 'Quinoa', amount: '1 cup', notes: 'Cooked' },
      { name: 'Eggs', amount: '2', notes: 'Poached or fried' },
      { name: 'Spinach', amount: '2 cups', notes: 'Fresh' },
      { name: 'Avocado', amount: '1', notes: 'Sliced' },
      { name: 'Greek Yogurt', amount: '100g', notes: 'For topping' }
    ],
    instructions: [
      { step: 1, instruction: 'Cook quinoa according to package instructions.', time: '15 min' },
      { step: 2, instruction: 'Prepare eggs to your preference (poached, fried, or scrambled).', time: '5 min' },
      { step: 3, instruction: 'Sauté spinach until wilted.', time: '3 min' },
      { step: 4, instruction: 'Assemble bowl with quinoa base, add spinach, eggs, and avocado.', time: '2 min' }
    ],
    nutrition: { calories: 380, protein: '28g', carbs: '35g', fat: '15g', fiber: '8g', sugar: '4g' }
  },
  'home-smoothie-bowl': {
    id: 'home-smoothie-bowl',
    title: 'PEACH BANANA SMOOTHIE BOWL',
    subtitle: 'Healthy Start',
    category: 'Breakfast',
    area: 'International',
    difficulty: 'Easy',
    prepTime: '5 min',
    cookTime: '10 min',
    totalTime: '15 min',
    servings: 2,
    rating: 4.6,
    description: 'Refreshing smoothie bowl with peaches, bananas, and topped with granola and fresh fruits.',
    images: ['/images/bitesbb/F2.jpg'],
    ingredients: [
      { name: 'Peaches', amount: '2', notes: 'Fresh or frozen' },
      { name: 'Banana', amount: '1', notes: 'Ripe' },
      { name: 'Greek Yogurt', amount: '200g', notes: 'Plain' },
      { name: 'Granola', amount: '1/2 cup', notes: 'For topping' },
      { name: 'Honey', amount: '2 tbsp', notes: 'For drizzle' }
    ],
    instructions: [
      { step: 1, instruction: 'Blend peaches, banana, and yogurt until smooth.', time: '3 min' },
      { step: 2, instruction: 'Pour into bowls and smooth the top.', time: '1 min' },
      { step: 3, instruction: 'Top with granola, fresh fruit slices, and honey drizzle.', time: '2 min' }
    ],
    nutrition: { calories: 320, protein: '12g', carbs: '52g', fat: '8g', fiber: '6g', sugar: '28g' }
  },
  'home-poached-eggs': {
    id: 'home-poached-eggs',
    title: 'TURKISH POACHED EGGS',
    subtitle: 'Mediterranean Style',
    category: 'Breakfast',
    area: 'Turkish',
    difficulty: 'Medium',
    prepTime: '12 min',
    cookTime: '20 min',
    totalTime: '32 min',
    servings: 2,
    rating: 4.7,
    description: 'Traditional Turkish poached eggs in spicy tomato sauce with feta cheese and fresh herbs.',
    images: ['/images/bitesbb/F3.jpg'],
    ingredients: [
      { name: 'Eggs', amount: '4', notes: 'Fresh' },
      { name: 'Tomatoes', amount: '4', notes: 'Diced' },
      { name: 'Feta Cheese', amount: '100g', notes: 'Crumbled' },
      { name: 'Red Pepper Flakes', amount: '1 tsp', notes: 'To taste' },
      { name: 'Fresh Parsley', amount: '2 tbsp', notes: 'Chopped' }
    ],
    instructions: [
      { step: 1, instruction: 'Sauté tomatoes with spices until softened.', time: '10 min' },
      { step: 2, instruction: 'Create small wells in tomato sauce and crack eggs into them.', time: '2 min' },
      { step: 3, instruction: 'Cover and cook until eggs are set to your preference.', time: '8 min' },
      { step: 4, instruction: 'Top with feta cheese and fresh parsley.', time: '2 min' }
    ],
    nutrition: { calories: 280, protein: '18g', carbs: '12g', fat: '18g', fiber: '3g', sugar: '8g' }
  },
  'home-mousse': {
    id: 'home-mousse',
    title: 'MOUSSE',
    subtitle: 'Chocolate Delight',
    category: 'Dessert',
    area: 'French',
    difficulty: 'Easy',
    prepTime: '15 min',
    cookTime: '20 min',
    totalTime: '35 min',
    servings: 4,
    rating: 4.3,
    description: 'Light and airy chocolate mousse with a rich, velvety texture that melts in your mouth.',
    images: ['/images/dd/F1.jpg'],
    ingredients: [
      { name: 'Dark Chocolate', amount: '200g', notes: '70% cocoa or higher' },
      { name: 'Eggs', amount: '3', notes: 'Separated' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'Cold' },
      { name: 'Sugar', amount: '50g', notes: 'Powdered' },
      { name: 'Vanilla Extract', amount: '1 tsp', notes: 'Pure' }
    ],
    instructions: [
      { step: 1, instruction: 'Melt chocolate and let it cool slightly.', time: '5 min' },
      { step: 2, instruction: 'Whip egg whites with sugar until stiff peaks form.', time: '8 min' },
      { step: 3, instruction: 'Fold melted chocolate into whipped cream.', time: '3 min' },
      { step: 4, instruction: 'Gently fold in egg whites, divide into serving glasses.', time: '4 min' }
    ],
    nutrition: { calories: 320, protein: '6g', carbs: '28g', fat: '22g', fiber: '3g', sugar: '24g' }
  },
  'home-baklava': {
    id: 'home-baklava',
    title: 'BAKLAVA',
    subtitle: 'Sweet Pastry',
    category: 'Dessert',
    area: 'Middle Eastern',
    difficulty: 'Hard',
    prepTime: '45 min',
    cookTime: '60 min',
    totalTime: '105 min',
    servings: 12,
    rating: 4.6,
    description: 'Traditional Middle Eastern pastry with layers of phyllo, nuts, and honey syrup.',
    images: ['/images/dd/F2.jpg'],
    ingredients: [
      { name: 'Phyllo Dough', amount: '1 package', notes: 'Thawed' },
      { name: 'Mixed Nuts', amount: '300g', notes: 'Walnuts, pistachios, almonds' },
      { name: 'Butter', amount: '200g', notes: 'Melted' },
      { name: 'Honey', amount: '200ml', notes: 'For syrup' },
      { name: 'Cinnamon', amount: '2 tsp', notes: 'Ground' }
    ],
    instructions: [
      { step: 1, instruction: 'Prepare nut filling with cinnamon and sugar.', time: '10 min' },
      { step: 2, instruction: 'Layer phyllo sheets with butter between each layer.', time: '20 min' },
      { step: 3, instruction: 'Add nut filling and continue layering phyllo.', time: '15 min' },
      { step: 4, instruction: 'Bake until golden, pour hot honey syrup over top.', time: '60 min' }
    ],
    nutrition: { calories: 380, protein: '6g', carbs: '42g', fat: '22g', fiber: '4g', sugar: '28g' }
  },
  'home-basque-cheesecake': {
    id: 'home-basque-cheesecake',
    title: 'CREAMY BASQUE CHEESECAKE',
    subtitle: 'Spanish Style',
    category: 'Dessert',
    area: 'Spanish',
    difficulty: 'Medium',
    prepTime: '30 min',
    cookTime: '45 min',
    totalTime: '75 min',
    servings: 8,
    rating: 4.8,
    description: 'Spanish-style burnt cheesecake with a creamy interior and caramelized top.',
    images: ['/images/dd/F3.jpg'],
    ingredients: [
      { name: 'Cream Cheese', amount: '600g', notes: 'Room temperature' },
      { name: 'Sugar', amount: '200g', notes: 'Granulated' },
      { name: 'Eggs', amount: '4', notes: 'Large' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'Heavy' },
      { name: 'Vanilla Extract', amount: '1 tbsp', notes: 'Pure' }
    ],
    instructions: [
      { step: 1, instruction: 'Beat cream cheese and sugar until smooth.', time: '5 min' },
      { step: 2, instruction: 'Add eggs one at a time, then cream and vanilla.', time: '3 min' },
      { step: 3, instruction: 'Pour into parchment-lined pan and bake at high heat.', time: '45 min' },
      { step: 4, instruction: 'Cool completely before serving.', time: '22 min' }
    ],
    nutrition: { calories: 420, protein: '8g', carbs: '35g', fat: '28g', fiber: '1g', sugar: '32g' }
  },
  'home-steak-shrimp': {
    id: 'home-steak-shrimp',
    title: 'CREAMY GARLIC SAUCE WITH STEAK AND SHRIMP',
    subtitle: 'Luxury Dinner',
    category: 'Main Course',
    area: 'International',
    difficulty: 'Hard',
    prepTime: '25 min',
    cookTime: '45 min',
    totalTime: '70 min',
    servings: 4,
    rating: 4.9,
    description: 'Premium steak and succulent shrimp served in a rich garlic cream sauce, perfect for special occasions.',
    images: ['/images/eatw/f1.jpg'],
    ingredients: [
      { name: 'Ribeye Steak', amount: '600g', notes: 'Cut into strips' },
      { name: 'Large Shrimp', amount: '300g', notes: 'Peeled and deveined' },
      { name: 'Heavy Cream', amount: '200ml', notes: 'For sauce' },
      { name: 'Garlic', amount: '8 cloves', notes: 'Minced' },
      { name: 'Fresh Parsley', amount: '2 tbsp', notes: 'Chopped' }
    ],
    instructions: [
      { step: 1, instruction: 'Season steak strips with salt and pepper, sear until golden.', time: '8 min' },
      { step: 2, instruction: 'Cook shrimp in the same pan until pink and opaque.', time: '3 min' },
      { step: 3, instruction: 'Make garlic cream sauce in the pan.', time: '5 min' },
      { step: 4, instruction: 'Return steak and shrimp to pan, coat with sauce.', time: '2 min' }
    ],
    nutrition: { calories: 520, protein: '42g', carbs: '8g', fat: '38g', fiber: '1g', sugar: '2g' }
  },
  'home-grilled-salmon': {
    id: 'home-grilled-salmon',
    title: 'GRILLED SALMON',
    subtitle: 'Healthy Choice',
    category: 'Seafood',
    area: 'International',
    difficulty: 'Medium',
    prepTime: '15 min',
    cookTime: '30 min',
    totalTime: '45 min',
    servings: 4,
    rating: 4.7,
    description: 'Perfectly grilled salmon with a crispy skin and tender, flaky flesh, served with lemon and herbs.',
    images: ['/images/eatw/f3.jpg'],
    ingredients: [
      { name: 'Salmon Fillets', amount: '4', notes: '6 oz each' },
      { name: 'Olive Oil', amount: '3 tbsp', notes: 'Extra virgin' },
      { name: 'Lemon', amount: '2', notes: 'Sliced' },
      { name: 'Fresh Dill', amount: '2 tbsp', notes: 'Chopped' },
      { name: 'Garlic', amount: '4 cloves', notes: 'Minced' }
    ],
    instructions: [
      { step: 1, instruction: 'Pat salmon dry and season with salt and pepper.', time: '2 min' },
      { step: 2, instruction: 'Heat oil in grill pan, place salmon skin-side down.', time: '1 min' },
      { step: 3, instruction: 'Grill for 4-5 minutes per side until cooked through.', time: '10 min' },
      { step: 4, instruction: 'Serve with lemon wedges and fresh dill.', time: '2 min' }
    ],
    nutrition: { calories: 380, protein: '35g', carbs: '2g', fat: '26g', fiber: '0g', sugar: '0g' }
  },
  'home-pie-mash': {
    id: 'home-pie-mash',
    title: 'PIE AND MASH',
    subtitle: 'Comfort Food',
    category: 'Comfort Food',
    area: 'British',
    difficulty: 'Easy',
    prepTime: '20 min',
    cookTime: '40 min',
    totalTime: '60 min',
    servings: 4,
    rating: 4.4,
    description: 'Traditional British comfort food with savory meat pie and creamy mashed potatoes.',
    images: ['/images/eatw/f4.jpg'],
    ingredients: [
      { name: 'Puff Pastry', amount: '1 sheet', notes: 'Store-bought' },
      { name: 'Ground Beef', amount: '500g', notes: 'Lean' },
      { name: 'Potatoes', amount: '1kg', notes: 'Russet, peeled' },
      { name: 'Butter', amount: '100g', notes: 'Cold, cubed' },
      { name: 'Milk', amount: '100ml', notes: 'Warm' }
    ],
    instructions: [
      { step: 1, instruction: 'Cook ground beef with onions and seasonings.', time: '15 min' },
      { step: 2, instruction: 'Boil potatoes until tender, then mash with butter and milk.', time: '20 min' },
      { step: 3, instruction: 'Assemble pie with meat filling and pastry top.', time: '10 min' },
      { step: 4, instruction: 'Bake until golden brown and bubbly.', time: '15 min' }
    ],
    nutrition: { calories: 450, protein: '28g', carbs: '42g', fat: '22g', fiber: '3g', sugar: '4g' }
  },
  'home-biriyani': {
    id: 'home-biriyani',
    title: 'BIRIYANI',
    subtitle: 'Indian Special',
    category: 'Indian',
    area: 'Indian',
    difficulty: 'Hard',
    prepTime: '40 min',
    cookTime: '55 min',
    totalTime: '95 min',
    servings: 6,
    rating: 4.9,
    description: 'Aromatic Indian biriyani with fragrant basmati rice, tender meat, and exotic spices.',
    images: ['/images/eatw/F6.jpg'],
    ingredients: [
      { name: 'Basmati Rice', amount: '500g', notes: 'Soaked for 30 minutes' },
      { name: 'Chicken', amount: '1kg', notes: 'Cut into pieces' },
      { name: 'Yogurt', amount: '200ml', notes: 'Full fat' },
      { name: 'Biryani Masala', amount: '3 tbsp', notes: 'Spice blend' },
      { name: 'Saffron', amount: '1 tsp', notes: 'Soaked in milk' }
    ],
    instructions: [
      { step: 1, instruction: 'Marinate chicken in yogurt and spices for 30 minutes.', time: '30 min' },
      { step: 2, instruction: 'Cook marinated chicken until partially done.', time: '15 min' },
      { step: 3, instruction: 'Layer partially cooked rice over chicken.', time: '5 min' },
      { step: 4, instruction: 'Cover and cook on low heat until rice is tender.', time: '35 min' }
    ],
    nutrition: { calories: 480, protein: '32g', carbs: '58g', fat: '16g', fiber: '3g', sugar: '2g' }
  }
};


const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavorite = () => {
    setRecipe(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
  };

  const handleBookmark = () => {
    setRecipe(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this amazing ${recipe.title} recipe!`,
        url: window.location.href
      });
    }
  };

  const toggleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const adjustServings = (newServings) => {
    setServings(newServings);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % recipe.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + recipe.images.length) % recipe.images.length);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star-filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star-half" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaRegStar key={i} className="star-empty" />);
    }
    
    return stars;
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        
        // Use only hardcoded recipes - no external APIs
        console.log('Looking for recipe ID:', recipeId);
        console.log('Available recipe IDs:', Object.keys(recipeDatabase));
        const recipeData = recipeDatabase[recipeId];
        if (recipeData) {
          console.log('Found recipe:', recipeData.title);
          setRecipe(recipeData);
        } else {
          console.log('Recipe not found, available IDs:', Object.keys(recipeDatabase));
          throw new Error('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Recipe not found or failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading || !recipe) {
    return (
      <Header showHeroSection={false} showNavigation={false}>
        <div className="recipe-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading recipe details...</p>
        </div>
      </Header>
    );
  }

  if (error) {
    return (
      <Header showHeroSection={false} showNavigation={false}>
        <div className="recipe-details-error">
          <h2>🍳 Recipe Not Found</h2>
          <p>{error}</p>
          <div style={{margin: '20px 0'}}>
            <h3>Available Recipes:</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', margin: '10px 0'}}>
              {Object.keys(recipeDatabase).map(id => (
                <Link key={id} to={`/recipe/${id}`} style={{padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textDecoration: 'none', color: '#333'}}>
                  {recipeDatabase[id].title}
                </Link>
              ))}
            </div>
          </div>
          <button onClick={() => window.location.href = '/'} className="back-home-btn">
            ← Back to Home
          </button>
        </div>
      </Header>
    );
  }

  return (
    <Header showHeroSection={false} showNavigation={false}>
      <div className="recipe-details-container">
        {/* Mobile Recipe Header */}
        <div className="recipe-header-mobile">
          <div className="recipe-header-top">
            <div className="back-section">
              <button className="back-btn" onClick={() => window.history.back()}>
                <FaChevronLeft />
              </button>
              <span className="all-recipes">ALL RECIPES</span>
            </div>
            <button className="heart-btn" onClick={handleFavorite}>
              <FaHeart className={recipe.isFavorite ? 'active' : ''} />
            </button>
          </div>
          
          <div className="recipe-image-container">
            <img 
              src={recipe.images[0]} 
              alt={recipe.title} 
              className="recipe-main-image"
            />
          </div>
          
          <div className="recipe-badges">
            <span className="category-badge">{recipe.category?.toUpperCase()} • {recipe.difficulty?.toUpperCase()}</span>
          </div>
          
          <div className="recipe-rating-section">
            <div className="stars">
              {renderStars(recipe.rating)}
            </div>
            <span className="rating-number">{recipe.rating}</span>
          </div>
          
          <h1 className="recipe-title-main">{recipe.title}</h1>
          <p className="recipe-author">recipe by {recipe.chef}</p>
          
          <div className="recipe-cards">
            <div className="recipe-info-card">
              <span className="card-label">{recipe.difficulty?.toUpperCase()}</span>
            </div>
            <div className="recipe-info-card">
              <span className="card-label">{recipe.totalTime}</span>
            </div>
            <div className="recipe-info-card">
              <span className="card-label">{recipe.ingredients?.length || 12} INGREDIENTS</span>
            </div>
          </div>
          
          <p className="recipe-description-text">{recipe.description}</p>
          
          <div className="recipe-meta-info">
            <div className="servings-info">
              <span>- {recipe.servings} servings +</span>
              <span>{recipe.calories} calories per serving</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="recipe-navigation">
          <button 
            className={`nav-tab ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            INGREDIENTS
          </button>
          <button 
            className={`nav-tab ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            DIRECTIONS
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content-mobile">
          {activeTab === 'ingredients' && (
            <div className="ingredients-content-mobile">
              <div className="ingredients-list-mobile">
                {recipe.ingredients && recipe.ingredients.length > 0 ? recipe.ingredients.map((ingredient, index) => {
                  const multiplier = servings / (recipe.servings || 4); // Base servings
                  
                  // Handle different ingredient formats
                  let amountText = '';
                  let ingredientName = '';
                  let notes = '';
                  
                  // Local recipe format: { name, amount, notes }
                  const adjustedAmount = ingredient.amount && ingredient.amount.includes('g') 
                    ? `${Math.round(parseFloat(ingredient.amount) * multiplier)}g`
                    : ingredient.amount && ingredient.amount.includes('tbsp')
                    ? `${Math.round(parseFloat(ingredient.amount) * multiplier)} tbsp`
                    : ingredient.amount || '';
                  amountText = adjustedAmount;
                  ingredientName = ingredient.name;
                  notes = ingredient.notes || '';
                  
                  return (
                    <div key={index} className="ingredient-item-mobile">
                      <span className="ingredient-text">
                        {amountText && `${amountText} `}{ingredientName}
                        {notes && (
                          <span className="ingredient-notes"> {notes}</span>
                        )}
                      </span>
                    </div>
                  );
                }) : (
                  <div className="ingredient-item-mobile">
                    <span className="ingredient-text">No ingredients available</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="instructions-content-mobile">
              <div className="steps-list-mobile">
                {recipe.instructions && recipe.instructions.length > 0 ? recipe.instructions.map((step, index) => {
                  // Handle different instruction formats
                  let stepText = '';
                  let stepNumber = index + 1;
                  
                  // Local recipe format: { title, description, time, image }
                  stepText = step.description || step.title || '';
                  
                  return (
                    <div key={index} className="step-item-mobile">
                      <div className="step-header-mobile">
                        <button 
                          className="step-checkbox"
                          onClick={() => toggleStepComplete(index)}
                        >
                          {completedSteps.includes(index) && <FaCheck className="checkmark" />}
                        </button>
                        <div className="step-content">
                          <span className="step-number">{stepNumber}.</span>
                          <span className="step-text">{stepText}</span>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="step-item-mobile">
                    <div className="step-header-mobile">
                      <div className="step-content">
                        <span className="step-text">No instructions available</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

              </div>
    </Header>
  );
};

export default RecipeDetails;
