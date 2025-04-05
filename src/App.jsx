import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { lazy, Suspense } from 'react';
import Loading from './components/Loading';

const Detalhes = lazy(() => import('./pages/Detalhes'));

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route
				path="/detalhes/:id"
				element={
					<Suspense fallback={<Loading />}>
						<Detalhes />
					</Suspense>
				}
			/>
		</Routes>
	);
}

export default App;
