import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './SoundEngine.css';

const SoundEngine = () => {
  const [isMuted, setIsMuted] = useState(true);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      // Create a deep "ocean" hum using a low-frequency oscillator
      oscillatorRef.current = audioContextRef.current.createOscillator();
      gainNodeRef.current = audioContextRef.current.createGain();
      
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(40, audioContextRef.current.currentTime);
      
      gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContextRef.current.destination);
      
      oscillatorRef.current.start();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const toggleMute = () => {
    initAudio();
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(newMuted ? 0 : 0.05, audioContextRef.current.currentTime, 0.1);
    }
  };

  return (
    <button className="sound-toggle interactive" onClick={toggleMute}>
      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      <span>{isMuted ? "SOUND OFF" : "SOUND ON"}</span>
    </button>
  );
};

export default SoundEngine;
