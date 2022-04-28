import "./Process.css";
import Util from "./util.js";
import { useState, useEffect } from "react";
import { FiMonitor, FiPower, FiRotateCcw, FiEye, FiEyeOff } from "react-icons/fi";


const Process = ({ process }) => {

    const [status, setStatus] = useState(process.status);
    const [showLog, setShowLog] = useState(false);
    const [watch, setWatch] = useState(process.watch);
    const [logs, setLogs] = useState([]);

    let updateMonit;

    const restart = async (pm_id, options = {}) => {
        setStatus("changing");
        let status = await Util.restart(pm_id, options);
        if (status) {
            if (options.watch || !options.watch) {
                setWatch(!watch);
            }
            setStatus(status);
        }
    }

    const stop = async (pm_id) => {
        setStatus("changing");
        let status = await Util.stop(pm_id);
        if (status) {
            setStatus(status);
        }
    }

    const monit = async (pm_name, length) => {
        let monit = await Util.monit(pm_name, length);
        if (monit) {
            setShowLog(true);
            setLogs(monit.filter(line => line.length > 0));
        }
    }

    const handleMonit = async (pm_name, length) => {
        if (showLog) {
            setShowLog(false);
            clearInterval(updateMonit);
        } else {
            monit(pm_name, length);
            updateMonit = setInterval(() => monit(pm_name, length), length);
        }
    }

    return (
        <div className="process-cnt">
            <div className="process">
                <div className={`process-name big ${status}`}>{process.name}</div>
                <div className="process-uptime small">{Util.milliToTime(process.pm_uptime)}</div>
                <div className="process-uptime small"><FiRotateCcw />{process.restart_time}</div>
                <div className="process-watch small" onClick={() => { restart(process.pm_id, { watch: !watch }) }}>{watch ? (<FiEye className="small-icon" />) : (<FiEyeOff className="small-icon" small- />)}</div>
                <div className="process-monit collapsible icon small monit" onClick={() => { handleMonit(process.name, 15) }}><FiMonitor /></div>
                <div className="process-restart  collapsible icon small restart" onClick={() => { restart(process.pm_id) }}><FiRotateCcw /></div>
                <div className="process-stop  collapsible icon small stop" onClick={() => { stop(process.pm_id) }}><FiPower /></div>
            </div>
            {(showLog) ? (
                <div className="process-logs">
                    {
                        logs.map((log, index) => {
                            return <p className="code">{log}</p>
                        })
                    }
                </div>) : (null)}
        </div>
    );
}

export default Process;