import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <>
          <Modal>
            {children}
            <Header />
          </Modal>
          <Footer />
        </>
      </body>
    </html>
  );
}
