import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center px-6 py-24 text-center">
      <p className="label text-faint">404</p>
      <h1 className="display mt-4 max-w-xl text-[clamp(2rem,8vw,3.4rem)]">
        This page doesn&apos;t exist.
      </h1>
      <p className="copy mt-4 max-w-md">
        The page may have moved, or the link is incorrect.
      </p>
      <Link href="/" className="btn btn-hero mt-8">
        Back to home
      </Link>
    </main>
  );
}
