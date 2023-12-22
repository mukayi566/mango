import './globals.css'
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import ClientOnly from "./components/ClientOnly";
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal';
import getCurrentUser from './actions/getCurrentUser';
import SearchModal from './components/modals/SearchModal';

const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mango',
  description: 'Bedspace application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser();
  

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider/>
        <RegisterModal />
        <SearchModal />
        <RentModal/>
        <LoginModal/>
        <Navbar currentUser= {currentUser}/>
        </ClientOnly>
        <div className="pd-20 pt-28">
          {children}
        </div>
        </body>
    </html>
  )
}
