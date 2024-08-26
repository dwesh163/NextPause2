import { useEffect, useState } from 'react';
import time from '../assets/time.json';
import { Outlet, useNavigate } from 'react-router-dom';
import { TimeObject } from '../types/types';

export default function Layout() {
	const navigate = useNavigate();
	const [selectedSchool, setSelectedSchool] = useState<string | null>(localStorage.getItem('selectedSchool'));

	useEffect(() => {
		if (selectedSchool !== null) {
			localStorage.setItem('selectedSchool', selectedSchool);

			navigate(`/${selectedSchool}`);
		}
	}, [selectedSchool, navigate]);

	return (
		<main>
			<div className="school-select">
				<select value={selectedSchool ?? ''} onChange={(e) => setSelectedSchool(e.target.value)}>
					<option value="">Select a school</option>
					{Object.keys(time).map((school) => (
						<option key={school} value={school}>
							{(time as TimeObject)[school].name}
						</option>
					))}
				</select>
			</div>
			<Outlet />
		</main>
	);
}
