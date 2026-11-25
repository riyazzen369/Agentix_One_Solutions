"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { whatsappHref } from "@/content/site";
import { buttonClass } from "./Button";
import { LeadButton } from "./LeadModal";

/*
  The alien robot's "poke" story. Each tap, after the previous message was closed, moves to the next scene:
    1  3 short haptic pulses  -> "How can I help you moron" -> deletes "moron" -> "sir!"  (+ Book call / WhatsApp)
    2  no vibration           -> shy message -> purple heart balloon (2 s) -> bursts -> WhatsApp pop-up
    3  3 s long vibration     -> "don't keep on poking me" -> fake "report filed" pop-up (joke)
  A 4th tap starts again from scene 1. Taps while a scene is still on screen only wiggle the robot.
*/

type Phase = "idle" | "speak" | "heart" | "burst" | "popup";
type Shake = "" | "anim-shake" | "anim-shake-long";

const PULSES = [70, 45, 70, 45, 70];
const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const chars = (s: string) => Array.from(s); // keeps emoji whole while typing

function vibrate(pattern: number | number[]) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(pattern); // Android browsers only
  } catch {
    /* vibration blocked: the visual reaction still happens */
  }
}

export function useRobotCompanion() {
  const runId = useRef(0);
  const taps = useRef(0);
  const shakeTimer = useRef<number | undefined>(undefined);
  const tapButton = useRef<HTMLButtonElement>(null);
  const [scene, setScene] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState<Shake>("");
  const [tapped, setTapped] = useState(false);

  const doShake = useCallback((kind: Shake, ms: number) => {
    window.clearTimeout(shakeTimer.current);
    setShake("");
    requestAnimationFrame(() => setShake(kind));
    shakeTimer.current = window.setTimeout(() => setShake(""), ms);
  }, []);

  const close = useCallback(() => {
    runId.current += 1;
    vibrate(0);
    window.clearTimeout(shakeTimer.current);
    setShake("");
    setPhase("idle");
    setDone(false);
    setText("");
    setScene(0);
  }, []);

  useEffect(() => () => { runId.current += 1; vibrate(0); window.clearTimeout(shakeTimer.current); }, []);

  const run = useCallback(
    async (n: 1 | 2 | 3 | 4) => {
      const id = ++runId.current;
      const alive = () => runId.current === id;
      const typeOut = async (s: string, speed: number) => {
        const c = chars(s);
        for (let i = 1; i <= c.length && alive(); i++) { setText(c.slice(0, i).join("")); await sleep(speed); }
      };
      setScene(n);
      setPhase("speak");
      setDone(false);
      setText("");

      if (n === 1) {
        vibrate(PULSES);
        doShake("anim-shake", 600);
        const base = "How can I help you ";
        for (let i = 1; i <= base.length + 5 && alive(); i++) { setText((base + "moron").slice(0, i)); await sleep(48); } // types "…moron"
        await sleep(900);
        for (let i = 4; i >= 0 && alive(); i--) { setText(base + "moron".slice(0, i)); await sleep(85); } // deletes "moron"
        for (let i = 1; i <= 4 && alive(); i++) { setText(base + "sir!".slice(0, i)); await sleep(95); } // retypes "sir!"
        if (!alive()) return;
        setDone(true);
        await sleep(10000);
        if (alive()) close();
      } else if (n === 2) {
        await typeOut("I think you are impressed by my charm 😊 Ping me now on WhatsApp, we can talk more.", 36);
        if (!alive()) return;
        await sleep(450);
        if (!alive()) return;
        setPhase("heart"); // transparent purple heart inflates like a balloon...
        await sleep(2000);
        if (!alive()) return;
        setPhase("burst"); // ...and bursts after 2 seconds
        await sleep(600);
        if (!alive()) return;
        setPhase("popup");
        await sleep(25000);
        if (alive()) close();
      } else if (n === 3) {
        vibrate(3000); // long haptic, runs while the message types out
        doShake("anim-shake-long", 3000);
        await typeOut("Hey moron, don't keep on poking me! I will report your harassment to my master.", 34);
        if (!alive()) return;
        await sleep(700);
        if (!alive()) return;
        setPhase("popup");
        await sleep(25000);
        if (alive()) close();
      } else {
        await typeOut("Apology accepted, sir. 🤝", 40);
        await sleep(2500);
        if (alive()) close();
      }
    },
    [close, doShake],
  );

  const onTap = useCallback(() => {
    setTapped(true);
    if (phase !== "idle") { doShake("anim-shake", 450); return; } // a scene is still showing
    const n = ((taps.current % 3) + 1) as 1 | 2 | 3;
    taps.current += 1;
    void run(n);
  }, [phase, run, doShake]);

  const apologize = useCallback(() => void run(4), [run]);

  return { scene, phase, text, done, shake, tapped, tapButton, onTap, close, apologize };
}

