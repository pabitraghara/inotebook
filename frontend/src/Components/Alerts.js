import React from 'react'

function Alerts(props) {
    const capitalWord = (words) => {
        if(words === "danger" ){
            words = "error"
        }
        const lower = words.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (

        <div >
            {props.alert && <div className={`alert alert-${props.alert.types} alert-dismissible fade show`} role="alert">
                <strong> {capitalWord(props.alert.types)}</strong> : {props.alert.massege}
                {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
            </div>}
        </div>
    )
}

export default Alerts
