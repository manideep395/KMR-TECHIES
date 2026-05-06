import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useT, type Lang } from "@/lib/i18n";

type Msg = { role: "assistant" | "user"; content: string };

const SUGGESTIONS: Record<Lang, string[]> = {
  en: ["What courses do you offer?", "Is placement guaranteed?", "How do I apply?", "Talk to admissions"],
  hi: ["आप कौन से कोर्स देते हैं?", "क्या प्लेसमेंट गारंटी है?", "मैं कैसे आवेदन करूं?", "प्रवेश से बात करें"],
  ta: ["என்ன பாடநெறிகள் உள்ளன?", "வேலை உத்தரவாதமா?", "எப்படி விண்ணப்பிப்பது?", "சேர்க்கையில் பேசு"],
  te: ["మీరు ఏ కోర్సులు అందిస్తారు?", "ప్లేస్‌మెంట్ హామీయా?", "ఎలా దరఖాస్తు చేయాలి?", "అడ్మిషన్‌తో మాట్లాడండి"],
};

const DASH_SUGG: Record<Lang, string[]> = {
  en: ["Show fees", "Attendance status", "Hall ticket", "Latest results"],
  hi: ["फीस दिखाएं", "उपस्थिति", "हॉल टिकट", "नवीनतम परिणाम"],
  ta: ["கட்டணம் காட்டு", "வருகை", "ஹால் டிக்கெட்", "சமீபத்திய முடிவுகள்"],
  te: ["ఫీజు చూపించు", "హాజరు", "హాల్ టికెట్", "తాజా ఫలితాలు"],
};

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat-bot`;

export function ChatBot() {
  const { lang, t } = useT();
  const { location } = useRouterState();
  const onDash = location.pathname.startsWith("/dashboard");
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState("");
  const [loading, setLoading] = useState(false);

  const greeting = onDash ? t("bot.greet.dash") : t("bot.greet");
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: greeting }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMsgs([{ role: "assistant", content: onDash ? t("bot.greet.dash") : t("bot.greet") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, onDash]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open, loading]);

  const suggestions = useMemo(() => (onDash ? DASH_SUGG[lang] : SUGGESTIONS[lang]), [lang, onDash]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const userMsg: Msg = { role: "user", content: trimmed };
    const history = [...msgs.filter(m => m.content), userMsg];
    setMsgs(prev => [...prev, userMsg]);
    setVal("");
    setLoading(true);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
          lang,
          context: onDash ? "dashboard" : "site",
        }),
      });

      if (!resp.ok || !resp.body) {
        const errText = resp.status === 429
          ? "Too many requests — please wait a moment."
          : resp.status === 402
            ? "AI usage limit reached. Please try later."
            : "Sorry, I couldn't reach the assistant.";
        setMsgs(prev => [...prev, { role: "assistant", content: errText }]);
        setLoading(false);
        return;
      }

      // Add empty assistant message we'll fill via streaming
      setMsgs(prev => [...prev, { role: "assistant", content: "" }]);

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assistantText = "";
      let done = false;

      while (!done) {
        const { done: rDone, value } = await reader.read();
        if (rDone) break;
        buffer += decoder.decode(value, { stream: true });
        let nl: number;
        while ((nl = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, nl);
          buffer = buffer.slice(nl + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line || line.startsWith(":")) continue;
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") { done = true; break; }
          try {
            const parsed = JSON.parse(json);
            const chunk = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (chunk) {
              assistantText += chunk;
              setMsgs(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assistantText };
                return copy;
              });
            }
          } catch {
            buffer = line + "\n" + buffer;
            break;
          }
        }
      }
    } catch (err) {
      console.error("chat error:", err);
      setMsgs(prev => [...prev, { role: "assistant", content: "Connection error — please try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat assistant"
        className={cn(
          "fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full bg-cyan-500 hover:bg-cyan-600 shadow-elegant grid place-items-center text-white hover:scale-105 transition-transform",
          open && "opacity-0 pointer-events-none"
        )}
        style={{ backgroundColor: "#06B6D4" }}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold border-2 border-white" />
      </button>

      <div
        className={cn(
          "fixed bottom-5 right-5 z-[60] w-[92vw] max-w-sm rounded-2xl bg-card shadow-elegant border border-border overflow-hidden flex flex-col origin-bottom-right transition-all duration-200",
          open ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        )}
        style={{ height: "min(560px, 80vh)" }}
      >
        <div className="text-white px-4 py-3 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#06B6D4,#0E7490)" }}>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm leading-tight">{t("bot.name")}</div>
              <div className="text-[10px] text-white/80 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> {t("bot.online")}
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-white/10" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-secondary/40">
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "text-white rounded-br-sm"
                    : "bg-card border border-border text-foreground rounded-bl-sm"
                )}
                style={m.role === "user" ? { backgroundColor: "#06B6D4" } : undefined}
              >
                {m.content || (loading && i === msgs.length - 1 ? "…" : "")}
              </div>
            </div>
          ))}
          {loading && msgs[msgs.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 flex gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:120ms]" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:240ms]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {msgs.length <= 1 && (
          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {suggestions.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-cyan-500 hover:text-white transition border border-border disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => { e.preventDefault(); send(val); }}
          className="p-3 border-t border-border bg-card flex gap-2"
        >
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={t("bot.placeholder")}
            disabled={loading}
            className="flex-1 rounded-full bg-secondary px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-cyan-400/40 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!val.trim() || loading}
            className="h-9 w-9 rounded-full text-white grid place-items-center disabled:opacity-50 transition"
            style={{ backgroundColor: "#06B6D4" }}
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </>
  );
}
