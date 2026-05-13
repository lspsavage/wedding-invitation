"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { 
  Instagram, 
  MapPin, 
  Copy, 
  Pause, 
  Play, 
  Heart, 
  Calendar, 
  Clock, 
  Send, 
  Mail, 
  Sparkles, 
  Loader2 
} from 'lucide-react';
import type { Invitation } from "@/lib/db/schema";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

// ================= CSS ANIMATION OBSERVER =================
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible] as const;
};

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </div>
  );
};

// ================= KOMPONEN COUNTDOWN =================
const Countdown = ({ targetDate }: { targetDate: string | Date }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-2 justify-center py-8 relative z-10">
      {[
        { label: 'Hari', value: timeLeft.days },
        { label: 'Jam', value: timeLeft.hours },
        { label: 'Menit', value: timeLeft.minutes },
        { label: 'Detik', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center bg-white/80 backdrop-blur-md border border-slate-200 p-2 rounded-xl w-14 shadow-lg">
          <span className="text-xl font-serif font-bold text-slate-800">{String(item.value).padStart(2, '0')}</span>
          <span className="text-[8px] uppercase tracking-widest text-slate-500 font-semibold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// ================= HERO INTRO =================
const HeroIntro = ({ onOpen, data }: { onOpen: () => void; data: Invitation }) => {
  const content = (data.contentJson as any) || {};
  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6 bg-[#fdfaf6]">
      <Image
        loader={cloudinaryLoader}
        src={content.heroImageUrl || "/prewedding_javanese.png"}
        alt="Wedding Hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 animate-fade-in flex flex-col items-center w-full">
        <p 
          className="text-white text-3xl md:text-4xl mb-4 drop-shadow-lg"
          style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
        >
          The Wedding Of
        </p>

        <div className="flex flex-col gap-2">
          <h1 
            className="text-white text-5xl md:text-6xl uppercase tracking-[0.2em] leading-none drop-shadow-xl"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            {data.groomName}
          </h1>
          <span 
            className="text-white text-4xl drop-shadow-lg"
            style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
          >
            &
          </span>
          <h1 
            className="text-white text-5xl md:text-6xl uppercase tracking-[0.2em] leading-none drop-shadow-xl"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            {data.brideName}
          </h1>
        </div>

        <div className="w-12 h-[1px] bg-white/40 mt-12" />

        <div className="mt-16 flex flex-col items-center text-white">
          <p className="text-[9px] mb-2 uppercase tracking-[0.3em] font-bold opacity-90 drop-shadow-sm">Kepada Yth.</p>
          <p className="text-lg font-serif mb-8 font-bold tracking-wide drop-shadow-sm">Tamu Undangan</p>

          <button
            onClick={onOpen}
            className="group relative flex items-center gap-3 bg-white/20 backdrop-blur-md border border-white/40 text-white px-10 py-4 rounded-xl hover:bg-white/30 transition-all duration-300 shadow-xl overflow-hidden active:scale-95"
          >
            <Mail size={16} className="animate-bounce" />
            <span className="font-bold text-[10px] uppercase tracking-[0.2em]">Buka Undangan</span>
          </button>
        </div>
      </div>
    </section>
  );
};

// ================= VIDEO SECTION =================
const VideoSection = ({ data }: { data: Invitation }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showNames, setShowNames] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (videoRef.current && videoRef.current.currentTime >= 5) {
        setShowNames(true);
      }
    };
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (video) video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Image 
          src="/bg-end.png" 
          alt="End Background" 
          fill 
          className="object-cover" 
          priority
        />
      </div>
      
      <video
        ref={videoRef}
        src="/video_bg.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-in-out ${isVideoEnded ? 'opacity-0' : 'opacity-100'}`}
      />
      
      <div className={`relative z-10 transition-all duration-[2000ms] ease-out transform text-center px-6 ${showNames ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
        <p 
          className="text-black text-3xl mb-8"
          style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
        >
          The Wedding Of
        </p>
        
        <div className="flex flex-col gap-4">
          <h2 
            className="text-[#8CA3B0] text-5xl md:text-6xl uppercase tracking-[0.15em]"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            {data.groomName}
          </h2>
          <span 
            className="text-black text-4xl opacity-70"
            style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
          >
            &
          </span>
          <h2 
            className="text-[#8CA3B0] text-5xl md:text-6xl uppercase tracking-[0.15em]"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            {data.brideName}
          </h2>
        </div>
        <div className="w-12 h-[1px] bg-black/10 mx-auto mt-12"></div>
      </div>
    </section>
  );
};

// ================= MAIN TEMPLATE =================
export default function ClassicElegant({ data }: { data: Invitation }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoScrollRef = useRef<HTMLDivElement>(null);

  const content = (data.contentJson as any) || {};
  const { akad, resepsi, mapsUrl, musicUrl } = content;

  const [wishes, setWishes] = useState([
    { name: "Keluarga Bpk. Santoso", message: "Selamat ya! Semoga menjadi keluarga sakinah mawaddah warahmah.", time: "2 jam yang lalu" },
    { name: "Sahabat Kuliah", message: "Barakallah! Lancar sampai hari H ya.", time: "5 jam yang lalu" },
  ]);
  const [newWish, setNewWish] = useState({ name: '', message: '' });

  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Audio play blocked"));
      setIsPlaying(true);
    }
    setTimeout(() => {
      videoScrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.log("Audio play blocked"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWish.name && newWish.message) {
      setWishes([{ ...newWish, time: "Baru saja" }, ...wishes]);
      setNewWish({ name: '', message: '' });
    }
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying && audioRef.current) {
          audioRef.current.pause();
        }
      } else {
        if (isPlaying && audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio resume blocked"));
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-blue-100 overflow-x-hidden">
      <div className="flex flex-col md:flex-row min-h-screen justify-center">
        {/* LEFT SIDE: DESKTOP ONLY BG */}
        <div className="hidden md:block md:flex-1 h-screen sticky top-0 bg-slate-900 overflow-hidden">
          <Image
            loader={cloudinaryLoader}
            src={content.heroImageUrl || "/prewedding_javanese.png"}
            alt="Desktop Background"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
            <p 
              className="text-white text-4xl mb-6 drop-shadow-lg"
              style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
            >
              The Wedding Of
            </p>
            <h1 
              className="text-white text-7xl xl:text-8xl mb-4 leading-tight tracking-[0.15em] uppercase drop-shadow-2xl"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              {data.groomName}
            </h1>
            <p 
              className="text-white text-6xl mb-4 opacity-80 drop-shadow-lg"
              style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
            >
              &
            </p>
            <h1 
              className="text-white text-7xl xl:text-8xl mb-12 leading-tight tracking-[0.15em] uppercase drop-shadow-2xl"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              {data.brideName}
            </h1>
            <div className="w-24 h-[1px] bg-white/30"></div>
          </div>
        </div>

        {/* RIGHT SIDE: SCROLLABLE MOBILE FRAME */}
        <div className={`w-full md:w-[450px] h-screen relative z-10 bg-white shadow-[0_0_100px_rgba(0,0,0,0.1)] scroll-smooth custom-scrollbar ${isOpened ? 'overflow-y-auto' : 'overflow-y-hidden'}`}>
          <div className="relative z-10">
            <HeroIntro onOpen={handleOpenInvitation} data={data} />

            <div ref={videoScrollRef}>
              <VideoSection data={data} />
            </div>
 
             {/* Intro & QS (UPDATED PER IMAGE 8) */}
             <section className="relative py-12 px-8 text-center bg-[#8CA3B0]">
               <Section className="relative z-10">
                 {/* Monogram "HA" Placeholder */}
                 <div 
                    className="text-white text-6xl mb-10 opacity-80"
                    style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
                 >
                    {data.groomName[0]}{data.brideName[0]}
                 </div>
 
                 <div className="max-w-md mx-auto space-y-8">
                   <p className="text-white leading-relaxed text-sm italic font-light px-4">
                     "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
                   </p>
                   <p 
                      className="text-white text-xs font-bold uppercase tracking-widest opacity-80"
                      style={{ fontFamily: 'var(--font-cinzel), serif' }}
                   >
                      (QS. Ar-Rum (30) : 21)
                   </p>
                 </div>
               </Section>
 
               {/* Floral Border at Bottom */}
               <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none">
                  <div className="flex justify-center opacity-70">
                     <img src="https://walimatul.id/wp-content/uploads/2026/05/Garden-05-Flower-Top-Left.webp" alt="Flower Decor" className="w-64 h-24 object-cover scale-y-[-1] scale-x-[-1]" />
                     <img src="https://walimatul.id/wp-content/uploads/2026/05/Garden-05-Flower-Top-Left.webp" alt="Flower Decor" className="w-64 h-24 object-cover scale-y-[-1]" />
                  </div>
               </div>
             </section>
 
             {/* Profile Section */}
             <section className="relative pt-12 pb-16 px-8 overflow-hidden bg-[#e2ede8]">
                {/* Background Image provided by User */}
                <div className="absolute inset-0 z-0">
                   <img 
                      src="/bg-template1.png?v=2" 
                      alt="Profile Background" 
                      className="absolute inset-0 w-full h-full object-cover object-top" 
                   />
                   <div className="absolute inset-0 bg-white/10" />
                </div>
 
               <div className="relative z-10 max-w-[420px] mx-auto text-center bg-white/60 backdrop-blur-md rounded-[3rem] pt-6 pb-16 px-8 shadow-2xl border border-white/40">
                 {/* Greeting Text */}
                 <Section className="mb-12 px-4 pt-4">
                   <p 
                     className="text-slate-900 text-lg mb-2"
                     style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
                   >
                     Bismillahirrahmanirrahim
                   </p>
                   <h2 
                     className="text-slate-900 text-sm uppercase tracking-widest font-bold mb-6"
                     style={{ fontFamily: 'var(--font-cinzel), serif' }}
                   >
                     Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
                   </h2>
                   <p className="text-slate-700 text-[11px] leading-relaxed font-medium">
                     Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara resepsi pernikahan kami:
                   </p>
                 </Section>

                <div className="space-y-20">
                  {/* GROOM (PRIA) - ATAS */}
                  <Section className="flex flex-col items-center text-center">
                    <div className="relative w-[192px] h-[240px] mb-4">
                       {/* The Photo - Ratio 820:1024 (~0.8) with Border #C1D1FF */}
                       <div className="absolute inset-0 top-0 overflow-hidden rounded-t-[100px] rounded-b-xl border-[4px] border-[#C1D1FF] shadow-lg">
                          <Image src="/groom_profile.png" alt={data.groomName} fill className="object-cover" />
                       </div>
                       {/* The Border Frame - Shifted Down Further */}
                       <div className="absolute -bottom-14 -left-12 -right-12 h-[180px] z-10 pointer-events-none">
                          <Image src="/border-template1.png" alt="Border" fill className="object-contain" />
                       </div>
                    </div>
                    <div className="mt-16">
                      <h3 
                        className="text-3xl mb-2 text-slate-900 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-cinzel), serif' }}
                      >
                        {data.groomName}
                      </h3>
                      <p className="text-slate-700 text-xs mb-6 px-4 font-bold italic">Putra dari Bapak Sufian Jadin & Ibu Elmira Ghendis</p>
                      <a href="#" className="inline-flex items-center gap-2 text-slate-600 bg-white shadow-sm border border-slate-100 px-6 py-2.5 rounded-full text-[10px] font-bold hover:shadow-md transition-all mx-auto">
                        <Instagram size={14} /> Instagram
                      </a>
                    </div>
                  </Section>

                  <Section className="flex flex-col items-center">
                    <h2 
                      className="text-5xl text-[#8CA3B0] opacity-40"
                      style={{ fontFamily: 'var(--font-great-vibes), cursive' }}
                    >
                      &
                    </h2>
                  </Section>

                  {/* BRIDE (WANITA) - BAWAH */}
                  <Section className="flex flex-col items-center text-center">
                    <div className="relative w-[192px] h-[240px] mb-4">
                       {/* The Photo - Ratio 820:1024 (~0.8) with Border #C1D1FF */}
                       <div className="absolute inset-0 top-0 overflow-hidden rounded-t-[100px] rounded-b-xl border-[4px] border-[#C1D1FF] shadow-lg">
                          <Image src="/bride_profile.png" alt={data.brideName} fill className="object-cover" />
                       </div>
                       {/* The Border Frame - Shifted Down Further */}
                       <div className="absolute -bottom-14 -left-12 -right-12 h-[180px] z-10 pointer-events-none">
                          <Image src="/border-template1.png" alt="Border" fill className="object-contain" />
                       </div>
                    </div>
                    <div className="mt-16">
                      <h3 
                        className="text-3xl mb-2 text-slate-900 uppercase tracking-widest"
                        style={{ fontFamily: 'var(--font-cinzel), serif' }}
                      >
                        {data.brideName}
                      </h3>
                      <p className="text-slate-700 text-xs mb-6 px-4 font-bold italic">Putri dari Bapak Nasrudin Hatta & Ibu Elma Muna</p>
                      <a href="#" className="inline-flex items-center gap-2 text-slate-600 bg-white shadow-sm border border-slate-100 px-6 py-2.5 rounded-full text-[10px] font-bold hover:shadow-md transition-all mx-auto">
                        <Instagram size={14} /> Instagram
                      </a>
                    </div>
                  </Section>
                    </div>
                  </div>
             </section>

            {/* Countdown / Save The Date */}
            <section className="pt-0 pb-24 px-8 text-center bg-[#8CA3B0] text-white overflow-hidden relative">
              {/* Background Ornaments / Texture (Optional) */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
              </div>

              <Section className="relative z-10 pt-12">
                {/* White Ornament at Top */}
                <div className="flex justify-center mb-16">
                  <div className="w-48 h-12 relative">
                    <img 
                      src="/ornament-savedate.png" 
                      alt="Ornament" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>

                <h2 
                  className="text-4xl mb-4 text-white tracking-widest"
                  style={{ fontFamily: 'var(--font-cinzel), serif' }}
                >
                  Save The Date
                </h2>

                <p className="text-white/90 text-[13px] leading-relaxed max-w-xs mx-auto mb-10 font-medium">
                  Dan kami bersyukur, dipertemukan Allah di waktu terbaik. Kini kami menanti hari istimewa kami.
                </p>

                <div className="flex justify-center">
                   <Countdown targetDate={data.weddingDate} />
                </div>

                {/* Bottom Inverted Ornament */}
                <div className="flex justify-center mt-10">
                  <div className="w-48 h-12 relative rotate-180">
                    <img 
                      src="/ornament-savedate.png" 
                      alt="Ornament Bottom" 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>
              </Section>
            </section>

            {/* Events */}
            <section className="pb-24 px-6 bg-[#8CA3B0]">
              <div className="grid gap-10 max-w-[400px] mx-auto">
                {/* AKAD NIKAH - TOP CROP */}
                <Section className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 group">
                   {/* Background Image - Top Part (Acts as Paper) */}
                   <div className="absolute inset-0 z-0">
                      <img 
                        src="/bg-resepsi-template1.png" 
                        alt="Akad Background" 
                        className="w-full h-full object-cover object-top opacity-90" 
                      />
                   </div>

                   <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                      <h3 
                        className="text-lg mb-4 text-slate-800 uppercase tracking-[0.2em] font-bold"
                        style={{ fontFamily: 'var(--font-cinzel), serif' }}
                      >
                        Akad Nikah
                      </h3>
                      <div className="space-y-2 text-slate-700 mb-6 text-[11px] font-medium tracking-wide">
                        <p className="font-extrabold text-sm text-slate-900">{new Date(data.weddingDate).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        <p>{akad?.time || "08.00 - 10.00 WIB"}</p>
                        <p className="leading-relaxed max-w-[180px] mx-auto">{akad?.location || "Masjid Agung, Bogor"}</p>
                      </div>
                      <a href={mapsUrl} target="_blank" className="inline-flex items-center gap-1.5 text-slate-500 border-b border-slate-300 pb-1 text-[9px] font-bold tracking-widest hover:text-slate-800 hover:border-slate-800 transition-all">
                        <MapPin size={12} /> LIHAT LOKASI
                      </a>
                   </div>
                </Section>

                {/* RESEPSI - BOTTOM CROP */}
                <Section className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 group">
                   {/* Background Image - Bottom Part (Acts as Paper) */}
                   <div className="absolute inset-0 z-0">
                      <img 
                        src="/bg-resepsi-template1.png" 
                        alt="Resepsi Background" 
                        className="w-full h-full object-cover object-bottom opacity-90" 
                      />
                   </div>

                   <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                      <h3 
                        className="text-lg mb-4 text-slate-800 uppercase tracking-[0.2em] font-bold"
                        style={{ fontFamily: 'var(--font-cinzel), serif' }}
                      >
                        Resepsi
                      </h3>
                      <div className="space-y-2 text-slate-700 mb-6 text-[11px] font-medium tracking-wide">
                        <p className="font-extrabold text-sm text-slate-900">{new Date(data.weddingDate).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                        <p>{resepsi?.time || "11.00 - 15.00 WIB"}</p>
                        <p className="leading-relaxed max-w-[180px] mx-auto">{resepsi?.location || "Masjid Agung, Bogor"}</p>
                      </div>
                      <a href={mapsUrl} target="_blank" className="inline-flex items-center gap-1.5 text-slate-500 border-b border-slate-300 pb-1 text-[9px] font-bold tracking-widest hover:text-slate-800 hover:border-slate-800 transition-all">
                        <MapPin size={12} /> LIHAT LOKASI
                      </a>
                   </div>
                </Section>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-8 text-center bg-white border-t border-slate-100">
              <h3 
                className="text-[#8CA3B0] text-3xl mb-4 tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                {data.groomName} & {data.brideName}
              </h3>
              <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase">Walimatul Invitation</p>
            </footer>
          </div>
        </div>
      </div>

      {/* Music */}
      <audio ref={audioRef} loop src={musicUrl || "https://res.cloudinary.com/ddvcdrks7/video/upload/v1778472970/wedding_music.mp3"} />
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[100] w-12 h-12 bg-white/90 backdrop-blur-md shadow-lg rounded-full flex items-center justify-center border border-slate-200"
      >
        {isPlaying ? <Pause size={20} className="text-slate-700" /> : <Play size={20} className="text-slate-700 ml-1" />}
      </button>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
    </div>
  );
}
