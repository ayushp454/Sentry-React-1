import './App.css'

function App() {

  const generateError = () => {
    throw new Error('Sentry - This is your sentry test error')
  }

  return (
    <>
      <h1>Sentry + React</h1>
      <div className="card">
        <button onClick={generateError}>
          Generate an Error
        </button>
      </div>
    </>
  )
}

export default App
