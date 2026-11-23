import { Footer, Navbar } from "@/widgets";
import { AppRouter, useTheme } from "./providers";
import "./styles/index.scss";

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      {/* <button onClick={toggleTheme}>TOGGLE</button> */}
      <Navbar />
      <AppRouter />
      <Footer />
    </div>
  );
}
