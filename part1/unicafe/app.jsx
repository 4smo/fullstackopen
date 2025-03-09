import { useState } from 'react'

const Header = () => {
  return <h1>give feedback</h1>
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Buttons = (props) => {
  return (
    <div>
      <Button text="good" onClick={() => props.setGood(prev => prev + 1)} />
      <Button text="neutral" onClick={() => props.setNeutral(prev => prev + 1)} />
      <Button text="bad" onClick={() => props.setBad(prev => prev + 1)} />
    </div>
  )
}

const Subheader = () => {
  return <h1>statistics</h1>
}

const Statistics = (props) => {
  if (props.total > 0) {
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{props.total}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{props.average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{`${(props.positive * 100).toFixed(1)} %`}</td>
          </tr>
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const StatisticLine = (props) => {
  return (
    <div>
      {props.name} {props.value}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + bad + neutral
  let average = all > 0 ? (good - bad) / all : 0
  let positive = all > 0 ? good / all : 0

  return (
    <div>
      <Header />
      <Buttons setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Subheader />
      <Statistics good={good} neutral={neutral} bad={bad} total={all} average={average} positive={positive}/>

    </div>
  )
}

export default App
