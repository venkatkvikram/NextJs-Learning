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

