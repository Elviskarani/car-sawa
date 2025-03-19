This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


app/
├── layout.tsx              # Root layout with shared UI
├── page.tsx                # Homepage
├── cars/                   # Car listings section
│   ├── page.tsx            # All cars listing page
│   ├── [id]/               # Dynamic route for individual car details
│        └── page.tsx        # Individual car detail page
│   
├── sell-your-car/          # Section for sellers to list their vehicles
│   └── page.tsx            # Form/process to sell a car
├                    
│   
├── dealers/                # Dealers directory
│   ├── page.tsx            # All dealers listing
│   └── [id]/               # Individual dealer profiles
│       └── page.tsx        # Dealer detail page
├
│  
├── services/               # Additional services (inspection, etc.)
│   └── page.tsx            # Services overview page
├── about/                  # About company
│   └── page.tsx            # About us page
├── faq/                    # FAQ section
│   └── page.tsx            # Frequently asked questions
├── contact/                # Contact information
│   └── page.tsx            # Contact form and details
├── blog/                   # Car-related content and articles
│   ├── page.tsx            # Blog listing page
│   └── [slug]/             # Individual blog posts
│       └── page.tsx        # Blog post page
└── account/                # User account section
    ├── page.tsx            # Account dashboard
    ├── saved-cars/         # User's saved/favorite cars
    │   └── page.tsx        # Saved cars listing
    ├── listings/           # User's car listings (if they're selling)
    │   └── page.tsx        # User's listings management
    └── settings/           # Account settings
        └── page.tsx        # User profile settings