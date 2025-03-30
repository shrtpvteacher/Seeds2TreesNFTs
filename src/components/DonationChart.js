import { useEffect, useState } from "react";
import { ethers } from "ethers";
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
import { contractWithProvider, provider } from "../helpers/contract";

const DonationChart = () => {
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const filter = contractWithProvider.filters.TreeMinted();
        const events = await contractWithProvider.queryFilter(filter, 0, "latest");

        const seenTimestamps = new Set();
        const formatted = await Promise.all(
          events.map(async (event) => {
            const block = await provider.getBlock(event.blockNumber);
            let ts = block.timestamp * 1000;

            // Prevent identical timestamps by nudging duplicates
            while (seenTimestamps.has(ts)) {
              ts += 1; // Add 1ms until it's unique
            }
            seenTimestamps.add(ts);

            return {
              date: ts,
              eth: parseFloat(ethers.utils.formatEther(event.args.pricePaid)),
            };
          })
        );

        const sorted = formatted.sort((a, b) => a.date - b.date);

        let runningTotal = 0;
        const cumulative = [];

        if (sorted.length > 1) {
          cumulative.push({
            date: sorted[0].date - 60000,
            eth: 0,
          });
        }

        sorted.forEach((entry) => {
          runningTotal += entry.eth;
          cumulative.push({
            date: entry.date,
            eth: runningTotal,
          });
        });

        setDonationData(cumulative);
      } catch (error) {
        console.error("Error loading donation data:", error);
      }
    };

    fetchDonations();
  }, []);

  return (
    <Card className="shadow h-100">
      <Card.Body className="h-100 d-flex flex-column">
        <Card.Title className="mb-2" style={{ fontSize: "1rem" }}>
          Donations Over Time
        </Card.Title>
        <div className="flex-grow-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={donationData}
              margin={{ top: 10, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                type="number"
                domain={[
                  donationData.length > 0
                    ? donationData[0].date - 60000
                    : "auto",
                  donationData.length > 0
                    ? donationData[donationData.length - 1].date + 60000
                    : "auto",
                ]}
                tickFormatter={(unixTime) =>
                  new Date(unixTime).toLocaleString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                }
                tick={{ fontSize: 10 }}
                tickCount={5}
              />
              <YAxis
                domain={[0.0001, "dataMax"]}
                ticks={[0.0001, 0.0005, 0.001, 0.005, 0.01]}
                tickFormatter={(val) => `${val} ETH`}
                tick={{ fontSize: 10 }}
                allowDataOverflow={true}
              />
              <Tooltip
                contentStyle={{ fontSize: "12px" }}
                labelFormatter={(value) =>
                  `Date: ${new Date(value).toLocaleString()}`
                }
                formatter={(value) => [`${value} ETH`, "Total Donated"]}
              />
              <Line
                type="monotone"
                dataKey="eth"
                stroke="#2ecc71" // ✅ Green color
                strokeWidth={4}   // ✅ Thicker line
                dot={{ r: 4 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DonationChart;
