import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-5xl font-bold text-amber-900 mb-8 text-center">{children}</h1>
    ),
    h2: ({ children }) => <h2 className="text-4xl font-bold text-amber-900 my-12">{children}</h2>,
    h3: ({ children }) => <h3 className="text-3xl font-bold text-amber-900 my-10">{children}</h3>,
    p: ({ children }) => <p className="text-lg text-gray-800 my-8">{children}</p>,
    ul: ({ children }) => <ul className="my-8 space-y-6">{children}</ul>,
    li: ({ children }) => (
      <li className="flex items-start gap-4 text-lg text-gray-800">
        <span className="text-amber-700 text-2xl">🐾</span>
        <span>{children}</span>
      </li>
    ),
    a: ({ children, href }) => (
      <a href={href} className="text-amber-700 underline hover:text-amber-900">
        {children}
      </a>
    ),
    strong: ({ children }) => <strong className="text-amber-900 font-bold">{children}</strong>,
    ...components,
  };
}
