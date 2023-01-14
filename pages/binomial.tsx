import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
import styles from '@/styles/Home.module.css'
import React, {useState} from "react";
import {useRouter} from "next/router";

const inter = Inter({subsets: ['latin']})

const Binomial = () => {
  const router = useRouter();
  const [a_coef, setA] = useState("");
  const [b_coef, setB] = useState("");
  const [n_coef, setN] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    let a: number = Number(a_coef);
    let b: number = Number(b_coef);
    let n: number = Number(n_coef);

    // Validate input
    if (isNaN(Number(a)) || isNaN(Number(b)) || isNaN(Number(n))) {
      setError("Please enter valid numbers for coefficients a, b and n.");
      return;
    }

    // Validate input
    if (isNaN(Number(a)) || isNaN(Number(b)) || isNaN(Number(n))) {
      setError("Please enter valid numbers for coefficients a, b and n.");
      return;
    }

    // Calculate result
    let k = 1;
    let sum = 0;

    for (let i = 1; i <= n + 1; i++) {
      sum += k * (b ** (n - i + 1)) * (a ** (i - 1));
      k = k * (n - i + 2) / (i - 1);
    }
    let number = 5;
    setResult(number.toString(10));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          a:
          <input
            type="text"
            value={a_coef}
            onChange={(e) => setA(e.target.value)}
          />
        </label>
        <br />
        <label>
          b:
          <input
            type="text"
            value={b_coef}
            onChange={(e) => setB(e.target.value)}
          />
        </label>
        <br />
        <label>
          n:
          <input
            type="text"
            value={n_coef}
            onChange={(e) => setN(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div>{error}</div>}
      {result && <div>Result: {result}</div>}
    </div>
  );
}

export default Binomial;
