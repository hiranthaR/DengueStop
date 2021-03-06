import React, { useEffect, useState } from "react";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBModalHeader,
    MDBIcon,
} from "mdbreact";
import "./login.css";
import AuthService from "../../services/authService";
import { setSession } from "../../services/sessionService";

const Login = (props) => {
    const authService = new AuthService();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isWarningOpen, setIsWarningOpen] = useState(false);

    useEffect(() => {
        console.log(username);
    }, [username]);
    // eslint-disable-next-line
    const validEmailRegex = RegExp(
        // eslint-disable-next-line
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    const submitCredentials = (event) => {
        event.preventDefault();
        event.target.className += " was-validated";
        const emailValidate = validEmailRegex.test(username);
        const passwordValidate = password !== "";

        if (emailValidate && passwordValidate) {
            authService.loginAdminUser(username, password).then((res) => {
                if (res && res.login_res === true) {
                    setSession(res);
                    props.history.push("/dash/home");
                } else {
                    //show error message
                    setIsWarningOpen(true);
                }
            });
        } else {
            setIsWarningOpen(true);
        }
    };

    return (
        <MDBContainer className="login-main-container" fluid>
            <MDBModal
                modalStyle="danger"
                className="text-white"
                size="sm"
                centered
                position="top-center"
                isOpen={isWarningOpen}
                toggle={() => setIsWarningOpen(false)}
            >
                <MDBModalHeader
                    className="text-center font-weight-bold"
                    titleClass="w-100"
                    tag="p"
                >
                    Access Denied
                </MDBModalHeader>
                <MDBModalBody className="text-center">
                    <MDBIcon
                        icon="times"
                        size="4x"
                        className="animated rotateIn"
                    />
                    <p>
                        Username or Password you have entered is invalid. Please
                        try again.
                    </p>
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBBtn
                        color="danger"
                        outline
                        onClick={() => setIsWarningOpen(false)}
                    >
                        Okay
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
            <MDBRow className="h-100">
                <MDBCol sm="1" md="1" lg="2"></MDBCol>
                <MDBCol sm="10" md="10" lg="8">
                    <MDBCard className="login-card p-0 m-0">
                        <MDBCardBody className="p-0 m-0">
                            <MDBRow className="h-100 p-0 m-0">
                                <MDBCol className="splash-overlay p-0 m-0">
                                    <div className="login-splash-panel"></div>
                                </MDBCol>
                                <MDBCol className="p-5 m-0">
                                    <MDBRow>
                                        <MDBCol>
                                            <h3 className="my-5 text-center font-weight-bolder">
                                                Welcome to Dengue-Stop
                                            </h3>
                                        </MDBCol>
                                    </MDBRow>
                                    <form
                                        className="needs-validation"
                                        onSubmit={(event) =>
                                            submitCredentials(event)
                                        }
                                        noValidate
                                    >
                                        <MDBRow>
                                            <MDBCol>
                                                <div className="form-group text-center mt-5 px-5">
                                                    <label>Username</label>
                                                    <input
                                                        required
                                                        value={username}
                                                        type="email"
                                                        className="form-control form-control-lg"
                                                        onChange={(event) =>
                                                            setUsername(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a proper
                                                        email format
                                                    </div>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <div className="form-group text-center mt-4 px-5">
                                                    <label>Password</label>
                                                    <input
                                                        required
                                                        value={password}
                                                        type="password"
                                                        className="form-control form-control-lg"
                                                        onChange={(event) =>
                                                            setPassword(
                                                                event.target
                                                                    .value
                                                            )
                                                        }
                                                    />
                                                    <div className="invalid-feedback">
                                                        Please provide a
                                                        password
                                                    </div>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <div className="mt-5 px-5">
                                                    <MDBBtn
                                                        size="lg"
                                                        type="submit"
                                                        block
                                                    >
                                                        Sign in
                                                    </MDBBtn>
                                                </div>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <MDBCol sm="1" md="1" lg="2"></MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default Login;
