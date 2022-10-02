import { AppShell, MantineProvider } from "@mantine/core";
import { Route, Routes } from "react-router-dom";

import FooterSimple from "./components/common/Footer";
import NavbarMinimal from "./components/common/Navbar";
import AuthGuard from "./guards/AuthGuard";
import useAnalytics from "./hooks/useAnalytics";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import PrivacyPage from "./pages/PrivacyPage";
import ProfilePage from "./pages/ProfilePage";
import RetroHomePage from "./pages/RetroHomePage";
import RetroPage from "./pages/RetroPage";
import ScrumPokerHomePage from "./pages/ScrumPokerHomePage";
import ScrumPokerPage from "./pages/ScrumPokerPage";
import TermsPage from "./pages/TermsPage";

function App() {
  useAnalytics();
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
          footer={
            <FooterSimple
              links={[
                { link: "/privacy", label: "Privacy" },
                { link: "/terms", label: "Terms of Service" },
              ]}
            />
          }
        >
          {/* Your application here */}

          <Routes>
            <Route
              path="/scrum-poker"
              element={
                <AuthGuard>
                  <ScrumPokerHomePage />
                </AuthGuard>
              }
            />
            <Route
              path="/scrum-poker/:sessionID"
              element={
                <AuthGuard>
                  <ScrumPokerPage />
                </AuthGuard>
              }
            />
            <Route
              path="/retro"
              element={
                <AuthGuard>
                  <RetroHomePage />
                </AuthGuard>
              }
            />
            <Route
              path="/retro/:sessionID"
              element={
                <AuthGuard>
                  <RetroPage />
                </AuthGuard>
              }
            />

            <Route
              path="/p/:userID"
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </AppShell>
      </MantineProvider>
    </>
  );
}

export default App;
