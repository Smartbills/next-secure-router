/**
 * Props used for useSecureRouter hook.
 * @interface
 * @param {string[]} publicRoutes Array of routes that are always accessible
 * @param {fallbackRoute} publicRoutes Route where the browser will be redirect if he tries to access a private route and is not secureAccess
 * @param {secureAccess} secureAccess  Set to `true` if you want to have access to private routes. Set to `false` to only allow public routes.
 * @example 
 * 
*/
export interface SecureRouterProps {
    publicRoutes: string[];
    fallbackRoute: string;
    hasSecureAccess: boolean;
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function routeExists(route: string, routes: string[]): boolean {
    var found = false;

    for (var currentRoute of routes) {

        if (route.startsWith(currentRoute)) {
            found = true;
            break;
        };
    }

    return found;
}
/**
 * Hook allowing you protect access to parts of your Next.JS application.
 * @returns {boolean} Return true when the user has been redirected and the page is ready to be render.
 * @example var isReady = useSecureRouter({ hasSecureAccess: true, publicRoutes: ["/401", "/404"], fallbackRoute: "/401" });
  */
export function useSecureRouter({ hasSecureAccess, fallbackRoute, publicRoutes }: SecureRouterProps): boolean {

    const router = useRouter();
    const [isReady, setReady] = useState(false);
    useEffect(() => {
        if (!routeExists(fallbackRoute, publicRoutes)) {
            var error = new Error("Your fallback route doesn't appear in your public routes array. Please add or select a route that is available in your public routes.");
            error.name = "UnreachableRouteError";
            throw error;
        }
        async function handleRoute() {
            if (!hasSecureAccess) {
                var publicRouteExists = routeExists(router.route, publicRoutes);
                if (!publicRouteExists) {
                    await router.replace(fallbackRoute)
                }
            }
            setReady(true)
            return;
        }
        handleRoute();
        return () => {
        };


    }, [router.route, hasSecureAccess])

    return isReady;
}

