import { useState, useEffect } from 'react';
import timeData from '../assets/time.json';
import { School } from '../types/types';

export default function Main() {
	const selectedSchool = localStorage.getItem('selectedSchool') as keyof typeof timeData | null;
	const [school, setSchool] = useState<School>(selectedSchool ? timeData[selectedSchool] : ({} as School));
	const [timeUntilNextEvent, setTimeUntilNextEvent] = useState<Date>(new Date());
	const [text, setText] = useState<string>('');
	const [currentTime, setCurrentTime] = useState<Date>(new Date());

	useEffect(() => {
		// Update current time every second
		const intervalId = setInterval(() => {
			setCurrentTime(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	useEffect(() => {
		if (school && school.time) {
			const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

			const nextTime = school.time.find((t) => {
				const [hours, minutes] = t.split(':').map(Number);
				return hours * 60 + minutes > currentMinutes;
			});

			if (nextTime) {
				const [nextHours, nextMinutes] = nextTime.split(':').map(Number);
				const nextEventDate = new Date(currentTime);
				nextEventDate.setHours(nextHours, nextMinutes, 0, 0); // Set hours, minutes, and reset seconds and milliseconds

				setTimeUntilNextEvent(nextEventDate);

				if (school.text) {
					setText(school.text[school.time.indexOf(nextTime)]);
				} else {
					setText('');
				}
			} else {
				setText('No more events today');
				setTimeUntilNextEvent(new Date());
			}
		}
	}, [currentTime, school]);

	useEffect(() => {
		// Update school when selectedSchool changes
		if (selectedSchool) {
			setSchool(timeData[selectedSchool]);
		}
	}, [selectedSchool]);

	const calculateTimeRemaining = (eventDate: Date) => {
		const now = new Date();
		const difference = eventDate.getTime() - now.getTime();
		if (difference <= 0) return 'Event has passed';

		const hours = Math.floor(difference / (1000 * 60 * 60));
		const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((difference % (1000 * 60)) / 1000);

		return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	};

	return (
		<div>
			{text !== 'No more events today' && (
				<div>
					<h2>{text ? text : 'Prochaine sonnerie dans : '}</h2>
					<h3>{calculateTimeRemaining(timeUntilNextEvent)}</h3>
				</div>
			)}
		</div>
	);
}
