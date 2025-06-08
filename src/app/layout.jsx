import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import ThemeWrapper, { htmlThemeProps } from './theme/ThemeWrapper';
import ToastContextProvider from '../components/ToastContextProvider';
import NavProgress from '../components/NavProgress';

export const metadata = {
    title: 'Taskursion',
    description: 'Store and organize your tasks into endless layers of subtasks with this recursive task-tracking app!',
};

export default function RootLayout({ children }) {
    return (<html lang="en" {...htmlThemeProps} suppressHydrationWarning><body>
        <AppRouterCacheProvider>
            <ThemeWrapper>
                <ToastContextProvider>
                    <NavProgress />
                    {children}
                </ToastContextProvider>
            </ThemeWrapper>
        </AppRouterCacheProvider>
    </body></html>);
}
