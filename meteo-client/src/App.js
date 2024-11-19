import React, { useState } from 'react';
import { Form, Button, Container, Alert, Table, Row, Col, Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL = "http://localhost:3000/api/historical_weathers";

const App = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    if (!location || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}?location=${location}&start_date=${startDate}&end_date=${endDate}`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } else {
        throw new Error('Weather data could not be retrieved');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  // Prepare data for chart and table
  const chartData = weatherData && {
    labels: weatherData.map(item => item.date), // Dates as x-axis
    datasets: [
      {
        label: 'High Temperature (°C)',
        data: weatherData.map(item => item.temperature_high), // High temperatures
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Low Temperature (°C)',
        data: weatherData.map(item => item.temperature_low), // Low temperatures
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Precipitation (mm)',
        data: weatherData.map(item => item.precipitation), // Precipitation
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
      }
    ]
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Weather Data</h2>

        <Form onSubmit={handleSubmit}>
          {/* First row for Location */}
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Second row for Start Date and End Date */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="start_date">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="end_date">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Submit button in a separate row */}
          <Row className="mb-3">
            <Col md={12}>
              <Button variant="primary" type="submit" block>
                Get Weather Data
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Error message */}
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

        {/* Chart */}
        {weatherData && (
          <div className="mt-4">
            <h3>Weather Data (Chart)</h3>
            <Line data={chartData} />
          </div>
        )}

        {/* Table */}
        {weatherData && (
          <div className="mt-4">
            <h3>Weather Data (Table)</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>High Temperature (°C)</th>
                  <th>Low Temperature (°C)</th>
                  <th>Precipitation (mm)</th>
                </tr>
              </thead>
              <tbody>
                {weatherData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.temperature_high}</td>
                    <td>{item.temperature_low}</td>
                    <td>{item.precipitation}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default App;
