import './App.css'
import { AppRouter } from './routes/AppRouter'
import { ColorModeScript, ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './providers/AuthProvider'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <ColorModeScript />
        <ChakraProvider>
          <AppRouter/>
        </ChakraProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
