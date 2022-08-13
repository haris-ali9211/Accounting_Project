import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebase from '../src/firebase/firebase';

const defaultValue = {
    email: '',
    password: ''
}

function BasicExample() {

    const [data, setData] = useState(defaultValue);


    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log("🚀 ~ file: Input.jsx ~ line 18 ~ onValueChange ~ user", data)

    }

    const handelChange = (e)=>{
        e.preventDefault()
        console.log("🚀 ~ file: Input.jsx ~ line 24 ~ handelChange ~ e", e)
        firebase.child("contact")
    }
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="txt" placeholder="Enter email" onChange={(e) => onValueChange(e)} name='email' />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => onValueChange(e)} name='password' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handelChange}>
                Submit
            </Button>
        </Form>
    );
}

export default BasicExample;