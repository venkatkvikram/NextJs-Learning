<details>
<summary><strong>📁 Route Groups in Next.js</strong></summary>

## ✅ What are Route Groups?

Route Groups in Next.js help **organize your routes and files logically** without affecting the actual **URL structure** of your app. This feature is available in the App Router (from Next.js 13+).

---

## 🧠 Why Use Route Groups?

When building features like authentication (`register`, `login`, `forgot-password`), it's a good idea to group them under a logical folder like `auth`. But if you do this directly, it affects the URL like so:

```txt
/auth/register
/auth/login
/auth/forgot-password
```

However, if you want the URLs to be clean like this:

```txt
/register
/login
/forgot-password
```

...but still want to organize files under auth, you can use Route Groups.

```bash
app/
├── (auth)/
│   ├── register/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   └── forgot-password/
│       └── page.tsx

```

✅ Note: Wrapping the folder name with parentheses (auth) tells Next.js to use it only for organization and not include it in the route path.

</details>

<details>
<summary><strong>📁 Layouts</strong></summary>

## ✅ What are Layouts?

A layout is a **UI that is shared between multiple pages in your application**, creating a consistent structure across the entire application.

---

## 🛠️ How to Create Layouts?

- Default export a React component from a `layout.js` or `layout.tsx` file.
- That component will take a `children` prop, which Next.js will populate with your page content.
- Next.js provides one root layout by default in `app/layout.tsx`.

```tsx
// Example layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
```

![How Layouts Work](./hello-world/public/png/Layouts/HowLayoutsWork.png)

</details>

<details>
<summary><strong>📁 Nested Layouts</strong></summary>

## ✅ What are Nested Layouts?

- Layouts can be nested.
- Eg: If you want a special layout for products details folder we can do that by adding a **layout.tsx/jsx** inside products details folder.
- NextJs app router supports nested layouts letting you customize different parts of your app exactly how you want to

![How Nested Layouts Work 1](./hello-world/public/png/Layouts/HowNestedLayoutWork.png)

![How Nested Layouts Work 2](./hello-world/public/png/Layouts/HowNestedLayoutWork2.png)

</details>

<details>
<summary><strong>📁 Multi Root Layouts</strong></summary>

## 🎯 Scenario

Imagine you're building an application with the following pages:

- `/revenue`
- `/customers`
- `/login`
- `/register`

You want:

- `Revenue` & `Customers` to use a **full layout** with a **Header** and **Footer**.
- `Login` & `Register` to use a **minimal layout** (without header/footer).

---

## ❌ The Problem

If you define `Header` and `Footer` inside the default `app/layout.tsx`, it will be applied to **all pages**, including login and register—which you don't want.

---

## ✅ The Solution — Multi Root Layouts

Using **Route Groups** and **multiple layout.tsx files**, you can apply different root layouts to different sections of your app.

### 🧠 What Are Route Groups?

- Help organize project structure **without affecting the URL**.
- Allow you to apply layouts **selectively** to specific parts of the app.

---

## 🛠️ Steps to Implement

1. Inside the `app/` directory, create two **route groups**:

```
app/
├── (marketing)/
│ ├── layout.tsx ⬅️ Full layout (Header + Footer)
│ ├── page.tsx ⬅️ Root page (if needed)
│ ├── revenue/
│ │ └── page.tsx
│ └── customers/
│ └── page.tsx

├── (auth)/
│ ├── layout.tsx ⬅️ Minimal layout (no Header/Footer)
│ ├── login/
│ │ └── page.tsx
│ └── register/
│ └── page.tsx
```

> 📝 Parentheses around folder names like `(marketing)` or `(auth)` make them **invisible in the URL path**, but still let you organize and apply layouts.

---

## 🖼️ Folder Structure Visual

![Multiple Root Layouts Folder Structure](./png/MultiRootLayoutFs.png)

> ✅ Make sure the image is located at `public/png/MultiRootLayoutFs.png`

---

## 🔚 Result

- `/revenue` and `/customers` will use the **marketing layout** (with header and footer).
- `/login` and `/register` will use the **auth layout** (minimal).

This approach keeps your application modular, scalable, and cleanly separated by purpose.

</details>

<details>
<summary><strong>📁 Metadata (Dynamic and Static)</strong></summary>

## 📘 Overview

Next.js allows you to define both **static** and **dynamic metadata** for SEO and page titles. This metadata can be defined per route, and behaves differently depending on whether your route is a server component or a client component.

---

## ⚡ Dynamic Metadata

Dynamic metadata is useful when the metadata depends on:

- Route parameters
- External data (e.g., from an API)
- Parent segment metadata

You define dynamic metadata by **exporting a `generateMetadata()` function** from `page.tsx` or `layout.tsx`.

### 📄 Example: Dynamic Metadata in `[productId]/page.tsx`

```tsx
/**
 * @param param0
 * Receives param Props
 * @returns
 * Returns a Promise of type Metadata
 */
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const id = params.productId;
  return {
    title: id,
  };
};
```

> ⚠️ You cannot use both a metadata object and a generateMetadata function in the same route segment — it's one or the other.

## 🚫 Limitation

Dynamic metadata will not work inside components marked with "use client" directive.

> Metadata cannot be generated inside a Client Components
> ![UseClient Error example](hello-world\public\png\Metadata\useClientError.png)

## ✅ Solution

- Keep all metadata logic inside Server Components. If a page includes both server-rendered content and client-side logic:

- Split out the client-side logic into a separate component.

- Move the "use client" code into a subcomponent like ClientCounter.tsx.

- Keep page.tsx as a server component to handle metadata.

```
app/
└── counter/
    ├── page.tsx         # Server component with metadata
    └── ClientCounter.tsx  # Client-side logic (with "use client")
```

## 🏷️ Title Metadata Options

You can define title as:

A simple string

Or an object for more control

When using the object form, you can use:

1. default — fallback title for child routes that don't define their own

2. template — define title patterns (useful for consistent suffixes/prefixes)

3. absolute — override all patterns set by parent segments

```
export const metadata: Metadata = {
  title: {
    template: "%s | MySite",
    default: "Welcome to MySite",
    absolute: "Standalone Page Title" ## Can be used in       individual page.tsx
  }
}
```

