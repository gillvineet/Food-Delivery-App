import { useRouteError } from "react-router-dom";
const Error=

    ()=>{
        const e=useRouteError();
        return(
            <div>
                <h2>Opsssssssssssssssssssss</h2>
                <h2>something wrong happened</h2>
                <h3>{e.status}: {e.statusText}</h3>
            </div>
        )
    }
export default Error;