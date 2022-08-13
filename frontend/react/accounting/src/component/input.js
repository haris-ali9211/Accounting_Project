import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import firebaseStack from '../firebase/firebasev9';
import { ref, set } from "firebase/database"



const defaultValue = {
    email: '',
    password: ''
}

function BasicExample() {

    const [data, setData] = useState(defaultValue);
    const [counter, seCounter]= useState(0)
    const db = firebaseStack();


    
    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log("🚀 ~ file: Input.jsx ~ line 18 ~ onValueChange ~ user", data)

    }

    const handelChange = (e) => {
        e.preventDefault()
        console.log("🚀 ~ file: Input.jsx ~ line 24 ~ handelChange ~ e", e)
        set(ref(db, 'users/'+ Math.floor(Math.random() * 1000)), {
        // set(ref(db, 'users/'), {
            data
        });
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