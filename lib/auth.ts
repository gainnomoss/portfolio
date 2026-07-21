import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const UNLOCK_COOKIE = "unlock_projects";

export async function isProjectUnlocked(): Promise<boolean> {
  const store = await cookies();
  return store.get(UNLOCK_COOKIE)?.value === "1";
}

export async function unlockProjectAction(slug: string, formData: FormData): Promise<void> {
  "use server";

  const submitted = formData.get("password");
  const expected = process.env.PASSWORD_PROJECTS;

  if (typeof submitted === "string" && expected && submitted === expected) {
    const store = await cookies();
    store.set(UNLOCK_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    redirect(`/work/${slug}`);
  }

  redirect(`/work/${slug}?error=1`);
}
