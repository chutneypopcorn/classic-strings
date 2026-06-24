import { getDb } from "../api/queries/connection";
import { galleryItems } from "./schema";

async function seed() {
  const db = getDb();

  // Seed gallery items
  const items = [
    {
      title: "Garden Ceremony",
      description: "An enchanting outdoor ceremony under ancient oak trees with string lights.",
      mediaUrl: "/images/ceremony-1.jpg",
      mediaType: "image" as const,
      category: "ceremony" as const,
      featured: true,
    },
    {
      title: "Ring Exchange",
      description: "The most intimate moment, accompanied by our string quartet.",
      mediaUrl: "/images/ceremony-2.jpg",
      mediaType: "image" as const,
      category: "ceremony" as const,
      featured: true,
    },
    {
      title: "First Dance",
      description: "A romantic first dance with live string accompaniment.",
      mediaUrl: "/images/ceremony-3.jpg",
      mediaType: "image" as const,
      category: "reception" as const,
      featured: true,
    },
    {
      title: "Rooftop Proposal",
      description: "A candlelit rooftop proposal with city skyline views.",
      mediaUrl: "/images/card-proposal.jpg",
      mediaType: "image" as const,
      category: "proposal" as const,
      featured: false,
    },
    {
      title: "Garden Reception",
      description: "An elegant garden reception with farm tables and floral arrangements.",
      mediaUrl: "/images/card-wedding.jpg",
      mediaType: "image" as const,
      category: "reception" as const,
      featured: false,
    },
    {
      title: "Corporate Gala",
      description: "Sophisticated background music for a corporate gala event.",
      mediaUrl: "/images/card-corporate.jpg",
      mediaType: "image" as const,
      category: "corporate" as const,
      featured: false,
    },
    {
      title: "Walking Down the Aisle",
      description: "A breathtaking moment as the bride enters the historic venue.",
      mediaUrl: "/images/gallery-1.jpg",
      mediaType: "image" as const,
      category: "ceremony" as const,
      featured: true,
    },
    {
      title: "Quartet in the Garden",
      description: "Our string ensemble performing in a lush garden setting.",
      mediaUrl: "/images/gallery-2.jpg",
      mediaType: "image" as const,
      category: "ceremony" as const,
      featured: true,
    },
    {
      title: "Beach Wedding",
      description: "A stunning sunset beach ceremony with ocean views.",
      mediaUrl: "/images/gallery-3.jpg",
      mediaType: "image" as const,
      category: "ceremony" as const,
      featured: false,
    },
    {
      title: "The Violinist",
      description: "Close-up of our lead violinist performing with passion.",
      mediaUrl: "/images/gallery-4.jpg",
      mediaType: "image" as const,
      category: "behind-scenes" as const,
      featured: false,
    },
    {
      title: "Reception Toast",
      description: "A joyful toast moment during an elegant ballroom reception.",
      mediaUrl: "/images/gallery-5.jpg",
      mediaType: "image" as const,
      category: "reception" as const,
      featured: true,
    },
    {
      title: "Grand Ballroom",
      description: "A luxury ballroom ceremony with crystal chandeliers.",
      mediaUrl: "/images/gallery-6.jpg",
      mediaType: "image" as const,
      category: "ceremony" as const,
      featured: false,
    },
  ];

  for (const item of items) {
    await db.insert(galleryItems).values(item);
  }

  console.log("Seeded gallery items successfully!");
}

seed().catch(console.error);
