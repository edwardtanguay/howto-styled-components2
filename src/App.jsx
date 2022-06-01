import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import * as qstr from './qstr';
import styled from 'styled-components';

const url = 'https://edwardtanguay.netlify.app/share/germanNouns.json';

function App() {
	const [nouns, setNouns] = useState([]);
	const [choice, setChoice] = useState('hide');

	useEffect(() => {
		(async () => {
			const _nouns = (await axios.get(url)).data;
			qstr.randomize(_nouns);
			setNouns(_nouns);
		})();
	}, []);

	return (
		<div className="App">
			<h1>German Article Practice</h1>

			<div className="buttons">
				<button onClick={() => setChoice('der')}>der</button>
				<button onClick={() => setChoice('die')}>die</button>
				<button onClick={() => setChoice('das')}>das</button>
				<button onClick={() => setChoice('hide')}>hide</button>
			</div>

			<div className="nouns">
				{nouns.map((noun, index) => {
					return (
						<div className="noun">
							{noun.article} {noun.singular}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
