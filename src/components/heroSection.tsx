"use client";
import LogoLanding from './logoLanding';
import { useEffect, useState } from 'react';

export default function HeroSection() {
	const [showScrollAnim, setShowScrollAnim] = useState(true);

	const onScroll = () => {
		const { pageYOffset, scrollY } = window
		if (pageYOffset > 25 || scrollY > 25) {
		setShowScrollAnim(false)
		} else {
		setShowScrollAnim(true)
		}
	}

	useEffect(() => {
		//add eventlistener to window
		window.addEventListener('scroll', onScroll)
		// remove event on unmount to prevent a memory leak with the cleanup
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<section className="bg-white dark:bg-gray-900 flex items-center justify-center h-screen w-screen">
			{/* max-w-screen-xl */}
			<div className='z-20 absolute flex justify-center mb-5'>
				<LogoLanding />
			</div>
			{/* <div className="z-20 py-8 px-4 mx-auto text-center lg:py-16 lg:px-12">
				<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
				<p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
				<div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
					<a href="#" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
						Go To Dashboard
						<svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
					</a>
				</div>
			</div> */}

			<div
				className={
				'z-10 absolute pb-5 flex items-end justify-center h-screen w-screen transition-opacity ease-in-out duration-700 ' +
				(!showScrollAnim ? 'opacity-0' : 'opacity-100')
				}
			>
				<div className='scroll sm:hidden' />
				<div className='mouse hidden sm:block' />
			</div>
		</section>
	)
}