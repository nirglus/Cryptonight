import { useState , useEffect} from 'react'
import { onAuthStateChanged, signOut, getAuth } from '@firebase/auth';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from './config/firebaseConfig';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Auth from './pages/Auth';
import Footer from './components/Footer';
// import './App.css'

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() =>{ 
    onAuthStateChanged(auth, (userCardential) =>{
        if (userCardential){
            setUser({ email: userCardential.email, id: userCardential.uid});
            console.log(user);
        }
    })}, []);

    const userAuth = getAuth();
    const userSignOut = () => {
      signOut(userAuth)
        .then(() => {
          console.log("Signed out");
        })
        .catch((error) => {
          console.error("Error signing out: ", error);
        })
        .finally(() => {
          setUser(null); 
        });
    };
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    {user ? <button onClick={userSignOut}>Sign out</button> : null}
        <Routes>
          <Route path='/' element={<Home user={user}/>}/>
          <Route path='/about'/>
          <Route path='/favorites'/>
          <Route path='/login' element={<Auth setUser={setUser} />} />
        </Routes>
    <Footer />
    </BrowserRouter>

    </>
  )
}

export default App
