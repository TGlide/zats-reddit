<p align="center">
  <h3 align="center">zats-reddit</h3>
  
 <p align="center">
    <a href="https://zod.dev/">
      <img src="https://img.shields.io/badge/types-zod-%23007ACC?style=for-the-badge&logo=typescript" alt="Built with Typescript">
    </a>
    <a href="https://www.appwrite.io/">
      <img src="https://img.shields.io/badge/baas-appwrite-%23F02E65?style=for-the-badge&logo=appwrite" alt="Built with Appwrite">
    </a>
    <a href="https://tailwindcss.com/">
      <img src="https://img.shields.io/badge/stlying-tailwind-%2338B2AC?style=for-the-badge&logo=tailwind-css" alt="Built with Tailwind">
    </a>
    <a href="https://kit.svelte.dev/">
      <img src="https://img.shields.io/badge/framework-sveltekit-%23FF3E00?style=for-the-badge&logo=svelte" alt="Built with SvelteKit">
    </a>
    
  </p>
</p>

## Description

This is a reddit clone built with Zod, Appwrite, Tailwind, and SvelteKit. It was built to showcase Appwrite's capabilities in a real-world full-stack application.

It is also a experiment on using Zod for validation in a SvelteKit + Appwrite application.

### Details

- You can only see admin-created or self-created posts and comments, to avoid need for moderation.
- Authentication is ephemeral, meaning you are automatically signed up with a randomly-generated username, which will be used for the duration of the session.
- TODO: All users & user-generated contents are deleted after at least 24 hours.

## TODO

### Requirements

- [x] Post filter logic
- [x] Responsiveness
- [x] Votes on comments
- [x] Implement votes functionality (upvote/downvote)
- [x] Create comments
- [x] Session
- [x] Make sure no duplicate accounts are created

### Niceties

- [ ] Post deletion function
- [ ] Comment deletion function
- [ ] Delete stuff after 24 hours
- [ ] 404 page
- [ ] Review code organization
- [ ] Review progressive enhancement
- [ ] Link Posts
- [ ] Image/Video posts
- [ ] Comment filter logic
- [ ] Admin mode features (delete, change votes, etc.)
- [x] Loading states
- [x] Favicon
- [x] Pretty readme
- [x] Change fonts
