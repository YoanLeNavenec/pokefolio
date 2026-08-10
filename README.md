# Pokefolio

A dynamic portfolio where projects can be added, edited, and removed on the fly — split into my two worlds: **Dev** and **Art**.
I needed somewhere to stock and showcase all of my work as a professional, but I'm not two persons, there isn't two DrPoochyena. So i chose
to combine both sides of my person into one portfolio, that's uniquely me and reflects as such. 

I, by no means, am a god at developpement or drawing. I just wanted something functionnal and well, that i'd make myself as a showcasing of what i can do.
All the code and the assets are made by me. You are more than welcome to re-use what i did, i tried to comment it in a relatively proper manner. Just,
y'know, credit me please. And drink water. It's hot out there.

🔗 [My live portfolio, hosted on Vercel!](https://pokefolio-tawny.vercel.app)

## Stack

- [Next.js](https://nextjs.org/) (App Router) + [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.com/) (Postgres, Auth, Storage)
- Deployed on [Vercel](https://vercel.com/)

## Features

- Two sides to the portfolio: software projects and digital art, each with their own data model
- Admin dashboard to add/edit/delete projects, art pieces, and tags
- Image upload (single + multi-file gallery) via Supabase Storage
- Auth-protected admin routes
- Tag system with dynamic colors

## Running locally

```bash
npm install
npm run dev
```

You'll need a `.env.local` with:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

## Note

Not affiliated with, endorsed by, or sponsored by Wizards of the Coast, Nintendo, Game Freak, or The Pokémon Company. I'm just a fan of both universes and their aesthetics.