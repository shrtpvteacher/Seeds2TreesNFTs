// src/components/DonationChart.js
import React from "react";
import { Card } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Temporary static data (replace with real data when available)
const data = [
  { date: "Day 1", eth: 0.01 },
  { date: "Day 2", eth: 0.03 },
  { date: "Day 3", eth: 0.05 },
  { date: "Day 4", eth: 0.07 },
  { date: "Day 5", eth: 0.1 },
];

const DonationChart = () => {
  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title>Donations Over Time</Card.Title>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis unit=" ETH" />
            <Tooltip />
            <Line type="monotone" dataKey="eth" stroke="#82ca9d" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default DonationChart;