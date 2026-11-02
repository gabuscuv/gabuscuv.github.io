import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const withNextIntl = createNextIntlPlugin();

const withMDX = require('@next/mdx')();

const config: NextConfig = {
  output: 'export',
  images: {unoptimized: true},
  pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
};

const nextConfig = withFlowbiteReact(withNextIntl(withMDX(config)));

export default nextConfig as unknown as NextConfig;
