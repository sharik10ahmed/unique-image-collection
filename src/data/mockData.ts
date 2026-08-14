import craftZari from "@/assets/craft-zari.jpg";
import craftLoom from "@/assets/craft-loom.jpg";
import heroImage from "@/assets/hero-paithani.jpg";
import dyeingYarn from "@/assets/craft/dyeing-yarn.jpg";
import boutiqueInterior from "@/assets/craft/boutique-interior.jpg";
import weaverPortrait from "@/assets/craft/weaver-portrait.jpg";
import bridalDetail from "@/assets/craft/bridal-detail.jpg";
import motifDetail from "@/assets/craft/motif-detail.jpg";
import shuttleZari from "@/assets/craft/shuttle-zari.jpg";
import finalInspection from "@/assets/craft/final-inspection.jpg";
import p1Img from "@/assets/products/p1-royal-peacock-purple.jpg";
import p2Img from "@/assets/products/p2-maharani-purple-bridal.jpg";
import p3Img from "@/assets/products/p3-traditional-green.jpg";
import p4Img from "@/assets/products/p4-kadiyal-maroon.jpg";
import p5Img from "@/assets/products/p5-pure-zari-gold.jpg";
import p6Img from "@/assets/products/p6-wedding-heritage-maroon.jpg";
import p7Img from "@/assets/products/p7-rani-pink.jpg";
import p8Img from "@/assets/products/p8-emerald-motif.jpg";
import p9Img from "@/assets/products/p9-marigold-bangdi-mor.jpg";
import p10Img from "@/assets/products/p10-blush-muniya.jpg";
import p11Img from "@/assets/products/p11-wine-asawali.jpg";
import p12Img from "@/assets/products/p12-violet-brocade.jpg";
import c1Img from "@/assets/categories/c1-traditional.jpg";
import c2Img from "@/assets/categories/c2-wedding.jpg";
import c3Img from "@/assets/categories/c3-festive.jpg";
import c4Img from "@/assets/categories/c4-pure-zari.jpg";
import c5Img from "@/assets/categories/c5-peacock.jpg";
import c6Img from "@/assets/categories/c6-handcrafted.jpg";
import c7Img from "@/assets/categories/c7-new-arrivals.jpg";
import c8Img from "@/assets/categories/c8-premium-silk.jpg";

export const images = {
  hero: heroImage,
  zari: craftZari,
  loom: craftLoom,
  dyeing: dyeingYarn,
  boutique: boutiqueInterior,
  weaver: weaverPortrait,
  bridalDetail,
  motifDetail,
  shuttle: shuttleZari,
  inspection: finalInspection,
  catalog: {
    p1: p1Img,
    p2: p2Img,
    p3: p3Img,
    p4: p4Img,
    p5: p5Img,
    p6: p6Img,
    p7: p7Img,
    p8: p8Img,
    p9: p9Img,
    p10: p10Img,
    p11: p11Img,
    p12: p12Img,
    c1: c1Img,
    c2: c2Img,
    c3: c3Img,
    c4: c4Img,
    c5: c5Img,
    c6: c6Img,
    c7: c7Img,
    c8: c8Img,
  },
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number | undefined;
  images: string[];
  category: string;
  collections: string[];
  tags: string[];
  fabric: string;
  weaving: string;
  work: string;
  zari: string;
  motif: string;
  occasion: string;
  color: string;
  stock: number;
  status: "Active" | "Draft";
  featured: boolean;
  bestSeller: boolean;
  newArrival: boolean;
  rating: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  enabled: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  message: string;
  rating: number;
};

export type Faq = { id: string; question: string; answer: string };

export type Order = {
  id: string;
  customer: string;
  email: string;
  products: string;
  amount: number;
  date: string;
  payment: "Paid" | "Pending" | "Refunded";
  status: "Pending" | "Confirmed" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  orders: number;
  spent: number;
  lastOrder: string;
  status: "Active" | "Inactive";
};

export const business = {
  name: "Rituraj Paithani",
  owner: "Swapnali Patil",
  tagline: "Authentic Handloom Paithani Sarees",
  phone: "8806091907",
  email: "support@riturajpaithani.com",
  address:
    "Samruddhi Market, Sangarsh Chowk, Kharadi Rd, Ashtavinayak Nagar, Eknath Pathare Vasti, Wadgaon Sheri, Pune, Maharashtra 411014",
  storeOpen: true,
};

