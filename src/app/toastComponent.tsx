"use client";
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

/* -------------------------------------------------------------------------- */
/*                                 Components                                 */
/* -------------------------------------------------------------------------- */

export default function ToastComponent() {
	const [ show, setShow ] = useState(false);

	useEffect(() => {
		setShow(true);
	}, []);

	if (show) {
		return (
			<ToastContainer
				position='bottom-right'
			/>
		)
	}
	return (
		<></>
	)
}
