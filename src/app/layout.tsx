import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AuthProvider } from "@/context/AuthContext";
import { ContentProvider } from "@/context/ContentContext";
import { UserProvider } from "@/context/UserContext";
import { TrackingProvider } from "@/context/TrackingContext";
import { HealthReportProvider } from "@/context/HealthReportContext";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { OfflineIndicator } from "@/components/loading/ContentLoader";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VivaFemini",
  description: "Modern health and wellness tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <AuthProvider>
          <UserProvider>
            <ContentProvider>
              <TrackingProvider>
                <HealthReportProvider>
                  <AuthGuard>{children}</AuthGuard>
                  <OfflineIndicator />
                </HealthReportProvider>
              </TrackingProvider>
            </ContentProvider>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
