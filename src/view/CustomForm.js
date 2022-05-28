import React from "react";

import '../styles/_styles.scss'

const CustomForm = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input className="form-input" onChange={handleChange} {...otherProps} />
        {
            label ?
                (
                    <label className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
                        {label}
                    </label>
                ) : null
        }
    </div>
)

export default CustomForm