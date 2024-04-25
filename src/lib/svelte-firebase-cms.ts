import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { loggedIn, setLogin, setLogout } from "./store/user.store.js";



interface SvelteFirebaseCmsOptions {

    firebaseClientConfig: { [key: string]: any };
}


export class SvelteFirebaseCms {
    static app: FirebaseApp | null = null;
    static initialized = false;
    static options: SvelteFirebaseCmsOptions | null = null;
    static init(options: SvelteFirebaseCmsOptions) {
        if (this.initialized) return;

        this.options = options;
        this.initialized = true;


        console.log(options.firebaseClientConfig)
        this.app = initializeApp(options.firebaseClientConfig);


        const auth = getAuth(this.app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                // const uid = user.uid;
                setLogin();
                console.log('--> login user', user);
                // ...
            } else {
                // User is signed out
                // ...
                setLogout();
            }

            console.log('user sign in status:', loggedIn);
        });


    }
}