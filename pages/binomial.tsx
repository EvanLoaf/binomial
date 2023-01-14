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
    setError('');
    setResult('');

    let a: number = Number(a_coef);
    let b: number = Number(b_coef);
    let n: number = Number(n_coef);

    // Validate input
    if (isNaN(a) || isNaN(b) || isNaN(n)) {
      setError("Please enter valid numbers for coefficients a, b and n.");
      return;
    }

    // Validate input
    if (a > 1000 || b > 1000 || n > 1000) {
      setError("Values cannot be over 1000 due to limited computing power");
      return;
    }

    if ((!Number.isInteger(n) || n < 1) && b !== 1) {
      setError("For non-natural n, only b = 1 accepted");
      return;
    }

    let res: string = '';

    if (!Number.isInteger(n) || n < 1) {
      res = CalculateForNonNaturalN(a, b, n);
    } else {
      res = CalculateForNaturalN(a, b, n);
    }

    setResult(res);
  };

  const CalculateForNaturalN = (a : number, b : number, n : number) : string => {
    let i : number = 1;
    let k : number = 1;
    return CalcTerm(a, b, n, i, k);
  }

  const CalculateForNonNaturalN = (a : number, b : number, n : number) : string => {
    return 'Not yet implemented for non-natural n';
  }

  const CalcTerm = (a : number, b : number, n : number, i : number, k : number) : string => {
    let prev_result !: string;
    let next_i : number = i + 1;
    let next_k : number = k * (n - (next_i - 2)) / (next_i - 1);
    if (i < n + 1) {
      prev_result = CalcTerm(a, b, n, next_i, next_k);
    }
    let x_coef : number = k * (b ** (n - i + 1)) * (a ** (i - 1));
    console.log('k = ' + k + ', i = ' + i + ', a = ' + a + ', b = ' + b + ', n = ' + n);
    console.log(x_coef);
    let term_result : string = x_coef + 'x^' + (i - 1);
    if (prev_result != null) {
      return prev_result.concat(' + ').concat(term_result);
    } else return term_result;
  }

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
