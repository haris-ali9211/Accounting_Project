import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';

function DarkExample() {

  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState([]);
  console.log("🚀 ~ file: App.jsx ~ line 8 ~ App ~ apiData", apiData)

  useEffect(() => {

    fetch("http://localhost:5000/sql/all")
      .then(response => response.json())
      .then(json => {
        setApiData(json);
      })
      .catch(err => {
        console.error(err);
      })
  }, [])


  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Account Name</th>
          <th>Amount</th>
          <th>Code</th>
          <th>Credit</th>
          <th>Debit</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {apiData ? apiData.map((obj, key) => {
          var today = new Date();
          var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date + ' ' + time;
          return (
            <>
              <tr colSpan={2} key={key}>
                <td>{key}</td>
                <td>{dateTime}</td>
                <td>{obj.Debit_Data}</td>
                <td>{obj.Credit_Data_Amount_Type_Entry}</td>
                <td>{obj.Debit_Info_Nature == "credit" ? "credit" : null}</td>
                <td>{obj.Debit_Info_Nature == "Debit" ? "Debit" : null}</td>
                <td>{obj.Debit_Info_Amount}</td>
              </tr>
              <tr key={key + 1}>
                <td>{key}</td>
                <td>{dateTime}</td>
                <td>{obj.Credit_Data}</td>
                <td>{obj.Credit_Data_Amount_Type_Entry}</td>
                <td>{obj.Credit_Data_Amount_Nature == "Credit" ? "Credit" : null}</td>
                <td>{obj.Credit_Data_Amount_Nature == "Debit" ? "Debit" : null}</td>
                <td>{obj.Credit_Data_Amount}</td>
              </tr>
            </>

          )
        })
          :
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>}
      </tbody>
    </Table>
  );
}

export default DarkExample;