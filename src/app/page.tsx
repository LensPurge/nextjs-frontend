"use client";
import { Purge } from './dashboard/Purge';
import LogoLanding from '../components/animatedLogo';
import NavComponent from '@/components/navComponent';
import { useAccounts } from '@/components/web3Context';

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

export default function Home() {
    const { signedIn } = useAccounts();
  return (
    <>
      <header className="w-screen top-0 fixed bg-transparent px-4 lg:px-6 py-2.5">
        <NavComponent/>
      </header>
      {!signedIn && <main className="-z-10 relative">
        <section className="flex items-center justify-center h-screen w-screen">
          <div className='flex justify-center mb-5'>
            <LogoLanding />
          </div>
        </section>
      </main>}
      {signedIn && <main>
        <section className="z-20 w-full h-screen bg-white grid items-center">
            {/* <Header /> */}
            <div className="px-4 py-4 mx-auto lg:px-12 w-11/12 sm:w-4/5 md:w-3/4 xl:w-1/2">
                <Purge />
            </div>
        </section>
      </main>}
    </>
  )
}
