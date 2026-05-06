import { Link } from "react-router-dom";
import img404 from "@/assets/404.png";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <img src={img404} alt="404 Not Found" className="mx-auto w-48 md:w-52" />
        <h2 className="mt-4 font-display text-gray-700 text-2xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-gray-900">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
