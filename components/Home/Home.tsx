import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { MdMessage } from "react-icons/md";
import { GoKebabVertical } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";

import styles from "./Home.module.scss";
import AllChats from "./AllChats/AllChats";
import MessageInput from "./MessageInput/MessageInput";
import ChatMessages from "./ChatMessages/ChatMessages";
import { MessageType, UserType } from "types/ChatTypes";
import { useMutation, useQuery, useSubscription } from "urql";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useRouter } from "next/router";
import MenuIcon from "components/Shared/MenuIcon/MenuIcon";
import Menu from "components/Shared/Menu/Menu";
import { setUser } from "store/reducers/generalReducer";
const messageSubscription = `
subscription ($to: String) {
  message(to: $to) {
    text
    to
    from
  }
}
`;
const createMessageMutation = `
mutation ($text: String, $to: String, $from: String) {
  createMessage(text: $text, to: $to, from: $from) {
    message
  }
}
`;
//
const getUsersQuery = `
  query {
    getUsers {
      name
      phone
    }
  }
`;
const getMessagesForUserQuery = `
  query($phone: String) {
    getMessagesForUser(phone: $phone) {
      text
      to
      from
    }
  }
`;
interface HomeProps {}
function Home({}: HomeProps) {
  const user = useAppSelector((state) => state.general.user);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!user || !user.phone) {
      router.push("/login");
    }
  }, [router, user]);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const chatMessagesContainerRef = useRef<HTMLDivElement>(null);

  const [getUsersResult, reExecuteGetUsersQuery] = useQuery({
    query: getUsersQuery,
  });
  const [getMessagesForUserResult, reExecuteGetMessagesForUserQuery] = useQuery(
    {
      query: getMessagesForUserQuery,
      variables: {
        phone: user.phone,
      },
      pause: !!!user.phone,
    }
  );
  useEffect(() => {
    // console.log(getMessagesForUserResult.data);
    setMessages(getMessagesForUserResult?.data?.getMessagesForUser || []);
  }, [getMessagesForUserResult]);
  const [selectedUser, setSelectedUser] = useState<UserType>();
  const [createMessageResult, createMessage] = useMutation(
    createMessageMutation
  );

  useEffect(() => {
    const scrollHeight = chatMessagesContainerRef.current?.scrollHeight;
    chatMessagesContainerRef.current?.scrollTo({ top: scrollHeight });
  }, [messages, selectedUser]);
  const [res] = useSubscription(
    {
      query: messageSubscription,
      variables: {
        to: user.phone,
      },
    },
    (_, res) => {
      console.log(res.message);
      setMessages((prev) => [...prev, res.message]);
    }
  );
  const sendMessage = async () => {
    if (messageInput && selectedUser) {
      // console.log(messageInput);
      const messageInputCopy = messageInput;
      setMessages((prev) => [
        ...prev,
        { text: messageInputCopy, to: selectedUser.phone, from: user.phone },
      ]);

      const result = await createMessage({
        text: messageInputCopy,
        to: selectedUser?.phone,
        from: user.phone,
      });
      console.log(result);
      setMessageInput("");
    }
  };
  const chatMessages = useMemo(() => {
    return messages.filter(
      (message) =>
        message.to === selectedUser?.phone ||
        message.from === selectedUser?.phone
    );
  }, [messages, selectedUser]);
  return (
    <div className={styles.Home}>
      <div className={styles.left}>
        <div className={styles.topBar}>
          <div className={styles.profileImageContainer}>
            <Image src="/profile.jpg" alt="profile" width={40} height={40} />
          </div>
          <div className={styles.name}>{user?.name}</div>
          <div style={{ flex: 1 }}></div>
          <MenuIcon Icon={MdMessage} />
          <MenuIcon
            Icon={GoKebabVertical}
            menuList={[
              {
                value: "New Group",
                func: () => {
                  console.log("New Group");
                },
              },
              {
                value: "Log out",
                func: () => {
                  dispatch(setUser({ name: "", phone: "" }));
                },
              },
            ]}
          />
        </div>
        <div className={styles.allChatsContainer}>
          <AllChats
            users={getUsersResult.data?.getUsers.filter(
              (u: UserType) => u.phone !== user.phone
            )}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.topBar}>
          <div className={styles.profileImageContainer}>
            <Image src="/profile.jpg" alt="profile" width={40} height={40} />
          </div>
          <div className={styles.name}>{selectedUser?.name}</div>
          <div style={{ flex: 1 }}></div>
          <MenuIcon Icon={AiOutlineSearch} />
          <MenuIcon Icon={GoKebabVertical} />
        </div>
        <div
          className={styles.chatMessagesContainer}
          ref={chatMessagesContainerRef}
        >
          <ChatMessages messages={chatMessages} />
        </div>

        <div className={styles.messageInputContainer}>
          <MessageInput
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
