import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslint from '@eslint/js';
import stylisticJs from "@stylistic/eslint-plugin-js"
import pluginPromise from 'eslint-plugin-promise'
import react from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    pluginPromise.configs['flat/recommended'],
    ...compat.extends('plugin:react/recommended'),
    {
        ignores: [],

    },
    {
        plugins: {
            react,
            "unused-imports": unusedImports,
            "simple-import-sort": simpleImportSort,
            "@stylistic/js": stylisticJs
        },

        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },

            ecmaVersion: "latest",
            sourceType: "module",
        },

        settings: {
            react: {
                version: "detect",
            },
        },

        rules: {
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-unused-vars": ["error"],
            "unused-imports/no-unused-imports": "error",
            "no-console": 2,
            "simple-import-sort/imports": ["error", {
                groups: [
                    ["^react", "^@?\\w"],
                    ["^(@|components)(/.*|$)"],
                    ["^\\u0000"],
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                    ["^.+\\.?(css)$"],
                ],
            }],
            "simple-import-sort/exports": ["error"],
            "react/react-in-jsx-scope": "off",
            "@stylistic/js/eol-last": ["error", "always"]
        },
    }
);
