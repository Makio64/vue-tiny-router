---
title: Introduction
editLink: true
---

# What is Vue Tiny Router?

`vue-tiny-router` is a minimalist, lightweight, and fast routing solution for Vue 3 applications. It was built with a simple goal: to provide all the essential routing features you need in the smallest possible package. At just **1.02kb gzipped**, it offers a powerful alternative to more complex solutions without sacrificing core functionality.

## Why Choose Vue Tiny Router?

In modern web development, performance is paramount. While feature-rich libraries like `vue-router` are excellent for large-scale applications, many projects don't require their extensive feature set. This is where `vue-tiny-router` shines.

### Key Philosophy: Keep it Tiny

Our core philosophy is to maintain a minimal bundle size while providing a complete and intuitive API. We believe a router shouldn't be a bottleneck in your application's performance.

### When to Use Vue Tiny Router

`vue-tiny-router` is a perfect fit for:
- **Small to medium-sized projects**: Where a lightweight solution is preferred.
- **Performance-critical applications**: Reduce your bundle size and improve load times.
- **Embedded widgets or components**: Manage internal state without affecting the main application's URL.
- **Rapid prototyping**: Get a fully functional router up and running in minutes.
- **Developers who prefer simplicity**: Enjoy a straightforward API that's easy to learn and use.

## Core Features at a Glance

Even with its small size, `vue-tiny-router` comes packed with features:

| Feature | Description | Status |
| --- | --- | :---: |
| **Route Parameters** | Create dynamic routes like `/user/:id`. | ✅ |
| **Route Guards** | Control navigation with `beforeRouteLeave`. | ✅ |
| **Lazy Loading** | Load components asynchronously to reduce bundle size. | ✅ |
| **Redirects** | Easily map old paths to new ones. | ✅ |
| **Memory Mode** | Manage routes without affecting browser history. | ✅ |
| **Anchor Links** | Automatic smooth scrolling for hash fragments. | ✅ |
| **Link Interception** | Automatically handles `<a>` tag clicks. | ✅ |

## A Quick Comparison

Here's how `vue-tiny-router` stacks up against `vue-router`:

| Aspect | vue-tiny-router | vue-router |
| :--- | :--- | :--- |
| **Bundle Size** | **~1kb gzipped** | ~8kb gzipped |
| **API Complexity** | Simple & intuitive | Comprehensive & powerful |
| **Setup Time** | < 1 minute | A few minutes |
| **Core Features** | All essentials included | Extensive feature set |
| **Use Case** | Performance-critical & simple apps | Large-scale & complex apps |

Ready to get started? Head over to the [Getting Started](./getting-started.md) guide to add and configure `vue-tiny-router` in your project. 