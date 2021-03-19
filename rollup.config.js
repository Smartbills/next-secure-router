const packageJson = require("./package.json");
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
    input: "index.ts",
    external: ['react', 'next/router'],
    output: [
        {
            file: packageJson.main,
            format: "cjs",
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        commonjs(),
        typescript({ useTsconfigDeclarationDir: true, tsconfig: './tsconfig.json' }),
        terser()
    ]
};