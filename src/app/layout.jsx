import ThemeWrapper from './ThemeWrapper';

export const metadata = {
    title: 'Taskursion',
    description: 'Store and organize your tasks into endless layers of subtasks with this recursive task-tracking app!',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ThemeWrapper>
                    {children}
                </ThemeWrapper>
            </body>
        </html>
    )
}
