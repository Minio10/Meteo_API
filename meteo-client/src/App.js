import React, { useState } from 'react';
import { Form, Button, Container, Alert, Table, Row, Col, Card, Spinner, Tabs, Tab } from 'react-bootstrap';
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
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async () => {
    if (!location || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  // Prepare data for chart and table
  const chartDataTemperature = weatherData && {
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
      }
    ]
  };

  const chartDataPrecipitation = weatherData && {
    labels: weatherData.map(item => item.date), // Dates as x-axis
    datasets: [
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

        {/* Loader */}
        {loading && (
          <div className="mt-3">
            <Spinner animation="border" variant="primary" /> Loading...
          </div>
        )}

        {/* Tabs for Weather Data */}
        {!loading && weatherData && (
          <Tabs defaultActiveKey="temperature" id="weather-data-tabs" className="mt-4">
            <Tab eventKey="temperature" title="Temperature">
              <h3>Temperature Data (Chart)</h3>
              <Line data={chartDataTemperature} />
            </Tab>
            <Tab eventKey="precipitation" title="Precipitation">
              <h3>Precipitation Data (Chart)</h3>
              <Line data={chartDataPrecipitation} />
            </Tab>
            <Tab eventKey="table" title="Weather Table">
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
            </Tab>
          </Tabs>
        )}
      </Card>
    </Container>
  );
};

export default App;