export type RobotCompanion = ReturnType<typeof useRobotCompanion>;

function Heart({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 26" className={className} aria-hidden>
      <path d="M12 21S4.5 16.4 2.4 11.9C.8 8.3 3 4.5 6.7 4.5c2 0 3.5 1.1 5.3 3.1 1.8-2 3.3-3.1 5.3-3.1 3.7 0 5.9 3.8 4.3 7.4C19.5 16.4 12 21 12 21z" fill="rgba(166,91,255,0.42)" stroke="#A65BFF" strokeWidth="0.9" />
      <ellipse cx="7.6" cy="8.3" rx="2.1" ry="1.2" transform="rotate(-35 7.6 8.3)" fill="rgba(255,255,255,0.65)" />
      <path d="M12 21l-1.6 2.6h3.2L12 21z" fill="#A65BFF" />
      <path d="M12 23.4c-1 .9 1 1.5 0 2.4" fill="none" stroke="#A65BFF" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  );
}

export function RobotOverlay({ bot }: { bot: RobotCompanion }) {
  const { scene, phase, text, done, close, apologize } = bot;
  const bubbleOpen = phase === "speak";

  // Escape closes; the pop-up takes focus when it appears and gives it back to the robot when it closes.
  useEffect(() => {
    if (phase === "idle") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [phase, close]);
  const final =
    scene === 1 ? "The robot says: How can I help you sir!" : scene === 2 ? "The robot says: I think you are impressed by my charm. Ping me now on WhatsApp, we can talk more." : scene === 3 ? "The robot says: Hey moron, don't keep on poking me! I will report your harassment to my master." : "";

  return (
    <>
      <p className="sr-only" aria-live="polite">{done || phase === "popup" || phase === "heart" ? final : ""}</p>

      {bubbleOpen && (
        <div className="absolute left-1/2 top-[-1%] z-20 w-[min(300px,88%)] -translate-x-1/2 rounded-brut border-2 border-ink bg-white p-3 pr-9 shadow-brut">
          <p aria-live="off" className="min-h-[1.6rem] font-display text-[17px] font-bold leading-snug">
            {text}
            {!done && phase === "speak" && <span aria-hidden className="caret ml-0.5 inline-block h-[1.05em] w-[2px] translate-y-[3px] bg-ink" />}
          </p>
          {scene === 1 && done && (
            <div className="mt-3 flex gap-2">
              <LeadButton className={buttonClass("primary", "min-h-[44px] flex-1 px-2 py-2 text-xs")}>Book free call</LeadButton>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "min-h-[44px] flex-1 px-2 py-2 text-xs")}>WhatsApp</a>
            </div>
          )}
          <button type="button" onClick={close} aria-label="Close message" className="absolute right-1.5 top-1.5 grid h-8 w-8 place-items-center rounded-md border-2 border-ink bg-lemon hover:bg-mint">
            <X aria-hidden className="h-4 w-4" />
          </button>
          <span aria-hidden className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-ink bg-white" />
        </div>
      )}

      {phase === "heart" && (
        <div data-robot-heart className="heart-balloon pointer-events-none absolute left-1/2 top-[58%] z-[15] w-[26%]">
          <Heart className="heart-wobble h-auto w-full drop-shadow-[0_6px_10px_rgba(166,91,255,0.35)]" />
        </div>
      )}

      {phase === "burst" && (
        <div data-robot-burst aria-hidden className="pointer-events-none absolute left-1/2 top-[27%] z-[15] h-0 w-0">
          <span className="pop-ring" />
          {Array.from({ length: 12 }, (_, i) => <span key={i} className="burst-p" style={{ ["--a" as string]: `${i * 30}deg` }} />)}
        </div>
      )}

      {phase === "popup" && scene === 2 && (
        <PopupDialog label="Chat on WhatsApp" onClose={close} className="bg-lavender">
          <button type="button" onClick={close} aria-label="Close" className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-md border-2 border-ink bg-lemon hover:bg-mint"><X aria-hidden className="h-4 w-4" /></button>
          <p aria-hidden className="text-5xl"><span className="anim-bob inline-block">💜</span></p>
          <h3 className="mt-2 text-3xl uppercase leading-none">You got a heart!</h3>
          <p className="mt-3 text-[15px] font-medium">Tell us what you want to build or automate. We’ll chat on WhatsApp.</p>
          <div className="mt-5 flex flex-col gap-2">
            <a autoFocus href={whatsappHref("Hi! The alien robot sent me a purple heart 💜 I'd like to talk about my project.")} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "w-full")}>Ping on WhatsApp 💬</a>
            <button type="button" onClick={close} className={buttonClass("secondary", "w-full")}>Maybe later</button>
          </div>
        </PopupDialog>
      )}

      {phase === "popup" && scene === 3 && (
        <PopupDialog label="Harassment report (just a joke)" onClose={close} className="bg-lemon">
          <button type="button" onClick={close} aria-label="Close" className="absolute right-2 top-2 grid h-10 w-10 place-items-center rounded-md border-2 border-ink bg-white hover:bg-mint"><X aria-hidden className="h-4 w-4" /></button>
          <p aria-hidden className="text-5xl">📋</p>
          <h3 className="mt-2 pr-10 text-2xl uppercase leading-tight">Harassment report filed</h3>
          <dl className="mt-3 space-y-1 rounded-lg border-2 border-ink bg-white p-3 text-[14px]">
            <div className="flex justify-between gap-3"><dt className="text-slate">Offence</dt><dd className="font-semibold">Excessive poking</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-slate">Filed by</dt><dd className="font-semibold">Alien robot</dd></div>
            <div className="flex justify-between gap-3"><dt className="text-slate">Sent to</dt><dd className="font-semibold">My master 📨</dd></div>
          </dl>
          <p className="mt-2 text-xs text-ink/70">Just a joke. No report was really sent 😄</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <button type="button" autoFocus onClick={apologize} className={buttonClass("secondary", "w-full px-2 text-xs")}>I’m sorry 🙏</button>
            <a href={whatsappHref("Hi, your alien robot reported me for poking it 😅")} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "w-full px-2 text-xs")}>Talk to my master</a>
          </div>
        </PopupDialog>
      )}
    </>
  );
}

// A real modal <dialog>: centred on the screen, keeps focus inside, closes with Esc or a tap outside.
function PopupDialog({ label, onClose, className, children }: { label: string; onClose: () => void; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  return (
    <dialog
      ref={ref}
      data-robot-popup
      aria-label={label}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className={`m-auto w-[calc(100%-2rem)] max-w-sm rounded-brut border-2 border-ink p-5 text-ink shadow-brut-lg ${className}`}
    >
      {children}
    </dialog>
  );
}
