import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
    const {
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
    } = useContext(AuthContext);
    return (
        <>
            <Form onSubmit={registerUser}>
                <Row
                    style={{
                        height: "100%",
                        justifyContent: "center",
                        paddingTop: "5%",
                    }}
                >
                    <Col
                        style={{
                            background: "white",
                            borderRadius: "8px",
                            padding: "20px 20px 40px",
                        }}
                        xs={4}
                    >
                        <Stack
                            style={{
                                marginTop: "20px",
                            }}
                            gap={3}
                        >
                            <h2 className="fw-bold mb-2 text-uppercase text-center text-dark">
                                Register
                            </h2>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        name: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    updateRegisterInfo({
                                        ...registerInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button variant="primary" type="submit">
                                {isRegisterLoading
                                    ? "Create your account"
                                    : "Register"}
                            </Button>
                            {registerError?.error && (
                                <Alert variant="danger">
                                    <p>{registerError?.message}</p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Register;
