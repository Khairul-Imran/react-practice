import './App.css'
import Counter from './components/Counter/Counter';

function App() {

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Counter App</h1>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <Counter />
        </div>
      </div>
    </div>
  );
}

export default App
