import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import './App.css'
import { render } from 'react-dom'

function App() {
	return <Genderize />
};

const serverUrl1 = 'https://api.genderize.io';
const serverUrl2 = 'https://api.nationalize.io';

class Form extends React.Component {


	render() {
		return <form className="form" onSubmit={this.props.submit} >
			<p>
				<input defaultValue={this.props.name} placeholder="Введите имя" onChange={this.props.change} />
				<button>Отправить</button>
			</p>
		</form >
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
		this.state = { name: "Ivan", gender: undefined, country: undefined, result: "Here will be result" };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
						this.setState({ result: finalResult })
					});
			});
	}

	handleChange() {
		this.setState(prevState => {
			prevState.name = event.target.value;
		})
	}

	render() {
		let isShort = this.state.name.length <= 2;
		let div;
		if (!isShort) {
			div = <ResultDiv result={this.state.result} />
		} else {
			div = <ResultDiv result="The name is too short" />
		}
		return <div className="container">
			<div className="task__body">
				<Title />
				<Form name={this.state.name} submit={this.handleSubmit} change={this.handleChange} />
				{div}
			</div>
		</div>
	}
}

export default App
