import { useState } from 'react'
import './App.css'
import { ImCross } from "react-icons/im";
import { FaPlusCircle } from "react-icons/fa";
import usecalculateNPV from '../Functions/useCalculateNPV.js';
import usecalculateDiscountedPaybackPeriod from '../Functions/usecalculateDiscountedPaybackPeriod.js'
import usecalcPaybackPeriod from '../Functions/useCalcPaybackPeriod.js'
import usecalculateIRR from '../Functions/useCalculateIRR.js'
import usecalculateCFRR from '../Functions/usecalculateCFRR.js';
function FinanceCalculator() {
  const [cashFlow, setCashFlow] = useState(['', '']);
  const [initialInvestment, setInitialInvestment] = useState('');
  const [discountRate, setDiscountRate] = useState('');
  const[irr, setIrr]= useState('');
  const [npv, setNpv] = useState('');
  const [paybackPeriod, setPaybackPeriod] = useState('');
  const [discountedPaybackPeriod, setDiscountedPaybackPeriod] = useState('');
  const[cfrr, setCfrr] = useState('');
  

  const addNewYear = () => {
    setCashFlow((prev)=>[...prev, ""]);
  };

  const calculate = (e)=>{
    e.preventDefault()
    let newArr = cashFlow.map((str)=>parseInt(str));
    setCfrr(()=>usecalculateCFRR(newArr, initialInvestment))
    newArr.unshift(0 - parseInt(initialInvestment));
    console.log(newArr)
    const IRR = usecalculateIRR(newArr);
    const NPV = usecalculateNPV(newArr, parseInt(discountRate)/100);
    const PPeriod = usecalcPaybackPeriod(newArr);
    if (PPeriod !== -1) {
      setPaybackPeriod(PPeriod.toFixed(2)) 
    } else {
      setPaybackPeriod('The investment is never fully recovered.');
    }

    const DPaybackPeriod = usecalculateDiscountedPaybackPeriod(newArr, parseInt(discountRate)/100);
    if (DPaybackPeriod !== -1) {
      setDiscountedPaybackPeriod((discountedPaybackPeriod*1).toFixed(2))
    } else {
      setDiscountedPaybackPeriod('The investment is never fully recovered.')
    }
    
    setNpv(NPV);
    setIrr(IRR);

  }

  return (
    <main className='main'>
    <h1>Financial analysis software</h1>
    <div className='calculator'>
      <form className="left" 
        onSubmit={calculate}>
        <div className="top">
          <div className='topInput'>
            <label htmlFor="initialInvestment">Initial Investment</label>
            <div>
              <span>Ksh</span>
              <input type="text" name='initialInvestment' id='initialInvestment' value={initialInvestment}
               onChange={(e)=>{ setInitialInvestment(e.target.value) }} required/>
            </div>
          </div>

          <div className='topInput'>
            <label htmlFor="discountRate">Discount Rate</label>
            <div>
              <input type="text" name='discountRate' id='discountRate' value={discountRate} 
              onChange={(e)=>{setDiscountRate(e.target.value)}} required/>
              <span>%</span>
            </div>
          </div>
        </div>

        <div className="bottom">
          <h2>Cash Flow</h2>
          {cashFlow.map((year, index)=>{
            return(
              <div className='cashFlowInput' key={index}>
                <label htmlFor='year1'>Year {index + 1}: Ksh</label>
                <input type="text" name='year1' id='year1' value={year} 
                onChange={(e)=>{
                  let newArray = cashFlow.slice();
                  newArray[index] = e.target.value;
                  setCashFlow(newArray);
                }} required/>
                <button onClick={()=>{
                  let newArray = cashFlow.slice();
                  newArray.splice(index, 1);
                  setCashFlow(newArray);
                }}><span><ImCross/></span></button>
              </div>
            )
          })}
        </div>

        <div className="calcButtons">
          <button onClick={addNewYear}><span><FaPlusCircle/></span>Add Year</button>
          <button type='submit'>Calculate</button>
        </div>

      </form>

      <div className="right">
        <h2>Results</h2>
        <p>Net Present Value: <span>Ksh {(npv * 1).toFixed(2)}</span></p>
        <p>Internal Rate of Return <span>{(irr * 100).toFixed(2)}%</span></p>
        <p>Payback Period <span>{paybackPeriod || 0} years</span></p>
        <p>Discounted Payback Period <span>{discountedPaybackPeriod || 0} years</span></p>
        <p>Cash Flow Return Rate<span>{(cfrr * 100).toFixed(2)}% per year</span></p>
      </div>
    </div>

    </main>
  )
}



export default FinanceCalculator;

//isaacoteyo@jkuat.ac.ke
