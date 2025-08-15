import React from 'react';

export default function SensorTable({ data }: { data: any[] }) {
  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Latest Readings</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Device</th><th>Temp (°C)</th><th>Humidity (%)</th><th>Power (W)</th><th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, idx) => (
            <tr key={idx}>
              <td>{d.deviceId}</td>
              <td>{d.temperature}</td>
              <td>{d.humidity}</td>
              <td>{d.power}</td>
              <td>{new Date(d.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
