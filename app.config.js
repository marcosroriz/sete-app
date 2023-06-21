import "dotenv/config";

export default {
    expo: {
        name: "SETE-APP",
        slug: "sete-app",
        owner: "cecate-ufg",
        version: "1.0.2",
        orientation: "portrait",
        icon: "./assets/icon.png",
        assetBundlePatterns: ["assets/*"],
        extra: {
            eas: {
                projectId: "e0c14edf-809d-4485-8eb7-474c14868a72",
            },
            SETE_REST_API: process.env.SETE_REST_API,
            GOOGLE_MAPS_ANDROID_KEY: process.env.GOOGLE_MAPS_ANDROID_KEY,
            GOOGLE_MAPS_IOS_KEY: process.env.GOOGLE_MAPS_IOS_KEY,
        },
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        updates: {
            fallbackToCacheTimeout: 0,
        },
        assetBundlePatterns: ["**/*"],
        ios: {
            bundleIdentifier: "br.ufg.transportes.cecate.sete",
            buildNumber: "1.0.2",
            supportsTablet: true,
            config: {
                googleMapsApiKey: process.env.GOOGLE_MAPS_IOS_KEY,
            },
        },
        android: {
            package: "br.ufg.transportes.cecate.sete",
            versionCode: 3,
            config: {
                googleMaps: {
                    apiKey: process.env.GOOGLE_MAPS_ANDROID_KEY,
                },
            },
            adaptiveIcon: {
                foregroundImage: "./assets/icon.png",
                backgroundColor: "#FFFFFF",
            },
        },
        web: {
            favicon: "./assets/favicon.png",
        },
    },
};
