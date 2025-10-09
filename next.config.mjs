import crypto from "node:crypto";
import path from "node:path";
import loaderUtils from "loader-utils";

/**
 * Generates a unique hash-based identifier for CSS modules.
 *
 * @param {Object} context - The webpack loader context
 * @param {string} _ - Unused parameter (local name)
 * @param {string} exportName - The name of the exported class
 * @returns {string} A unique identifier for the CSS class
 */
const hashOnlyIdent = (context, _, exportName) => {
	try {
		return loaderUtils
			.getHashDigest(
				Buffer.from(
					`filePath:${path
						.relative(context.rootContext, context.resourcePath)
						.replace(/\\+/g, "/")}#className:${exportName}`,
				),
				"md5",
				"base64",
				6,
			)
			.replace(/[^a-zA-Z0-9-_]/g, "_")
			.replace(/^(-?\d|--)/, "_$1");
	} catch (error) {
		console.error("Error in hashOnlyIdent:", error);
		return exportName; // Fallback to using the exportName as-is
	}
};

/**
 * Configures Webpack to use custom CSS module identifiers.
 *
 * @param {Object} config - The webpack configuration object
 * @returns {Object} The modified webpack configuration
 */
const configureWebpack = (config) => {
	try {
		const rules = config.module.rules
			.find((rule) => typeof rule.oneOf === "object")
			?.oneOf.filter((rule) => Array.isArray(rule.use));

		for (const rule of rules || []) {
			for (const moduleLoader of rule.use) {
				if (
					moduleLoader.loader?.includes("css-loader") &&
					!moduleLoader.loader?.includes("postcss-loader") &&
					typeof moduleLoader.options?.modules === "object"
				) {
					moduleLoader.options.modules.getLocalIdent = hashOnlyIdent;
				}
			}
		}

		return config;
	} catch (error) {
		console.error("Error in webpack configuration:", error);
		return config; // Return original config if there's an error
	}
};

/**
 * Next.js configuration object
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	output: "export",
	reactStrictMode: true,
	webpack: configureWebpack,
	images: {
		unoptimized: true,
	},
};

export default nextConfig;