export const categories: Category[] = [
  {
    id: "c1",
    name: "Traditional Paithani",
    slug: "traditional-paithani",
    description: "Classic handwoven Paithani sarees with timeless Maharashtrian motifs.",
    image: c1Img,
    enabled: true,
  },
  {
    id: "c2",
    name: "Wedding Paithani",
    slug: "wedding-paithani",
    description: "Heavy zari bridal Paithani woven for the most important day.",
    image: c2Img,
    enabled: true,
  },
  {
    id: "c3",
    name: "Festive Collection",
    slug: "festive-collection",
    description: "Luminous silks for Diwali, Gudi Padwa and family celebrations.",
    image: c3Img,
    enabled: true,
  },
  {
    id: "c4",
    name: "Pure Zari Paithani",
    slug: "pure-zari-paithani",
    description: "Traditional zari woven thread by thread into every border.",
    image: c4Img,
    enabled: true,
  },
  {
    id: "c5",
    name: "Peacock Motif Paithani",
    slug: "peacock-motif-paithani",
    description: "The iconic Paithani peacock, rendered in glowing zari.",
    image: c5Img,
    enabled: true,
  },
  {
    id: "c6",
    name: "Handcrafted Collection",
    slug: "handcrafted-collection",
    description: "Sarees shaped entirely by artisan hands on the handloom.",
    image: c6Img,
    enabled: true,
  },
  {
    id: "c7",
    name: "New Arrivals",
    slug: "new-arrivals",
    description: "The newest weaves to reach our Pune boutique.",
    image: c7Img,
    enabled: true,
  },
  {
    id: "c8",
    name: "Premium Silk Sarees",
    slug: "premium-silk-sarees",
    description: "Lustrous pure silk with refined handwoven detailing.",
    image: c8Img,
    enabled: true,
  },
];

const p = (
  id: string,
  name: string,
  price: number,
  originalPrice: number | undefined,
  img: string,
  category: string,
  extra: Partial<Product>,
): Product => ({
  id,
  name,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  shortDescription: "Handwoven pure silk Paithani with traditional zari borders.",
  description:
    "A pure silk Paithani woven by hand on a traditional Maharashtrian handloom. The pallu carries classic motifs rendered in traditional zari, while the border is built thread by thread over weeks of patient work by our artisan weavers. Every piece is unique, with the gentle irregularities that only genuine handloom weaving can give.",
  price,
  originalPrice,
  images: [img],
  category,
  collections: [],
  tags: [],
  fabric: "Premium Silk",
  weaving: "Handloom",
  work: "Handmade",
  zari: "Traditional Zari",
  motif: "Peacock / Traditional Maharashtrian Motifs",
  occasion: "Wedding / Festive / Traditional",
  color: "Purple",
  stock: 8,
  status: "Active",
  featured: true,
  bestSeller: false,
  newArrival: false,
  rating: 5,
  ...extra,
});

