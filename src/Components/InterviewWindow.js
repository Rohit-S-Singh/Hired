import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const InterviewWindow = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [stompClient, setStompClient] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const [localStream, setLocalStream] = useState(null);


  const username = "Rohit"; // Replace with dynamic username if needed

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WebSocket");
  
        // ✅ Subscribe to user joined event
        client.subscribe("/topic/users", (message) => {
          const joinedUser = message.body;
          console.log("User joined:", joinedUser);
          setMessages((prev) => [...prev, `${joinedUser} joined the interview`]);
        });
  
        // ✅ Announce this user has joined
        client.publish({
          destination: "/app/user-joined",
          body: username,
        });
  
        // ✅ Other subscriptions
        client.subscribe("/topic/interview/1", (message) => {
          const data = JSON.parse(message.body);
          if (data.type === "message") {
            setMessages((prev) => [...prev, data.message]);
          } else if (data.type === "offer") {
            handleOffer(data.offer);
          } else if (data.type === "answer") {
            handleAnswer(data.answer);
          } else if (data.type === "candidate") {
            handleCandidate(data.candidate);
          }
        });
  
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });
  
    client.activate();
  
    return () => {
      if (client.connected) client.deactivate();
    };
  }, [username]);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setLocalStream(stream);
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
  };

  const createOffer = async () => {
    peerConnection.current = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && stompClient) {
        stompClient.publish({
          destination: "/app/interview/1",
          body: JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
          }),
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    stompClient.publish({
      destination: "/app/interview/1",
      body: JSON.stringify({
        type: "offer",
        offer,
      }),
    });
  };

  const handleOffer = async (offer) => {
    peerConnection.current = new RTCPeerConnection();
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && stompClient) {
        stompClient.publish({
          destination: "/app/interview/1",
          body: JSON.stringify({
            type: "candidate",
            candidate: event.candidate,
          }),
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.current.createAnswer();
    await peerConnection.current.setLocalDescription(answer);

    stompClient.publish({
      destination: "/app/interview/1",
      body: JSON.stringify({
        type: "answer",
        answer,
      }),
    });
  };

  const handleAnswer = async (answer) => {
    if (peerConnection.current) {
      await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleCandidate = async (candidate) => {
    if (peerConnection.current) {
      await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  const sendMessage = () => {
    if (stompClient && message.trim() !== "") {
      stompClient.publish({
        destination: "/app/interview/1",
        body: JSON.stringify({
          type: "message",
          message,
        }),
      });
      setMessages((prev) => [...prev, message]);
      setMessage("");
    }
  };

  return (
    <div className="h-screen flex">
      {/* Left Panel - Video & Participants */}
      <div className="w-2/3 bg-gray-100 p-4 flex flex-col">
        <div className="flex-1 mb-4 rounded-xl overflow-hidden shadow-md">
          <video ref={localVideoRef} autoPlay muted className="w-full h-full rounded-xl bg-black" />
        </div>
        <div className="h-1/3 flex gap-2 overflow-x-auto items-center">
          <video ref={remoteVideoRef} autoPlay className="w-48 h-32 rounded-md bg-black" />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <Button variant="contained" color="primary" onClick={createOffer}>Start Call</Button>
        </div>
      </div>

      {/* Right Panel - Chat */}
      <div className="w-1/3 border-l flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="bg-gray-200 p-2 rounded-md text-sm">
              {msg}
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border rounded-md px-3 py-2"
            placeholder="Type a message..."
          />
          <Button variant="contained" onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewWindow;
