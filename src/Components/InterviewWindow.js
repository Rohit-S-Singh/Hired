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

  const username = "Rohit";

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

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        // Subscriptions
        client.subscribe("/topic/offer", (msg) => {
          const { offer } = JSON.parse(msg.body);
          handleOffer(offer);
        });

        client.subscribe("/topic/answer", (msg) => {
          const { answer } = JSON.parse(msg.body);
          handleAnswer(answer);
        });

        client.subscribe("/topic/candidate", (msg) => {
          const { candidate } = JSON.parse(msg.body);
          handleCandidate(candidate);
        });

        client.subscribe("/topic/chat", (msg) => {
          setMessages((prev) => [...prev, `Other: ${msg.body}`]);
        });

        client.subscribe("/topic/user", (msg) => {
          setMessages((prev) => [...prev, `${msg.body} joined the interview`]);
        });

        // Notify server of joining
        client.publish({
          destination: "/app/user-joined",
          body: username,
        });

        setMessages((prev) => [...prev, `${username} joined the interview`]);
        setStompClient(client);
      },
      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame.headers["message"]);
      },
    });

    client.activate();

    return () => {
      if (client && client.active) {
        client.deactivate();
      }
    };
  }, []);

  const createOffer = async () => {
    peerConnection.current = new RTCPeerConnection();

    localStream.getTracks().forEach((track) =>
      peerConnection.current.addTrack(track, localStream)
    );

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && stompClient) {
        stompClient.publish({
          destination: "/app/candidate",
          body: JSON.stringify({ candidate: event.candidate }),
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
    console.log("oofering", offer);

    stompClient.publish({
      destination: "/app/offer",
      body: JSON.stringify({ offer }),
    });
  };

  const handleOffer = async (offer) => {
    peerConnection.current = new RTCPeerConnection();

    localStream.getTracks().forEach((track) =>
      peerConnection.current.addTrack(track, localStream)
    );

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && stompClient) {
        stompClient.publish({
          destination: "/app/candidate",
          body: JSON.stringify({ candidate: event.candidate }),
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
      destination: "/app/answer",
      body: JSON.stringify({ answer }),
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
        destination: "/app/new-message",
        body: message,
      });
      setMessages((prev) => [...prev, `You: ${message}`]);
      setMessage("");
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] flex overflow-hidden">
      {/* Video Section */}
      <div className="w-2/3 bg-gray-100 p-4 flex flex-col">
        <div className="flex-1 rounded-xl overflow-hidden shadow-md mb-4">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full h-full rounded-xl bg-black object-cover"
          />
        </div>
        <div className="h-32 flex items-center justify-center gap-4 mb-4">
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-48 h-32 rounded-md bg-black object-cover"
          />
        </div>
        <div className="flex justify-center">
          <Button variant="contained" color="primary" onClick={createOffer}>
            Start Call
          </Button>
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-1/3 border-l flex flex-col bg-white h-full">
        <div className="flex-1 p-4">
          <div className="h-full space-y-2 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="bg-gray-200 p-2 rounded-md text-sm">
                {msg}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 border rounded-md px-3 py-2"
            placeholder="Type a message..."
          />
          <Button variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewWindow;
