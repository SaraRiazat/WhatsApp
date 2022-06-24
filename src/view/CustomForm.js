import React from "react";

import '../styles/_styles.scss'

const CustomForm = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {
            label ?
                (
                    <label className={`form-input-label`}>
                        {label}
                    </label>
                ) : null
        }
    </div>
)

export default CustomForm