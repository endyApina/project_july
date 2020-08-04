import styled from 'styled-components/native';

const Select = ({className, children}) => (
    <select className={className}> 
        {children}
    </select>
)

const Input = ({className, children}) => {
    <option className={className}>
        {children}
    </option>
}

export const SelectInput = styled(Select)`
    width: 100%;
    height: 35px;
    background: white;
    color: gray;
    padding-left: 5px;
    font-size: 14px;
    border: none;
    margin-left: 10px;
`;

export const InnerSelect = styled(Input)`
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
`;