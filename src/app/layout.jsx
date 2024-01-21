import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import ThemeWrapper from './ThemeWrapper';

export const metadata = {
    title: 'Taskursion',
    description: 'Store and organize your tasks into endless layers of subtasks with this recursive task-tracking app!',
}

export default function RootLayout({ children }) {
    return (<html lang="en"><body>
        <AppRouterCacheProvider>
            <ThemeWrapper>
                {children}
            </ThemeWrapper>
        </AppRouterCacheProvider>
    </body></html>);
}
