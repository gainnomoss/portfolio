import { Button } from "@/components/ui/button";

export function PasswordGate({
  action,
  error,
  title = "This case study is password protected",
}: {
  action: (formData: FormData) => void | Promise<void>;
  error?: boolean;
  title?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-6 py-24">
      <div className="rounded-lg bg-canvas-subtle p-10">
        <h1 className="text-title-lg text-ink">{title}</h1>
        <p className="mt-2 text-body-sm text-muted">
          Enter the password to view this project. It stays unlocked for the rest of your browser session.
        </p>
        <form action={action} className="mt-6 flex flex-col gap-3">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="off"
            className="rounded-sm border border-border-strong bg-canvas px-4 py-3 text-body-md text-ink outline-none transition-colors duration-fast focus-visible:ring-2 focus-visible:ring-accent"
          />
          {error ? (
            <p role="alert" className="text-body-sm text-danger">
              That password isn&apos;t right — try again.
            </p>
          ) : null}
          <Button type="submit" className="mt-1">
            Unlock
          </Button>
        </form>
      </div>
    </div>
  );
}
