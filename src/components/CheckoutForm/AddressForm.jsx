import React, { useState, useEffect } from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { commerce } from '../../lib/commerce'

import CustomTextField from './CustomTextField'

const AddressForm = ({checkOutToken, next}) => {
    
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisons, setShippingSubdivisons] = useState([])
    const [shippingSubdivison, setShippingSubdivison] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const methods = useForm()

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
    const subdivisions = Object.entries(shippingSubdivisons).map(([code, name]) => ({id: code, label: name}))
    const options = shippingOptions.map((sO) => ({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)

        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)

        setShippingSubdivisons(subdivisions)
        setShippingSubdivison(Object.keys(subdivisions)[0])
    }

    const fetchShippingOptions = async (checkOutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkOutTokenId, {country, region})

        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkOutToken.id)
    },[])

    useEffect(() => {
        if(shippingCountry) fetchSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if(shippingSubdivison) fetchShippingOptions(checkOutToken.id, shippingCountry, shippingSubdivison)
    }, [shippingSubdivison])

    return (
        <>
            <Typography variant="h6" gutterBottom> Shipping Address</Typography>
            <FormProvider {...methods} >
                <form onSubmit = {methods.handleSubmit((data) => next({ ...data, setShippingCountry, shippingSubdivison, shippingOption}))}>
                    <Grid container spacing = {3}>
                        <CustomTextField required name = 'firstName' label = 'First Name' />
                        <CustomTextField required name = 'lastName' label = 'Last Name' />
                        <CustomTextField required name = 'address1' label = 'Adress' />
                        <CustomTextField required name = 'email' label = 'e-mail' />
                        <CustomTextField required name = 'city' label = 'City' />
                        <CustomTextField required name = 'zip' label = 'Zip code' />

                        <Grid item xs = {12} ms = {6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value = {shippingCountry} fullWidth onChange = {(e) => setShippingCountry(e.target.value)}>     
                                {countries.map((country) => (
                                    <MenuItem key = {country.id} value = {country.id}>
                                        {country.label}
                                    </MenuItem>
                                ))}  
                                
                            </Select>
                        </Grid>

                        
                         <Grid item xs = {12} ms = {6}>
                            <InputLabel>Shipping Subdivison</InputLabel>
                            <Select value = {shippingSubdivison} fullWidth onChange = {(e) => setShippingSubdivison(e.target.value)}>
                                {subdivisions.map((subdivison) => (
                                    <MenuItem key = {subdivison.id} value = {subdivison.id}>
                                        {subdivison.label}
                                    </MenuItem>
                                ))}  
                            </Select>
                        </Grid>


                         <Grid item xs = {12} ms = {6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value = {shippingOption} fullWidth onChange = {(e) => setShippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key = {option.id} value = {option.id}>
                                        {option.label}
                                    </MenuItem>
                                ))}  
                            </Select>
                        </Grid>
                    </Grid>

                    <br />
                    <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                        <Button component = {Link} to = "/cart" variant = "outlined">
                            Back to cart
                        </Button>

                        <Button type = "submit"  variant = "contained" color = "primary">
                            Next
                        </Button>
                    </div>
                </form>   
            </FormProvider>
        </>
    )
}

export default AddressForm
