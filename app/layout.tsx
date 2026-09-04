import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'AgentVisual — Material Lab', description: 'A visual field for coding-agent execution.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
