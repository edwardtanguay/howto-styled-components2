import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import * as qstr from './qstr';
import styled from 'styled-components';

const url = 'https://edwardtanguay.netlify.app/share/germanNouns.json';

function App() {
	const [nouns, setNouns] = useState([]);
	const [choice, setChoice] = useState('hide');

	const Button = styled.button`
		background-color: ${(props) =>
			props.mode === 'selected' ? 'green' : '#eee'};
	`;

	const Noun = styled.div`
		background-color: ${(props) =>
			props.mode === 'selected' ? 'green' : '#444'};
		color: ${(props) => (props.mode === 'selected' ? 'white' : '#777')};
		padding: 5px;
	`;

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
				<Button
					onClick={() => setChoice('der')}
					mode={choice === 'der' ? 'selected' : 'unselected'}
				>
					der
				</Button>
				<Button
					onClick={() => setChoice('die')}
					mode={choice === 'die' ? 'selected' : 'unselected'}
				>
					die
				</Button>
				<Button
					onClick={() => setChoice('das')}
					mode={choice === 'das' ? 'selected' : 'unselected'}
				>
					das
				</Button>
				<Button
					onClick={() => setChoice('hide')}
					mode={choice === 'hide' ? 'selected' : 'unselected'}
				>
					hide
				</Button>
			</div>

			<div className="nouns">
				{nouns.map((noun, index) => {
					return (
						<Noun
							mode={
								choice === noun.article
									? 'selected'
									: 'unselected'
							}
						>
							{choice === noun.article && <>{noun.article}</>}{' '}
							{noun.singular}
						</Noun>
					);
				})}
			</div>
		</div>
	);
}

export default App;
