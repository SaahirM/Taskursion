import "bootstrap/dist/css/bootstrap.min.css";
import './custom.scss';

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
