import { theme } from "@/Theme";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Stack, Box } from "@mui/material";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FRIO blog",
  description: "Test blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ height: "100%", margin: 0 }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Stack direction={"column"} minHeight={"100vh"} width={"100%"} sx={{ backgroundColor: "background.default" }}>
              <Header />
              <Box component="main" sx={{ flexGrow: 1, padding: 2, minHeight: "100%", width: "100%", boxSizing: "border-box", display: "flex", flexWrap: "nowrap", backgroundColor: "transparent" }}>
                <Box maxWidth={"lg"} margin={"auto"} width={"100%"}>
                  {children}
                </Box>
              </Box>
              <Footer />
            </Stack>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
