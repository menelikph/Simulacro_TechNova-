import { redirect } from 'next/navigation';

export default function Home() {
  // Redirige al usuario a la ruta /login
  redirect('/login');

  // Nota: Next.js ejecuta la redirección antes de que esta parte se renderice.
  // Pero por convención de React, siempre se debe retornar algo.
  return null; 
}