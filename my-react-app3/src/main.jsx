import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const serverUrl1 = 'https://api.genderize.io';
const serverUrl2 = 'https://api.nationalize.io';

class Form extends React.Component {

	constructor(props) {
		super(props);
		this.state = { name: "Marina", gender: undefined, country: undefined };
		// Эта привязка обязательна для работы `this` в колбэке.
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleSubmit(e) {
		e.preventDefault();
		const url1 = `${serverUrl1}?name=${this.state.name}`;
		const url2 = `${serverUrl2}?name=${this.state.name}`;
		fetch(url1)
			.then(response => response.json())
			.then(result1 => {
				this.setState({ gender: result1.gender });
				fetch(url2)
					.then(response => response.json())
					.then(result2 => {
						this.setState({ country: result2.country[0].country_id });
						let finalResult = `${this.state.name} is ${this.state.gender} from ${this.state.country} `;
						alert(finalResult);
					});

			});

	}



	render() {
		return <form className="form" onSubmit={this.handleSubmit}>
			<p>
				<input defaultValue={this.state.name} placeholder="Введите имя" />
				<button>Отправить</button>
			</p>
		</form>
	}
}

class ResultDiv extends React.Component {
	render() {
		return <div className="task__result">{this.props.result}</div>
	}
}

class Title extends React.Component {
	render() {
		return <h1>Проверка страны и имени</h1>
	}
}

class Genderize extends React.Component {
	constructor(props) {
		super(props);
		this.state = { result: "Here will be result" };
	}


	render() {
		return <div className="container">
			<div className="task__body">
				<Title />
				<Form />
				<ResultDiv result={this.state.result} />
			</div>
		</div>
	}
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Genderize />
	</React.StrictMode>
)

