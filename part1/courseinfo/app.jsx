const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>{props.parts[0].text} {props.parts[0].exc}</p>
      <p>{props.parts[1].text} {props.parts[1].exc}</p>
      <p>{props.parts[2].text} {props.parts[2].exc}</p>
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3} </p>
    </div>
  )
}

const App = () => {
  const parts = [
    {text: "Fundamentals of React", exc: 10},
    {text: "Using props to pass data", exc: 7},
    {text: "State of a component", exc: 14}
  ]
  const course = 'Half Stack application development'

  return (
    <>
    <Header course={course}></Header>
    <Content parts={parts}></Content>
    <Total exercises1={parts[0].exc} exercises2={parts[1].exc} exercises3={parts[2].exc}></Total>
    </>
  )
}

export default App