> 📝 Use absolute to break out of the inherited title formatting defined in parent layouts.

</details>

<details>
<summary><strong>📁 Navigation - Link Component (Part 1)</strong></summary>

## 🚀 Client-Side Navigation in Next.js

In Next.js, client-side navigation is handled using the built-in **`Link`** component. This improves performance by avoiding full page reloads and keeping transitions smooth.

---

## 🧭 What is the `<Link>` Component?

- The `<Link>` component is provided by **Next.js** for client-side routing.
- It wraps around an `<a>` tag under the hood and is the **primary way to navigate** between routes in a Next.js app.

---

## ✨ Features

- **Fast navigation** without reloading the page
- Can **prefetch pages** in the background
- Accepts a `replace` prop to **replace** the current history entry instead of pushing a new one

---

## 🧩 How to Use

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <nav>
      <Link href="/about">About</Link>
      <Link href="/contact" replace>
        Contact
      </Link> {/* replaces current history */}
    </nav>
  );
}
```

## 🎨 Active Link Styling

To style the active link, you can use the usePathname() hook provided by next/navigation:

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/dashboard" className={pathname === "/dashboard" ? "text-blue-500 font-bold" : ""}>
        Dashboard
      </Link>
      <Link href="/profile" className={pathname === "/profile" ? "text-blue-500 font-bold" : ""}>
        Profile
      </Link>
    </nav>
  );
};

export default NavLinks;
```

> 💡 This helps apply active styles based on the current route.

## 📚 Summary

- Use Link from next/link for all internal navigation

- Use replace when you want to avoid adding to browser history

- Use usePathname() to highlight the currently active link

## ✅ Usage Instructions:

- You can copy-paste this into your README.md.

- The use client directive is required in the file where usePathname() is used.

- Styling can be adapted to match your CSS framework (Tailwind, CSS modules, etc.).
</details>
<details>
<summary><strong>📁 Params and Search Params (Part 2)</strong></summary>

## 🔍 What Are `params` and `searchParams`?

Given a URL, Next.js gives us access to:

- **`params`** → dynamic segments in the route (e.g. `/product/[id]`)
- **`searchParams`** → query strings in the URL (e.g. `/product?id=123&page=2`)

---

## 📂 In Server Components

You can directly access both `params` and `searchParams` in **server components** (like `page.tsx`) using `async`/`await`.

### ✅ Example: In `page.tsx`

```tsx
export default async function Page({ params, searchParams }: { params: any; searchParams: any }) {
  const id = params.id;
  const page = searchParams.page;

  return (
    <div>
      Product ID: {id} - Page: {page}
    </div>
  );
}
```

> ✅ Server components support async/await — you can use both params and searchParams directly.

## ⚛️ In Client Components

Client components do not support async/await at the component level, so you need to use React hooks like:

- useParams() – from custom or third-party hooks

- useSearchParams() – from next/navigation

### ⚠️ Hook-based access in "use client" components

```tsx
"use client";

import { useParams, useSearchParams } from "next/navigation";

export default function ClientComponent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;
  const page = searchParams.get("page");

  return (
    <div>
      Product ID: {id} - Page: {page}
    </div>
  );
}
```

### ⚠️ Layout Limitation: No searchParams in layout.tsx

> ❗ layout.tsx files have access to params, but not to searchParams.

❗ Why?

1. Layouts are structural and static
   Layouts are meant for shared UI like headers, sidebars, footers — not dynamic data. They are rendered once and cached, so Next.js avoids passing volatile data like query strings to them.

2. **searchParams** are request-based, not route-based

   - **params** come from route segments like [id]

   - **searchParams** come from the URL query string like ?page=2

   - Since layouts don’t re-render on query changes, they can’t reliably access searchParams.

3. Performance & caching reasons

   - Layouts are heavily cached for speed.

   - Allowing searchParams would break reusability and caching optimizations.

</details>

<details>
<summary><strong>📁 Programmatic Navigation (Part 3)</strong></summary>

## 🔁 What is Programmatic Navigation?

Programmatic navigation is when you navigate to a different route **based on logic or user actions**, rather than a static `<Link>` component.

Next.js supports this in both:

- **Client Components** — via `useRouter().push()`
- **Server Components** — via `redirect()` or `notFound()`

---

## ⚛️ Client-Side Navigation (`router.push()`)

Use the `useRouter()` hook from `next/router` to navigate programmatically on the client.

### ✅ Example: Order Button with Navigation

```tsx
"use client";

import { useRouter } from "next/router";

const OrderProduct = () => {
  const router = useRouter();

  const handleClick = () => {
    console.log("Placing the order");
    router.push("/"); // navigates to home
  };

  return (
    <>
      <h1>Order Product</h1>
      <button onClick={handleClick}>Place Order</button>
    </>
  );
};

export default OrderProduct;
```

> 🔁 router.push("/path") works like a <Link> — it adds a new entry to the browser history.

## 🧠 Server-Side Navigation (redirect() and notFound())

In server components, you can't use router.push(). Instead, use:

redirect("/path") — to programmatically redirect

notFound() — to throw a 404

These come from next/navigation.

### ✅ Example: Redirecting from Dynamic Route

```tsx
import { redirect, notFound } from "next/navigation";

const ProductReviewId = async ({ params }: { params: Promise<{ productId: string; reviewId: string }> }) => {
  const { productId, reviewId } = await params;

  if (parseInt(reviewId) > 1000) {
    // notFound(); // throw 404
    redirect("/products"); // redirect to products page
  }

  return (
    <div>
      Review for {productId} with review {reviewId}
    </div>
  );
};

export default ProductReviewId;
```

> 🚨 These only work in server components — don’t use them in components marked with "use client".

## 📚 Summary

### 🧭 Feature Support: Client vs Server Component

| Feature         | Client Component (`"use client"`) | Server Component |
| --------------- | --------------------------------- | ---------------- |
| `router.push()` | ✅ Yes                            | ❌ No            |
| `redirect()`    | ❌ No                             | ✅ Yes           |
| `notFound()`    | ❌ No                             | ✅ Yes           |

## ✅ When to Use What

- Use router.push() for buttons, user actions, and dynamic client-side flows

- Use redirect() when access control or conditions must be handled during render

