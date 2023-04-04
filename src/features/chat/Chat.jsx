import React, {useEffect, useState} from "react";
import * as signalR from "@microsoft/signalr";
import {BASE_API_URL} from "../../enviroment";
import {getItem} from "../../core/utils/localStorage";
function Chat() {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [chatUsers, setChatUsers] = useState([]);
	const [signalRState, setsignalRState] = useState("Disconnected");
	const [connection, setConnection] = useState(null);

	useEffect(() => {
		// withAutomaticReconnect => Eğer bağlantı hiç sağlanamamışsa tekrar denenmez.
		// Eğer tekrar bağlantı sağlanmaya çalışılıyor ise default olarak [0,2000,1000,30000]
		const newConnection = new signalR.HubConnectionBuilder()
			.withUrl(`${BASE_API_URL}chathub`, {
				accessTokenFactory: () => {
					return getItem("token");
				},
			})
			.withAutomaticReconnect([1000, 1000, 1000, 5000])
			.build();

		setConnection(newConnection);
	}, []);

	useEffect(() => {
		if (
			connection &&
			connection.state === signalR.HubConnectionState.Disconnected
		) {
			connection
				.start()
				.then(() => {
					console.log("Connected with id:" + connection.connectionId);

					connection.on("ReceiveMessage", onMessageReceived);

					connection.on("UserListChanged", list => {
						setChatUsers(list);
					});

					connection.on("MessagesChanged", messages => {
						setMessages(messages);
					});
				})
				.catch(error => console.log("Connection Error:", error));
		}
	}, [connection]);

	useEffect(() => {
		console.log("Mesajlar değişti:", messages);
	}, [messages]);

	const onMessageReceived = message => {
		console.log(message);
	};

	// Bağlantı hiç sağlanmadı, sağlanana kadar retry
	const startConnection = async () => {
		if (connection.state !== signalR.HubConnectionState.Disconnected) return;
		try {
			await connection.start();
			setsignalRState(connection.state);
		} catch (e) {
			console.log("WebSocket'e bağlanılamadı, tekrar deneniyor.");
			setTimeout(() => {
				startConnection();
			}, 2000);
		}
	};

	const sendMessage = async () => {
		// await startConnection();
		connection
			.invoke("SendMessageAsync", message)
			.catch(error => console.log("Mesaj gönderilirken hata oluştu:", error));
	};
	return (
		<div className="container">
			<h3>Mesaj Gönder</h3>
			<h3>Connection State: {connection?.state}</h3>
			<h3>Chatteki kişiler:</h3>
			<ul>
				{chatUsers.map(user => (
					<li>{user}</li>
				))}
			</ul>
			<input
				type="text"
				name="message"
				onChange={e => setMessage(e.target.value)}
				value={message}
			></input>
			<button
				onClick={() => {
					sendMessage();
				}}
			>
				Gönder
			</button>

			<h3>Mesajlar</h3>
			<ul>
				{messages.map(receivedMessage => (
					<li key={receivedMessage.message}>
						{receivedMessage.senderId == connection.connectionId
							? "Siz"
							: receivedMessage.senderFullName}
						: {receivedMessage.message}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Chat;
