import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    console.error("CLERK_SIGNING_SECRET is missing");
    throw new Error("Please add CLERK_SIGNING_SECRET");
  }
  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.log("Missing SVIX");
    console.log({ svix_id, svix_timestamp, svix_signature });
    return new Response("Error: Missing Svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Verification Failed");
    console.error("Headers:", {
      svix_id,
      svix_timestamp,
      svix_signature,
    });
    console.error("Raw body:", body);
    console.error("Error message:", error);
    return new Response("Error: Verification Error", { status: 400 });
  }

  const eventType = evt.type;

  if (eventType === "user.created") {
    const { data } = evt;

    if (!data.id) {
      console.warn("Webhook event missing user ID");
      return new Response("Invalid data", { status: 400 });
    }

    const name =
      [data.first_name, data.last_name].filter(Boolean).join(" ") ||
      "Anonymous";
    const imageUrl = data.image_url || "https://example.com/default-avatar.png";

    await db.insert(users).values({
      clerkId: data.id,
      name: name,
      imageUrl: imageUrl,
    });
  }

  if (eventType === "user.deleted") {
    const { data } = evt;

    if (!data.id) {
      console.warn("Webhook event missing user ID");
      return new Response("Invalid data", { status: 400 });
    }

    await db.delete(users).where(eq(users.clerkId, data.id));
  }

  if (eventType === "user.updated") {
    const { data } = evt;

    if (!data.id) {
      console.warn("Webhook event missing user ID");
      return new Response("Invalid data", { status: 400 });
    }

    const name =
      [data.first_name, data.last_name].filter(Boolean).join(" ") ||
      "Anonymous";
    const imageUrl = data.image_url || "https://example.com/default-avatar.png";

    await db
      .update(users)
      .set({
        name: name,
        imageUrl: imageUrl,
      })
      .where(eq(users.clerkId, data.id));
  }

  return new Response("Webhook received", { status: 200 });
}
