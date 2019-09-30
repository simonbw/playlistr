const STORAGE_KEY = "AUD_D_TOKEN";
let AUD_D_TOKEN = localStorage.getItem(STORAGE_KEY);

export function useAudDToken() {
  return { token: AUD_D_TOKEN, setToken: setAudDToken };
}

function setAudDToken(token: string) {
  AUD_D_TOKEN = token;
  localStorage.setItem(STORAGE_KEY, token);
}

(window as any).setAudDToken = setAudDToken;
