# Pocket Philosopher



## Tech stack
- Tailwind CSS
  - Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override. It's designed to be a utility-first CSS where classes are added in the HTML rather than in separate CSS selectors. This means that you can build a whole webpage without writing a single line of CSS.
- Shadcn
  - Shadcn is a lightweight, flexible, and efficient shadow DOM library for building web components. It provides a simple and intuitive API for creating and managing shadow DOM trees, making it easier to build encapsulated, reusable components.
- NextJS
  - Next.js is an open-source development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites.
- Clerk 
  - Clerk is a complete user management and authentication service that helps you create secure and delightful experiences for your users. It provides features like sign up, sign in, two-factor authentication, password reset, and more. It's designed to be developer-friendly with a simple API, making it easy to integrate with your tech stack.
- PlanetScale
  - PlanetScale is a reliable and scalable relational database platform and clustering system for horizontal scaling of MySQL. It allows you to deploy, run, and manage databases with high availability, security, and performance needs. It also provides a SQL interface for data access, making it a great choice for applications that need the power and flexibility of a relational database.



## Potential improvements (for project week)
- limit non-pros to:
  - only have x number of companions?
  - only being able to add philosophers?
  - limit the categories they can set (companion-form.tsx Select)

## Explanations
- [Companion Creation Form explanation](https://youtu.be/PjYWpd7xkaM?si=hhEquGfIPFhf7BoN&t=8513)
- [Conditional rendering of role based message (chat-message.tsx, etc)](https://youtu.be/PjYWpd7xkaM?si=LC5ABfvTDBafNaHd&t=14949)


## Follow ups
- [Dark/light mode force](https://youtu.be/PjYWpd7xkaM?si=_sexRnuKEeW0uq93&t=3078)
- what are hydration issues [here](https://youtu.be/PjYWpd7xkaM?si=0Bt8LpIcSKbrTvra&t=7322)




## Learnings
- how Typsescript uses Types
- dynamic rendering of className srings (clsx or cn, in my project)
- Debouncing techniques (/hooks/use-debounce)
  - Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, that it leads to intensive CPU usage. It is a process that adds a delay to the function execution. If the same event is triggered before the delay period, the timer resets. This is particularly useful in scenarios where you want to limit the rate of execution of a function, especially in events like scrolling, resizing, keypress etc. in JavaScript.
- Prisma (Sequelize equiv)
  - Prisma is an open-source database toolkit. It replaces traditional ORMs and makes database access easy with an auto-generated and type-safe query builder that's tailored to your database schema. It currently supports PostgreSQL, MySQL, SQL Server and SQLite.
- Shadcn 
  - Shadcn is a lightweight, flexible, and efficient shadow DOM library for building web components. It provides a simple and intuitive API for creating and managing shadow DOM trees, making it easier to build encapsulated, reusable components.
- Uploading images using Cloudinary




## Pro tips

### Prisma DB
- every time the Prisma schema is updated (/prisma/schema.prisma), you must run these two commands:
- `npx prisma generate`
- `npx prisma db push`
- this regenerates the schema and then pushes it to PlanetScale
- it's always best to restart the server once this has happened
- to run the prisma viewer: `npx prisma studio`


## Notes
- Deprecated code was found using this tutorial
  - to get around it I installed an older version of pinecone and its dependence langchain:
  - `npm install @pinecone-database/pinecone@0.1.6`
  - `npm install langchain@0.0.92`
  - instead of pinecone 1.2 and langchain 0.186


## Stripe

- when working to test stripe payments, make sure that this is running:
  - `stripe listen --forward-to localhost:4242/webhook`
