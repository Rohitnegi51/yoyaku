import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Source_Sans_3 as FontSans } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { ClerkProvider } from "@clerk/nextjs";
const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Yoyaku - AI - PDF summarization",
  description: "Hours work in seconds. Summarize your PDFs with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              classNames: {
                title: "!text-lg !font-semibold !text-slate-900",
                description: "!text-sm !text-gray-700",
                closeButton: "!hover:text-gray-300",
                toast: "!gap-4 !items-start",
              },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
