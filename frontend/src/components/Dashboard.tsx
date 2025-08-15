import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../api';
import { io, Socket } from 'socket.io-client';
import Charts from './Charts';
import SensorTable from './SensorTable';

export default function Dashboard() {
  const [latest, setLatest] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>('device-1');

  useEffect(() => {
    (async () => {
      const res = await api.get('/sensors/latest');
      setLatest(res.data);
      if (res.data.length && !selected) setSelected(res.data[0].deviceId);
    })();
  }, []);

  useEffect(() => {
    const socket: Socket = io(import.meta.env.VITE_API_BASE?.replace('http', 'ws') || 'ws://localhost:4000', { transports: ['websocket'] });
    socket.on('reading:new', (r: any) => {
      setLatest(prev => {
        const idx = prev.findIndex(p => p.deviceId === r.deviceId);
        if (idx >= 0) {
          const clone = prev.slice();
          clone[idx] = r;
          return clone;
        }
        return [...prev, r];
      });
    });
    return () => { socket.disconnect(); };
  }, []);

  const devices = useMemo(() => latest.map(l => l.deviceId), [latest]);

  return (
    <div>
      <div className="header">
        <h2 style={{ margin: 0 }}>IoT Dashboard</h2>
        <div>
          <select className="input" value={selected} onChange={e=>setSelected(e.target.value)}>
            {devices.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>
      <div className="grid">
        <div style={{ gridColumn: 'span 12' }}>
          <SensorTable data={latest} />
        </div>
        <div style={{ gridColumn: 'span 12' }}>
          <Charts deviceId={selected} />
        </div>
      </div>
    </div>
  );
}
