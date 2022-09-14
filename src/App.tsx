import { AppShell, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

import FooterSimple from "./components/common/Footer";
import NavbarMinimal from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RetroPage from "./pages/RetroPage";
import ScrumPokerHomePage from "./pages/ScrumPokerHomePage";
import ScrumPokerPage from "./pages/ScrumPokerPage";

function App() {
  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "dark",
          colors: {
            brand: [
              "#F0BBDD",
              "#ED9BCF",
              "#EC7CC3",
              "#ED5DB8",
              "#F13EAF",
              "#F71FA7",
              "#FF00A1",
              "#E00890",
              "#C50E82",
              "#AD1374",
            ],
            yellow: [
              "#fffde7",
              "#fff9c4",
              "#fff59d",
              "#fff176",
              "#ffee58",
              "#ffeb3b",
              "#fdd835",
              "#fbc02d",
              "#f9a825",
              "#f57f17",
            ],
          },
          primaryColor: "yellow",
        }}
      >
        <AppShell
          padding="md"
          navbar={<NavbarMinimal />}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
            },
          })}
          footer={<FooterSimple links={[{ link: "/", label: "Home" }]} />}
        >
          {/* Your application here */}

          <Routes>
            <Route path="/scrum-poker" element={<ScrumPokerHomePage />} />

            <Route path="/scrum-poker/:sessionID" element={<ScrumPokerPage />} />

            <Route path="/retro" element={<RetroPage />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
