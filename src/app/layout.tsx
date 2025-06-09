import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "Figma MCP Magic - Prompt Collection",
  description:
    "A curated collection of powerful prompts for Figma MCP (Model Context Protocol). Transform your design workflow with AI-powered automation.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-oid="z:4om36">
      <body className="antialiased" suppressHydrationWarning data-oid="try_rp8">
        <ThemeProvider data-oid="2bhc.-s">
          <Header data-oid="c-8qbrv" />
          {children}
          <Toaster data-oid="sj93osh" />
        </ThemeProvider>
      </body>
    </html>
  );
}
