import { use, useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={() => {
    const randomIndex = Math.floor(Math.random() * props.anecdotes.length);
    props.setSelected(randomIndex);
  }}>
    next anecdote
  </button>
  )
}

const Votebutton = (props) => {
  return (
    <button onClick={() => {
      const copy = [...props.votes];
      copy[props.selected] += 1;
      props.setVotes(copy);
    }}>
      vote
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(8))

  const HighestVotesIdx = () => {
    let highestIndex = 0;
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > votes[highestIndex]) {
        highestIndex = i;
      }
    }
    return highestIndex;
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      {anecdotes[selected]}
      <div>
        has {votes[selected]} votes
      </div>
      <div>
        <Votebutton setVotes={setVotes} votes={votes} selected={selected}></Votebutton>
        <Button setSelected={setSelected} anecdotes={anecdotes}></Button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[HighestVotesIdx()]}
      </div>
      <div>
        has {votes[HighestVotesIdx()]} votes
      </div>
    </div>
  )
}

export default App