- Use notFound() for conditionally throwing a 404 in server logic

</details>

<details>
<summary><strong>📁 Templates</strong></summary>

## 🧩 What Are Templates in Next.js?

Templates in Next.js are similar to layouts, but with a **key difference** — they **remount** on navigation, giving you a fresh state and re-rendered DOM for every page.

---

## 🧠 Why Use Templates?

Let’s consider a scenario in your `(auth)` route group:

📁 `hello-world/src/app/(auth)/layout.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
  { name: "Forgot Password", href: "/forgot-password" },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState("");
  const pathName = usePathname();

  return (
    <div>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      {navLinks.map((link) => {
        const isActive = pathName === link.href || (pathName.startsWith(link.href) && link.href !== "/");
        return (
          <Link key={link.href} href={link.href} className={isActive ? "font-bold mr-4" : "text-red-500 mr-4"}>
            {link.name}
          </Link>
        );
      })}
      {children}
    </div>
  );
}
```

## 🧪 Scenario

When you enter something into the input box and navigate from **/register** to **/login**, the input retains its value.

> This is because layouts do not re-render or remount on navigation — only the page component inside them changes.

## 🔁 When You Need a Fresh Instance

If you want to reset the input or remount the shared UI, a layout.tsx won’t help.
This is where templates come in.

# 📄 What Are Templates?

Templates are like layouts but remount on each route navigation.

Every route sharing a template gets a fresh start:

- 🧼 DOM is recreated

- 💥 State is cleared

- 🔁 Effects are re-run (useEffects)

### How to Use

To use a template:

1. Replace `layout.tsx` with `template.tsx`

2. Export a component that accepts children prop

```tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Shared Auth Template</h1>
      {children}
    </div>
  );
}
```

> ✅ Now when you navigate between /register, /login, etc., your template (and its input state) resets each time.

## 🧩 Can You Use Layouts and Templates Together?

Yes! Layouts and templates can be used together.
Here's how it works:

1. The `layout.tsx` renders once

2. The `template.tsx` renders on every route change

3. The layout wraps the template, and the template wraps the page

### 🖼 Visual Explanation

📷 Layouts + Templates — structure:

> Note : You can actually use layout.tsx and template.tsx files together.

![How Templates with Layouts Work](./hello-world/public/png/Templates/Layouts&Templates.png)

> In this case the layout renders first and it's children are replacedby template components ouput.(Picture below)

![How Templates with Layouts Work](./hello-world/public/png/Templates/Layouts&Templates2.png)

| Feature                 | Layouts              | Templates               |
| ----------------------- | -------------------- | ----------------------- |
| Rerender on navigation  | ❌ No                | ✅ Yes                  |
| Retains component state | ✅ Yes               | ❌ No (fresh start)     |
| Best used for           | Persistent shared UI | Shared UI needing reset |
| Caching behavior        | Aggressively cached  | Remounted fresh         |

> 💡 Use layouts for structural components like headers/footers.
> Use templates when you need per-page state reset with shared structure.

</details>

<details>
<summary><strong>📁 Loading UI (`loading.tsx`)</strong></summary>

## ⏳ What is `loading.tsx`?

Next.js provides a special file called **`loading.tsx`** to create **loading states** while a route segment is being fetched or rendered.

---

## 🧠 How It Works

- When navigating between routes, if a page or component takes time to load (due to fetching data or rendering server components), Next.js automatically shows `loading.tsx`.
- The file is colocated next to the `page.tsx` for the route.
- **Next.js automatically wraps your `page.tsx` and its children in a React Suspense boundary.**

---

## 🧩 File Placement

To use it, simply create a `loading.tsx` inside any route segment folder (like `/dashboard`, `/products`, etc.):

```bash
app/
└── dashboard/
    ├── page.tsx
    └── loading.tsx


```

## ✅ Example: loading.tsx

```tsx
export default function Loading() {
  return <p>Loading dashboard...</p>;
}
```

> This UI will appear automatically while the dashboard route is loading.

### 🎯 Benefits

- Provides better UX during route transitions

- Works seamlessly with server components and streaming

- Improves perceived performance of your app

| Feature                  | Supported |
| ------------------------ | --------- |
| Route-specific loading   | ✅ Yes    |
| Auto-wrapped in Suspense | ✅ Yes    |
| Supports nested routes   | ✅ Yes    |

> 💡 You can create loading.tsx at any route level to handle nested loading states.

</details>

<details>
<summary><strong>📁 Error Handling (Error Handling - Part I)</strong></summary>

## ❌ What is `error.tsx`?

Next.js allows you to define a special **`error.tsx`** file to handle unexpected errors that occur during rendering, data fetching, or inside components.

> It provides a **custom UI** for errors specific to a route segment.

---

## 🧠 How It Works

- Automatically wraps route segments and their nested children in a **React Error Boundary**
- If an error is thrown, it **only affects the segment** with the error — not the entire app
- Keeps the rest of the app functional
- Allows you to **recover from the error** without full page reload

---

## ⚛️ Important Notes

- `error.tsx` must be a **Client Component**
- Add `"use client"` at the top of the file
- It should include a `reset` function to allow retry behavior

---

## ✅ Example: `error.tsx`

```tsx
"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error caught in error.tsx:", error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
```

## 📁 Folder Structure

```bash
app/
└── [reviewId]/
    ├── page.tsx
    ├── error.tsx
```

> The error.tsx here will only handle errors in the /reviewId segment.

# 🖼️ Component Hierarchy Visual

![Error Handling in Component](./hello-world\public\png\ErrorHandling\ComponentHierarchy.png)

| Feature                    | Supported |
| -------------------------- | --------- |
| Per-route error boundaries | ✅ Yes    |
| Isolates segment errors    | ✅ Yes    |
| Recovery using `reset()`   | ✅ Yes    |
| Must be a client component | ✅ Yes    |
| Works with nested routing  | ✅ Yes    |

> 💡 For global error handling, use app/global-error.tsx (optional fallback for unhandled cases).

</details>

<details>
<summary><strong>📁 Recovering From Errors (Error Handling - Part II)</strong></summary>

## 🔁 Recovering from Errors in `error.tsx`

Next.js error boundaries (`error.tsx`) provide a powerful way to **gracefully handle rendering errors** in route segments.  
One useful prop passed to this component is the **`reset()`** function.

