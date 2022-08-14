import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import firebaseStack from '../firebase/firebasev9';
import { getDatabase, ref, set,child, get } from "firebase/database"



const defaultValue = {
    title: '',
    amount: '',
    type: '',
    nature: ''
}

function BasicExample() {

    const [data, setData] = useState(defaultValue);
    const [counter, seCounter] = useState(0)
    const db = firebaseStack();
    const dbRef = ref(firebaseStack());




    const onValueChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        console.log("🚀 ~ file: Input.jsx ~ line 18 ~ onValueChange ~ user", data)

    }

    const handelChange = (e) => {
        e.preventDefault()
        console.log("🚀 ~ file: input.js ~ line 34 ~ handelChange ~ data", data.type)
        // console.log("🚀 ~ file: Input.jsx ~ line 24 ~ handelChange ~ e", e)
        // set(ref(db, 'users/' + Math.floor(Math.random() * 1000)), {
        //     // set(ref(db, 'users/'), {
        //     data
        // });
    }

    const getData = async()=>{
        get(child(dbRef, `users/`)).then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          }).catch((error) => {
            console.error(error);
          });
    }
    useEffect(()=>{
        getData()
    },[])
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Amount Title</Form.Label>
                <Form.Control type="txt" placeholder="Amount Title" onChange={(e) => onValueChange(e)} name='title' />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="txt" placeholder="Amount" onChange={(e) => onValueChange(e)} name='amount' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Type</Form.Label>
                <Form.Control type="txt" placeholder="type" onChange={(e) => onValueChange(e)} name='type' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Nature</Form.Label>
                <Form.Control type="nature" placeholder="nature" onChange={(e) => onValueChange(e)} name='nature' />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            {/* <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic type" >
                    Dropdown Button
                </Dropdown.Toggle>

                <Dropdown.Menu onSelect={(e) => onValueChange(e)} name='type'>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>

            <select name="type" id="cars" onChange={(e) => onValueChange(e)}>
                <option value="volvo">Debit</option>
                <option value="saab">Credit</option>
            </select> */}
            <Button variant="primary" type="submit" onClick={handelChange}>
                Submit
            </Button>
        </Form>
    );
}

export default BasicExample;


