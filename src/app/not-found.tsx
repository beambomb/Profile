import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex max-w-3xl flex-col items-start gap-4 px-6 py-24">
      <p aria-hidden="true" className="font-pixel text-xs uppercase tracking-widest text-danger">
        Game over
      </p>
      <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
      <p className="text-lg text-muted">The page you are looking for does not exist or has moved.</p>
      <Button href="/" variant="primary">
        Back to home
      </Button>
    </main>
  );
}
