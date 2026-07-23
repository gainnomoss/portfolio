import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Hotjar } from "@/components/analytics/hotjar";
import { AnalyticsGate } from "@/components/analytics/analytics-gate";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Ke Er Zhang — Product Designer",
    template: "%s — Ke Er Zhang",
  },
  description:
    "Product Designer based in Singapore, focused on end-to-end journeys, accessibility, and clarity in complex systems.",
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const hotjarSiteId = process.env.NEXT_PUBLIC_HOTJAR_ID;
const hotjarVersion = process.env.NEXT_PUBLIC_HOTJAR_SV;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-canvas text-body`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ThemeProvider>
        <AnalyticsGate isProductionDeployment={process.env.VERCEL_ENV === "production"}>
          {gaId && <GoogleAnalytics gaId={gaId} />}
          {hotjarSiteId && hotjarVersion && (
            <Hotjar siteId={hotjarSiteId} version={hotjarVersion} />
          )}
        </AnalyticsGate>
      </body>
    </html>
  );
}
