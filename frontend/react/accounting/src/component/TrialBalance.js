import React, { useEffect, useState } from 'react';
import FirebaseStack from '../firebase/firebasev9';
import { ref, get, child } from "firebase/database"


const TrialBalance = () => {

    const dbRef = ref(FirebaseStack());

    const [firebaseData, setFirebaseData] = useState();
    // console.log("🚀 ~ file: TrialBalance.js ~ line 11 ~ TrialBalance ~ firebaseData", firebaseData)
    const [stopData, setStopData] = useState(true)
    const [titleData, setTitle] = useState()
    console.log("🚀 ~ file: TrialBalance.js ~ line 14 ~ TrialBalance ~ titleData", titleData)


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

    useEffect(() => {
        getDataFromFirebase()
    }, [])

    const getDebitData = async (data) => {
        data && data.map((object, key) => {
            console.log("🚀 ~ debit data", object.title)
        })
    }

    const getCreditData = async (data) => {
        var Arr = []
        data && data.map((object, key) => {
            Arr.push(object.title)
        })
    }

    useEffect(() => {
        var array = [];
        firebaseData && firebaseData.map((obj, key) => {
            // if (obj.debit) {
            obj.debit && obj.debit.map((object, key) => {
                // console.log("🚀 ~ title debit", object.title)
                // setTitle([...titleData, object.title])
                array.push(object.title)
            })
            obj.credit && obj.credit.map((object, key) => {
                // console.log("🚀 ~ title credit", object.title)
                array.push(object.title)

            })
            console.log("🚀 ~ file: TrialBalance.js ~ line 51 ~ firebaseData&&firebaseData.map ~ array", array)
            // }
            // else if (obj.credit) {
            //     obj.debit && obj.debit.map((object, key) => {
            //         console.log("🚀 ~ title credit", object.title)
            //     })
            // }
            // getDebitData(obj.debit);
            // getCreditData(obj.credit)
        })
        let unique = [...new Set(array)]
        setTitle(unique)
    }, [firebaseData])


    return (
        <>hello</>
    )
}

export default TrialBalance  
