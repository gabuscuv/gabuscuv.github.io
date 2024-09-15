/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {output: 'export', images: {unoptimized: true}};
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(withNextIntl(nextConfig));
