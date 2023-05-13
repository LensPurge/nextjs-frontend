import Image from "next/image";
import { LoginButton } from "@/app/loginComponent";

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

export default function NavComponent() {
	return (
		<div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
				<Image
					src="/logo.svg"
					alt={"Logo"}
					className="mr-3 h-12"
					width={100}
					height={100}
				/>
		  </div>
		  <div className="flex items-center lg:order-2">
		  	<LoginButton/>
		  </div>
		</div>
	)
}
