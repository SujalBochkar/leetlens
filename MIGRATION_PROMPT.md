# Migration Guide: Better Auth to NextAuth.js v5 (Auth.js) in Next.js App Router with Prisma (PostgreSQL)**Context:**
I am currently using **Better Auth** in a Next.js App Router project with **Prisma (PostgreSQL)**. I want to migrate specifically to **NextAuth.js v5 (Auth.js)** to improve ecosystem compatibility and stability.

**Current Stack:**
- **Framework:** Next.js (App Router)
- **Database:** PostgreSQL via Prisma ORM
- **Current Auth:** Better Auth (located in `src/lib/auth.ts`)
- **Desired Auth:** NextAuth v5 (Auth.js)

**Tasks:**

1.  **Analyze & Uninstall:**
    - uninstall (better-auth) and install next auth.

2.  **Database Migration (Prisma):**
    - Provide the exact `schema.prisma` models required for NextAuth v5 (User, Account, Session, VerificationToken).
    - Note: I currently have a schema for Better Auth. Please explain how to map or replace these fields safely.

3.  **Backend Configuration (`auth.ts`):**
    - Create a new `src/lib/auth.ts` (or `src/auth.ts`) configuration file.
    - Set up the Prisma Adapter.
    - Configure the following OAuth Providers:
        - **Google**
        - **GitHub**
        - **Apple** (New addition)
    - Ensure `session.strategy` is set correctly (JWT or Database).
    - Just use the name of the variable I will be setting in my .env file for each provider (e.g., `GOOGLE_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, etc.)

4.  **Route Handler (`app/api/auth/[...nextauth]/route.ts`):**
    - Provide the code for the Route Handler for NextAuth v5 (GET and POST exports).

5.  **Middleware:**
    - Provide a `middleware.ts` file to protect dashboard routes while allowing public access to the landing page and login page.

6.  **Frontend Integration:**
    - **Login Page / Signup Page (`app/login/page.tsx`):** Create a custom UI component using Server Actions or `signIn` from `next-auth/react`.
    - **Social Buttons:** Create a reusable `SocialLoginButton` component for Google, GitHub, and Apple.
    - **Session Hook:** Show how to replace `useSession` from Better Auth with `useSession` from NextAuth.

**Code Style Requirements:**
- Use TypeScript.
- Use strict typing for environment variables (`process.env`).
- Use Tailwind CSS for the UI components.
- Keep the `src/server/db` singleton pattern I currently use.