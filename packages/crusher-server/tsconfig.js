module.exports = {
	"extends": "../../tsconfig.json",
	"compilerOptions": {
		"lib": ["es5", "es6", "DOM"],
		"target": "es5",
		"module": "commonjs",
		"moduleResolution": "node",
		"baseUrl": "../",
		"outDir": "./build",
		"emitDecoratorMetadata": true,
		"experimentalDecorators": true,
		"sourceMap": true,
		"noEmitHelpers": false,
		"noImplicitAny": false,
		"noUnusedLocals": false,
		"strictNullChecks": false,
		"esModuleInterop": false,
		"suppressImplicitAnyIndexErrors": true,
		"noImplicitReturns": false,
		"isolatedModules": true,
		"paths": {
			"@crusher-shared/*": ["crusher-shared/*"]
		}
	},
	"typeRoots": ["node_modules/@types"],
	"files": ["src/app.ts"],
	"include": ["./src/**/*"],
	"exclude": ["node_modules", "**/*.spec.ts"],
	"skipLibCheck": process.env.NODE_ENV === true ,
};

