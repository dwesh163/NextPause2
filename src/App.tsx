import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import timeData from './assets/time.json';
import Layout from './pages/layout';
import Main from './pages/main';
import NoPage from './pages/noPage';
import StylePage from './pages/stylePage';

export default function App() {
	return (
		<BrowserRouter basename="/NextPause2">
			<AppRoutes />
		</BrowserRouter>
	);
}

function AppRoutes() {
	const navigate = useNavigate();
	const location = useLocation();
	const selectedSchool = localStorage.getItem('selectedSchool');

	const schools = Object.keys(timeData).map((school) => `/${school}`);

	const firstSchool = schools[0];

	useEffect(() => {
		console.log('selectedSchool', selectedSchool);
		console.log('location.pathname', location.pathname);
		console.log('schools', schools);

		if (location.pathname === '/' && firstSchool) {
			localStorage.setItem('selectedSchool', firstSchool.replace('/', ''));
			navigate(firstSchool);
		}

		console.log('oui');

		if (schools.includes(location.pathname)) {
			console.log('oui2');
			localStorage.setItem('selectedSchool', location.pathname.replace('/', ''));
			navigate(location.pathname);
		}
	}, [selectedSchool, navigate, location.pathname, firstSchool]);

	return (
		<Routes>
			<Route path="/style" element={<StylePage />} />
			<Route path="/" element={<Layout />}>
				{schools.map((schoolPath) => (
					<Route key={schoolPath} path={schoolPath} element={<Main />} />
				))}
			</Route>

			<Route path="*" element={<NoPage />} />
		</Routes>
	);
}
