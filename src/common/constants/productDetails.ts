import type { FAQ } from "./constants.types";

export const faqs: FAQ[] = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards, PayPal, and bank transfers for your convenience.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to many countries. Please check our shipping information page for details on available destinations and shipping rates.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your package's delivery status on our website or through the courier's tracking portal.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a hassle-free return policy. If you're not satisfied with your purchase for any reason, you can return it within 30 days for a full refund or exchange. Please refer to our returns page for detailed instructions.",
  },
  {
    question: "Are your products covered by a warranty?",
    answer:
      "Yes, most of our products come with a manufacturer's warranty against defects in materials and workmanship. The duration and terms of the warranty vary by product, so please check the product details for specific warranty information.",
  },
];

export const deliveryInfo = [
  {
    title: "Free shipping on all orders over $100",
  },
  {
    title: "14 days easy refund & returns",
  },
  {
    title: "Product taxes and customs duties included",
  },
];

export const shippingInfo = [
  {
    text: "Free destination delivery above $100",
  },
  {
    text: "Europe 1 – 3 days Free",
  },
  {
    text: "United States 4 – 6 days Free",
  },
  {
    text: "Asia 3 – 6 days Free",
  },
  {
    text: "Africa 5 – 7 days Free",
  },
  {
    text: "Australia 4 – 6 days Free",
  },
];

export const sizeGuide = [
  { size: "XS", usa: "28–30", europe: "27–29", others: "34–36" },
  { size: "S", usa: "30–32", europe: "29–31", others: "36–38" },
  { size: "M", usa: "32–33", europe: "31–33", others: "38–40" },
  { size: "L", usa: "33–34", europe: "33–36", others: "40–44" },
  { size: "XL", usa: "34–38", europe: "36–40", others: "44–48" },
  { size: "XXL", usa: "38–48", europe: "40–44", others: "48–50" },
];
