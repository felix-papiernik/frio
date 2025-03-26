import { Box } from "@mui/material";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box maxWidth={"md"} margin={"auto"} padding={2} width={"100%"} overflow={"hidden"}>
      {children}
    </Box>
  );
}
