import "./Process.css";
import { useState } from "react";

const Process = (param) => {

    const [process, setProcess] = useState(param.process);

    return (
        <div className="process">
            <div className="process-id">{process.pm_id}</div>
            <div className="process-name">{process.name}</div>
            <div className="process-uptime">{process.pm_uptime}</div>
            <div className="process-monit">monit</div>
            <div className="process-stop">stop</div>
            <div className="process-restart">restart</div>
        </div>
    );
}

export default Process;