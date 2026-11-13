export type Phone = { label: string; number: string };

/** Files live in public/, so prefix them with Vite's base (Pages serves a subpath). */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export type Branch = {
  id: string;
  city: string;
  area: string;
  address: string;
  phones: Phone[];
  opens: string;
  closes: string;
  hoursLabel: string;
  facilities: string[];
  fssai: string;
  mapUrl: string;
};

export const BRAND = {
  name: "Ramees Restaurant",
  tagline: "One thousand flavours. One place.",
  email: "info.rameesrestaurant@gmail.com",
  whatsapp: "917559066666",
  instagram: "https://www.instagram.com/rameeskollam/",
  swiggy: "https://www.swiggy.com/city/kollam/ramees-restaurant-trivandrum-road-rest132384",
  zomato: "https://www.zomato.com/kollam/ramees-restaurant-1-kollam-locality/order",
  establishedLine: "Kollam · Kottiyam · Kochi",
};

export const BRANCHES: Branch[] = [
  {
    id: "chinnakada",
    city: "Kollam",
    area: "Chinnakada",
    address: "Ground Floor, TV Plaza, Residency Road, near LIC Building, Chinnakada, Kollam 691001",
    phones: [
      { label: "Reservations", number: "+91 75590 66666" },
      { label: "Restaurant", number: "+91 474 201 6666" },
    ],
    opens: "12:00",
    closes: "23:30",
    hoursLabel: "12:00 pm – 11:30 pm, daily",
    facilities: ["Dine-in", "Takeaway", "Delivery", "Air-conditioned hall", "Vegetarian menu"],
    fssai: "11315002000063",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ramees+Restaurant+TV+Plaza+Chinnakada+Kollam",
  },
  {
    id: "kottiyam",
    city: "Kollam",
    area: "Kottiyam",
    address: "18/889, Trivandrum Road, Kottiyam, Kollam 691571",
    phones: [
      { label: "Restaurant", number: "+91 90610 95555" },
      { label: "Landline", number: "+91 474 205 6666" },
    ],
    opens: "11:30",
    closes: "23:00",
    hoursLabel: "11:30 am – 11:00 pm, daily",
    facilities: ["Dine-in", "Takeaway", "Delivery", "Parking", "Catering"],
    fssai: "11317002000697",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ramees+Restaurant+and+Caterers+Kottiyam+Kollam",
  },
  {
    id: "maradu",
    city: "Kochi",
    area: "Maradu",
    address: "VII/174-175, Kundanoor, Maradu, Kochi 682304",
    phones: [{ label: "Restaurant", number: "+91 90202 22301" }],
    opens: "12:00",
    closes: "23:00",
    hoursLabel: "12:00 pm – 11:00 pm, daily",
    facilities: ["Dine-in", "Takeaway", "Delivery", "Family seating"],
    fssai: "11319007001723",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Ramees+Restaurant+Kundanoor+Maradu+Kochi",
  },
];

export type Dish = {
  name: string;
  description: string;
  price?: number;
  meta?: string;
  tags?: string[];
  image: string;
  alt: string;
};

export const SIGNATURES: Dish[] = [
  {
    name: "Mutton Rameesa",
    description:
      "The plate the regulars order before they sit down. Mutton cooked down in our house masala, finished with fried shallots and curry leaves.",
    price: 412,
    tags: ["House signature", "Mutton"],
    image: asset("img/beef.webp"),
    alt: "Dark, slow-cooked mutton masala in a serving pan",
  },
  {
    name: "Alfaham",
    description:
      "Chicken in a yoghurt-and-spice Arabian marinade, smoked over charcoal until the skin blisters. Served with kuboos and garlic toum.",
    meta: "Charcoal grilled · half / full",
    tags: ["Arabian", "Charcoal"],
    image: asset("img/alfaham.webp"),
    alt: "Charcoal-grilled chicken served with flatbread",
  },
  {
    name: "Ramees Special Chilly Chicken",
    description:
      "Our hottest seller. Boneless chicken tossed in a glossy chilli-garlic glaze with capsicum and onion — sharp, sweet and seriously spicy.",
    price: 398,
    tags: ["Indo-Chinese", "Spicy"],
    image: asset("img/chilli-chicken.webp"),
    alt: "Chilli chicken tossed with peppers on a dark slate",
  },
  {
    name: "Mutton Biriyani",
    description:
      "Long-grain rice layered over mutton and sealed for a slow dum. Reviewers call it the reason to drive to Kollam — it goes out until the pot is empty.",
    meta: "Slow dum · served with raita",
    tags: ["Malabar", "Bestseller"],
    image: asset("img/biryani.webp"),
    alt: "A plate of biriyani rice with meat",
  },
  {
    name: "Kozhi Potti Therichathu",
    description:
      "Chicken masala folded into flaky porotta and pressed on the tawa. Order it with a bowl of Ashtamudi kozhi curry on the side.",
    price: 390,
    tags: ["Ramees favourite"],
    image: asset("img/porotta.webp"),
    alt: "Flaky porotta served with curry on a plate",
  },
  {
    name: "Falooda",
    description:
      "Rose syrup, vermicelli, basil seeds and a scoop of ice cream in a tall glass — the way every good Kollam meal ends.",
    meta: "Rose · vermicelli · ice cream",
    tags: ["Dessert"],
    image: asset("img/falooda.webp"),
    alt: "Falooda dessert with ice cream and rose syrup",
  },
];

