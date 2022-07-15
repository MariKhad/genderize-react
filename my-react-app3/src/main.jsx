import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const serverUrl1 = 'https://api.genderize.io';
const serverUrl2 = 'https://api.nationalize.io';

class Button extends React.Component {

	handleClick() {
		alert("Кнопка нажата");
	}

	render() {
		return <button onClick={this.handleClick}>Отправить</button>
	}
}

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isActive: false };
		// Эта привязка обязательна для работы `this` в колбэке.
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.setState(prevState => ({
			isActive: !prevState.isActive
		}));
		alert(isActive);
	}

	render() {
		let className;
		if (this.state.isActive) {
			className += 'active';
		}
		return <input className={className} onChange={this.handleChange} placeholder="Введите имя" />
	}

}

class Form extends React.Component {
	render() {
		return <form className="form">
			<p>
				<Input />
				<Button />
			</p>
		</form>
	}
}

class ResultDiv extends React.Component {
	render() {
		return <div className="task__result">Here will be result</div>
	}
}

class Title extends React.Component {
	render() {
		return <h1>Проверка страны и имени</h1>
	}
}

class Genderize extends React.Component {
	render() {
		return <div className="container">
			<div className="task__body">
				<Title />
				<Form />
				<ResultDiv />
			</div>
		</div>
	}
}

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Genderize />
	</React.StrictMode>
)

