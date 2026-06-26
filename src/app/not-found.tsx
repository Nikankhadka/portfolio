import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center gap-6 px-5 py-16 sm:px-6 lg:px-8"
    >
      <p className="section-kicker">404</p>
      <h1 className="section-heading">That page doesn&apos;t exist here.</h1>
      <p className="max-w-2xl text-base leading-7 text-[color:var(--copy)]">
        The route you tried isn&apos;t part of the portfolio. Head back and continue exploring.
      </p>
      <Link href="/#projects" className="btn btn-secondary">
        Return to Projects
      </Link>
    </main>
  );
}