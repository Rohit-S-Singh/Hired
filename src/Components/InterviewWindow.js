import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, Avatar, IconButton, TextField, Button, Paper, Stack, Divider } from '@mui/material';
import { Videocam, Mic, People, ExitToApp, Send } from '@mui/icons-material';

const InterviewWindow = () => {
  const videoRef = useRef(null);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCameraEnabled(true);
        }
      } catch (error) {
        console.error("Error accessing camera or microphone:", error);
        alert("Could not access camera or microphone. Please check your permissions.");
      }
    };

    startCamera();

    // Cleanup: Stop the video stream when component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: '80px',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 0',
          overflow:'hidden',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <IconButton>
          <People />
        </IconButton>
        <IconButton>
          <Videocam />
        </IconButton>
        <IconButton>
          <Mic />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Avatar src="/path-to-profile-pic.jpg" />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          backgroundColor: '#ffffff',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <Typography variant="h6">Product Design Weekly Meeting</Typography>
          <Typography color="error">Recording 26:32</Typography>
          <Button variant="contained" color="primary">
            Share Meeting Link
          </Button>
        </Box>

        {/* Video Feed */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isCameraEnabled ? 'black' : '#f3f3f3',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {!isCameraEnabled && <Typography variant="h5">Main Participant Video</Typography>}
          </Box>

          <Stack direction="row" spacing={2} justifyContent="center">
            <Box sx={{ width: '100px', height: '100px', backgroundColor: '#f3f3f3', borderRadius: '8px' }}>
              <Typography textAlign="center">Sara</Typography>
            </Box>
            <Box sx={{ width: '100px', height: '100px', backgroundColor: '#f3f3f3', borderRadius: '8px' }}>
              <Typography textAlign="center">Jeong</Typography>
            </Box>
            <Box sx={{ width: '100px', height: '100px', backgroundColor: '#f3f3f3', borderRadius: '8px' }}>
              <Typography textAlign="center">John</Typography>
            </Box>
            <Box sx={{ width: '100px', height: '100px', backgroundColor: '#f3f3f3', borderRadius: '8px' }}>
              <Typography textAlign="center">You</Typography>
            </Box>
          </Stack>
        </Box>

        {/* Bottom Controls */}
        <Stack direction="row" justifyContent="center" spacing={4} sx={{ marginTop: '16px' }}>
          <IconButton>
            <Mic />
          </IconButton>
          <Button variant="contained" color="error" startIcon={<ExitToApp />}>
            Leave Meeting
          </Button>
          <IconButton>
            <Videocam />
          </IconButton>
        </Stack>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          padding: '16px',
          borderLeft: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6">Messages</Typography>
        <Divider sx={{ margin: '8px 0' }} />
        <Box sx={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          <Message sender="Amir" text="Hello guys, how are you doing?" time="9:20" />
          <Message sender="Jessica" text="Hi Amir" time="9:21" />
          <Message sender="Anna" text="Hey guys, what's the topic of this week?" time="9:24" />
        </Box>
        <Stack direction="row" spacing={1}>
          <TextField fullWidth placeholder="Write a message..." size="small" />
          <IconButton color="primary">
            <Send />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

// Message Component
const Message = ({ sender, text, time }) => {
  return (
    <Paper sx={{ padding: '8px', marginBottom: '8px', backgroundColor: '#f5f5f5' }}>
      <Typography variant="body2" fontWeight="bold">
        {sender} <Typography component="span" color="text.secondary" fontSize="0.8rem">({time})</Typography>
      </Typography>
      <Typography variant="body2">{text}</Typography>
    </Paper>
  );
};

export default InterviewWindow;
