import { useEffect } from 'react';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';

const TRACKING_ID = 'G-TYDS43BC5W';  // Replace with your Google Analytics Tracking ID

function MyApp({ Component, pageProps }: any) {
    const router = useRouter();

    useEffect(() => {
        // Initialize Google Analytics
        ReactGA.initialize(TRACKING_ID);

        // Track the pageview on initial load
        ReactGA.pageview(window.location.pathname + window.location.search);

        // Track pageviews on route change
        const handleRouteChange = (url: string) => {
            ReactGA.pageview(url);
        };

        // Listen to route changes
        router.events.on('routeChangeComplete', handleRouteChange);

        // Cleanup event listener
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    return <Component {...pageProps} />;
}

export default MyApp;