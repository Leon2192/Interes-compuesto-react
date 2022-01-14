import {Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Input from "./Components/Input/Input";
import Button from "./Components/Button/Button";
import Container from "./Components/Container/Container";
import Section from "./Components/Section/Section";
import Balance from './Components/Balance/Balance';

const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for(let i = 0; i < years; i++) {
   total = (total + contribution) * (rate + 1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style:'currency',
  currency:'USD',
  minimumFractionDigits:2,
  maximumFractionDigits: 2

})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) =>{
    const val = compoundInterest( Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }

  return (
    <Container>
     <Section>
       <Formik 
       initialValues={{
         deposit:'',
         contribution:'',
         years:'',
         rate:'',
       }}
       onSubmit={handleSubmit}
       validationSchema={Yup.object({
         deposit: Yup.number().required('Requerido').typeError('Debes colocar únicamente números en este campo.'),
         contribution: Yup.number().required('Requerido').typeError('Debes colocar únicamente números en este campo.'),
         years: Yup.number().required('Requerido').typeError('Debes colocar únicamente números en este campo.'),
         rate: Yup.number().required('Requerido').typeError('Debes colocar únicamente números en este campo.').min(0, 'El mínimo es 0').max(1, 'El máxomo es 1'),
       })}
       >
       <Form>
         <Input name="deposit" label="Depósito inicial" />
         <Input name="contribution" label="Contribución anual" />
         <Input name="years" label="Plazo (años):" />
         <Input name="rate" label="Interés estimado" />
         <Button type='submit'>Calcular</Button>
       </Form>
       </Formik>
       {balance !== '' ? <Balance>Balance final:{balance}</Balance> : null}
     </Section>
    </Container>
  );
}

export default App;
