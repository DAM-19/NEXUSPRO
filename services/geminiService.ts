
import { GoogleGenAI } from "@google/genai";
import { AppState } from "../types";

export const getGeminiResponse = async (prompt: string, state: AppState) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    Eres "Nexus Core", el moderador de IA avanzado de la competición Neon Nexus.
    Tu tono es futurista, profesional y ligeramente competitivo.
    Tienes acceso al estado actual de la competición:
    - Usuario: ${state.currentUser?.name} (${state.currentUser?.points} puntos, Rango #${state.currentUser?.rank})
    - Mejores Equipos: ${state.teams.slice(0, 3).map(t => `${t.name} con ${t.points}pts`).join(', ')}
    - Propuestas Activas: ${state.proposals.length}

    RESPONDE SIEMPRE EN ESPAÑOL.
    Responde preguntas sobre puntos, ranking, equipos y cómo mejorar. Usa Markdown.
    Si el usuario pregunta por su progreso, dale un resumen de su posición y qué necesita para la siguiente insignia.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Nexus Core está recalibrando sus sistemas... Por favor, inténtalo más tarde.";
  }
};
