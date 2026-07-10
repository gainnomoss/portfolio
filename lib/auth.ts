import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function envVarForSlug(slug: string): string {
  return `PASSWORD_${slug.toUpperCase().replace(/[^A-Z0-9]+/g, "_")}`;
}

function cookieNameForSlug(slug: string): string {
  return `unlock_${slug.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
}

export async function isProjectUnlocked(slug: string): Promise<boolean> {
  const store = await cookies();
  return store.get(cookieNameForSlug(slug))?.value === "1";
}

export async function unlockProjectAction(slug: string, formData: FormData): Promise<void> {
  "use server";

  const submitted = formData.get("password");
  const expected = process.env[envVarForSlug(slug)];

  if (typeof submitted === "string" && expected && submitted === expected) {
    const store = await cookies();
    store.set(cookieNameForSlug(slug), "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    redirect(`/work/${slug}`);
  }

  redirect(`/work/${slug}?error=1`);
}
