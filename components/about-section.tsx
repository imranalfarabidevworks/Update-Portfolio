'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Terminal, Sparkles, User } from 'lucide-react';

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden py-24 bg-background"
    >
      {/* Background Subtle Radial Gradient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.02] blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        
        {/* ---------------- Left Side: Interactive Story Text ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start text-left"
        >
          {/* Chapter & Icon Badge */}
          <div className="relative mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.05)]">
              <Code2 className="h-5 w-5" />
            </div>
          
         </div>

          {/* Chapter Subtitle */}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400/80 font-medium">
            Chapter 01 · The First Keystroke
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            How I Started <br />
            <span className="text-gradient bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Programming
            </span>
          </h2>

          {/* Core Story Content */}
          <p className="mt-6 max-w-xl text-sm sm:text-base text-muted-foreground/90 leading-relaxed font-light text-balance">
            It began with curiosity and a single line of HTML. I was mesmerized — a few characters in a text file could become something alive in a browser. That spark never faded. I'd sneak in hours after class, building websites, breaking things, and rebuilding them better. Each error was a lesson. Each small win, a revelation.
          </p>

          <p className="mt-4 max-w-xl text-sm sm:text-base text-muted-foreground/80 leading-relaxed font-light">
            Today, I focus on crafting pixel-perfect frontend experiences. Balancing aesthetics with performance, I turn complex wireframes into clean, interactive, and production-ready applications.
          </p>

          {/* Code Execution Footer (As seen in your screenshot) */}
          <div className="mt-8 flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.01] px-4 py-2 font-mono text-xs text-muted-foreground/60 shadow-inner">
            <Terminal className="h-3.5 w-3.5 text-cyan-500/70" />
            <span>~ console.log("hello, world")</span>
          </div>
        </motion.div>

        {/* ---------------- Right Side: Ultra-Luxury Radar Picture ---------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Main Frame Container */}
          <div className="relative h-72 w-72 sm:h-85 sm:w-85 md:h-[26rem] md:w-[26rem] lg:h-[28rem] lg:w-[28rem]">
            
            {/* Double Circle Radar Lines (হুবহু স্ক্রিনশটের মতো ডাবল রিং এফেক্ট) */}
            <div className="absolute inset-0 rounded-full border border-white/[0.015]" />
            <div className="absolute inset-6 rounded-full border border-white/[0.025]" />
            <div className="absolute inset-12 rounded-full border border-white/[0.035]" />
            <div className="absolute inset-20 rounded-full border border-white/[0.05]" />

            {/* Core Background Soft Glow */}
            <div className="absolute inset-28 rounded-full bg-cyan-500/5 blur-3xl animate-pulse" />

            {/* 
              ✨ গ্লাসমরফিজম ফ্রেম মাস্ক: 
              ছবির কালো ব্যাকগ্রাউন্ডকে ডার্ক ইউআই-এর সাথে নিখুঁতভাবে মেলানোর ম্যাজিক ট্রিক।
            */}
            <div className="absolute inset-16 overflow-hidden rounded-full border border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.01] backdrop-blur-[10px] shadow-[0_25px_60px_rgba(0,0,0,0.7),inset_0_1px_2px_rgba(255,255,255,0.05)]">
              
              {/* ছবির নিচের অংশকে স্মুথলি ভ্যানিশ করার জন্য গ্রেডিয়েন্ট ওভারলে */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
              
              <Image
                src="https://i.ibb.co.com/KccKQ324/Whats-App-Image-2025-12-08-at-6-03-13-PM-removebg-preview.png"
                alt="Imran Al Farabi"
                fill
                sizes="(max-width: 640px) 240px, 340px"
                className="object-cover scale-105 translate-y-3 mix-blend-screen brightness-110 contrast-105 transition-transform duration-500 hover:scale-110"
                priority
              />
            </div>

            {/* Floating Coding Badge 01 */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute right-8 top-16 flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-background/90 shadow-lg backdrop-blur-md"
            >
              <span className="font-mono text-xs text-cyan-400 font-bold">&lt;/&gt;</span>
            </motion.div>

            {/* Floating Coding Badge 02 */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.5 }}
              className="absolute left-10 bottom-24 flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-background/90 shadow-md backdrop-blur-md"
            >
              <span className="font-mono text-[11px] text-slate-500">{`{ }`}</span>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
