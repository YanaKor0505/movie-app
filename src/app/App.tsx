import { Footer, Navbar } from "@/widgets";
import { AppRouter } from "./providers";
import "./styles/index.scss";

export function App() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="app">
      {/* <button onClick={toggleTheme}>TOGGLE</button> */}
      <Navbar />
      <AppRouter />
      <Footer />
    </div>
  );
}
