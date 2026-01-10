import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const withNextIntl = createNextIntlPlugin();

const withMDX = require('@next/mdx')()

const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
    pageExtensions: ['ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
}
export default withFlowbiteReact(withNextIntl(withMDX(
  config
)));