import { useContext, useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { translateMessage } from "../../utils/translation";
import us from "../../assets/flag-us.svg";
import vn from "../../assets/flag-vn.svg";
import translate from "../../assets/translate-language.svg";
import moment from "moment";
import InputEmoji from "react-input-emoji";

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage } =
        useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");
    const scroll = useRef();
    const [targetLanguage, setTargetLanguage] = useState("vi");
    const [translatedMessages, setTranslatedMessages] = useState({});

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleLanguageChange = (newLanguage) => {
        setTargetLanguage(newLanguage);
    };

    const handleTranslate = async (message, targetLanguage) => {
        try {
            const translatedMessage = await translateMessage(
                message.text,
                targetLanguage
            );

            setTranslatedMessages((prevTranslations) => ({
                ...prevTranslations,
                [message._id]: translatedMessage,
            }));
        } catch (error) {
            console.error("Translation failed:", error);
        }
    };

    if (!recipientUser)
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                No conversation selected yet...
            </p>
        );

    if (isMessagesLoading)
        return (
            <p style={{ textAlign: "center", width: "100%" }}>
                Loading Chat...
            </p>
        );

    return (
        <Stack gap={4} className="chat-box">
            <div className="chat-header">
                <div></div>
                <strong>{recipientUser?.name}</strong>
                <div className="language-switcher">
                    <button
                        id="vietnamese"
                        onClick={() => handleLanguageChange("vi")}
                    >
                        <img src={vn} alt="" height="25px" />
                    </button>
                    <button
                        id="english"
                        onClick={() => handleLanguageChange("en")}
                    >
                        <img src={us} alt="" height="25px" />
                    </button>
                </div>
            </div>

            <Stack gap={3} className="messages">
                {messages &&
                    messages.map((message, index) => (
                        <Stack
                            key={index}
                            style={{
                                position: "relative",
                            }}
                            className={`${
                                message?.senderId === user?._id
                                    ? "message self align-self-end flex-grow-0"
                                    : "message align-self-start flex-grow-0"
                            }`}
                            ref={scroll}
                        >
                            <span>
                                {translatedMessages[message._id] ||
                                    message.text}
                            </span>

                            <span
                                className="messages-footer"
                                style={{ lineHeight: 2.5, fontSize: 12 }}
                            >
                                {moment(message.createdAt).calendar()}
                            </span>

                            <button
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    ...(message?.senderId === user?._id
                                        ? { left: 10, bottom: -10 }
                                        : { right: 10, bottom: -10 }),
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "50%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    outline: "none",
                                    border: "none",
                                }}
                                className="translate-btn"
                                onClick={() =>
                                    handleTranslate(message, targetLanguage)
                                }
                            >
                                <img src={translate} alt="" height="25px" />
                            </button>
                        </Stack>
                    ))}
            </Stack>

            <Stack
                direction="horizontal"
                gap={3}
                className="chat-input flex-grow-0"
            >
                <InputEmoji
                    value={textMessage}
                    onChange={setTextMessage}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            sendTextMessage(
                                textMessage,
                                user,
                                currentChat._id,
                                setTextMessage
                            );
                        }
                    }}
                    font-fontFamily="nunito"
                    borderColor="rgba(72, 112, 223, 0.2)"
                />
                <button
                    className="send-btn"
                    onClick={() => {
                        sendTextMessage(
                            textMessage,
                            user,
                            currentChat._id,
                            setTextMessage
                        );
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send-fill"
                        viewBox="0 0 16 16"
                    >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                </button>
            </Stack>
        </Stack>
    );
};

export default ChatBox;
