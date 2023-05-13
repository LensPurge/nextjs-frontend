import LogoLanding from '../components/animatedLogo';
import NavComponent from '@/components/navComponent';

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

export default function Home() {
  return (
    <>
      <header className="w-screen top-0 fixed bg-transparent px-4 lg:px-6 py-2.5">
        <NavComponent/>
      </header>
      <main className="-z-10 relative">
        <section className="flex items-center justify-center h-screen w-screen">
          <div className='flex justify-center mb-5'>
            <LogoLanding />
          </div>
        </section>
      </main>
    </>
  )
}
