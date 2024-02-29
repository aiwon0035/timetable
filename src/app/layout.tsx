import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Container } from "@chakra-ui/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "時間割型タスク管理アプリ",
  description: "タスクを時間割で管理できるアプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="jp">
      <body className={inter.className}>
        <Container p={"3%"}>
          <Providers>{children}</Providers>
        </Container>
      </body>
    </html>
  );
}
