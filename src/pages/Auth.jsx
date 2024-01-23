import { useState } from "react";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "@firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "../config/firebaseConfig";
import { db } from "../config/firebaseConfig";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

function Auth(props){
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({});

    const handleToggle = () =>{
        setIsLoginMode(!setIsLoginMode);
    }

    const changeHandler = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const addUserToDB = async (userCard) =>{
        try {
            const newUserRef = doc(db, "users", userCard.user.uid);
            await setDoc(newUserRef, {email: userCard.user.email, id: userCard.user.uid});
            console.log("User added to the db succesfully!");
          } catch (error) {
            console.error("Error adding document: ", error);
          }
    }
    const submitHandler = async (e) =>{
        e.preventDefault();

        if(isLoginMode){
            const userCard = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )
            props.setUser(userCard.user);
            console.log("Logged in succesfully");
            }else {
                const userCard = await createUserWithEmailAndPassword(
                  auth,
                  formData.email,
                  formData.password
                );
                console.log("Registered succesfully");
                props.setUser(userCard.user);
                addUserToDB(userCard);
              }
        };

        return (
            <div className="loginCont">
                {
                    isLoginMode? 
                    <Login submitHandler={submitHandler} changeHandler={changeHandler} />
                    :
                    <SignUp submitHandler={submitHandler} changeHandler={changeHandler} />
                }
                <p onClick={handleToggle}>
                    {isLoginMode ? "Not a member? Create an account" : "Already a member? Sign in"}
                </p>
            </div>
        )
}

export default Auth;