export const products: Product[] = [
  p("p1", "Royal Peacock Paithani", 24500, 29900, p1Img, "peacock-motif-paithani", {
    shortDescription: "Deep royal purple silk with a full peacock zari pallu.",
    collections: ["wedding", "festive", "bridal", "heavy-zari", "peacock", "premium-silk"],
    color: "Royal Purple",
    bestSeller: true,
    stock: 6,
  }),
  p("p2", "Maharani Purple Paithani", 32900, 38500, p2Img, "wedding-paithani", {
    shortDescription: "A bridal weave with heavy antique zari and a grand pallu.",
    collections: ["wedding", "bridal", "heavy-zari", "premium-silk"],
    color: "Royal Purple",
    occasion: "Wedding / Bridal",
    stock: 3,
    bestSeller: true,
  }),
  p("p3", "Traditional Green Paithani", 18900, 22400, p3Img, "traditional-paithani", {
    shortDescription: "Peacock green silk with a classic narali border.",
    collections: ["festive", "traditional", "peacock"],
    color: "Peacock Green",
    stock: 11,
  }),
  p("p4", "Kadiyal Silk Paithani", 27500, undefined, p4Img, "premium-silk-sarees", {
    shortDescription: "Kadiyal woven body and border in contrast pure silk.",
    collections: ["wedding", "traditional", "premium-silk"],
    color: "Deep Maroon",
    stock: 4,
  }),
  p("p5", "Pure Zari Peacock Paithani", 34900, 41000, p5Img, "pure-zari-paithani", {
    shortDescription: "Golden silk with dense pure zari peacock weaving.",
    collections: ["wedding", "festive", "heavy-zari", "peacock", "premium-silk"],
    color: "Antique Gold",
    stock: 2,
    bestSeller: true,
  }),
  p("p6", "Wedding Heritage Paithani", 45900, 52000, p6Img, "wedding-paithani", {
    shortDescription: "Our heirloom bridal weave, nine months on the loom.",
    collections: ["wedding", "bridal", "heavy-zari", "premium-silk"],
    color: "Deep Maroon",
    occasion: "Wedding / Bridal",
    stock: 1,
  }),
  p("p7", "Rani Pink Handloom Paithani", 21500, 25900, p7Img, "handcrafted-collection", {
    shortDescription: "Rani pink silk with a luminous handwoven gold border.",
    collections: ["festive", "traditional", "wedding-guest"],
    color: "Rani Pink",
    newArrival: true,
    stock: 9,
  }),
  p("p8", "Traditional Motif Paithani", 19900, undefined, p8Img, "traditional-paithani", {
    shortDescription: "Vine, lotus and bangdi mor motifs across the pallu.",
    collections: ["festive", "traditional", "wedding-guest"],
    color: "Emerald Green",
    newArrival: true,
    stock: 7,
  }),
  p("p9", "Bangdi Mor Festive Paithani", 23400, 27800, p9Img, "festive-collection", {
    shortDescription: "Festive gold silk with the classic bangdi mor pallu.",
    collections: ["festive", "diwali", "peacock"],
    color: "Marigold",
    newArrival: true,
    featured: false,
    stock: 12,
  }),
  p("p10", "Muniya Border Paithani", 16900, 19900, p10Img, "traditional-paithani", {
    shortDescription: "Delicate muniya parrot border on soft pink silk.",
    collections: ["festive", "traditional", "wedding-guest"],
    color: "Blush Pink",
    featured: false,
    stock: 0,
    newArrival: true,
  }),
  p("p11", "Asawali Vine Paithani", 28900, 33500, p11Img, "pure-zari-paithani", {
    shortDescription: "Flowering asawali vines woven in traditional zari.",
    collections: ["wedding", "festive", "heavy-zari", "premium-silk"],
    color: "Wine Purple",
    featured: false,
    stock: 5,
  }),
  p("p12", "Brocade Zari Festive Paithani", 20900, undefined, p12Img, "festive-collection", {
    shortDescription: "Brocade body with fine zari buttis throughout.",
    collections: ["festive", "diwali", "traditional"],
    color: "Violet",
    featured: false,
    stock: 10,
  }),
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Anuja Deshpande",
    location: "Pune",
    message:
      "Beautiful craftsmanship and stunning Paithani collection. The saree looked even more beautiful in person.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Snehal Kulkarni",
    location: "Nashik",
    message: "Absolutely loved the traditional motifs and zari work. Truly handwoven quality.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Madhuri Jadhav",
    location: "Mumbai",
    message:
      "Perfect saree for a Maharashtrian wedding. The pallu received compliments all evening.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Prajakta Shinde",
    location: "Kolhapur",
    message:
      "Swapnali tai personally guided me through the collection. A very warm boutique experience.",
    rating: 5,
  },
];

