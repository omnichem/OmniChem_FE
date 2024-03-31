import axios from 'axios';
import React, { useEffect } from 'react';

const Testnew = () => {
  useEffect(() => {
    axios
      .get('http://212.233.79.177/API/v1/commerce/products/')
      .then(response => {
        console.log(response.data.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return;
  <div></div>;
};

export default Testnew;
