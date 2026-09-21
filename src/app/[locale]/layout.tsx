
import type { Metadata } from "next";
import { Alexandria } from "next/font/google";

import "../globals.css";

import SiteLayout from "@/components/layout/SiteLayout";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Touch Wood",
  description: "Touch Wood Furniture Store",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <div
      className={alexandria.className}
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <SiteLayout>{children}</SiteLayout>
    </div>
  );
}

