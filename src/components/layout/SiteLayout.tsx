import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import PageLoading from "./PageLoading";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scroll(0, 0);
    setTimeout(() => setLoading(false), 200);
  }, []);
  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
