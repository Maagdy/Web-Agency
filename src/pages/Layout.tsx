import { Outlet } from "react-router-dom";

import Header from "../components/RootElements/Header";
import AutoScroll from "../components/UI/AutoScroll";
import Footer from "../components/RootElements/Footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="h-full">
        <Outlet />
        <AutoScroll />
      </main>
      <Footer />
    </div>
  );
}