---

## 🧪 Basic Recovery with `reset()`

```tsx
"use client";

const ErrorBoundary = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ErrorBoundary;
```

- The reset() function allows the component tree to re-render and re-attempt the logic that previously failed.

- However, if the error is on the server, clicking "Try Again" will keep showing the same error.

## 🧠 Why Doesn't reset() Always Work?

- `reset()` works only for client-side errors or transient UI glitches.

- For server-side rendering errors, the component still fails unless we refresh the route or reload the server-side context.

```tsx
"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

const ErrorBoundary = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  const reload = () => {
    startTransition(() => {
      router.refresh(); // revalidate the server component
      reset(); // re-attempt rendering
    });
  };

  return (
    <div>
      <p>{error.message}</p>
      <button onClick={reload}>Try again</button>
    </div>
  );
};

export default ErrorBoundary;
```

### ✅ Why Use startTransition()?

- Defers the route refresh until the next render phase

- Ensures smoother experience while React handles any pending state updates

- Prevents UI from freezing or glitching during retries

| Technique           | Works For          | What It Does                           |
| ------------------- | ------------------ | -------------------------------------- |
| `reset()`           | Client-only errors | Re-renders component tree              |
| `router.refresh()`  | Server errors      | Refetches and revalidates server logic |
| `startTransition()` | UI performance     | Defers updates for smoother retry UX   |

> 💡 For full error resilience, combine both reset() and router.refresh() inside a transition.

</details>

<details>
<summary><strong>📁 Handling Errors in Nested Routes (Error Handling - Part III)</strong></summary>

## 🧱 How Do Nested Error Boundaries Work?

When an error occurs in a route segment, **Next.js will bubble the error up** to the **nearest `error.tsx` file** in the route hierarchy — just like how React error boundaries work.

---

## 🔍 Key Concepts

- An `error.tsx` handles errors **for its own folder AND all nested child segments**.
- Errors "bubble up" to the nearest available `error.tsx` file.
- This allows you to **control the scope of error handling** by placing `error.tsx` files at different folder levels.

---

## 📁 Example Scenario

Assume we have the following structure:

```bash
app/
└── products/
    ├── page.tsx
    ├── error.tsx        ← catches errors in all nested segments
    └── [productId]/
        ├── page.tsx
        └── reviewId/
            ├── page.tsx
            └── error.tsx (optional override)
```

## Case 1: error.tsx inside reviewId/

Catches errors only in the reviewId segment.

Other parts of products remain unaffected.

## Case 2: error.tsx moved to products/

Now handles errors for:

`/products`

`/products/[productId]`

`/products/[productId]/reviewId`

Any error from children bubbles up to this `error.tsx`.

## Why Does Placement Matter?

"Where you place your error.tsx determines how localized or global your error handling is."

| Location              | Error Scope                                    |
| --------------------- | ---------------------------------------------- |
| `reviewId/error.tsx`  | Only errors inside `reviewId/`                 |
| `productId/error.tsx` | Catches errors in productId and its children   |
| `products/error.tsx`  | Handles errors across the entire products tree |

### ✅ Best Practices

- Use deep-level error.tsx when you want granular, component-specific fallback UIs

- Use higher-level error.tsx when you want centralized error handling (e.g., show a full-page error for product-related failures)

- You can combine both! A deep-level error.tsx will override the parent's behavior.
</details>
<details><summary><strong>
📁 Handling Errors in Layouts (Error Handling - Part IV)</strong></summary>

The error boundary wont catch errors thrown in `layout.tsx` within the same segement because of how component hierarchy works.

The layout actually sits above the error boundary in a component tree

![Error Handling in Layout](./hello-world\public\png\ErrorHandling\ComponentHierarchy.png)

</details>

<details>
<summary><strong>📁 Handling Global Errors (Error Handling - Part V)</strong></summary>

## 🌐 What is `global-error.tsx`?

Next.js provides a **special file** named `global-error.tsx` to catch **top-level application errors** — it's the **last line of defense** when everything else fails.

Place this file in your app root:

```bash
app/
└── global-error.tsx
```

| Property        | Behavior                                        |
| --------------- | ----------------------------------------------- |
| Location        | Root `app/` directory                           |
| Scope           | Catches uncaught top-level errors               |
| Works in        | ✅ Production only (`next build && next start`) |
| Dev behavior    | ❌ Shows Next.js overlay error instead          |
| HTML structure  | ✅ Requires its own `<html>` and `<body>` tags  |
| Replaces layout | ✅ Fully replaces the root layout               |

## ⚛️ Why Include `<html>` and `<body>`?

When `global-error.tsx` is triggered, it completely replaces the layout, not just the page content. So:

You must return a full HTML document

Include `<html>` and `<body>` tags (like in `layout.tsx`)

## ✅ Example: `global-error.tsx`

```tsx
"use client"; // Error boundaries must be Client Components

import "./globals.css";

export default function GlobalError() {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <button
            onClick={() => {
              // refresh the page
              window.location.reload();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Refresh
          </button>
        </div>
      </body>
    </html>
  );
}
```

> 🔁 reset() can attempt to recover the app state — though often not useful at global level.

## 🛠 Dev Mode Behavior

In development mode, you’ll still see the Next.js error overlay instead of your global-error.tsx file.

This is intentional to help developers debug errors faster during development.

| Feature                    | Supported |
| -------------------------- | --------- |
| Handles top-level crashes  | ✅ Yes    |
| Requires HTML/Body tags    | ✅ Yes    |
| Renders in production only | ✅ Yes    |
| Replaces root layout       | ✅ Yes    |

> 💡 global-error.tsx ensures your app fails gracefully in production when all other boundaries are bypassed.

</details>

<details>
<summary><strong>📁 Parallel Routes in Next.js</strong></summary>

## 🔄 What Are Parallel Routes?

**Parallel routes** let you render **multiple pages simultaneously** within the same layout.  
They are especially useful for **dashboards** or **multi-pane UIs**, where different sections need to be independently rendered.

---

## 🧠 Concept: Slots

Parallel routes are powered by a feature called **`slots`**.

- A **slot** is a route segment prefixed with `@`
- Each slot becomes a **prop** in the corresponding `layout.tsx` file
- They help modularize complex layouts without affecting the URL

