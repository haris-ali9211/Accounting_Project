import React, { useEffect, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { ref, get, child, set, orderByChild } from "firebase/database"
import Button from 'react-bootstrap/esm/Button';


const TrialBalance = () => {

    const dbRef = ref(FirebaseStack());
    const db = FirebaseStack();


    const [firebaseData, setFirebaseData] = useState([]);
    const [trailBalanceData, setTrailBalanceData] = useState([]);
    const [stopData, setStopData] = useState(true)
    const [titleData, setTitle] = useState()



    const getDataFromFirebase = async () => {
        get(child(dbRef, `record/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setFirebaseData(snapshot.val())
                setStopData(false)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const getUniqueData = () => {
        var array = [];
        firebaseData && firebaseData.map((obj, key) => {
            obj.debit && obj.debit.map((object, key) => {
                array.push(object.title)
            })
            obj.credit && obj.credit.map((object, key) => {
                array.push(object.title)

            })
        })
        let unique = [...new Set(array)]
        setTitle(unique)
    }

    const getTrailBalanceData = async () => {
        get(child(dbRef, `trailBalance/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setTrailBalanceData(snapshot.val())
                setStopData(false)

            }
            else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }
    useEffect(() => {
        getDataFromFirebase();
        getUniqueData();
        getTrailBalanceData();
    }, [stopData])

    const getData = () => {
        var arr = titleData
        var arrData = []
        // for (let i = 0; i < arr.length; i++) {
            arr.map((objArr)=>{
                trailBalanceData.map((obj) => {
                    if (obj.data.title === objArr) {
                        // console.log("🚀 ~ .map ~ arr", obj.data.title,objArr)
                        arrData.push(obj)
                    }
                })
            })
        // }
        console.log("🚀 ~ file: TrialBalance.js ~ line 72 ~ getData ~ arrData", arrData)


    }

    return (
        <>
            <button onClick={getData}>press me</button>
        </>
    )
}

export default TrialBalance  
