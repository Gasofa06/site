import '@/styles/global.css';

export const metadata = {
  title: {
    template: '%s | Roger Rovira',
    default: 'Roger Rovira',
  },
  description:
    'I am Roger Rovira, a software developer and graphic designer based in Barcelona.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  );
}
