// Shared UI for a segment and its children

export const metadata = {
  title: {
    template: "%s | Roger Rovira",
    default: "Roger Rovira",
  },
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
