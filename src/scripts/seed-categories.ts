import { db } from "@/db";
import { categories } from "@/db/schema";

const categorySeed = [
  {
    name: "Music",
    description:
      "Official music videos, performances, covers, and audio tracks from various genres.",
  },
  {
    name: "Gaming",
    description:
      "Gameplay, walkthroughs, livestreams, and esports content from all gaming platforms.",
  },
  {
    name: "Education",
    description:
      "Tutorials, lectures, how-to videos, and other educational resources.",
  },
  {
    name: "Vlogs",
    description:
      "Personal video blogs, daily routines, and behind-the-scenes insights.",
  },
  {
    name: "News",
    description:
      "Breaking news, political commentary, journalism, and interviews.",
  },
  {
    name: "Tech",
    description:
      "Technology reviews, gadget unboxings, software tutorials, and coding content.",
  },
  {
    name: "Entertainment",
    description: "Sketches, talk shows, web series, and celebrity content.",
  },
  {
    name: "Film & Animation",
    description: "Short films, trailers, animations, and storytelling videos.",
  },
  {
    name: "Sports",
    description:
      "Highlights, match analysis, sports news, and fitness routines.",
  },
  {
    name: "Lifestyle",
    description: "Fashion, beauty, health, wellness, and minimalist living.",
  },
  {
    name: "Food & Cooking",
    description:
      "Recipes, cooking tutorials, food vlogs, and restaurant reviews.",
  },
  {
    name: "Science & Nature",
    description:
      "Scientific explorations, space documentaries, and nature videos.",
  },
  {
    name: "Travel",
    description:
      "Travel vlogs, destination guides, and cultural experiences around the world.",
  },
  {
    name: "Comedy",
    description: "Stand-up, pranks, parody videos, and humorous shorts.",
  },
  {
    name: "Documentary",
    description:
      "In-depth video journalism, life stories, and real-life events.",
  },
];

async function main() {
  console.log("Seeding categories...");

  try {
    const values = categorySeed.map((category) => ({
      name: category.name,
      description: category.description,
    }));

    await db.insert(categories).values(values);
    console.log("Categories seeded successfully!!");
  } catch (error) {
    console.error("Error seeding categories: ", error);
    process.exit(1);
  }
}

main();
