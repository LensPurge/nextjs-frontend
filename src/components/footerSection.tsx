export default function FooterSection() {
	return (
		<div className="mx-auto max-w-screen-xl text-center p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
			<p className="my-6 text-gray-500 dark:text-gray-400">Open-source library of over 400+ web components and interactive elements built for better web.</p>
			<ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
				<li>
					<a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
				</li>
				<li>
					<a href="#" className="mr-4 hover:underline md:mr-6">Features</a>
				</li>
				<li>
					<a href="#" className="mr-4 hover:underline md:mr-6 ">FAQ</a>
				</li>
				<li>
					<a href="#" className="mr-4 hover:underline md:mr-6">Our Team</a>
				</li>
			</ul>
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} Flowbite™. All Rights Reserved.</span>
		</div>
	)
}
