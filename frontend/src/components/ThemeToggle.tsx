import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const cls = document.body.classList;
    if (light) cls.add('light'); else cls.remove('light');
  }, [light]);

  return (
    <div className="row">
      <span className="toggle" onClick={()=>setLight(!light)}>
        {light ? '🌞 Light' : '🌙 Dark'}
      </span>
    </div>
  );
}
