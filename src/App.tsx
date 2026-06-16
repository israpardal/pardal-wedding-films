import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

import Footer from "./components/Footer";
import GrainOverlay from "./components/GrainOverlay";
import Header from "./components/Header";
import { useLenis } from "./hooks/useLenis";
import { I18nProvider } from "./i18n/I18nProvider";
import About from "./routes/About";
import Contact from "./routes/Contact";
import FilmDetail from "./routes/FilmDetail";
import Films from "./routes/Films";
import Home from "./routes/Home";
import Investment from "./routes/Investment";
import NotFound from "./routes/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function AppShell() {
  const location = useLocation();
  useLenis();

  return (
    <>
      <ScrollToTop />
      <GrainOverlay />
      <Header />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/filmes" element={<Films />} />
            <Route path="/filmes/:slug" element={<FilmDetail />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/investimento" element={<Investment />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppShell />
    </I18nProvider>
  );
}
