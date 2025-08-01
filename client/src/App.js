import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then(res => setMsg(res.data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>{msg}</h1>
    </div>
  );
}

export default App;
