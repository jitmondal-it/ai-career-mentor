
/// <reference types="vite/client" />

export interface UserInput {
  background: string;
  skills: string;
  interests: string;
  goals: string;
  availability: string;
}

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