---

## 📁 Scenario: Complex Dashboard

Imagine you're building a dashboard that displays:

1. 📊 User Analytics
2. 💰 Revenue Metrics
3. 🔔 Notifications

With **parallel routing**, you can create:

```bash
app/
└── dashboard/
    ├── layout.tsx
    ├── @user/          ← Slot for analytics
    ├── @revenue/       ← Slot for revenue
    └── @notifications/ ← Slot for notifications
```

> Each @slot will render in a different region of the layout.tsx using props like user, revenue, notifications.

### Folder Structure

![Complex dashboard folder with slots](./hello-world\public\png\ParallelRoutes\Slots.png)

### 💡 Key Notes

- Slots are not part of the URL

- The default children prop is also a slot (but doesn't need its own folder)

- Slots make layouts modular and composable

## ✨ Benefits of Parallel Routes

| Feature                    | Benefit                                               |
| -------------------------- | ----------------------------------------------------- |
| Modular Layout             | Separate concerns into dedicated route segments       |
| Independent Route Handling | Each slot can have its own `loading.tsx`, `error.tsx` |
| Better Performance         | Lazy loading of sections based on user interaction    |
| Sub-navigation Support     | Each slot can have its own navigation and UI state    |

## 🧩 Independent Route Handling

Each slot can define:

- `loading.tsx` for loading states

- `error.tsx` for error boundaries

This gives fine-grained control over how each section behaves.

> Each slot in layout can handle it's own loading and error states
> This granular control is particularly useful in scenarios where different sections of the page load at varying speeds or encounter unique errors

### 📷 Example: Separate loading/error handling for slots

![Independent Route Handling](./hello-world\public\png\ParallelRoutes\IndependentRouteHandling.png)

## 🔀 Sub-navigation Support

Each slot can behave like a mini-app:

- Have its own routes

- Handle navigation, state, filters independently

- No interference between slots

### 📷 Example: Sub-navigation in slots

![Sub Navigation](./hello-world\public\png\ParallelRoutes\SubNavigation.png)

## Summary

| Concept          | Description                                   |
| ---------------- | --------------------------------------------- |
| Slot (`@name`)   | Custom segment rendered as a layout prop      |
| Parallel Routing | Render multiple routes inside the same layout |
| URL Structure    | Unaffected (slots are invisible in URLs)      |
| Use Case         | Dashboards, split views, complex admin panels |

> 💡 Parallel routing + slots = super flexible and performant UI composition in Next.js.

</details>

<details>
<summary><strong>📁 Handling Unmatched Routes in Parallel Routing</strong></summary>

## 🚧 What Are Unmatched Slots?

In a parallel routing setup (using `@slots`), each slot renders content **based on the current URL**. But when a slot **doesn’t match** the URL, it becomes an **unmatched slot**.

---

## 📁 Scenario: Complex Dashboard with 4 Slots

Let's say we have a parallel layout at `/complex-dashboard` with these slots:

- `@children` → Main view
- `@users` → User Analytics
- `@revenue` → Revenue Metrics
- `@notifications` → Notifications

```bash
app/
└── complex-dashboard/
    ├── layout.tsx
    ├── @users/
    ├── @revenue/
    ├── @notifications/
    └── page.tsx (children slot)
```

## 🧭 Route Behavior

### ✅ Navigating to /complex-dashboard

All slots are matched and display:

- Main view (children)

- Users panel

- Revenue panel

- Notifications panel

## ❗ Navigating to /complex-dashboard/archived

Suppose only the @notifications slot has content for /archived. The others (@users, @revenue, children) are now unmatched.

| Action            | Behavior                                                                  |
| ----------------- | ------------------------------------------------------------------------- |
| Client navigation | ✅ Next.js **keeps showing** previously loaded content in unmatched slots |
| Hard refresh (F5) | ❌ Unmatched slots will **look for `default.tsx`** as fallback            |
| No default.tsx    | 🚫 Next.js throws a **404 error**                                         |

## 🧩 Solution: default.tsx for Unmatched Slots

To handle unmatched slots gracefully, add a `default.tsx` file inside any `@slot`

```tsx
app/
└── complex-dashboard/
    └── @users/
        ├── default.tsx
```

### Example: `@users/default.tsx`

```tsx
export default function DefaultUsersView() {
  return <p>No user data to display for this route.</p>;
}
```

- This renders as a fallback when the slot doesn't match the current URL

- It avoids unexpected 404s and improves UX

## ✅ Summary

| Behavior                       | Description                                                        |
| ------------------------------ | ------------------------------------------------------------------ |
| Unmatched slots on navigation  | Keep showing previously rendered content (good for UX)             |
| Unmatched slots on page reload | Look for `default.tsx` in each slot                                |
| No `default.tsx` present       | Results in a 404 error for that slot                               |
| Purpose of `default.tsx`       | Acts as a **graceful fallback** UI when no route matches in a slot |

> 💡 Use `default.tsx` in each slot to ensure consistent rendering and prevent 404s on deep URLs or refresh.

</details>

<details>
<summary><strong>📁 Conditional Routes in Parallel Routing</strong></summary>
Imagine you want to show different content based on whether a user is logged in or not

You might want to display a dashboard for authenticated users but show a login page for those who aren't

Conditional Routes allows us to achieve this while maintaining completely seperate code on the same URL

</details>

<details>
<summary><strong>📁Intercepting Routes - Advanced Routing Patterns</strong></summary>

## 1️⃣ Parallel Routes (Recap)

Parallel routes allow multiple pages to render **simultaneously** inside the same layout using `@slot` segments.

- Modular layout design
- Independent error/loading states
- Sub-navigation per section

📚 Refer to the **Parallel Routes** section above for full details.

---

## 2️⃣ Intercepting Routes

Intercepting Routes let you **load content from another part of the app** **within the current layout** — instead of navigating away. This is extremely useful when showing **modals**, **drawers**, or **in-place previews**.

---

## 💡 Real-World Examples

### 🪪 Modal Login Page

Traditionally, clicking a "Login" button takes you to `/login`. With intercepting routes, you can:

- Update the URL to `/login`
- Show a login **modal overlay**
- Stay in the current layout visually

📷 Example:

![Example with login feature](./hello-world/public/png/InterceptingRoutes/examplelogin.png)

---

### 🖼️ Photo Gallery Modal

- View enlarged photo in a modal without leaving the current gallery grid
- Updates URL to `/photos/123`
- Keeps the gallery UI in place

📷 Example:

![Example with photo gallery feature](./hello-world/public/png/InterceptingRoutes/example2photogallery.png)

---

## 🛠️ How Intercepting Routes Work

### 🧭 Two Key Concepts:

1. **Source folder** – where you navigate _from_ (ex: `f1`)
2. **Target folder** – the original destination (ex: `f2`)

Let’s say you have this folder structure:

```bash
app/
└── f1/
    ├── page.tsx        ← source route
    ├── (.)f2/          ← intercepting route (targets f2)
    │   └── page.tsx    ← renders f2 inside f1 layout
└── f2/
    └── page.tsx        ← target route

```

> When navigating from f1 to f2, the app intercepts and loads f2's content within the f1 layout instead of a full-page transition.

## 🔢 Naming Conventions for Intercepting Routes

| Prefix     | Meaning                                         | Use Case                           |
| ---------- | ----------------------------------------------- | ---------------------------------- |
| `(.)`      | Intercept a route at the **same level**         | `f1/(.)f2` to intercept `f2`       |
| `(..)`     | Intercept a route **one level above**           | Nested segments                    |
| `(..)(..)` | Intercept **two levels above**                  | Deep nested routing                |
| `(...)`    | Intercept route from the **root app directory** | Full application-wide interception |

> 💡 Use these folder names inside your source segment to pull in and intercept content from elsewhere.

## ✅ Benefits

- Keep users in the same layout/context

- Show modals, previews, side panels without full page navigation

- Update URL without breaking flow

- Granular control over user experience and state

## 📌 Summary

| Feature             | Benefit                                                |
| ------------------- | ------------------------------------------------------ |
| Parallel Routes     | Render multiple views simultaneously via `@slots`      |
| Intercepting Routes | Pull content from other routes without navigating away |
| Uses Layout?        | ✅ Yes                                                 |
| Real Use Cases      | Login modals, photo viewers, chat overlays             |

> ⚠️ Intercepting routes only control presentation, not route logic. Use wisely to balance performance and UX.

</details>

<details>
<summary><strong>📁 Parallel Intercepting Routes (Real Example)</strong></summary>

## 🧭 What Are Intercepting Routes?

Intercepting routes in Next.js 15 let you render a different route **inside a parallel slot**, without fully navigating away from the current page.

Use case: Open content like a **modal**, **drawer**, or **side overlay** while maintaining the context of the current route.

---

## 📸 Example: Photo Feed with Modal Preview

### Folder Structure:

```bash
photo-feed/
├── [id]/page.tsx                → Full-page photo view (direct navigation)
├── @modal/
│   └── (.)[id]/page.tsx         → Intercepts photo view and renders as modal
│   └── (.)[id]/default.tsx      → Optional fallback for unmatched state
├── photos/
│   ├── 1.jpg
│   ├── 2.jpg
│   └── ...
├── layout.tsx                   → Layout file for modal + feed
├── page.tsx                     → Main photo feed
├── styles.css
└── wonders.ts
```

### Behavior:

`/photo-feed` shows a list of images.

- Clicking an image routes to `/photo-feed/[id]`, but instead of full navigation:

- It’s intercepted by `@modal/(.)[id]/page.tsx`

- Renders in a modal over the feed.

- On reload or direct navigation to `/photo-feed/5`, full page renders via `[id]/page.tsx`.

## 🧠 How Does It Work?

- The folder `(.)[id]` tells Next.js: “Intercept `/photo-feed/[id]` and render inside a slot.”

- The @modal slot allows that to appear in a parallel region of your UI layout.

### Sample Layout `(layout.tsx)`:

```tsx
export default function PhotoFeedLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <div className="photo-feed-layout">
      <main>{children}</main>
      {modal && <div className="modal-container">{modal}</div>}
    </div>
  );
}
```

### Fallback for unmatched modal state:

If a user visits a URL that doesn't match the intercepted route, default.tsx renders as fallback:

```tsx
// @modal/(.)[id]/default.tsx
export default function DefaultModal() {
  return null; // or return <div>No photo selected</div>
}
```

## Summary

| Route                       | Renders                                    |
| --------------------------- | ------------------------------------------ |
| `/photo-feed`               | Photo grid feed                            |
| `/photo-feed/[id]`          | Full page photo view (via `[id]/page.tsx`) |
| Click photo (in-feed modal) | Intercepted view inside `@modal/(.)[id]`   |

> 💡 Use intercepting routes for seamless UI flows — modals, previews, overlays — without losing page context.

</details>

<details>
<summary><strong>📁 Route Handlers in App Router</strong></summary>

## 🌐 What Are Route Handlers?

**Route Handlers** allow you to define **custom request/response logic** in the App Router — similar to building API routes in Express.js or the older Page Router.

Unlike page routes (which return HTML), **route handlers let you return JSON, plain text, or any custom response**.

> 🔒 These run **only on the server**, keeping secrets like tokens and API keys safe.

---

## 🚀 Use Cases

- Build RESTful APIs (CRUD operations)
- Interact with databases
- Talk to third-party services
- Serve non-HTML responses (JSON, files, etc.)

---

## 📁 Folder & File Structure

Route handlers live in the `app` directory just like page routes.

**Basic Example:**

```bash
app/
└── hello/
    └── route.ts
```

`app/hello/route.ts`

```tsx
// Handle GET requests to /hello
export async function GET() {
  return new Response("Hello World!");
}
```

> When a GET request hits `/hello`, this function runs.

## Supported HTTP methods

| Method    | Supported? | Notes                     |
| --------- | ---------- | ------------------------- |
| `GET`     | ✅ Yes     | Fetch data or serve views |
| `POST`    | ✅ Yes     | Submit data               |
| `PUT`     | ✅ Yes     | Replace data              |
| `PATCH`   | ✅ Yes     | Partially update data     |
| `DELETE`  | ✅ Yes     | Remove resource           |
| `HEAD`    | ✅ Yes     | Header info only          |
| `OPTIONS` | ✅ Yes     | Preflight / method check  |
| Others    | ❌ No      | Returns 405 automatically |

# ⚠️ Handling Conflicts

You cannot have a page.tsx and route.ts in the same folder. This causes a conflict.

## Incorrect

```bash
app/
└── profile/
    ├── page.tsx
    └── route.ts  ← ❌ Conflict!
```

## ✅ Solution: Move to `api/` subfolder

```bash
app/
└── profile/
    ├── page.tsx
    └── api/
        └── route.ts
```

- Now, `/profile` renders a page.

- `/profile/api` handles custom requests.

## Summary

| Feature              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| Server-only          | Sensitive logic stays secure                         |
| Full HTTP Support    | GET, POST, PUT, PATCH, DELETE, etc.                  |
| Modular structure    | Nestable like page routes                            |
| Replace Express APIs | Build REST APIs right inside the app                 |
| File location        | `app/your-path/route.ts`                             |
| No page conflict     | Use `/api` subfolders if you need page + route combo |

> 🧠 Route Handlers = Powerful server-side logic inside your frontend project.

</details>

<details>
<summary><strong>📁GET,POST Route Handlers</strong></summary>

### GET

create comments folder under which route.ts where

```tsx
import { comments } from "./data"; //dummy data

export async function GET() {
  return Response.json(comments);
}
```

now test the the end point GET localhost:3000/comments and you'll see comments as the repsonse

### POST

```tsx
export async function POST(request: Request) {
  const comment = await request.json();
  const newComment = {
    id: comments.length + 1,
    text: comment.text,
  };
  comments.push(newComment);
  return new Response(JSON.stringify(newComment), {
    headers: { "Content-Type": "application/json" },
    status: 201,
  });
}
```

</details>

<details>
<summary><strong>📁 Dynamic Route Handlers(PATCH,DELETE)</strong></summary>

## 🧭 What Are Dynamic Route Handlers?

Dynamic Route Handlers in Next.js work the same way as dynamic page routes (`[id]`) — but instead of rendering HTML, they respond to RESTful API requests like `GET`, `PATCH`, and `DELETE`.

---

## 🔗 Use Case: Comment API (`/comments/[id]`)

### 📁 Folder Structure

```bash
app/
└── comments/
    ├── data.ts                 # Sample comment data
    ├── route.ts                # Handle /comments route
    └── [id]/
        └── route.ts            # Handle /comments/:id route
```

### ✍️ Each Handler Receives

```ts
(request: Request, context: { params: Promise<{ id: string }> })
```

`request`: Standard Request object (like fetch)

`params`: Route parameters like { id } — must be awaited

## 🧪 `comments/[id]/route.ts` Example

```ts
import { comments } from "../data";

// GET a single comment by ID
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const comment = comments.find((comment) => comment.id === parseInt(id));
  return Response.json(comment);
}

// PATCH (edit) comment text
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { text } = await request.json();
  const index = comments.findIndex((comment) => comment.id === parseInt(id));
  comments[index].text = text;
  return Response.json(comments[index]);
}

// DELETE a comment by ID
export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const index = comments.findIndex((comment) => comment.id === parseInt(id));
  const deletedComment = comments[index];
  comments.splice(index, 1);
  return Response.json(deletedComment);
}
```

## 🧠 Things to Remember

| Concept    | Notes                                                          |
| ---------- | -------------------------------------------------------------- |
| File Name  | Must be `route.ts` or `route.js` inside `[id]` folder          |
| Parameters | `params` must be awaited in App Router                         |
| Use case   | Ideal for RESTful endpoints (edit, delete, fetch by ID)        |
| Security   | Handlers run server-side only — no exposure of sensitive logic |

## ✅ Summary

| Method | Path            | Description                     |
| ------ | --------------- | ------------------------------- |
| GET    | `/comments/:id` | Get a comment by ID             |
| PATCH  | `/comments/:id` | Edit a comment (partial update) |
| DELETE | `/comments/:id` | Delete a comment by ID          |

> 🧠 Dynamic route handlers = scalable and RESTful server-side logic inside `app` directory.

</details>


<details>
<summary><strong>📁 URL Query Parameters in Route Handlers</strong></summary>

## 🔍 Accessing Query Parameters in Next.js (App Router)

When building **Route Handlers**, you can access query parameters using the `NextRequest` object.

> Next.js enhances the default `Request` object with additional capabilities via `NextRequest` (from `next/server`).

---

## 🧠 Example: Search Comments by Query

Let's say you want to filter comments based on a `?query=` string in the URL.

---

### 📁 Folder Structure

```bash
app/
└── comments/
    └── route.ts
```

## `route.ts` Example Using `NextRequest`
```tsx
import { NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");

  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;

  return Response.json(filteredComments);
}
```

## Sample Request
```bash
GET /comments?query=great
```
### Response:
Returns all comments whose text includes `great`.

## Summary
| Feature                 | Details                             |
| ----------------------- | ----------------------------------- |
| Request type            | `NextRequest` from `next/server`    |
| Access query parameters | `request.nextUrl.searchParams`      |
| Works with              | GET, POST, etc. in route handlers   |
| Server-side only        | Yes (no exposure in client browser) |
>📘 This is especially useful for filtering, pagination, and search functionality on the server.

</details>

<details>
<summary><strong>📁 Headers in Route Handlers</strong></summary>

## 📡 What Are HTTP Headers?

Headers represent **metadata** for both the **request** and **response**. They're essential for security, content negotiation, and client-server communication.

---

### 🔁 Request Headers (from Client → Server)

| Header         | Purpose                                                                 |
|----------------|-------------------------------------------------------------------------|
| `User-Agent`   | Identifies client browser/device                                        |
| `Accept`       | Tells server what content types the client can handle                  |
| `Authorization`| Sends credentials or tokens to authenticate the client                 |

---

### 🔁 Response Headers (from Server → Client)

| Header         | Purpose                                                                 |
|----------------|-------------------------------------------------------------------------|
| `Content-Type` | Specifies data format returned (`text/html`, `application/json`, etc.) |

---

## 📁 Folder Structure

```bash
app/
└── profile/
    └── api/
        └── route.ts
```

## 🧪 Reading Headers in Next.js
<h1>Next.js (App Router) gives us two ways to read incoming request headers:</h1>

### 1️⃣ Via `request.headers`
```tsx
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const reqHeaders = new Headers(request.headers);
  console.log(reqHeaders.get("Authorization"));
  return new Response("Profile API data");
}
```
### 2️⃣ Via headers() Helper (Read-Only)

```tsx
import { headers } from "next/headers";

export async function GET() {
  const headerList = headers(); // auto resolves
  console.log(headerList.get("Authorization"));
  return new Response("Profile API data");
}
```
>🔒 Note: Headers from headers() are read-only. You can't mutate them.

### 🧾 Setting Response Headers
To send custom headers back to the client, pass them into the Response constructor:

```tsx
export async function GET() {
  return new Response("Profile API data", {
    headers: {
      "Content-Type": "text/html",
      "X-Custom-Header": "MyHeaderValue",
    },
  });
}
```
>⚠️ If you don’t explicitly set the content-type, it defaults to `text/plain`.

## Summary
| Action                  | Method                            |
| ----------------------- | --------------------------------- |
| Read request headers    | `request.headers` or `headers()`  |
| Set response headers    | `new Response(body, { headers })` |
| Headers are server-only | Yes — secure from browser access  |
>📘 Headers power content negotiation, security, and behavior across HTTP. They're essential for advanced backend logic.
</details>

<details>
<summary><strong>🍪 Cookies in Route Handlers</strong></summary>

## 🍪 What Are Cookies?

Cookies are **small pieces of data** stored on the client-side and sent with every request to the same server.

They serve 3 main purposes:

- **Session Management**: user authentication, shopping carts, etc.
- **Personalization**: themes, language preferences, etc.
- **Tracking**: user behavior analytics, clickstreams, etc.

---

## 🧪 Setting Cookies in Route Handlers

You can set cookies by returning a `Response` with a `Set-Cookie` header:

```tsx
export async function GET() {
  return new Response("<h1>Profile API data</h1>", {
    headers: {
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark",
    },
  });
}
```
>⚠️ This sets the cookie theme=dark in the browser.

# 📖 Reading Cookies
## You have two ways to access cookies in App Router:
### 1️⃣ From `request.cookies` (Request Parameter)
```tsx
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const theme = request.cookies.get("theme");
  console.log(theme); // { name: 'theme', value: 'dark' }
  return new Response("Cookie read successfully");
}
```

### 2️⃣ Using `cookies()` Helper Function

```tsx
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();

  // Set a new cookie
  cookieStore.set("resultsPerPage", "20");

  // Read an existing cookie
  const cookie = cookieStore.get("resultsPerPage");
  console.log(cookie); // { name: 'resultsPerPage', value: '20' }

  return new Response("Cookie set and read successfully");
}
```
>🧠 cookies() is a built-in function that works on the server and gives read/write access to cookies in route handlers.

## Summary
| Task                  | Method                                |
| --------------------- | ------------------------------------- |
| Read cookie           | `request.cookies.get("key")`          |
| Read/write cookie     | `cookies().get()` / `cookies().set()` |
| Set cookie (response) | Use `Set-Cookie` in response header   |

>🍪 Cookies help maintain persistent state across requests and power authentication, customization, and analytics.
</details>

<details>
<summary><strong>🔀 Redirects in Route Handlers</strong></summary>

## 🔁 Why Redirect?

When upgrading from an older API version (e.g., `/v1`) to a new version (`/v2`) with improved structure or features, it’s a good practice to redirect users of the old endpoint.

This allows:

- Gradual transition of clients to the new structure
- Backward compatibility during migration
- Cleanup and deprecation plans for legacy endpoints

---

## 🗂 Folder Structure

```bash
app/
└── api/
    ├── v1/
    │   └── users/
    │       └── route.ts  <-- Redirects to v2
    └── v2/
        └── users/
            └── route.ts  <-- Improved data model
```

## 🔀 v1 → v2 Redirect (Soft Deprecation)
`/app/api/v1/users/route.ts`

```tsx
import { redirect } from "next/navigation";

export async function GET() {
  redirect("/api/v2/users"); // Seamlessly forward to new endpoint
}
```
>✅ Ideal for keeping v1 endpoint functional while encouraging clients to switch.

## 🧠 Why This Works Well
- The redirect helps avoid code duplication.

- Allows you to monitor usage of the old endpoint (log access, warn users).

- Lets you deprecate cleanly in future.

## 🆕 Version 2 with Improved Structure
`/app/api/v2/users/route.ts`

```tsx
type UserV2 = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  name: {
    first: string;
    last: string;
    middle?: string;
  };
  status: "active" | "inactive" | "suspended";
  lastLoginAt: string | null;
  profile: {
    avatar: string | null;
    title: string | null;
    department: string | null;
  };
  preferences: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
  };
};

export async function GET() {
  const users: UserV2[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "john@example.com",
      fullName: "John Smith",
      createdAt: "2024-01-15T08:30:00Z",
      name: {
        first: "John",
        last: "Smith",
      },
      status: "active",
      lastLoginAt: "2024-03-15T09:20:00Z",
      profile: {
        avatar: "https://assets.example.com/avatars/john.jpg",
        title: "Senior Developer",
        department: "Engineering",
      },
      preferences: {
        language: "en-US",
        timezone: "America/New_York",
        emailNotifications: true,
      },
    },
    {
      id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
      email: "jane@example.com",
      fullName: "Jane Wilson",
      createdAt: "2024-02-20T14:15:00Z",
      name: {
        first: "Jane",
        last: "Wilson",
        middle: "Elizabeth",
      },
      status: "active",
      lastLoginAt: "2024-03-14T16:45:00Z",
      profile: {
        avatar: null,
        title: "Product Manager",
        department: "Product",
      },
      preferences: {
        language: "en-GB",
        timezone: "Europe/London",
        emailNotifications: false,
      },
    },
  ];

  return Response.json(users);
}
```

## Summary
| Endpoint        | Behavior                     |
| --------------- | ---------------------------- |
| `/api/v1/users` | Redirects to `/api/v2/users` |
| `/api/v2/users` | Returns structured user data |
>🔄 Redirection is a clean, scalable way to phase out old endpoints and onboard clients to improved APIs.

</details>


