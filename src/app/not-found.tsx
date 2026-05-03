import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center gap-6 px-4 py-16 sm:px-6 lg:px-8"
    >
      <p className="section-kicker">404</p>
      <h1 className="section-heading">That route is outside the operating system.</h1>
      <p className="max-w-2xl text-base leading-8 text-[color:var(--copy)]">
        The page you tried to open is not part of the current portfolio build. Head back to the project index and continue exploring from there.
      </p>
      <Link href="/#projects" className="secondary-cta inline-flex">
        Return to Projects
      </Link>
    </main>
  );
}
