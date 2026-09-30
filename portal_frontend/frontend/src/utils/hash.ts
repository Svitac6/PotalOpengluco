export async function hashPassword(password: string): Promise<string> {
  const pepper = import.meta.env.VITE_PASSWORD_PEPPER || "some_random_pepper_value";
  const msg = password + pepper; 
  const encoder = new TextEncoder();
  const data = encoder.encode(msg);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