export type MenuCategory = {
  id: string;
  title: string;
  blurb: string;
  items: { name: string; price?: number; description?: string; tag?: string }[];
};

export const MENU: MenuCategory[] = [
  {
    id: "favourites",
    title: "Ramees Favourites",
    blurb: "The house canon — dishes that built the name in Kollam.",
    items: [
      {
        name: "Mutton Rameesa",
        price: 412,
        description: "Slow-cooked mutton, house masala, fried shallots.",
        tag: "Signature",
      },
      { name: "Idivettu Beef", price: 272, description: "Beef with coconut slivers and curry leaves." },
      {
        name: "Chicken Fry Ramees Special",
        price: 300,
        description: "Crisp outside, juicy inside — our most-ordered fry.",
        tag: "Bestseller",
      },
      { name: "Ashtamudi Kozhi Curry", price: 300, description: "Chicken in a coconut-rich curry, named for the lake." },
      { name: "Jellikettu Kozhi", price: 272, description: "Sticky, pepper-forward chicken. Best with porotta." },
      { name: "Kozhi Potti Therichathu", price: 390, description: "Chicken masala folded into flaky porotta." },
      { name: "Beef Bellari", price: 272, description: "Beef in a dark, roasted Bellary-style masala." },
      { name: "Chicken Ghee Roast", price: 310, description: "Ghee-roasted with red chilli and a little jaggery." },
      { name: "Chicken Kondattam", price: 370, description: "Sun-dried chilli chicken — tangy and hot." },
      { name: "Bombay Tawa Chicken", price: 370 },
      { name: "Ramees Special Chilly Chicken", price: 398 },
      { name: "Kozhi Kurumulaku Ittathu", price: 320, description: "Chicken with cracked black pepper." },
      { name: "Aatin Karalu", price: 314, description: "Mutton liver in pepper masala." },
      { name: "Dindigul Chilly Chicken", price: 384 },
    ],
  },
  {
    id: "arabian",
    title: "Arabian & Tandoor",
    blurb: "Charcoal, smoke and kuboos — the Lebanese side of the kitchen.",
    items: [
      { name: "Alfaham", description: "Charcoal-grilled chicken in Arabian spices.", tag: "House favourite" },
      { name: "Shish Tawook", description: "Yoghurt-marinated chicken skewers, grilled hot." },
      { name: "Arabian Mixed Grill", description: "Grilled chicken, kebab and shish on one platter." },
      { name: "Tandoori Chicken", price: 312, description: "Clay-oven chicken with lemon and onion." },
      { name: "Chicken Tikka", description: "Boneless, red-masala marinade, charred at the edges." },
      { name: "Kuboos & Hummus", description: "Fresh kuboos with olive-oil hummus." },
    ],
  },
  {
    id: "biriyani",
    title: "Biriyani & Rice",
    blurb: "Dum-cooked in batches through the day. When it's gone, it's gone.",
    items: [
      { name: "Mutton Biriyani", description: "The Kollam classic, served with raita.", tag: "Signature" },
      { name: "Chicken Biriyani", description: "Long-grain rice, chicken, fried onion, raita." },
      { name: "Beef Bellari Rice", description: "Beef masala folded through ghee rice." },
      { name: "Chicken Fried Rice", price: 266 },
      { name: "Chicken Noodles", price: 215 },
      { name: "Egg Noodles", price: 185 },
      { name: "Veg Noodles", price: 175 },
      { name: "Chicken Schezwan Noodles", price: 255 },
      { name: "Chicken Hakka Noodles", price: 255 },
      { name: "Mixed Schezwan Noodles", price: 275 },
    ],
  },
  {
    id: "vegetarian",
    title: "Vegetarian",
    blurb: "Paneer, mushroom and garden vegetables, cooked to order.",
    items: [
      { name: "Paneer 65", price: 235 },
      { name: "Mushroom Pepper Fry", price: 292 },
      { name: "Mushroom Chillymanjurian", price: 244 },
      { name: "Paneer Manjurian", price: 258 },
      { name: "Mushroom Butter Masala", price: 272 },
      { name: "Veg Kadai", price: 244 },
      { name: "Mushroom Kolapuri", price: 258 },
      { name: "Veg Kolapuri", price: 244 },
      { name: "Paneer Kolapuri", price: 258 },
    ],
  },
  {
    id: "desserts",
    title: "Desserts, Shakes & Mocktails",
    blurb: "Faloodas, fresh-fruit shakes and house mocktails, all non-alcoholic.",
    items: [
      { name: "Falooda", description: "Rose, vermicelli, basil seeds, ice cream." },
      { name: "Gulab Jamun", description: "Warm, syrup-soaked, two to a plate." },
      { name: "Chocolate Fantasy Ice Cream", price: 137 },
      { name: "Banana Shake", price: 180 },
      { name: "Cold Horlicks Shake", price: 150 },
      { name: "Cool Boost Shake", price: 150 },
      { name: "Muskmelon Shake", price: 150 },
      { name: "Papaya Shake", price: 150 },
      { name: "Pomegranate Shake", price: 163 },
      { name: "Purple Punch Mocktail", price: 100 },
      { name: "Qalb Mocktail", price: 125 },
      { name: "Bombay Sharbat Mocktail", price: 125 },
    ],
  },
];

