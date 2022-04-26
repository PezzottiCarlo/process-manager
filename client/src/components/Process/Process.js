import "./Process.css";
import Util from "./util.js";
import { useState } from "react";
import {FiMonitor, FiPower, FiRotateCcw} from "react-icons/fi";


const Process = (param) => {

    const [process, setProcess] = useState(param.process);

    return (
        <div className="process">
            <div className="process-id small">{process.pm_id}</div>
            <div className="process-name big">{process.name}</div>
            <div className="process-uptime medium">{Util.milliToTime(process.pm_uptime)}</div>
            <div className="process-uptime small"><FiRotateCcw/>{process.restart_time}</div>
            <div className="process-monit icon small monit"><FiMonitor/></div>
            <div className="process-restart icon small restart"><FiRotateCcw/></div>
            <div className="process-stop icon small stop"><FiPower/></div>
            
        </div>
    );
}

export default Process;