import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const {
        loginInfo,
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
    } = useContext(AuthContext);
    return (
        <>
            <Form onSubmit={loginUser}>
                <Row
                    style={{
                        height: "100%",
                        justifyContent: "center",
                        paddingTop: "10%",
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
                                Login
                            </h2>
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                onChange={(e) =>
                                    updateLoginInfo({
                                        ...loginInfo,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                onChange={(e) =>
                                    updateLoginInfo({
                                        ...loginInfo,
                                        password: e.target.value,
                                    })
                                }
                            />
                            <Button variant="primary" type="submit">
                                {isLoginLoading ? "Getting you in..." : "Login"}
                            </Button>
                            {loginError?.error && (
                                <Alert variant="danger">
                                    <p>{loginError?.message}</p>
                                </Alert>
                            )}
                        </Stack>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Login;
