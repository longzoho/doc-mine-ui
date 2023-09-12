import React from "react";
import {useFirebase} from "../hook/UseFirebase";
import {Button} from "antd";
import {useGoogleAuth} from "../hook/UseGoogleAuth";

export default function Login() {
    useFirebase();
    const {signIn} = useGoogleAuth();

    return (
        <div>
            <h2>Login</h2>
            <Button type="primary" onClick={() => signIn()}>Login with Google</Button>
        </div>
    );
}