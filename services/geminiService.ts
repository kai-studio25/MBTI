
import { GoogleGenAI, Type } from "@google/genai";
import { MBTIResult } from "../types";

export const analyzePersonality = async (typeCode: string): Promise<MBTIResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      Analyze the MBTI type "${typeCode}" for a trendy, viral personality test app targeted at Gen Z/Millennials.
      
      Tone: Witty, fun, slightly exaggerated, "Fact Violence" (hitting the nail on the head), warm but sharp.
      Language: Korean (Casual, Internet-savvy style).
      
      Constraint: Do NOT use offensive slang, profanity, or derogatory terms (e.g., 씹덕, ~충, 병맛, etc. are BANNED). Keep it clean and fun.
      
      Required Output Structure:
      1. title: A creative, funny archetype name (e.g., "침대 밖은 위험한 집순이", "논리폭격기").
      2. subTitle: A catchy, relatable one-liner summary (e.g., "계획이 틀어지면 고장이 납니다.").
      3. emoji: A single emoji that best represents this type (e.g., 🦁, 🤖, 🦄).
      4. color: A hex color code that fits the vibe (soft pastel or neon pop).
      5. description: A full paragraph explaining their hidden nature, habits, and why they are the way they are.
      6. cardSummary: A detailed "Fact Violence" summary specifically for the result card. It should be around 250-300 characters long, covering their key quirks and funny behaviors in a "bone-hitting" way.
      7. traits: 5 witty hashtags (e.g., #팩트폭격, #겉바속촉).
      8. strengths: 3 charming strengths.
      9. weaknesses: 3 relatable 'charming flaws'.
      10. bestMatch: Specific type code + short reason.
      11. worstMatch: Specific type code + short reason.
      12. advice: Practical social/dating advice.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            title: { type: Type.STRING },
            subTitle: { type: Type.STRING },
            emoji: { type: Type.STRING },
            color: { type: Type.STRING },
            description: { type: Type.STRING },
            cardSummary: { type: Type.STRING },
            traits: { type: Type.ARRAY, items: { type: Type.STRING } },
            strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
            weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
            bestMatch: {
              type: Type.OBJECT,
              properties: { type: { type: Type.STRING }, reason: { type: Type.STRING } }
            },
            worstMatch: {
              type: Type.OBJECT,
              properties: { type: { type: Type.STRING }, reason: { type: Type.STRING } }
            },
            advice: { type: Type.STRING }
          },
          required: ["type", "title", "subTitle", "emoji", "color", "description", "cardSummary", "traits", "strengths", "weaknesses", "bestMatch", "worstMatch", "advice"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as MBTIResult;
    }
    
    throw new Error("No response from AI");

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      type: typeCode,
      title: "알 수 없는 우주인",
      subTitle: "데이터 분석 중 길을 잃었습니다.",
      description: "일시적인 오류로 분석을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
      cardSummary: "데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요. AI가 당신의 성격을 분석하다가 너무 복잡해서 과부하가 걸렸을 수도 있습니다!",
      traits: ["#오류", "#재시도", "#미지의존재"],
      strengths: ["인내심"],
      weaknesses: ["접속불량"],
      bestMatch: { type: "????", reason: "미지수" },
      worstMatch: { type: "????", reason: "미지수" },
      advice: "새로고침이 필요합니다.",
      emoji: "👽",
      color: "#64748b"
    };
  }
};