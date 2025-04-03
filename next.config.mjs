/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import withFlowbiteReact from 'flowbite-react/plugin/nextjs';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {output: 'export', images: {unoptimized: true}};
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withFlowbiteReact(withMDX(withNextIntl(nextConfig)));
