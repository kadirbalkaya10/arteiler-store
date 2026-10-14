"use server";

import { revalidatePath } from "next/cache";
import { setProductStock } from "@/lib/products";
import { requireAdmin } from "@/lib/session";

const MAX_STOCK = 10_000;

export async function updateStock(formData: FormData) {
  // Server Actions are public endpoints: check the role here, not just on the page
  await requireAdmin();

  const slug = formData.get("slug");
  const stock = Number(formData.get("stock"));
  if (typeof slug !== "string" || !Number.isInteger(stock) || stock < 0 || stock > MAX_STOCK) {
    return;
  }

  await setProductStock(slug, stock);
  revalidatePath("/admin");
  revalidatePath(`/products/${slug}`);
}
