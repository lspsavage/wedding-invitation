"use client";

import { useState, useEffect } from "react";

interface CountdownProps {
  targetDate: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

  const items = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div className="bg-brand-gold/10 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-3 min-w-[70px] md:min-w-[90px]">
            <span className="text-2xl md:text-3xl font-serif text-brand-gold block leading-none">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-charcoal/60 mt-1 block">
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
