import React, { useEffect, useState } from 'react';
import { api } from '../api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Charts({ deviceId }: { deviceId: string }) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await api.get('/sensors/history', { params: { deviceId, limit: 200 } });
      const arr = res.data.reverse().map((r: any) => ({
        ...r, ts: new Date(r.timestamp).toLocaleTimeString()
      }));
      setData(arr);
    })();
  }, [deviceId]);

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>History ({deviceId})</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ts" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="temperature" />
            <Line yAxisId="left" type="monotone" dataKey="humidity" />
            <Line yAxisId="right" type="monotone" dataKey="power" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
