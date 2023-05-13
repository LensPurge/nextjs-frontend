import { BeakerIcon } from '@heroicons/react/24/solid'
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */

type HeroIcon = ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>;

interface IFeature {
	title: string;
	description: string;
	Icon: HeroIcon;
}

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

const Feature: React.FC<IFeature> = ({
	title,
	description,
	Icon
}) => {
	return (
		<div>
			<div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
				<Icon className="w-5 h-5 text-blue-600 lg:w-6 lg:h-6 dark:text-blue-300"/>
			</div>
			<h3 className="mb-2 text-xl font-bold dark:text-white">{title}</h3>
			<p className="text-gray-500 dark:text-gray-400">{description}</p>
		</div>
	)
}

export default function FeatureSection() {
	return (
		<section className="bg-white dark:bg-gray-900 flex items-center justify-center h-screen w-screen">
			<div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
				<div className="max-w-screen-md mb-8 lg:mb-16">
					<h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Designed for business teams like yours</h2>
					<p className="text-gray-500 sm:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
				</div>
				<div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
					<Feature
						title="Feature 1"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula."
						Icon={BeakerIcon}
					/>
					<Feature
						title="Feature 1"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula."
						Icon={BeakerIcon}
					/>
					<Feature
						title="Feature 1"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula."
						Icon={BeakerIcon}
					/>
					<Feature
						title="Feature 1"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula."
						Icon={BeakerIcon}
					/>
					<Feature
						title="Feature 1"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula."
						Icon={BeakerIcon}
					/>
					<Feature
						title="Feature 1"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at ipsum eu nunc commodo posuere et sit amet ligula."
						Icon={BeakerIcon}
					/>
				</div>
			</div>
			</section>
	)
}