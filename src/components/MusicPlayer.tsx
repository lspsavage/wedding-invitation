"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX, MailOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  musicUrl?: string;
  coupleName: string;
}

export default function MusicPlayer({ 
  musicUrl = "https://res.cloudinary.com/ddvcdrks7/video/upload/v1778472970/wedding_music.mp3", 
  coupleName 
}: MusicPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Playback was interrupted:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback was prevented or interrupted:", error);
        });
      }
    }
    // Allow scrolling when opened
    document.body.style.overflow = "auto";
  };

  // Prevent scrolling when closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop />

      {/* Entrance Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-brand-cream"
          >
            <div className="text-center px-6">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-brand-gold uppercase tracking-[0.3em] text-sm block mb-4">
                  Undangan Pernikahan
                </span>
                <h1 className="text-4xl md:text-6xl font-serif text-brand-charcoal mb-8">
                  {coupleName}
                </h1>
                
                <button
                  onClick={handleOpenInvitation}
                  className="group relative inline-flex items-center gap-3 bg-brand-gold text-white px-10 py-4 rounded-full font-sans uppercase tracking-widest text-sm overflow-hidden shadow-xl hover:shadow-2xl transition-all"
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <MailOpen className="w-5 h-5" />
                  </motion.div>
                  <span>Buka Undangan</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Controls */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute bottom-6 right-6 z-50"
        >
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border-2 ${
              isPlaying 
                ? "bg-white border-brand-gold text-brand-gold animate-spin-slow" 
                : "bg-brand-charcoal border-brand-charcoal text-white"
            }`}
          >
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </motion.div>
      )}

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </>
  );
}
