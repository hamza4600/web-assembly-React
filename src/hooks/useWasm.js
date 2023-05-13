// useWsam js
import { useState, useEffect } from "react";

const useWasm = (wasmModulePath) => {
  const [wasm, setWasm] = useState({
    loaded: false,
    instance: null,
    error: null,
  });

  useEffect(() => {

    const fetchWasm = async () => {
      try {

        setWasm({
            loaded: true,
            instance: null,
            error: null,
        });

        const wasm = await fetch(wasmModulePath);
        const buffer = await wasm.arrayBuffer();
        const module = await WebAssembly.compile(buffer);
        const instance = await WebAssembly.instantiate(module);
        
        setWasm({
          loaded: false,
          instance: instance,
          error: null,
        });
        
      } catch (err) {
        setWasm({
          loaded: false,
          instance: null,
          error: err,
        });
      }
    };

    fetchWasm();
  }, [wasmModulePath]);
  return wasm;
};
export default useWasm;
