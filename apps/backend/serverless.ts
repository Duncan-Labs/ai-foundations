import { hello } from '@functions/index';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
	service: 'ai-foundations-api',
	frameworkVersion: '3',
	useDotenv: true,
	plugins: [
		'serverless-esbuild',
		'serverless-offline',
		'serverless-prune-plugin',
		'serverless-plugin-warmup',
	],
	provider: {
		name: 'aws',
		runtime: 'nodejs18.x',
		stage: '${opt:stage, "dev"}',
		iam: {
			role: {
				statements: [
					{
						Effect: 'Allow',
						Action: [
							's3:ListBucket',
							's3:GetObject',
							's3:PutObject',
							'iam:PassRole',
							'lambda:InvokeFunction',
						],
						Resource: '*',
					},
				],
			},
		},
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
			DATABASE_URL: '${env:DATABASE_URL}',
			ENVIRONMENT: '${self:provider.stage}',
			OPENAI_API_KEY: '${env:OPENAI_API_KEY}',
		},
		logs: {
			httpApi: true,
		},
	},
	functions: {
		hello
	},
	package: {
		individually: true,
		patterns: [
			'!**/node_modules/aws-sdk/**',
			'!venv/**',
			'!**/node_modules/**',
			'.prisma/client/libquery_engine-rhel-*',
			'src/.prisma/client/libquery_engine-rhel-*',
			'src/functions/.prisma/client/libquery_engine-rhel-*',
		],
	},
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node18',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
			zipConcurrency: 10,
			resolveExtensions: ['.ts', '.js', '.mjs'],
			external: ['@sentry/profiling-node'],
			packagerOptions: {
				scripts: ['npm i @sentry/profiling-node'],
			},
			watch: {
				patterns: ['src/**/*.ts', '.env'],
				quiet: false,
				buildDelay: 500,
			},
		},
		warmup: {
			default: {
				enabled: true,
				verbose: true,
				logRetentionInDays: 14,
			},
		},
		'serverless-offline': {
			host: '0.0.0.0',
		},
	},
};

module.exports = serverlessConfiguration;
