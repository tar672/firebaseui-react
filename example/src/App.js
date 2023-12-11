import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

// in your app, use this import instead:
// import FirebaseUI from "react-firebaseui";
import FirebaseUI from "../../src/index";
import firebaseConfig from "./firebaseConfig.json";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default function Home() {

  const UIConfig = {
    continueUrl: "http://localhost:8080",
    // requireVerifyEmail: true,
    callbacks: {
      signInSuccessWithAuthResult: function (user) {
        console.log("successfully authenticated", user);
      },
      signInFailure: function (error) {
        console.log("somtin went wrong :9 :((");
        console.error(error);
      },
    },
    passwordSpecs: { containsSpecialCharacter: true, minCharacters: 8 },
    signInOptions: [
      {
        provider: "emailpassword",
      },
      {
        provider: "google.com",
        customParameters: { prompt: "select_account" },
      },
      "apple.com",
      "microsoft.com",
      "yahoo.com",
      "github.com",
      "x.com",
      "phonenumber",
      "facebook.com",
      {
        provider: "emaillink",
        fullLabel: "bruh"
      },
      "anonymous",
    ],

    // formButtonStyles: { backgroundColor: "#000000" },
    // formDisabledStyles: { fontWeight: '100' },
    // formInputStyles: { backgroundColor: "#00dd00" },
    // formLabelStyles: { fontSize: '20px' }
  };

  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <main>
      <h1>React FirebaseUI Component Demo</h1>
      <FirebaseUI auth={auth} config={UIConfig} />
      {user && (
        <div>
          <pre>{JSON.stringify({ user }, null, 2)}</pre>
          <button onClick={() => signOut(auth)}>Sign Out</button>
        </div>
      )}
    </main>
  );
}
