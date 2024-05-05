/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "../firebase";
import toast from "react-hot-toast";
import axios from "@/axios/axios";
export const AuthContext = createContext();
export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);

  // sign-in user
  const signInUser = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
      const user = auth.currentUser;
      setAuthUser({
        ...user,
      });
      const userData = {
        name: user?.displayName,
        email: user?.email,
        avatar: user?.photoURL,
      };
      await axios.post("/posts/token", userData, { withCredentials: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  //logout user
  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };
  // auth state observer
  useEffect(() => {
    const auth = getAuth();
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => unSubscribe();
  }, []);

  const authValue = { authUser, signInUser, logout };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
