import { useState } from "react";
import useWasm from "../../hooks/useWasm";

// adding inputs
const addWasm = process.env.PUBLIC_URL + "/test.wasm";

const AddWsam = () => {

  const [number1, setNumber1] = useState(Number);
  const [number2, setNumber2] = useState(Number);

  const [result, setResult] = useState();

  const { instance, error, loaded } = useWasm(addWasm);

  // when input change then set result 
  function handel() {
    const addNumber = instance.exports._Z3addff;
    const sum = addNumber(number1, number2);
    setResult(sum);
  }
  
  if (error) {
    return <h1>error</h1>;
  }

  if (loaded) {
    return <h1>loading...</h1>;
  }


  return (
    <>
      <div>
        <h1>Add Data in wasma </h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "200px",
            margin: "auto",
          }}
        >
          <input
            type="number"
            placeholder="Enter Number"
            value={number1}
            onChange={
                (e) => {
                    setNumber1(e.target.value)
                    handel()
                }
            }
          />

          <input
            type="number"
            placeholder="Enter Number"
            value={number2}
            onChange={
                (e) => {
                    setNumber2(e.target.value)
                    handel()
                }
            }
          />
        </form>

        <button onClick={handel}>Add</button>
        <h1>Result: {result} </h1>
      </div>
    </>
  );
};

export default AddWsam;
