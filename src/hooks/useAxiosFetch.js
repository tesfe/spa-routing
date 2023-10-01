import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosFetch = (dataurl) => {
  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    let Ismount = true;
    // const source = axios.CancelToken.source();
    const controller = new AbortController();

    const fetch = async (url) => {
      try {
        const response = await axios.get(url, {
          signal: controller.signal,
          // cancelToken: source.token,
        });
        console.log(response.data);
        if (Ismount) {
          setDataa(response.data);
        }
      } catch (error) {
        if (Ismount) console.log(error.message);
      }
    };
    fetch(dataurl);
    //clean up
    return () => {
      Ismount = false;
      controller.abort();
      // source.cancel();
    };
  }, [dataurl]);

  return { dataa };
};

export default useAxiosFetch;
