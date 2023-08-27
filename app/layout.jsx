import "normalize.css";
import "./global.css";

export const metadata = {
  title: 'Taskursion',
  description: 'Store and organize your tasks into endless layers of subtasks with this recursive task-tracking app!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
