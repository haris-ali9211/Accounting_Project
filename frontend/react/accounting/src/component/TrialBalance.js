import React, { useEffect, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { ref, get, child, set, orderByChild } from "firebase/database"


const TrialBalance = () => {

    const dbRef = ref(FirebaseStack());
    const db = FirebaseStack();


    const [firebaseData, setFirebaseData] = useState();
    const [stopData, setStopData] = useState(true)
    const [titleData, setTitle] = useState()
    console.log("🚀 ~ file: TrialBalance.js ~ line 15 ~ TrialBalance ~ titleData", titleData)
    const [length, setLength] = useState()



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

    useEffect(() => {
        getDataFromFirebase();
        getUniqueData()
    }, [stopData])


    return (
        <>hello</>
    )
}

export default TrialBalance  
