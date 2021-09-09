import React, {useState, useEffect} from 'react'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'

import { commerce } from '../../../lib/commerce'

import useStyles from './styles'

import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment Details']

const Checkout = ({cart}) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0)
    const [checkOutToken, setCheckOutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                setCheckOutToken(token)
            } catch (error) {

            }
        }

        generateToken()
    },[cart])
    
    const nextStep = () => setActiveStep ((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep ((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    )

    const Form = () => activeStep === 0 
        ? <AddressForm checkOutToken = {checkOutToken} next = {next}/>
        : <PaymentForm shippingData = {shippingData} checkOutToken={checkOutToken} backStep={backStep}/>

    return (
        <>
            <div className= {classes.toolbar}/>
            <main className = {classes.layout}>
                <Paper className = {classes.paper}>
                    <Typography variant = "h4" align = "center" >Checkout</Typography>
                    <Stepper activeStep = {activeStep} className ={classes.stepper}>
                        {steps.map((step) => (
                            <Step key = {step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkOutToken && <Form />}
                </Paper>
                
            </main>
        </>
    )
}

export default Checkout