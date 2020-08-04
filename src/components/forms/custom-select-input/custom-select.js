import React, { useState } from 'react';
import {SelectInput, InnerSelect} from './custom-select.styles';

const CustomSelectInput = ({}) => {
    return (
        <SelectInput>
            <InnerSelect></InnerSelect>
        </SelectInput>
    )
}

export default React.memo(CustomSelectInput)