import {
  Auth,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  User,
  AuthCredential
} from "@firebase/auth";
import {useEffect, useState,} from "react";
import {useFirebase} from "./UseFirebase";

interface Error {
  code: string;
  message: string;
}

export const useGoogleAuth = () => {
  const provider = new GoogleAuthProvider();
  const [auth, setAuth] = useState<Auth | undefined>();
  const [user, setUser] = useState<User | undefined>();
  const [token, setToken] = useState<string | undefined>();
  const [error, setError] = useState<Error | undefined>();
  const signIn = () => {
    if (!auth) return;
    return signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setToken(credential?.accessToken);
        setUser(result.user);
      }).catch((error) => {
        setError(error)
      });
  };
  useFirebase();
  useEffect(() => {
    setAuth(getAuth());
  }, []);
  useEffect(() => {
    if (!auth) return;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        user.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setUser(undefined);
      }
    });
  }, [auth]);
  return {
    auth,
    provider,
    accessToken: token,
    email: user?.email,
    photoURL: user?.photoURL,
    userId: user?.uid,
    signIn, error
  }
}