import Header from "./Header";
import Footer from "./Footer";
import SiteFooter from "./SiteFooter";

export default function SiteShell({ children, footer = "full" }) {
  return (
    <>
      <Header />
      <main id="main" className="site-main">
        {children}
      </main>
      {footer === "full" ? <SiteFooter /> : <Footer />}
    </>
  );
}
