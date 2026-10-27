import type {Product} from '@/types/product';
// Illustrative sample data requested for client review. Never imported into Sanity.
export const demoProducts: Product[] = [
  {
    "_id": "demo-banana-chips",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Banana Chips",
    "slug": "banana-chips",
    "category": "Traditional Snacks",
    "shortDescription": "Crisp banana slices with a light, savoury finish.",
    "fullDescription": "A familiar Kerala tea-time favourite, these golden banana chips bring a satisfying crunch to snack breaks, family gatherings and travel packs. Enjoy them on their own or alongside a hot cup of tea.",
    "mainImage": {
      "localSrc": "/images/demo/banana-chips.svg",
      "alt": "Banana Chips — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/banana-chips-detail.svg",
        "alt": "Banana Chips — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "100 g",
      "250 g",
      "500 g"
    ],
    "ingredients": "Banana, coconut oil, salt.",
    "packagingDetails": "Sealed food pouch. Store in a cool, dry place and keep tightly closed after opening.",
    "featured": true,
    "visible": true,
    "displayOrder": 0,
    "demo": true
  },
  {
    "_id": "demo-tapioca-chips",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Tapioca Chips",
    "slug": "tapioca-chips",
    "category": "Traditional Snacks",
    "shortDescription": "Crunchy tapioca sticks with a gently spiced flavour.",
    "fullDescription": "A hearty, crunchy snack inspired by Kerala’s much-loved tapioca preparations. The savoury seasoning makes it an easy companion for tea-time conversations and sharing with friends.",
    "mainImage": {
      "localSrc": "/images/demo/tapioca-chips.svg",
      "alt": "Tapioca Chips — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/tapioca-chips-detail.svg",
        "alt": "Tapioca Chips — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "100 g",
      "250 g"
    ],
    "ingredients": "Tapioca, vegetable oil, chilli powder, salt.",
    "packagingDetails": "Sealed snack pouch. Keep away from moisture.",
    "featured": true,
    "visible": true,
    "displayOrder": 1,
    "demo": true
  },
  {
    "_id": "demo-kerala-mixture",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Kerala Mixture",
    "slug": "kerala-mixture",
    "category": "Traditional Snacks",
    "shortDescription": "A lively mix of crunchy strands, lentils and peanuts.",
    "fullDescription": "Bring a little variety to your snack bowl with a savoury mixture of crisp bites and warm spices. Serve a handful with tea or share a bowl when guests arrive.",
    "mainImage": {
      "localSrc": "/images/demo/kerala-mixture.svg",
      "alt": "Kerala Mixture — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/kerala-mixture-detail.svg",
        "alt": "Kerala Mixture — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "200 g",
      "400 g"
    ],
    "ingredients": "Gram flour, rice flour, peanuts, lentils, vegetable oil, spices, salt. Contains peanuts.",
    "packagingDetails": "Sealed pouch. Reseal after use to retain crunch.",
    "featured": true,
    "visible": true,
    "displayOrder": 2,
    "demo": true
  },
  {
    "_id": "demo-rice-flour",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Rice Flour",
    "slug": "rice-flour",
    "category": "Kitchen Essentials",
    "shortDescription": "A versatile flour for familiar everyday recipes.",
    "fullDescription": "A useful kitchen staple for preparing Kerala favourites such as puttu, idiyappam and other home-style recipes. Select the pack size that suits your kitchen and follow your preferred recipe.",
    "mainImage": {
      "localSrc": "/images/demo/rice-flour.svg",
      "alt": "Rice Flour — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/rice-flour-detail.svg",
        "alt": "Rice Flour — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "500 g",
      "1 kg"
    ],
    "ingredients": "Rice.",
    "packagingDetails": "Food pouch. Store in an airtight container after opening.",
    "featured": true,
    "visible": true,
    "displayOrder": 3,
    "demo": true
  },
  {
    "_id": "demo-roasted-rava",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Roasted Rava",
    "slug": "roasted-rava",
    "category": "Kitchen Essentials",
    "shortDescription": "An everyday ingredient for breakfast and sweet dishes.",
    "fullDescription": "Keep a versatile pantry ingredient close at hand for upma, kesari and other family favourites. A practical addition to the kitchen for both everyday meals and special treats.",
    "mainImage": {
      "localSrc": "/images/demo/roasted-rava.svg",
      "alt": "Roasted Rava — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/roasted-rava-detail.svg",
        "alt": "Roasted Rava — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "500 g",
      "1 kg"
    ],
    "ingredients": "Wheat semolina. Contains wheat (gluten).",
    "packagingDetails": "Sealed pouch. Store in a cool, dry place.",
    "featured": true,
    "visible": true,
    "displayOrder": 4,
    "demo": true
  },
  {
    "_id": "demo-turmeric-powder",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Turmeric Powder",
    "slug": "turmeric-powder",
    "category": "Spices & Masalas",
    "shortDescription": "Warm golden colour for curries and home-style cooking.",
    "fullDescription": "A familiar part of the Indian spice shelf, turmeric adds its distinctive colour and earthy character to curries, vegetable preparations and marinades. Use according to your recipe and taste.",
    "mainImage": {
      "localSrc": "/images/demo/turmeric-powder.svg",
      "alt": "Turmeric Powder — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/turmeric-powder-detail.svg",
        "alt": "Turmeric Powder — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "100 g",
      "250 g"
    ],
    "ingredients": "Turmeric.",
    "packagingDetails": "Sealed spice pouch. Protect from direct sunlight and moisture.",
    "featured": true,
    "visible": true,
    "displayOrder": 5,
    "demo": true
  },
  {
    "_id": "demo-chilli-powder",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Chilli Powder",
    "slug": "chilli-powder",
    "category": "Spices & Masalas",
    "shortDescription": "A bold touch of heat for everyday favourites.",
    "fullDescription": "Add warmth and colour to your favourite curries, marinades and stir-fries. Start with a small quantity and adjust to suit the flavour and spice level you enjoy.",
    "mainImage": {
      "localSrc": "/images/demo/chilli-powder.svg",
      "alt": "Chilli Powder — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/chilli-powder-detail.svg",
        "alt": "Chilli Powder — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "100 g",
      "250 g",
      "500 g"
    ],
    "ingredients": "Dried red chilli.",
    "packagingDetails": "Sealed spice pouch. Transfer to an airtight container after opening.",
    "featured": false,
    "visible": true,
    "displayOrder": 6,
    "demo": true
  },
  {
    "_id": "demo-coriander-powder",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Coriander Powder",
    "slug": "coriander-powder",
    "category": "Spices & Masalas",
    "shortDescription": "An aromatic addition to everyday curries and gravies.",
    "fullDescription": "Bring a gentle, earthy flavour to vegetable curries, meat dishes and gravies. This pantry staple works alongside other spices to build the familiar taste of home-style cooking.",
    "mainImage": {
      "localSrc": "/images/demo/coriander-powder.svg",
      "alt": "Coriander Powder — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/coriander-powder-detail.svg",
        "alt": "Coriander Powder — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "100 g",
      "250 g"
    ],
    "ingredients": "Coriander seeds.",
    "packagingDetails": "Sealed spice pouch. Keep in a cool, dry cupboard.",
    "featured": false,
    "visible": true,
    "displayOrder": 7,
    "demo": true
  },
  {
    "_id": "demo-garam-masala",
    "_updatedAt": "2026-10-27T00:00:00Z",
    "name": "Garam Masala",
    "slug": "garam-masala",
    "category": "Spices & Masalas",
    "shortDescription": "A warming spice blend for a fragrant finishing touch.",
    "fullDescription": "A blend of familiar whole-spice flavours for curries, rice dishes and festive cooking. Add a small amount during cooking or near the finish, according to the recipe.",
    "mainImage": {
      "localSrc": "/images/demo/garam-masala.svg",
      "alt": "Garam Masala — sample packaging illustration"
    },
    "images": [
      {
        "localSrc": "/images/demo/garam-masala-detail.svg",
        "alt": "Garam Masala — alternate sample packaging illustration",
        "_key": "alternate"
      }
    ],
    "weights": [
      "50 g",
      "100 g"
    ],
    "ingredients": "Coriander, cumin, cinnamon, clove, cardamom, black pepper.",
    "packagingDetails": "Sealed spice pouch. Keep tightly closed after use.",
    "featured": false,
    "visible": true,
    "displayOrder": 8,
    "demo": true
  }
];
