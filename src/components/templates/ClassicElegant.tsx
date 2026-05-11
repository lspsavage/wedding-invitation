"use client";

import Image from "next/image";
import Countdown from "@/components/Countdown";
import { MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import type { Invitation } from "@/lib/db/schema";
import cloudinaryLoader from "@/lib/cloudinaryLoader";

interface TemplateProps {
  data: Invitation;
}

export default function ClassicElegant({ data }: TemplateProps) {
  const content = (data.contentJson as any) || {};
  const { akad, resepsi, mapsUrl } = content;
  
  // Determine which image to use (fallback to default if none provided in DB)
  const heroImageSrc = content.heroImageUrl || "/hero.png";

  return (
    <main className="min-h-screen bg-brand-cream text-brand-charcoal selection:bg-brand-gold/20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            loader={cloudinaryLoader}
            src={heroImageSrc}
            alt="Wedding Hero"
            fill
            sizes="100vw"
            className="object-cover scale-105 animate-fade-in"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-brand-cream" />
        </div>

        <div className="relative z-10 text-center px-6 animate-slide-up">
          <span className="text-white/90 uppercase tracking-[0.3em] text-sm md:text-base font-sans mb-4 block">
            The Wedding of
          </span>
          <h1 className="text-5xl md:text-8xl text-white font-serif mb-6 leading-tight">
            {data.groomName} <span className="block md:inline">&</span> {data.brideName}
          </h1>
          <p className="text-white/90 font-serif italic text-xl md:text-2xl">
            {new Date(data.weddingDate).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 px-6 bg-white/50 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-brand-gold font-serif text-3xl md:text-4xl mb-12">Menuju Hari Bahagia</h2>
          <Countdown targetDate={new Date(data.weddingDate)} />
        </div>
      </section>

      {/* Event Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Akad Nikah */}
          <div className="glass rounded-3xl p-8 md:p-12 text-center border-brand-gold/10 hover:border-brand-gold/30 transition-colors shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-4">Akad Nikah</h3>
            <div className="space-y-4 font-sans text-brand-charcoal/80">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>{akad?.time || "08.00 - 10.00 WIB"}</span>
              </div>
              <div className="flex items-start justify-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                <p>{akad?.location || "Masjid Agung, Jakarta"}</p>
              </div>
            </div>
          </div>

          {/* Resepsi */}
          <div className="glass rounded-3xl p-8 md:p-12 text-center border-brand-gold/10 hover:border-brand-gold/30 transition-colors shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-3xl font-serif mb-4">Resepsi</h3>
            <div className="space-y-4 font-sans text-brand-charcoal/80">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>{resepsi?.time || "11.00 - Selesai"}</span>
              </div>
              <div className="flex items-start justify-center gap-2">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                <p>{resepsi?.location || "Grand Ballroom, Jakarta"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Maps Button */}
        <div className="mt-16 text-center">
          <a
            href={mapsUrl || "https://maps.google.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-white px-8 py-4 rounded-full font-sans uppercase tracking-widest text-sm hover:bg-brand-charcoal transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            Buka Google Maps
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer / Quote */}
      <footer className="py-24 px-6 text-center bg-brand-gold/5">
        <div className="max-w-2xl mx-auto">
          <p className="font-serif italic text-xl md:text-2xl text-brand-gold/80 leading-relaxed mb-8">
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
          </p>
          <p className="font-sans text-sm tracking-widest text-brand-charcoal/40 uppercase">
            {data.groomName} & {data.brideName}
          </p>
        </div>
      </footer>
    </main>
  );
}
