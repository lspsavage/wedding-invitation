"use client";

import React, { useState } from "react";
import Image from "next/image";
import Countdown from "@/components/Countdown";
import { MapPin, Calendar, Clock, ExternalLink, Gift, Copy, Check, Heart } from "lucide-react";
import type { Invitation } from "@/lib/db/schema";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

interface TemplateProps {
  data: Invitation;
}

export default function ClassicElegant({ data }: TemplateProps) {
  const content = (data.contentJson as any) || {};
  const { akad, resepsi, mapsUrl } = content;
  
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  // Fallbacks to our generated assets if dynamic ones aren't provided
  const heroImageSrc = content.heroImageUrl || "/prewedding_javanese.png";
  const bgPatternSrc = "/toile_pattern_blue.png";
  const openingVideoSrc = "/opening-animation.mp4";

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleOpenClick = () => {
    setIsPlayingVideo(true);
  };

  const handleVideoEnd = () => {
    setIsPlayingVideo(false);
    setIsOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans selection:bg-[#B0B9C6]/30 overflow-hidden">
      
      {/* 0. COVER SECTION (Slides up when opened) */}
      <div 
        className={`fixed inset-0 z-50 transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          isOpen ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="relative w-full h-full">
          <Image
            src={heroImageSrc}
            alt="Wedding Cover"
            fill
            className="object-cover"
            priority
            loader={content.heroImageUrl ? cloudinaryLoader : undefined}
            unoptimized={!content.heroImageUrl} // If it's local public asset
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          
          {/* VIDEO OVERLAY */}
          <div 
            className={`absolute inset-0 bg-black z-20 flex items-center justify-center transition-opacity duration-500 ${
              isPlayingVideo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            {isPlayingVideo && (
              <video 
                src={openingVideoSrc}
                autoPlay 
                playsInline
                muted // Usually required for autoplay
                onEnded={handleVideoEnd}
                onError={handleVideoEnd} // Skip if video fails to load
                className="w-full h-full object-cover"
              />
            )}
            {/* Skip button just in case */}
            <button 
              onClick={handleVideoEnd}
              className={`absolute top-8 right-8 text-white/50 text-sm tracking-widest uppercase hover:text-white transition-opacity ${isPlayingVideo ? "opacity-100" : "opacity-0"}`}
            >
              Skip
            </button>
          </div>

          <div className={`absolute inset-0 flex flex-col items-center justify-between py-20 px-6 text-center transition-opacity duration-500 ${isPlayingVideo ? "opacity-0" : "opacity-100"}`}>
            <div className="animate-fade-in-down">
              <span className="text-white/90 uppercase tracking-[0.4em] text-sm md:text-base font-medium mb-4 block">
                The Wedding Of
              </span>
              <h1 className="text-4xl md:text-6xl text-[#E8D3A2] font-serif tracking-wide uppercase">
                {data.groomName} & {data.brideName}
              </h1>
            </div>

            <div className="animate-fade-in-up flex flex-col items-center">
              <p className="text-white font-serif text-xl md:text-2xl mb-8">
                {new Date(data.weddingDate).toLocaleDateString("id-ID", {
                  weekday: 'long',
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <button
                onClick={handleOpenClick}
                className="group relative inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-serif text-lg tracking-widest uppercase hover:bg-white/20 hover:border-white/50 transition-all duration-300"
              >
                <span>Buka Undangan</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT (Scrollable after cover slides up) */}
      <div 
        className={`transition-opacity duration-1000 delay-500 relative ${
          isOpen ? "opacity-100 h-auto overflow-visible" : "opacity-0 h-screen overflow-hidden"
        }`}
      >
        {/* Fixed Background Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]">
          <Image
            src={bgPatternSrc}
            alt="Toile Pattern"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="relative z-10">
          {/* 1. PEMBUKAAN */}
          <section className="min-h-screen flex flex-col items-center justify-center py-20 px-6 text-center max-w-3xl mx-auto">
            <div className="mb-12">
              <span className="text-6xl md:text-8xl font-serif text-[#B0B9C6]">
                {data.groomName.charAt(0)} <span className="text-[#E8D3A2]">&</span> {data.brideName.charAt(0)}
              </span>
            </div>
            
            <p className="font-serif italic text-lg md:text-xl text-gray-600 leading-relaxed mb-10 px-4">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir."
            </p>
            <span className="text-sm tracking-[0.2em] uppercase text-gray-400 font-semibold">(QS. Ar-Rum: 21)</span>

            <div className="mt-20">
              <h2 className="font-serif text-2xl md:text-3xl text-gray-800 mb-6">Assalamu'alaikum Warahmatullahi Wabarakatuh</h2>
              <p className="text-gray-600 leading-relaxed font-light text-base md:text-lg">
                Maha suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan.
                Dengan memohon rahmat dan ridho-Nya, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami.
              </p>
            </div>
          </section>

          {/* 2. PROFIL PASANGAN */}
          <section className="py-20 px-6">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 md:gap-8 items-center">
              {/* Bride */}
              <div className="flex flex-col items-center text-center">
                <div className="w-64 h-80 rounded-t-[100px] rounded-b-[10px] overflow-hidden relative mb-8 border-[6px] border-white shadow-xl">
                  <Image src={heroImageSrc} alt={data.brideName} fill className="object-cover" unoptimized />
                </div>
                <h3 className="font-serif text-4xl text-gray-800 mb-2">{data.brideName}</h3>
                <p className="text-[#B0B9C6] uppercase tracking-widest text-sm mb-4">Mempelai Wanita</p>
                <p className="text-gray-500 font-light italic">Putri dari Bapak Fulan & Ibu Fulanah</p>
                <a href="#" className="mt-6 inline-block text-sm uppercase tracking-widest border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition">@instagram</a>
              </div>

              {/* Groom */}
              <div className="flex flex-col items-center text-center mt-12 md:mt-0">
                <div className="w-64 h-80 rounded-t-[100px] rounded-b-[10px] overflow-hidden relative mb-8 border-[6px] border-white shadow-xl">
                  <Image src={heroImageSrc} alt={data.groomName} fill className="object-cover" unoptimized />
                </div>
                <h3 className="font-serif text-4xl text-gray-800 mb-2">{data.groomName}</h3>
                <p className="text-[#B0B9C6] uppercase tracking-widest text-sm mb-4">Mempelai Pria</p>
                <p className="text-gray-500 font-light italic">Putra dari Bapak Fulan & Ibu Fulanah</p>
                <a href="#" className="mt-6 inline-block text-sm uppercase tracking-widest border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-50 transition">@instagram</a>
              </div>
            </div>
          </section>

          {/* 3. SAVE THE DATE */}
          <section className="py-24 px-6 bg-[#B0B9C6] text-white text-center relative overflow-hidden my-20">
             {/* Subtle overlay to soften */}
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl mb-12">Save The Date</h2>
              <p className="font-serif italic text-xl md:text-2xl mb-16 opacity-90">
                {new Date(data.weddingDate).toLocaleDateString("id-ID", {
                  weekday: 'long',
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 inline-block">
                <Countdown targetDate={new Date(data.weddingDate)} />
              </div>
            </div>
          </section>

          {/* 4. DETAIL ACARA */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-gray-800">Rangkaian Acara</h2>
                <div className="w-24 h-[1px] bg-[#E8D3A2] mx-auto mt-6"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Akad */}
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B0B9C6]/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                  <h3 className="font-serif text-3xl text-gray-800 mb-6 relative z-10">Akad Nikah</h3>
                  <div className="space-y-4 font-sans text-gray-600 mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#E8D3A2]" />
                      <span>{new Date(data.weddingDate).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#E8D3A2]" />
                      <span>{akad?.time || "08.00 - 10.00 WIB"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#E8D3A2] shrink-0 mt-1" />
                      <div>
                        <span className="block font-medium text-gray-800">{akad?.location || "Masjid Agung"}</span>
                        <span className="text-sm opacity-80">Kota Bogor, Jawa Barat</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resepsi */}
                <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8D3A2]/10 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
                  <h3 className="font-serif text-3xl text-gray-800 mb-6 relative z-10">Resepsi</h3>
                  <div className="space-y-4 font-sans text-gray-600 mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#E8D3A2]" />
                      <span>{new Date(data.weddingDate).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#E8D3A2]" />
                      <span>{resepsi?.time || "11.00 - 14.00 WIB"}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#E8D3A2] shrink-0 mt-1" />
                      <div>
                        <span className="block font-medium text-gray-800">{resepsi?.location || "Grand Ballroom"}</span>
                        <span className="text-sm opacity-80">Kota Bogor, Jawa Barat</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center">
                <a
                  href={mapsUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#B0B9C6] text-white px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-md"
                >
                  <MapPin className="w-4 h-4" />
                  Buka Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>

          {/* 5. GALLERY */}
          <section className="py-20 px-6 bg-white/80">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-gray-800">Our Gallery</h2>
                <div className="w-24 h-[1px] bg-[#E8D3A2] mx-auto mt-6"></div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 row-span-2 relative h-80 md:h-[616px] rounded-2xl overflow-hidden group">
                  <Image src={heroImageSrc} alt="Gallery 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                </div>
                <div className="relative h-40 md:h-[300px] rounded-2xl overflow-hidden group">
                  <Image src={heroImageSrc} alt="Gallery 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                </div>
                <div className="relative h-40 md:h-[300px] rounded-2xl overflow-hidden group">
                  <Image src={heroImageSrc} alt="Gallery 3" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                </div>
                <div className="col-span-2 relative h-40 md:h-[300px] rounded-2xl overflow-hidden group">
                  <Image src={heroImageSrc} alt="Gallery 4" fill className="object-cover group-hover:scale-105 transition-transform duration-700" unoptimized />
                </div>
              </div>
            </div>
          </section>

          {/* 6. LOVE STORY */}
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="font-serif text-4xl md:text-5xl text-gray-800">Love Story</h2>
                <div className="w-24 h-[1px] bg-[#E8D3A2] mx-auto mt-6"></div>
              </div>

              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:ml-[50%] before:-translate-x-px before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#B0B9C6] before:to-transparent">
                {/* Story 1 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#B0B9C6] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                    <h4 className="font-serif text-xl text-gray-800 mb-2">Perkenalan</h4>
                    <span className="text-sm text-[#E8D3A2] font-semibold tracking-wider block mb-3">Agustus 2021</span>
                    <p className="text-gray-600 text-sm leading-relaxed">Berawal dari teman satu kampus, kami mulai saling mengenal dan bertukar cerita tentang mimpi masing-masing.</p>
                  </div>
                </div>
                {/* Story 2 */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#B0B9C6] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                    <h4 className="font-serif text-xl text-gray-800 mb-2">Awal Hubungan</h4>
                    <span className="text-sm text-[#E8D3A2] font-semibold tracking-wider block mb-3">Desember 2022</span>
                    <p className="text-gray-600 text-sm leading-relaxed">Setelah merasa ada kecocokan visi, kami memutuskan untuk menjalin hubungan yang lebih serius dengan niat baik.</p>
                  </div>
                </div>
                 {/* Story 3 */}
                 <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-[#B0B9C6] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-md relative z-10">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                    <h4 className="font-serif text-xl text-gray-800 mb-2">Lamaran</h4>
                    <span className="text-sm text-[#E8D3A2] font-semibold tracking-wider block mb-3">Februari 2026</span>
                    <p className="text-gray-600 text-sm leading-relaxed">Dengan restu kedua orang tua, sebuah komitmen diikrarkan dalam sebuah acara pertunangan sederhana yang hangat.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. LOVE GIFT */}
          <section className="py-24 px-6 bg-gray-50/80 my-10 border-y border-gray-100">
            <div className="max-w-2xl mx-auto text-center">
              <Gift className="w-12 h-12 text-[#E8D3A2] mx-auto mb-6" />
              <h2 className="font-serif text-4xl md:text-5xl text-gray-800 mb-6">Love Gift</h2>
              <p className="text-gray-600 mb-12 font-light leading-relaxed">
                Kehadiran dan doa restu Anda merupakan kado terindah bagi kami. Namun apabila Anda hendak memberikan tanda kasih, dapat melalui fitur di bawah ini:
              </p>

              <div className="space-y-6">
                {/* Bank 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <span className="block font-bold text-lg text-gray-800">BANK MANDIRI</span>
                    <span className="block font-mono text-xl tracking-wider text-gray-600 my-1">1330012345678</span>
                    <span className="block text-sm text-gray-500 uppercase">{data.brideName}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy("1330012345678", "mandiri")}
                    className="flex items-center gap-2 bg-[#B0B9C6]/10 text-[#B0B9C6] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#B0B9C6]/20 transition"
                  >
                    {copiedBank === "mandiri" ? <><Check className="w-4 h-4"/> Disalin</> : <><Copy className="w-4 h-4"/> Salin Rekening</>}
                  </button>
                </div>

                {/* Bank 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <span className="block font-bold text-lg text-gray-800">BANK BCA</span>
                    <span className="block font-mono text-xl tracking-wider text-gray-600 my-1">0951234567</span>
                    <span className="block text-sm text-gray-500 uppercase">{data.groomName}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy("0951234567", "bca")}
                    className="flex items-center gap-2 bg-[#B0B9C6]/10 text-[#B0B9C6] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#B0B9C6]/20 transition"
                  >
                    {copiedBank === "bca" ? <><Check className="w-4 h-4"/> Disalin</> : <><Copy className="w-4 h-4"/> Salin Rekening</>}
                  </button>
                </div>
                
                {/* Address */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-serif text-xl mb-4 text-gray-800">Kirim Hadiah Fikik</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Jl. Contoh Alamat No. 123, Kelurahan, Kecamatan, Kota Bogor, Kode Pos 16111
                    <br/>(Penerima: Elyana - 081234567890)
                  </p>
                  <button 
                    onClick={() => handleCopy("Jl. Contoh Alamat No. 123, Kota Bogor", "address")}
                    className="flex items-center justify-center gap-2 w-full md:w-auto mx-auto border border-[#B0B9C6] text-[#B0B9C6] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#B0B9C6] hover:text-white transition"
                  >
                     {copiedBank === "address" ? <><Check className="w-4 h-4"/> Disalin</> : <><Copy className="w-4 h-4"/> Salin Alamat</>}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* 8. WISHES (Placeholder UX) */}
          <section className="py-20 px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-gray-800">Wedding Wishes</h2>
                <div className="w-24 h-[1px] bg-[#E8D3A2] mx-auto mt-6"></div>
              </div>

              <form className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 mb-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#B0B9C6] focus:border-transparent outline-none transition bg-gray-50" placeholder="Nama Anda" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ucapan & Doa</label>
                    <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#B0B9C6] focus:border-transparent outline-none transition bg-gray-50 resize-none" placeholder="Tuliskan ucapan dan doa restu..."></textarea>
                  </div>
                  <button type="button" className="w-full bg-[#B0B9C6] text-white py-4 rounded-xl font-semibold tracking-wide hover:bg-gray-800 transition shadow-md">
                    KIRIM UCAPAN
                  </button>
                </div>
              </form>

              {/* Wishes List Placeholder */}
              <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {[1,2,3].map((item) => (
                  <div key={item} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#E8D3A2]/20 flex items-center justify-center text-[#E8D3A2] font-bold font-serif">T</div>
                      <div>
                        <h5 className="font-bold text-gray-800 text-sm">Tamu Undangan {item}</h5>
                        <span className="text-xs text-gray-400">Beberapa saat yang lalu</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. PENUTUP */}
          <section className="relative h-[80vh] flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <Image
                  src={heroImageSrc}
                  alt="Wedding Closing"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
               <div className="absolute inset-0 bg-black/50" />
            </div>
            
            <div className="relative z-10 px-6 max-w-2xl text-white">
              <p className="font-serif italic text-lg md:text-xl mb-8 leading-relaxed opacity-90">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
              </p>
              <h2 className="font-serif text-5xl md:text-7xl text-[#E8D3A2] mb-6">Terima Kasih</h2>
              <p className="text-sm tracking-[0.3em] uppercase opacity-80">
                Kami yang berbahagia
              </p>
              <h3 className="font-serif text-2xl md:text-3xl mt-4">
                {data.groomName} & {data.brideName}
              </h3>
            </div>

            {/* Walimatul Branding */}
            <div className="absolute bottom-8 right-8 z-10 flex items-center gap-2 opacity-70 hover:opacity-100 transition">
              <span className="text-xs text-white/80 font-sans tracking-widest uppercase">Powered by</span>
              <span className="text-lg font-serif italic text-[#E8D3A2] font-bold">Walimatul</span>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
