import styled from "styled-components";
import { useField } from 'formik';

const Control = styled.div`
margin-bottom:20px;

`

const Label = styled.label`
color:#D0F4F7;
display:block;
margin-bottom:5px;
font-family: 'Montserrat Alternates';
`

const MyInput = styled.input`
outline:none;
padding:8px;
border:solid 1px #178DF0;
width:100%;
margin-bottom:5px;
`
const ErrorMessage = styled.div`
color:#f00;
`

const Input = ({label, ...props}) => {
    const [field, meta] = useField(props)
return (
    <Control>
     <Label>{label}</Label>
     <MyInput {...field} {...props} />
     {meta.touched && meta.error ? <ErrorMessage>{meta.error}</ErrorMessage> : 
     null}
    </Control>
)
}

export default Input;