import './App.css';
import { useState, useEffect } from 'react';
import Process from './components/Process/Process';
import { FiSearch } from 'react-icons/fi'

function App() {

  const [processes, setProcesses] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('list');
      const data = await result.json();
      setProcesses(data);
    }
    fetchData()
  }, [])

  const filerChange = (event) => {
    setFilter(event.target.value);
  }

  const filteredData = () => {
    if (filter === '') {
      return processes;
    }
    return processes.filter(process => {
      return process.name.toLowerCase().includes(filter.toLowerCase())
    })
  }


  return (
    <div className="App">
      <div className="process-manage">
        <div className="process-bar">
          <div className="process-bar-search">
            <input value={filter} onChange={filerChange} type="text" placeholder="Search" />
          </div>
        </div>
        <div className="process-list">
          {
            filteredData().map((process, index) => {
              return (
                <div className="process-container">
                  <Process process={process} />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
