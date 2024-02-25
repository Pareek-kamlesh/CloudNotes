import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import {
  BrowserRouter,
  Route,
  Routes
  
} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
    <>
    <BrowserRouter>
    <NoteState>
     <Navbar />
    <Alert message={"Hello this is alert"}/>
     <div className="container my-4">
     
    
       <Routes>
       <Route exact path="/" element={<Home />}></Route>
         <Route exact path="/about" element={<About />}></Route>
         <Route exact path="/login" element={<Login />}></Route>
         <Route exact path="/signup" element={<Signup />}></Route>
        
       </Routes> 
     </div>
     </NoteState>
    </BrowserRouter>
       
 </>
  );
}

export default App;