export const faqs: Faq[] = [
  {
    id: "f1",
    question: "What is a Paithani saree?",
    answer:
      "A Paithani is a handwoven silk saree from Paithan in Maharashtra, known for its pure zari borders, square-patterned pallu and traditional motifs such as the peacock, lotus and vine.",
  },
  {
    id: "f2",
    question: "Are the sarees handloom?",
    answer:
      "Yes. Our Paithani sarees are woven on traditional handlooms by artisan weavers. Each piece can take weeks to months to complete depending on the density of the zari work.",
  },
  {
    id: "f3",
    question: "What type of zari is used?",
    answer:
      "We use traditional zari for the borders and pallu. Zari details for each saree are listed under the Craftsmanship Details section on the product page.",
  },
  {
    id: "f4",
    question: "How should I care for a Paithani saree?",
    answer:
      "Dry clean only. Store the saree wrapped in a cotton or muslin cloth, refold it every few months, and keep it away from direct sunlight and moisture.",
  },
  {
    id: "f5",
    question: "Are Paithani sarees suitable for weddings?",
    answer:
      "Absolutely. Paithani is the traditional choice for Maharashtrian weddings, and our Wedding Collection features heavier zari weaves made for bridal occasions.",
  },
  {
    id: "f6",
    question: "How can I place an order?",
    answer:
      "Add your favourite saree to the cart and complete the checkout form, or call us on 8806091907 for personal assistance from our boutique in Wadgaon Sheri, Pune.",
  },
  {
    id: "f7",
    question: "What is the delivery process?",
    answer:
      "Every saree is inspected, wrapped in protective muslin and dispatched within 2-3 working days. Delivery usually takes 4-7 working days across India.",
  },
  {
    id: "f8",
    question: "Can I contact Rituraj Paithani for product assistance?",
    answer:
      "Yes, our team is happy to help with motifs, colours, occasions and gifting. Call 8806091907 or write to support@riturajpaithani.com.",
  },
];

export const orders: Order[] = [
  {
    id: "RP-1042",
    customer: "Anuja Deshpande",
    email: "anuja@example.com",
    products: "Royal Peacock Paithani",
    amount: 24500,
    date: "2026-08-12",
    payment: "Paid",
    status: "Delivered",
  },
  {
    id: "RP-1043",
    customer: "Snehal Kulkarni",
    email: "snehal@example.com",
    products: "Pure Zari Peacock Paithani",
    amount: 34900,
    date: "2026-08-12",
    payment: "Paid",
    status: "Shipped",
  },
  {
    id: "RP-1044",
    customer: "Madhuri Jadhav",
    email: "madhuri@example.com",
    products: "Wedding Heritage Paithani",
    amount: 45900,
    date: "2026-08-13",
    payment: "Pending",
    status: "Confirmed",
  },
  {
    id: "RP-1045",
    customer: "Prajakta Shinde",
    email: "prajakta@example.com",
    products: "Rani Pink Handloom Paithani, Muniya Border Paithani",
    amount: 38400,
    date: "2026-08-13",
    payment: "Paid",
    status: "Processing",
  },
  {
    id: "RP-1046",
    customer: "Vaishnavi Patil",
    email: "vaishnavi@example.com",
    products: "Traditional Green Paithani",
    amount: 18900,
    date: "2026-08-14",
    payment: "Pending",
    status: "Pending",
  },
  {
    id: "RP-1047",
    customer: "Ketaki Joshi",
    email: "ketaki@example.com",
    products: "Kadiyal Silk Paithani",
    amount: 27500,
    date: "2026-08-14",
    payment: "Refunded",
    status: "Cancelled",
  },
];

export const customers: Customer[] = [
  {
    id: "u1",
    name: "Anuja Deshpande",
    phone: "9822011223",
    email: "anuja@example.com",
    orders: 4,
    spent: 96500,
    lastOrder: "2026-08-12",
    status: "Active",
  },
  {
    id: "u2",
    name: "Snehal Kulkarni",
    phone: "9730044556",
    email: "snehal@example.com",
    orders: 2,
    spent: 58300,
    lastOrder: "2026-08-12",
    status: "Active",
  },
  {
    id: "u3",
    name: "Madhuri Jadhav",
    phone: "9860077889",
    email: "madhuri@example.com",
    orders: 1,
    spent: 45900,
    lastOrder: "2026-08-13",
    status: "Active",
  },
  {
    id: "u4",
    name: "Prajakta Shinde",
    phone: "9921033445",
    email: "prajakta@example.com",
    orders: 3,
    spent: 74200,
    lastOrder: "2026-08-13",
    status: "Active",
  },
  {
    id: "u5",
    name: "Vaishnavi Patil",
    phone: "9028055667",
    email: "vaishnavi@example.com",
    orders: 1,
    spent: 18900,
    lastOrder: "2026-08-14",
    status: "Inactive",
  },
];

