import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const image = (id, query) => `https://loremflickr.com/800/800/${query}?lock=${id}`;

const products = [
  {
    name: "Optimum Nutrition Gold Standard 100% Whey 2.27 KG",
    description: "Whey protein powder designed to provide a convenient source of high-quality protein for active lifestyles and post-workout nutrition.",
    price: 5200, oldPrice: 6100, category: "Supplements", brand: "Optimum Nutrition", flavor: "Double Rich Chocolate", weight: "2.27 KG", servings: "73 Servings",
    image: image(101, "protein,supplement"), gallery: [image(101, "protein,supplement"), image(102, "protein,powder"), image(103, "fitness,nutrition")], stock: 18, featured: true, rating: 5, reviewsCount: 0, badge: "Best Seller",
    benefits: ["24g Protein per Serving", "Whey Protein Blend", "Supports Daily Protein Intake", "Easy to Mix"], ingredients: ["Whey Protein Isolate", "Whey Protein Concentrate", "Natural and Artificial Flavors", "Lecithin", "Sucralose"]
  },
  {
    name: "Dymatize ISO100 Hydrolyzed Whey 2.3 KG",
    description: "Hydrolyzed whey protein isolate formulated as a convenient protein option for training and recovery nutrition.",
    price: 5550, oldPrice: 6500, category: "Supplements", brand: "Dymatize", flavor: "Gourmet Vanilla", weight: "2.3 KG", servings: "71 Servings",
    image: image(104, "whey,protein"), gallery: [image(104, "whey,protein"), image(105, "protein,shake"), image(106, "gym,supplement")], stock: 15, featured: true, rating: 5, reviewsCount: 0, badge: "Best Seller",
    benefits: ["25g Protein per Serving", "Hydrolyzed Whey Isolate", "Low Sugar", "Fast Mixing"], ingredients: ["Hydrolyzed Whey Protein Isolate", "Natural and Artificial Flavors", "Salt", "Sucralose", "Soy Lecithin"]
  },
  {
    name: "MuscleTech Nitro-Tech Whey Protein 1.8 KG",
    description: "Protein powder combining whey protein sources for convenient nutrition around training and throughout the day.",
    price: 3950, oldPrice: 4550, category: "Supplements", brand: "MuscleTech", flavor: "Milk Chocolate", weight: "1.8 KG", servings: "30 Servings",
    image: image(107, "protein,powder"), gallery: [image(107, "protein,powder"), image(108, "supplement,jar"), image(109, "fitness,protein")], stock: 20, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["High Protein Content", "Whey Protein Blend", "Convenient Serving", "Smooth Texture"], ingredients: ["Whey Protein Isolate", "Whey Protein Concentrate", "Cocoa", "Natural Flavors", "Lecithin"]
  },
  {
    name: "Rule 1 R1 Whey Blend 2.27 KG",
    description: "Multi-source whey protein powder made for convenient protein intake before or after exercise.",
    price: 3750, oldPrice: 4300, category: "Supplements", brand: "Rule 1", flavor: "Chocolate Fudge", weight: "2.27 KG", servings: "72 Servings",
    image: image(110, "protein,fitness"), gallery: [image(110, "protein,fitness"), image(111, "whey,supplement"), image(112, "gym,nutrition")], stock: 17, featured: false, rating: 4, reviewsCount: 0, badge: "New",
    benefits: ["Whey Protein Blend", "Supports Protein Intake", "Mixes Easily", "Multiple Servings"], ingredients: ["Whey Protein Concentrate", "Whey Protein Isolate", "Cocoa", "Flavors", "Lecithin"]
  },
  {
    name: "BSN Syntha-6 Protein 1.82 KG",
    description: "Protein blend containing multiple protein sources for a convenient option throughout the day.",
    price: 3900, oldPrice: 4500, category: "Supplements", brand: "BSN", flavor: "Strawberry Milkshake", weight: "1.82 KG", servings: "28 Servings",
    image: image(113, "protein,shake"), gallery: [image(113, "protein,shake"), image(114, "supplements,fitness"), image(115, "protein,powder")], stock: 14, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Multi-Protein Blend", "Creamy Flavor", "Convenient Nutrition", "Easy to Mix"], ingredients: ["Whey Protein Concentrate", "Milk Protein Concentrate", "Calcium Caseinate", "Egg Albumen", "Natural Flavors"]
  },
  {
    name: "Applied Nutrition Critical Whey 2 KG",
    description: "Whey protein blend created for convenient daily protein consumption and training nutrition.",
    price: 3650, oldPrice: 4200, category: "Supplements", brand: "Applied Nutrition", flavor: "Vanilla", weight: "2 KG", servings: "67 Servings",
    image: image(116, "whey,supplement"), gallery: [image(116, "whey,supplement"), image(117, "protein,fitness"), image(118, "nutrition,gym")], stock: 19, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Whey Protein Blend", "Daily Protein Support", "Smooth Mixing", "67 Servings"], ingredients: ["Whey Protein Concentrate", "Whey Protein Isolate", "Natural Flavors", "Lecithin", "Sweetener"]
  },
  {
    name: "MyProtein Impact Whey 2.5 KG",
    description: "Convenient whey protein powder suitable for adding protein to shakes and meals around an active routine.",
    price: 3400, oldPrice: 3950, category: "Supplements", brand: "MyProtein", flavor: "Chocolate Smooth", weight: "2.5 KG", servings: "83 Servings",
    image: image(119, "protein,shake"), gallery: [image(119, "protein,shake"), image(120, "supplement,powder"), image(121, "fitness,nutrition")], stock: 21, featured: false, rating: 4, reviewsCount: 0, badge: "Value",
    benefits: ["High Protein Content", "Whey Concentrate", "83 Servings", "Easy to Prepare"], ingredients: ["Whey Protein Concentrate", "Cocoa Powder", "Flavors", "Sunflower Lecithin", "Sweetener"]
  },
  {
    name: "Kevin Levrone Anabolic Iso Whey 2 KG",
    description: "Protein powder based on whey sources for athletes seeking a practical addition to their daily protein intake.",
    price: 4100, oldPrice: 4750, category: "Supplements", brand: "Kevin Levrone", flavor: "Chocolate", weight: "2 KG", servings: "66 Servings",
    image: image(122, "whey,protein"), gallery: [image(122, "whey,protein"), image(123, "protein,supplement"), image(124, "gym,nutrition")], stock: 16, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Whey Protein", "High Protein per Serving", "Convenient Shake", "Training Nutrition"], ingredients: ["Whey Protein Isolate", "Whey Protein Concentrate", "Cocoa", "Flavors", "Lecithin"]
  },
  {
    name: "Rule 1 R1 Protein 5 LB",
    description: "Large-format whey protein powder for athletes who want a convenient protein source for regular use.",
    price: 4750, oldPrice: 5450, category: "Supplements", brand: "Rule 1", flavor: "Vanilla Creme", weight: "5 LB", servings: "70 Servings",
    image: image(125, "protein,powder"), gallery: [image(125, "protein,powder"), image(126, "whey,shake"), image(127, "supplement,jar")], stock: 12, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Whey Protein Blend", "70 Servings", "Convenient Daily Use", "Easy Mixing"], ingredients: ["Whey Protein Concentrate", "Whey Protein Isolate", "Natural Flavors", "Lecithin", "Sweetener"]
  },
  {
    name: "Mutant Whey 2.27 KG",
    description: "Multi-source whey protein formula for convenient protein intake as part of an active lifestyle.",
    price: 3850, oldPrice: 4450, category: "Supplements", brand: "Mutant", flavor: "Vanilla Ice Cream", weight: "2.27 KG", servings: "65 Servings",
    image: image(128, "fitness,protein"), gallery: [image(128, "fitness,protein"), image(129, "whey,supplement"), image(130, "protein,shake")], stock: 15, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Protein Blend", "Multiple Protein Sources", "65 Servings", "Smooth Texture"], ingredients: ["Whey Protein Concentrate", "Whey Protein Isolate", "Milk Protein", "Cocoa", "Natural Flavors"]
  },

  {
    name: "Optimum Nutrition Micronized Creatine Powder 300 G",
    description: "Micronized creatine monohydrate powder designed for convenient daily use around strength and high-intensity training.",
    price: 1450, oldPrice: 1750, category: "Supplements", brand: "Optimum Nutrition", flavor: "Unflavored", weight: "300 G", servings: "60 Servings",
    image: image(131, "creatine,supplement"), gallery: [image(131, "creatine,supplement"), image(132, "sports,nutrition"), image(133, "fitness,supplement")], stock: 25, featured: true, rating: 5, reviewsCount: 0, badge: "Best Seller",
    benefits: ["Creatine Monohydrate", "Micronized Powder", "60 Servings", "Unflavored"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "Dymatize Creatine Monohydrate 300 G",
    description: "Pure creatine monohydrate powder for athletes looking for a simple creatine addition to their training routine.",
    price: 1350, oldPrice: 1600, category: "Supplements", brand: "Dymatize", flavor: "Unflavored", weight: "300 G", servings: "60 Servings",
    image: image(134, "creatine,powder"), gallery: [image(134, "creatine,powder"), image(135, "gym,supplement"), image(136, "sports,nutrition")], stock: 22, featured: false, rating: 5, reviewsCount: 0, badge: "",
    benefits: ["100% Creatine Monohydrate", "60 Servings", "Unflavored", "Easy to Mix"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "MuscleTech Platinum Creatine 400 G",
    description: "Creatine monohydrate powder designed for regular use with water or other beverages.",
    price: 1500, oldPrice: 1800, category: "Supplements", brand: "MuscleTech", flavor: "Unflavored", weight: "400 G", servings: "80 Servings",
    image: image(137, "creatine,fitness"), gallery: [image(137, "creatine,fitness"), image(138, "supplement,powder"), image(139, "gym,nutrition")], stock: 20, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Creatine Monohydrate", "80 Servings", "Unflavored", "Daily Training Support"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "Applied Nutrition Creatine Monohydrate 250 G",
    description: "Straightforward creatine monohydrate powder for daily training nutrition.",
    price: 1150, oldPrice: 1350, category: "Supplements", brand: "Applied Nutrition", flavor: "Unflavored", weight: "250 G", servings: "50 Servings",
    image: image(140, "creatine,supplement"), gallery: [image(140, "creatine,supplement"), image(141, "sports,nutrition"), image(142, "fitness,gym")], stock: 24, featured: false, rating: 4, reviewsCount: 0, badge: "Value",
    benefits: ["Creatine Monohydrate", "50 Servings", "Unflavored", "Simple Formula"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "Big Ramy Labs Red Rex Creatine 300 G",
    description: "Creatine monohydrate powder designed to complement strength and high-intensity workout nutrition.",
    price: 950, oldPrice: 1100, category: "Supplements", brand: "Big Ramy Labs", flavor: "Unflavored", weight: "300 G", servings: "60 Servings",
    image: image(143, "creatine,powder"), gallery: [image(143, "creatine,powder"), image(144, "gym,fitness"), image(145, "sports,supplement")], stock: 28, featured: true, rating: 4, reviewsCount: 0, badge: "Popular",
    benefits: ["Creatine Monohydrate", "60 Servings", "Unflavored", "Easy to Mix"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "Universal Nutrition Creatine 200 G",
    description: "Creatine monohydrate powder offering a convenient way to include creatine in a regular training routine.",
    price: 850, oldPrice: 1000, category: "Supplements", brand: "Universal Nutrition", flavor: "Unflavored", weight: "200 G", servings: "40 Servings",
    image: image(146, "creatine,fitness"), gallery: [image(146, "creatine,fitness"), image(147, "supplement,gym"), image(148, "sports,nutrition")], stock: 19, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Creatine Monohydrate", "40 Servings", "Unflavored", "Daily Use"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "Scitec Nutrition 100% Creatine Monohydrate 300 G",
    description: "Creatine monohydrate powder for athletes who want a simple, single-ingredient supplement.",
    price: 1050, oldPrice: 1250, category: "Supplements", brand: "Scitec Nutrition", flavor: "Unflavored", weight: "300 G", servings: "60 Servings",
    image: image(149, "creatine,powder"), gallery: [image(149, "creatine,powder"), image(150, "fitness,supplement"), image(151, "gym,nutrition")], stock: 21, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["100% Creatine Monohydrate", "60 Servings", "Unflavored", "Single Ingredient"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "Kevin Levrone Creatine 300 G",
    description: "Creatine monohydrate supplement made for convenient use alongside resistance and high-intensity exercise.",
    price: 1100, oldPrice: 1300, category: "Supplements", brand: "Kevin Levrone", flavor: "Unflavored", weight: "300 G", servings: "60 Servings",
    image: image(152, "creatine,supplement"), gallery: [image(152, "creatine,supplement"), image(153, "sports,fitness"), image(154, "gym,nutrition")], stock: 18, featured: false, rating: 4, reviewsCount: 0, badge: "New",
    benefits: ["Creatine Monohydrate", "60 Servings", "Unflavored", "Training Support"], ingredients: ["Creatine Monohydrate"]
  },
  {
    name: "Rule 1 Creatine 300 G",
    description: "Unflavored creatine monohydrate powder suitable for daily training nutrition.",
    price: 1000, oldPrice: 1200, category: "Supplements", brand: "Rule 1", flavor: "Unflavored", weight: "300 G", servings: "60 Servings",
    image: image(155, "creatine,fitness"), gallery: [image(155, "creatine,fitness"), image(156, "supplement,powder"), image(157, "sports,nutrition")], stock: 23, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Creatine Monohydrate", "60 Servings", "Unflavored", "Easy Mixing"], ingredients: ["Creatine Monohydrate"]
  },

  {
    name: "Cellucor C4 Original Pre Workout 390 G",
    description: "Pre-workout powder designed to complement training with a combination of performance-oriented ingredients and flavor.",
    price: 1250, oldPrice: 1500, category: "Supplements", brand: "Cellucor", flavor: "Icy Blue Razz", weight: "390 G", servings: "30 Servings",
    image: image(158, "preworkout,fitness"), gallery: [image(158, "preworkout,fitness"), image(159, "sports,supplement"), image(160, "gym,nutrition")], stock: 17, featured: true, rating: 4, reviewsCount: 0, badge: "Popular",
    benefits: ["Pre-Workout Formula", "Energy Support", "Training Focus", "30 Servings"], ingredients: ["Beta Alanine", "Caffeine", "Arginine", "Vitamin C", "Vitamin B6"]
  },
  {
    name: "Cellucor C4 Ultimate Pre Workout 360 G",
    description: "Advanced pre-workout formula for athletes seeking a convenient supplement before demanding training sessions.",
    price: 1650, oldPrice: 1950, category: "Supplements", brand: "Cellucor", flavor: "Orange", weight: "360 G", servings: "20 Servings",
    image: image(161, "preworkout,supplement"), gallery: [image(161, "preworkout,supplement"), image(162, "fitness,gym"), image(163, "sports,nutrition")], stock: 14, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Pre-Workout Blend", "Energy Support", "Focus Support", "20 Servings"], ingredients: ["Caffeine", "Beta Alanine", "Citrulline", "Creatine", "Flavors"]
  },
  {
    name: "Optimum Nutrition Gold Standard Pre Workout 330 G",
    description: "Pre-workout drink mix designed to support energy and focus before exercise.",
    price: 1450, oldPrice: 1750, category: "Supplements", brand: "Optimum Nutrition", flavor: "Blue Raspberry", weight: "330 G", servings: "30 Servings",
    image: image(164, "preworkout,fitness"), gallery: [image(164, "preworkout,fitness"), image(165, "gym,supplement"), image(166, "sports,nutrition")], stock: 16, featured: false, rating: 4, reviewsCount: 0, badge: "New",
    benefits: ["Pre-Workout Formula", "Energy Support", "Focus Support", "30 Servings"], ingredients: ["Caffeine", "Beta Alanine", "Citrulline", "B Vitamins", "Natural Flavors"]
  },
  {
    name: "Applied Nutrition ABE Pre Workout 315 G",
    description: "Pre-workout powder created for use before training and built around energy, focus and workout support ingredients.",
    price: 1550, oldPrice: 1850, category: "Supplements", brand: "Applied Nutrition", flavor: "Blue Raspberry", weight: "315 G", servings: "30 Servings",
    image: image(167, "preworkout,gym"), gallery: [image(167, "preworkout,gym"), image(168, "supplement,fitness"), image(169, "sports,nutrition")], stock: 13, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Pre-Workout Blend", "Energy Support", "Focus Support", "30 Servings"], ingredients: ["Caffeine", "Beta Alanine", "Citrulline Malate", "Taurine", "B Vitamins"]
  },
  {
    name: "USP Labs Jack3d Pre Workout 250 G",
    description: "Pre-workout powder for athletes seeking a practical energy and training-focused supplement.",
    price: 1350, oldPrice: 1600, category: "Supplements", brand: "USP Labs", flavor: "Fruit Punch", weight: "250 G", servings: "25 Servings",
    image: image(170, "preworkout,supplement"), gallery: [image(170, "preworkout,supplement"), image(171, "fitness,nutrition"), image(172, "gym,sports")], stock: 11, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Pre-Workout Formula", "Energy Support", "Training Focus", "25 Servings"], ingredients: ["Caffeine", "Beta Alanine", "Citrulline", "Natural Flavors"]
  },
  {
    name: "Redcon1 Total War Pre Workout 30 Servings",
    description: "Pre-workout formula intended for use before exercise with ingredients commonly used in training supplements.",
    price: 1500, oldPrice: 1800, category: "Supplements", brand: "Redcon1", flavor: "Sour Gummy", weight: "300 G", servings: "30 Servings",
    image: image(173, "preworkout,fitness"), gallery: [image(173, "preworkout,fitness"), image(174, "sports,supplement"), image(175, "gym,nutrition")], stock: 12, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Pre-Workout Blend", "Energy Support", "Focus Support", "30 Servings"], ingredients: ["Caffeine", "Beta Alanine", "Citrulline", "Taurine", "Flavors"]
  },
  {
    name: "MuscleTech Shatter Pre Workout 30 Servings",
    description: "Pre-workout supplement designed to accompany demanding training sessions with a convenient powdered drink format.",
    price: 1300, oldPrice: 1550, category: "Supplements", brand: "MuscleTech", flavor: "Fruit Punch", weight: "300 G", servings: "30 Servings",
    image: image(176, "preworkout,gym"), gallery: [image(176, "preworkout,gym"), image(177, "fitness,supplement"), image(178, "sports,nutrition")], stock: 15, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Pre-Workout Formula", "Energy Support", "Focus Support", "30 Servings"], ingredients: ["Caffeine", "Beta Alanine", "Citrulline", "Taurine"]
  },

  {
    name: "Optimum Nutrition Serious Mass 5.45 KG",
    description: "High-calorie weight gainer powder designed for people who want a convenient way to increase calorie and protein intake.",
    price: 5850, oldPrice: 7000, category: "Supplements", brand: "Optimum Nutrition", flavor: "Chocolate", weight: "5.45 KG", servings: "16 Servings",
    image: image(179, "massgainer,protein"), gallery: [image(179, "massgainer,protein"), image(180, "weightgain,supplement"), image(181, "fitness,nutrition")], stock: 10, featured: true, rating: 5, reviewsCount: 0, badge: "Best Seller",
    benefits: ["High Calorie Formula", "Protein Blend", "Carbohydrate Blend", "Added Vitamins"], ingredients: ["Protein Blend", "Maltodextrin", "Oat Flour", "Cocoa", "Vitamin and Mineral Blend"]
  },
  {
    name: "Dymatize Super Mass Gainer 6 LB",
    description: "Mass gainer powder providing a combination of protein and carbohydrates for convenient calorie support.",
    price: 4300, oldPrice: 5000, category: "Supplements", brand: "Dymatize", flavor: "Cookies and Cream", weight: "6 LB", servings: "12 Servings",
    image: image(182, "massgainer,supplement"), gallery: [image(182, "massgainer,supplement"), image(183, "protein,nutrition"), image(184, "fitness,shake")], stock: 13, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Calorie Support", "Protein Blend", "Carbohydrate Blend", "Convenient Shake"], ingredients: ["Whey Protein Concentrate", "Maltodextrin", "Milk Protein", "Cocoa", "Flavors"]
  },
  {
    name: "Mutant Mass 6.8 KG",
    description: "Large-format mass gainer combining protein and carbohydrate sources for people looking for a calorie-dense shake.",
    price: 5200, oldPrice: 6000, category: "Supplements", brand: "Mutant", flavor: "Triple Chocolate", weight: "6.8 KG", servings: "22 Servings",
    image: image(185, "massgainer,fitness"), gallery: [image(185, "massgainer,fitness"), image(186, "weightgain,nutrition"), image(187, "protein,shake")], stock: 9, featured: false, rating: 4, reviewsCount: 0, badge: "Low Stock",
    benefits: ["High Calorie Shake", "Protein Blend", "Carbohydrate Blend", "Large Format"], ingredients: ["Protein Blend", "Maltodextrin", "Oat Flour", "Cocoa", "Flavors"]
  },
  {
    name: "MuscleTech Mass-Tech Elite 2.72 KG",
    description: "Mass gainer powder combining protein, carbohydrates and calories for convenient nutrition between meals or around training.",
    price: 3650, oldPrice: 4300, category: "Supplements", brand: "MuscleTech", flavor: "Milk Chocolate", weight: "2.72 KG", servings: "18 Servings",
    image: image(188, "massgainer,protein"), gallery: [image(188, "massgainer,protein"), image(189, "supplement,shake"), image(190, "fitness,nutrition")], stock: 14, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Calorie Support", "Protein Blend", "Carbohydrate Blend", "Convenient Serving"], ingredients: ["Whey Protein Concentrate", "Whey Protein Isolate", "Maltodextrin", "Oat Flour", "Cocoa"]
  },
  {
    name: "Rule 1 Clean Gainer 2.3 KG",
    description: "Protein and carbohydrate powder intended to make calorie and nutrient intake more convenient for active users.",
    price: 3300, oldPrice: 3900, category: "Supplements", brand: "Rule 1", flavor: "Chocolate Fudge", weight: "2.3 KG", servings: "16 Servings",
    image: image(191, "massgainer,shake"), gallery: [image(191, "massgainer,shake"), image(192, "protein,supplement"), image(193, "fitness,nutrition")], stock: 15, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Protein and Carbohydrates", "Calorie Support", "Convenient Shake", "16 Servings"], ingredients: ["Whey Protein Concentrate", "Maltodextrin", "Oat Flour", "Cocoa", "Natural Flavors"]
  },

  {
    name: "Optimum Nutrition Opti-Men Multivitamin 90 Tablets",
    description: "Daily multivitamin and mineral supplement formulated as a convenient addition to a balanced diet.",
    price: 1250, oldPrice: 1500, category: "Supplements", brand: "Optimum Nutrition", flavor: "Tablets", weight: "90 Tablets", servings: "30 Servings",
    image: image(194, "multivitamin,supplement"), gallery: [image(194, "multivitamin,supplement"), image(195, "vitamins,nutrition"), image(196, "health,supplements")], stock: 20, featured: true, rating: 5, reviewsCount: 0, badge: "Popular",
    benefits: ["Daily Multivitamin", "Vitamin and Mineral Blend", "30 Servings", "Tablet Format"], ingredients: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E", "B Vitamins", "Mineral Blend"]
  },
  {
    name: "Optimum Nutrition Opti-Women Multivitamin 60 Capsules",
    description: "Daily vitamin and mineral supplement in capsule form for convenient nutritional support.",
    price: 1100, oldPrice: 1350, category: "Supplements", brand: "Optimum Nutrition", flavor: "Capsules", weight: "60 Capsules", servings: "30 Servings",
    image: image(197, "vitamins,supplement"), gallery: [image(197, "vitamins,supplement"), image(198, "multivitamin,nutrition"), image(199, "health,supplement")], stock: 18, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Daily Vitamins", "Mineral Blend", "30 Servings", "Capsule Format"], ingredients: ["Vitamin A", "Vitamin C", "Vitamin D3", "Vitamin E", "B Vitamins", "Minerals"]
  },
  {
    name: "NOW Foods Daily Vits 100 Tablets",
    description: "Broad-spectrum daily multivitamin supplement designed to complement everyday nutrition.",
    price: 850, oldPrice: 1000, category: "Supplements", brand: "NOW Foods", flavor: "Tablets", weight: "100 Tablets", servings: "100 Servings",
    image: image(200, "multivitamin,tablets"), gallery: [image(200, "multivitamin,tablets"), image(201, "vitamins,nutrition"), image(202, "supplement,health")], stock: 24, featured: false, rating: 4, reviewsCount: 0, badge: "Value",
    benefits: ["Daily Multivitamin", "Vitamin Blend", "Mineral Blend", "100 Servings"], ingredients: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E", "B Vitamins", "Minerals"]
  },
  {
    name: "MuscleTech Platinum Multivitamin 90 Tablets",
    description: "Daily multivitamin and mineral formula intended to complement a varied diet and active lifestyle.",
    price: 950, oldPrice: 1150, category: "Supplements", brand: "MuscleTech", flavor: "Tablets", weight: "90 Tablets", servings: "30 Servings",
    image: image(203, "vitamins,supplement"), gallery: [image(203, "vitamins,supplement"), image(204, "multivitamin,health"), image(205, "nutrition,tablets")], stock: 19, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Daily Vitamin Blend", "Minerals", "30 Servings", "Tablet Format"], ingredients: ["Vitamin A", "Vitamin C", "Vitamin D3", "Vitamin E", "B Vitamins", "Minerals"]
  },

  {
    name: "NOW Foods Omega-3 100 Softgels",
    description: "Fish oil softgels providing EPA and DHA as part of a balanced nutritional routine.",
    price: 900, oldPrice: 1100, category: "Supplements", brand: "NOW Foods", flavor: "Softgels", weight: "100 Softgels", servings: "50 Servings",
    image: image(206, "omega3,supplement"), gallery: [image(206, "omega3,supplement"), image(207, "fishoil,capsules"), image(208, "nutrition,softgels")], stock: 20, featured: true, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["EPA and DHA", "Fish Oil Softgels", "50 Servings", "Convenient Capsule Format"], ingredients: ["Fish Oil", "EPA", "DHA", "Gelatin", "Glycerin"]
  },
  {
    name: "California Gold Nutrition Omega-3 100 Softgels",
    description: "Omega-3 fish oil softgels providing EPA and DHA for convenient daily nutritional use.",
    price: 950, oldPrice: 1150, category: "Supplements", brand: "California Gold Nutrition", flavor: "Softgels", weight: "100 Softgels", servings: "50 Servings",
    image: image(209, "omega3,fishoil"), gallery: [image(209, "omega3,fishoil"), image(210, "supplement,capsules"), image(211, "nutrition,softgels")], stock: 17, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["EPA and DHA", "Fish Oil", "50 Servings", "Softgel Format"], ingredients: ["Fish Oil", "EPA", "DHA", "Gelatin", "Glycerin"]
  },
  {
    name: "NOW Foods Magnesium Citrate 100 Tablets",
    description: "Magnesium citrate supplement in tablet form for convenient daily mineral intake.",
    price: 650, oldPrice: 800, category: "Supplements", brand: "NOW Foods", flavor: "Tablets", weight: "100 Tablets", servings: "50 Servings",
    image: image(212, "magnesium,supplement"), gallery: [image(212, "magnesium,supplement"), image(213, "minerals,tablets"), image(214, "nutrition,supplement")], stock: 25, featured: false, rating: 4, reviewsCount: 0, badge: "Value",
    benefits: ["Magnesium Supplement", "Citrate Form", "50 Servings", "Tablet Format"], ingredients: ["Magnesium Citrate", "Cellulose", "Stearic Acid", "Silica"]
  },
  {
    name: "NOW Foods Zinc Picolinate 50 Tablets",
    description: "Zinc supplement in picolinate form for convenient daily mineral intake.",
    price: 550, oldPrice: 700, category: "Supplements", brand: "NOW Foods", flavor: "Tablets", weight: "50 Tablets", servings: "50 Servings",
    image: image(215, "zinc,supplement"), gallery: [image(215, "zinc,supplement"), image(216, "vitamins,tablets"), image(217, "mineral,supplement")], stock: 23, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Zinc Supplement", "Picolinate Form", "50 Servings", "Tablet Format"], ingredients: ["Zinc Picolinate", "Cellulose", "Stearic Acid", "Silica"]
  },
  {
    name: "California Gold Nutrition Vitamin D3 120 Softgels",
    description: "Vitamin D3 supplement in softgel form for convenient daily nutritional use.",
    price: 600, oldPrice: 750, category: "Supplements", brand: "California Gold Nutrition", flavor: "Softgels", weight: "120 Softgels", servings: "120 Servings",
    image: image(218, "vitamind,supplement"), gallery: [image(218, "vitamind,supplement"), image(219, "vitamins,softgels"), image(220, "nutrition,capsules")], stock: 21, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Vitamin D3", "Softgel Format", "120 Servings", "Convenient Daily Use"], ingredients: ["Vitamin D3", "Olive Oil", "Gelatin", "Glycerin"]
  },
  {
    name: "Vital Proteins Collagen Peptides 284 G",
    description: "Unflavored collagen peptides powder designed for convenient addition to drinks and foods.",
    price: 1650, oldPrice: 1950, category: "Supplements", brand: "Vital Proteins", flavor: "Unflavored", weight: "284 G", servings: "28 Servings",
    image: image(221, "collagen,supplement"), gallery: [image(221, "collagen,supplement"), image(222, "collagen,powder"), image(223, "nutrition,fitness")], stock: 13, featured: true, rating: 4, reviewsCount: 0, badge: "New",
    benefits: ["Collagen Peptides", "Unflavored", "28 Servings", "Easy to Mix"], ingredients: ["Hydrolyzed Bovine Collagen Peptides"]
  },
  {
    name: "Scitec Nutrition BCAA Xpress 280 G",
    description: "Branched-chain amino acid powder designed as a convenient addition to training nutrition.",
    price: 1200, oldPrice: 1450, category: "Supplements", brand: "Scitec Nutrition", flavor: "Orange", weight: "280 G", servings: "50 Servings",
    image: image(224, "bcaa,supplement"), gallery: [image(224, "bcaa,supplement"), image(225, "aminoacids,fitness"), image(226, "sports,nutrition")], stock: 16, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["BCAA Blend", "Leucine, Isoleucine and Valine", "50 Servings", "Powder Format"], ingredients: ["L-Leucine", "L-Isoleucine", "L-Valine", "Natural Flavors", "Sweetener"]
  },
  {
    name: "Optimum Nutrition Glutamine Powder 240 G",
    description: "Unflavored L-glutamine powder for convenient addition to shakes and daily sports nutrition.",
    price: 1050, oldPrice: 1250, category: "Supplements", brand: "Optimum Nutrition", flavor: "Unflavored", weight: "240 G", servings: "48 Servings",
    image: image(227, "glutamine,supplement"), gallery: [image(227, "glutamine,supplement"), image(228, "aminoacid,powder"), image(229, "sports,nutrition")], stock: 18, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["L-Glutamine", "Unflavored", "48 Servings", "Easy to Mix"], ingredients: ["L-Glutamine"]
  },
  {
    name: "Optimum Nutrition Amino Energy 270 G",
    description: "Amino acid drink mix designed as a convenient beverage for active lifestyles and training routines.",
    price: 1350, oldPrice: 1600, category: "Supplements", brand: "Optimum Nutrition", flavor: "Fruit Fusion", weight: "270 G", servings: "30 Servings",
    image: image(230, "aminoacid,supplement"), gallery: [image(230, "aminoacid,supplement"), image(231, "sports,drink"), image(232, "fitness,nutrition")], stock: 15, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Amino Acid Blend", "Drink Mix", "30 Servings", "Multiple Flavors"], ingredients: ["Amino Acid Blend", "Natural Flavors", "Caffeine", "Citric Acid", "Sweetener"]
  },
  {
    name: "NOW Foods L-Carnitine 500 mg 100 Capsules",
    description: "L-carnitine supplement in capsule form for convenient inclusion in an active nutrition routine.",
    price: 850, oldPrice: 1000, category: "Supplements", brand: "NOW Foods", flavor: "Capsules", weight: "100 Capsules", servings: "50 Servings",
    image: image(233, "carnitine,supplement"), gallery: [image(233, "carnitine,supplement"), image(234, "aminoacid,capsules"), image(235, "sports,nutrition")], stock: 20, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["L-Carnitine", "500 mg per Capsule", "50 Servings", "Capsule Format"], ingredients: ["L-Carnitine", "Rice Flour", "Gelatin", "Magnesium Stearate"]
  },
  {
    name: "Scitec Nutrition 100% Whey Isolate 700 G",
    description: "Whey protein isolate powder designed for convenient high-protein nutrition with a light texture and easy mixing.",
    price: 1850, oldPrice: 2150, category: "Supplements", brand: "Scitec Nutrition", flavor: "Vanilla", weight: "700 G", servings: "23 Servings",
    image: image(236, "wheyisolate,protein"), gallery: [image(236, "wheyisolate,protein"), image(237, "protein,powder"), image(238, "fitness,nutrition")], stock: 14, featured: false, rating: 4, reviewsCount: 0, badge: "New",
    benefits: ["Whey Protein Isolate", "High Protein", "23 Servings", "Easy Mixing"], ingredients: ["Whey Protein Isolate", "Natural Flavors", "Lecithin", "Sweetener"]
  },
  {
    name: "Applied Nutrition EAA Amino Hydrate 30 Servings",
    description: "Essential amino acid drink mix designed as a convenient hydration and training nutrition option.",
    price: 1300, oldPrice: 1550, category: "Supplements", brand: "Applied Nutrition", flavor: "Blue Raspberry", weight: "300 G", servings: "30 Servings",
    image: image(239, "eaa,supplement"), gallery: [image(239, "eaa,supplement"), image(240, "aminoacid,drink"), image(241, "fitness,nutrition")], stock: 15, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["Essential Amino Acids", "Drink Mix", "30 Servings", "Training Hydration"], ingredients: ["Essential Amino Acid Blend", "Electrolytes", "Citric Acid", "Natural Flavors", "Sweetener"]
  },
  {
    name: "MuscleTech Platinum BCAA 220 Capsules",
    description: "Branched-chain amino acid supplement in capsule form for convenient daily sports nutrition.",
    price: 1150, oldPrice: 1400, category: "Supplements", brand: "MuscleTech", flavor: "Capsules", weight: "220 Capsules", servings: "55 Servings",
    image: image(242, "bcaa,capsules"), gallery: [image(242, "bcaa,capsules"), image(243, "aminoacid,supplement"), image(244, "sports,nutrition")], stock: 17, featured: false, rating: 4, reviewsCount: 0, badge: "",
    benefits: ["BCAA Blend", "Capsule Format", "55 Servings", "Convenient Daily Use"], ingredients: ["L-Leucine", "L-Isoleucine", "L-Valine", "Gelatin", "Magnesium Stearate"]
  }
];

async function seedSupplements() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingNames = await Product.find(
      { name: { $in: products.map((product) => product.name) } },
      { name: 1 }
    ).lean();

    const existingSet = new Set(existingNames.map((product) => product.name));
    const newProducts = products.filter((product) => !existingSet.has(product.name));

    if (!newProducts.length) {
      console.log("No new supplement products to insert.");
      return;
    }

    const createdProducts = await Product.insertMany(newProducts);
    console.log(`${createdProducts.length} supplement products inserted successfully.`);
  } catch (error) {
    console.error("Error inserting supplement products:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seedSupplements();