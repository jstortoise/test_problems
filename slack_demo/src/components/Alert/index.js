import React from 'react';

const Alert = ({ htmlText }) => (
    <p className="alert alert_error span_4_of_6 col float_none margin_auto right_padding">
        <i className="ts_icon ts_icon_warning" />
        {htmlText}
    </p>
);

export default Alert;