export const GALLERY = [
  { src: asset("img/alfaham.webp"), caption: "Alfaham off the charcoal", alt: "Charcoal-grilled chicken with flatbread" },
  { src: asset("img/grill-platter.webp"), caption: "The Arabian mixed grill", alt: "A platter of grilled meats and dips" },
  { src: asset("img/shawarma.webp"), caption: "Shawarma, cut and stacked", alt: "Shawarma wrap with fries" },
  { src: asset("img/rotisserie.webp"), caption: "Chickens turning on the spit", alt: "Rows of chickens on a rotisserie" },
  { src: asset("img/biryani.webp"), caption: "Mutton biriyani, dum-sealed", alt: "Biriyani rice with meat" },
  { src: asset("img/porotta.webp"), caption: "Porotta, fresh off the tawa", alt: "Flaky porotta with curry" },
  { src: asset("img/chilli-chicken.webp"), caption: "Chilly chicken, house style", alt: "Chilli chicken with capsicum" },
  { src: asset("img/mocktail.webp"), caption: "Mocktails at the counter", alt: "A red mocktail in a coupe glass" },
  { src: asset("img/gulab-jamun.webp"), caption: "Gulab jamun, warm", alt: "Gulab jamun in syrup" },
  { src: asset("img/interior.webp"), caption: "The dining hall", alt: "Restaurant dining hall with seating" },
  { src: asset("img/lamp.webp"), caption: "Evening light", alt: "A brass-lined pendant lamp" },
  { src: asset("img/falooda.webp"), caption: "Falooda for the table", alt: "Falooda with ice cream" },
];

export const REVIEWS = [
  {
    quote:
      "Tried the chicken biriyani, chicken noodles and chilli chicken. Loved the biriyani and noodles — flavourful and delicious.",
    author: "Sree",
    source: "District dining review",
  },
  {
    quote:
      "Don't miss the mutton biriyani. The food was so delicious — I ordered mutton biriyani, beef chilli and red fried prawns.",
    author: "Alam Buzz",
    source: "District dining review",
  },
  {
    quote:
      "One of the best restaurants in Kollam. A beautiful ambience inside, and the food is very tasty. Chicken Jallikkettu is my favourite.",
    author: "Byju D",
    source: "Tripadvisor review",
  },
];

export const RATING = { score: "4.0", count: "5,600+", platform: "Google reviews" };
