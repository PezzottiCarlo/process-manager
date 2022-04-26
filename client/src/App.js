import './App.css';
import { useState, useEffect } from 'react';
import Process from './components/Process/Process';

function App() {

  const [processes, setProcesses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('list');
      console.log(result);
      const data = await result.json();
      setProcesses(data);
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      {
        processes.map((process, index) => {
          return (
            <div className="process-container">
              <Process process={process} key={index} />
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
