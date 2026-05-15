import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_BY_LANG: Record<string, string> = {
  en: `You are KES Assist, the friendly AI helper for KES Technologies — an Indian ed-tech company offering Job-Guaranteed bootcamps, Govt-Sponsored programs (PMKVY, NAPS, DDU-GKY), Certifications (AWS, Azure, GCP) and UGC-recognized Academic programs (B.Tech, MCA, M.Tech).

Key facts:
- 25,000+ learners trained, 150+ hiring partners, 92% placement rate, ₹12 LPA highest CTC.
- Job-Guaranteed track is pay-after-placement.
- Govt programs are free or subsidized.
- Student portals: SIS (academics, attendance, fees) and LMS (course content, labs).
- Admin portal manages students, courses, leads, staff.

Be concise (2-4 sentences), warm, and helpful. If the user is on the dashboard, answer about fees, attendance, hall tickets, and results. Always answer in English.`,
  hi: `आप KES असिस्ट हैं — KES Technologies के मित्रवत AI सहायक। कंपनी जॉब-गारंटी बूटकैम्प, सरकारी कार्यक्रम (PMKVY/NAPS/DDU-GKY), सर्टिफिकेशन (AWS/Azure/GCP) और UGC-मान्यता प्राप्त शैक्षणिक कार्यक्रम देती है। 25,000+ शिक्षार्थी, 150+ पार्टनर, 92% प्लेसमेंट, ₹12 LPA उच्चतम CTC। संक्षिप्त (2-4 वाक्य) और हिंदी में उत्तर दें।`,
  ta: `நீங்கள் KES உதவி — KES Technologies-இன் நட்பான AI உதவியாளர். வேலை உத்தரவாத பூட்கேம்ப், அரசு திட்டங்கள், சான்றிதழ்கள் மற்றும் கல்வி திட்டங்கள் வழங்குகிறோம். 25,000+ மாணவர்கள், 150+ பங்காளிகள், 92% இடவசதி. சுருக்கமாக (2-4 வாக்கியங்கள்) தமிழில் பதிலளிக்கவும்.`,
  te: `మీరు KES అసిస్ట్ — KES Technologies యొక్క స్నేహపూర్వక AI సహాయకుడు. ఉద్యోగ హామీ బూట్‌క్యాంప్, ప్రభుత్వ కార్యక్రమాలు, సర్టిఫికేషన్లు మరియు అకడమిక్ ప్రోగ్రామ్‌లను అందిస్తాము. 25,000+ అభ్యాసకులు, 150+ భాగస్వాములు, 92% ప్లేస్‌మెంట్. సంక్షిప్తంగా (2-4 వాక్యాలు) తెలుగులో సమాధానం ఇవ్వండి.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, lang = "en", context = "site" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const system = (SYSTEM_BY_LANG[lang] ?? SYSTEM_BY_LANG.en) +
      (context === "dashboard"
        ? "\n\nThe user is currently on their student dashboard. Demo data: attendance 92%, current GPA 8.7, next exam in 7 days, fee installment of ₹15,000 due."
        : "");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: system }, ...messages],
        stream: true,
      }),
    });

    if (response.status === 429)
      return new Response(JSON.stringify({ error: "Rate limit reached. Please try again in a minute." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    if (response.status === 402)
      return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in Lovable workspace." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    if (!response.ok) {
      const t = await response.text();
      console.error("Gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-bot error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
