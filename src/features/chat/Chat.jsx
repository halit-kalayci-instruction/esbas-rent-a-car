import React, {useEffect, useState} from "react";
import * as signalR from "@microsoft/signalr";
import {BASE_API_URL} from "../../enviroment";
function Chat() {
	const [message, setMessage] = useState("");
	const [signalRState, setsignalRState] = useState("Disconnected");
	const connection = new signalR.HubConnectionBuilder()
		.withUrl(`${BASE_API_URL}chathub`)
		.withAutomaticReconnect([1000, 1000, 1000, 5000])
		// => Eğer bağlantı hiç sağlanamamışsa tekrar denenmez.
		// Eğer tekrar bağlantı sağlanmaya çalışılıyor ise default olarak [0,2000,1000,30000]
		.build();

	useEffect(() => {
		connection.start().then(response => {
			setsignalRState(connection.state);
		});
	}, []);

	const sendMessage = async () => {
		if (connection.state !== signalR.HubConnectionState.Connected) {
			await connection.start();
			setsignalRState(connection.state);
		}
		connection
			.invoke("SendMessageAsync", message)
			.catch(error => console.log("Mesaj gönderilirken hata oluştu:", error));
	};
	return (
		<div className="container">
			<h3>Mesaj Gönder</h3>
			<h3>Connection State: {signalRState}</h3>
			<input
				type="text"
				name="message"
				onChange={e => setMessage(e.target.value)}
				value={message}
			></input>
			<button onClick={sendMessage}>Gönder</button>
		</div>
	);
}

export default Chat;
