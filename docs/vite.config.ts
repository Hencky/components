import { type UserConfig, normalizePath } from 'vite';
import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import mdx from 'vite-plugin-mdx';
import pages, { DefaultPageStrategy } from 'vite-plugin-react-pages';

const variablePath = normalizePath(path.resolve('./src/style/index.less'));

module.exports = {
  root: path.join(__dirname, 'src'),
  build: {
    outDir: path.join(__dirname, 'dist'),
  },
  jsx: 'react',
  server: {
    port: 8080,
  },
  plugins: [
    reactRefresh(),
    mdx(),
    pages({
      pagesDir: path.join(__dirname, 'pages'),
      pageStrategy: new DefaultPageStrategy({
        extraFindPages: async (pagesDir, helpers) => {
          const srcPath = path.join(__dirname, '../src');
          if (String(process.env.SHOW_ALL_COMPONENT_DEMOS) === 'true') {
            async function fileHandler(file, api) {
              const { relative, path: absolute } = file;
              const match = relative.match(/(.*)\/demos\/(.*)\.([tj]sx|mdx?)$/);
              if (!match) throw new Error('unexpected file: ' + absolute);
              const [_, componentName, demoName] = match;
              const pageId = `/components/demos/${componentName}`;
              // set page data
              const runtimeDataPaths = api.getRuntimeData(pageId);
              // the ?demo query will wrap the module with useful demoInfo
              runtimeDataPaths[demoName] = `${absolute}?demo`;
            }

            // show all component demos during dev
            // put them in page `/components/demos/${componentName}`
            helpers.watchFiles(srcPath, '*/demos/**/*.{[tj]sx,md?(x)}', fileHandler);
            helpers.watchFiles(srcPath + '/entrys', '*/demos/**/*.{[tj]sx,md?(x)}', fileHandler);
          }

          // find all component README
          helpers.watchFiles(srcPath, '*/README.md?(x)', async function fileHandler(file, api) {
            const { relative, path: absolute } = file;
            const match = relative.match(/(.*)\/README\.mdx?$/);
            if (!match) throw new Error('unexpected file: ' + absolute);
            const [_, componentName] = match;
            const pageId = `/components/${componentName}`;
            // set page data
            const runtimeDataPaths = api.getRuntimeData(pageId);
            runtimeDataPaths.main = absolute;
            // set page staticData
            const staticData = api.getStaticData(pageId);
            staticData.main = await helpers.extractStaticData(file);
          });
        },
      }),
    }),
  ],
  resolve: {
    alias: {
      '@pms/ui': path.join(__dirname, '../src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import '${variablePath}';`,
      },
    },
  },
  optimizeDeps: {
    include: ['lodash'],
  },
} as UserConfig;