export const siteContent = {
  hero: {
    heading: "The Art of Authentic Paithani",
    description:
      "Handcrafted Paithani Sarees woven with tradition, artistry and timeless Maharashtrian heritage.",
    eyebrow: "Handloom Since Generations · Pune, Maharashtra",
    primaryCta: "Shop Paithani Sarees",
    secondaryCta: "Explore Our Collection",
    image: images.hero,
  },
  promo: {
    heading: "Tradition Woven Into Every Thread",
    text: "Personal saree consultation available at our Wadgaon Sheri boutique. Call 8806091907 to book a visit.",
  },
  why: [
    {
      id: "w1",
      title: "Authentic Paithani Collection",
      text: "Every saree is sourced from trusted handloom weavers of Maharashtra.",
    },
    {
      id: "w2",
      title: "Handcrafted Work",
      text: "Handmade weaving, no machine shortcuts, no printed imitations.",
    },
    {
      id: "w3",
      title: "Traditional Maharashtrian Designs",
      text: "Bangdi mor, muniya, asawali and narali borders in their classic form.",
    },
    {
      id: "w4",
      title: "Premium Silk Textiles",
      text: "Lustrous pure silk chosen yarn by yarn for drape and longevity.",
    },
    {
      id: "w5",
      title: "Intricate Zari Weaving",
      text: "Traditional zari worked into borders and pallu over weeks of labour.",
    },
    {
      id: "w6",
      title: "Carefully Selected Collections",
      text: "A curated boutique edit rather than an endless generic catalogue.",
    },
    {
      id: "w7",
      title: "Wedding & Festive Specialities",
      text: "Bridal weaves and festive silks for every Maharashtrian celebration.",
    },
    {
      id: "w8",
      title: "Boutique Shopping Experience",
      text: "Personal guidance from Swapnali Patil and our Pune boutique team.",
    },
  ],
  about: {
    heading: "Preserving the Art of Paithani",
    intro:
      "Rituraj Paithani began with a simple belief: a Paithani saree is not merely clothing, it is Maharashtra's textile heritage carried forward on a wooden loom.",
    body: "Founded by Swapnali Patil in Pune, our boutique works directly with artisan weaving families who have shaped Paithani for generations. Every saree in our collection is handwoven from premium silk, with pure zari borders and traditional motifs placed thread by thread. We do not sell printed or power-loom imitations. What you receive is genuine handloom work with the quiet imperfections that prove a human hand made it. From bridal Paithani woven over many months to festive silks for Diwali and Gudi Padwa, each piece is chosen for craftsmanship first.",
  },
  craftJourney: [
    {
      id: "j1",
      title: "Selecting Premium Silk",
      text: "Pure mulberry silk yarn is chosen for lustre, strength and drape before a single thread is dyed.",
    },
    {
      id: "j2",
      title: "Preparing the Yarn",
      text: "Yarn is dyed in traditional shades, dried and wound with care to hold colour for decades.",
    },
    {
      id: "j3",
      title: "Traditional Handloom Weaving",
      text: "The warp is set on a wooden handloom and the weaver begins the slow rhythm of the Paithani weave.",
    },
    {
      id: "j4",
      title: "Creating Zari Borders",
      text: "Traditional zari is interlocked into the border by hand, one of the most demanding stages of the craft.",
    },
    {
      id: "j5",
      title: "Creating Traditional Motifs",
      text: "Peacocks, lotuses and vines are built by hand using the tapestry technique, without any mechanical patterning.",
    },
    {
      id: "j6",
      title: "Detailed Finishing",
      text: "Loose threads are secured, the pallu is finished and the saree is pressed by hand.",
    },
    {
      id: "j7",
      title: "Final Quality Inspection",
      text: "Each saree is inspected for weave density, zari finish and motif symmetry before it enters our collection.",
    },
  ],
  footer: {
    description:
      "A boutique dedicated to authentic handloom Paithani sarees — pure zari, traditional motifs and Maharashtrian craftsmanship, from our family to yours.",
    copyright: "© 2026 Rituraj Paithani. All Rights Reserved.",
  },
};

export const adminCredentials = {
  email: "admin@riturajpaithani.com",
  password: "admin123",
};

export const formatINR = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });

export const discountPercent = (price: number, original?: number) =>
  original && original > price ? Math.round(((original - price) / original) * 100) : 0;
