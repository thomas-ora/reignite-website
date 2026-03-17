import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReIgnite Acquisition | Automated Client Acquisition for B2B Consultants",
  description: "Get 8-15 qualified discovery calls every month, guaranteed. Done-for-you client acquisition for B2B coaches and consultants. Pay only for results.",
  keywords: ["B2B lead generation", "client acquisition", "appointment setting", "B2B consultants", "coaching leads", "qualified appointments"],
  authors: [{ name: "ReIgnite Acquisition" }],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Get 8-15 Qualified Calls Every Month—Guaranteed",
    description: "Automated client acquisition for B2B consultants. Pay only for qualified appointments that show up.",
    url: "https://reigniteacquisition.com",
    siteName: "ReIgnite Acquisition",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReIgnite Acquisition | B2B Client Acquisition",
    description: "Get 8-15 qualified discovery calls every month, guaranteed.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
