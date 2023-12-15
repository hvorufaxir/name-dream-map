/* 
   Filename: AdvancedWebApplication.js
   
   Content: This code demonstrates an advanced web application that utilizes various JavaScript concepts and libraries. 
            It includes features such as user authentication, API integration, data visualization, and dynamic content rendering.
*/

// Import necessary libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Chart from 'chart.js';

// Define API endpoints
const API_BASE_URL = 'https://api.example.com';
const API_LOGIN_ENDPOINT = '/auth/login';
const API_DATA_ENDPOINT = '/data';

// Main App component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: null,
      error: null
    };
  }

  // Component lifecycle method: component did mount
  componentDidMount() {
    axios.get(API_BASE_URL + API_DATA_ENDPOINT)
      .then(response => {
        this.setState({ data: response.data });
        this.renderChart();
      })
      .catch(error => {
        this.setState({ error: 'Failed to fetch data' });
      });
  }

  // Render dynamic content
  renderContent() {
    const { isLoggedIn, data, error } = this.state;

    if (isLoggedIn) {
      if (error) {
        return <div>Error: {error}</div>;
      } else if (data) {
        return (
          <div>
            <h1>Data Visualization</h1>
            <canvas id="chartCanvas" width={800} height={400}></canvas>
          </div>
        );
      } else {
        return <div>Loading data...</div>;
      }
    } else {
      return <Redirect to="/login" />;
    }
  }

  // Render chart using Chart.js library
  renderChart() {
    const chartCanvas = document.getElementById('chartCanvas').getContext('2d');
    new Chart(chartCanvas, {
      type: 'bar',
      data: {
        labels: this.state.data.labels,
        datasets: [
          {
            label: 'Data Set',
            data: this.state.data.values,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage onLogin={() => this.setState({ isLoggedIn: true })} />
          </Route>
          <Route path="/">
            <div>
              <h1>Welcome to Advanced Web Application</h1>
              {this.renderContent()}
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

// Login Page component
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: null,
    };
  }

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    axios.post(API_BASE_URL + API_LOGIN_ENDPOINT, { username, password })
      .then(response => {
        this.props.onLogin();
      })
      .catch(error => {
        this.setState({ error: 'Invalid credentials' });
      });
  }

  render() {
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <input type="text" name="username" value={this.state.username} onChange={(e) => this.handleInputChange(e)} />
          <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleInputChange(e)} />
          <button type="submit">Login</button>
        </form>
        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

// Mount the app to the DOM
ReactDOM.render(<App />, document.getElementById('root'));