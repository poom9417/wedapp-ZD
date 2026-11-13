module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/ready/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$readiness$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/readiness.ts [app-route] (ecmascript)");
;
const runtime = "nodejs";
const dynamic = "force-dynamic";
function GET() {
    return Response.json((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$readiness$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getReadiness"])(), {
        status: 503,
        headers: {
            "Cache-Control": "no-store"
        }
    });
}
}),
"[project]/src/lib/auth/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthConfiguration",
    ()=>getAuthConfiguration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env/config.ts [app-route] (ecmascript)");
;
;
function getAuthConfiguration(env = process.env) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAuthConfig"])(env);
}
}),
"[project]/src/lib/db/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDatabaseConfiguration",
    ()=>getDatabaseConfiguration
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env/config.ts [app-route] (ecmascript)");
;
;
function getDatabaseConfiguration(env = process.env) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateDatabaseConfig"])(env);
}
}),
"[project]/src/lib/env/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "validateAppConfig",
    ()=>validateAppConfig,
    "validateAuthConfig",
    ()=>validateAuthConfig,
    "validateDatabaseConfig",
    ()=>validateDatabaseConfig
]);
;
const value = (env, key)=>env[key]?.trim() || undefined;
const isLoopback = (host)=>[
        "localhost",
        "127.0.0.1",
        "[::1]"
    ].includes(host);
function webUrl(raw, env, endpoint) {
    try {
        const url = new URL(raw);
        const secure = url.protocol === "https:";
        const local = env.NODE_ENV === "development" && url.protocol === "http:" && isLoopback(url.hostname);
        return (secure || local) && !url.username && !url.password && !url.search && !url.hash && (endpoint ? /\/v1\/?$/.test(url.pathname) : url.pathname === "/");
    } catch  {
        return false;
    }
}
function validateAppConfig(env) {
    const appUrl = value(env, "APP_URL");
    if (appUrl && !webUrl(appUrl, env, false)) {
        return {
            status: "invalid_configuration",
            fields: [
                "APP_URL"
            ]
        };
    }
    return {
        status: "configured",
        value: {
            appUrl
        }
    };
}
function validateAuthConfig(env) {
    const keys = [
        "APPWRITE_ENDPOINT",
        "APPWRITE_PROJECT_ID",
        "APPWRITE_API_KEY"
    ];
    const missing = keys.filter((key)=>!value(env, key));
    if (missing.length) return {
        status: "not_configured",
        fields: missing
    };
    const endpoint = value(env, "APPWRITE_ENDPOINT");
    const projectId = value(env, "APPWRITE_PROJECT_ID");
    const apiKey = value(env, "APPWRITE_API_KEY");
    const invalid = [];
    if (!webUrl(endpoint, env, true)) invalid.push("APPWRITE_ENDPOINT");
    if (!/^[A-Za-z0-9][A-Za-z0-9._-]{0,35}$/.test(projectId)) invalid.push("APPWRITE_PROJECT_ID");
    if (/\s/.test(apiKey)) invalid.push("APPWRITE_API_KEY");
    if (invalid.length) return {
        status: "invalid_configuration",
        fields: invalid
    };
    return {
        status: "configured",
        value: {
            endpoint,
            projectId,
            apiKey
        }
    };
}
function validateDatabaseConfig(env) {
    const connectionString = value(env, "DATABASE_URL");
    if (!connectionString) return {
        status: "not_configured",
        fields: [
            "DATABASE_URL"
        ]
    };
    try {
        const url = new URL(connectionString);
        const tlsModes = url.searchParams.getAll("sslmode");
        const localDev = env.NODE_ENV === "development" && isLoopback(url.hostname);
        const valid = [
            "postgres:",
            "postgresql:"
        ].includes(url.protocol) && Boolean(url.hostname && url.username && url.password && url.pathname.length > 1) && !url.hash && (localDev || tlsModes.length === 1 && tlsModes[0] === "verify-full");
        if (!valid) return {
            status: "invalid_configuration",
            fields: [
                "DATABASE_URL"
            ]
        };
        return {
            status: "configured",
            value: {
                connectionString
            }
        };
    } catch  {
        return {
            status: "invalid_configuration",
            fields: [
                "DATABASE_URL"
            ]
        };
    }
}
}),
"[project]/src/services/readiness.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getReadiness",
    ()=>getReadiness
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/env/config.ts [app-route] (ecmascript)");
;
;
;
;
function integrationStatus(config) {
    // Presence/validity of credentials is never proof of a working integration.
    return config.status === "configured" ? "not_connected" : config.status;
}
function getReadiness(env = process.env) {
    return {
        status: "not_ready",
        checks: {
            application: {
                status: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$env$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["validateAppConfig"])(env).status
            },
            auth: {
                status: integrationStatus((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAuthConfiguration"])(env))
            },
            database: {
                status: integrationStatus((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDatabaseConfiguration"])(env))
            }
        },
        error: {
            code: "INTEGRATION_NOT_READY",
            message: "ยังไม่ได้เชื่อมและทดสอบบริการยืนยันตัวตนและฐานข้อมูล"
        }
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b-wjp_u5e43l._.js.map