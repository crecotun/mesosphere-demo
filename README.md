# mesosphere-demo

## How to view UI
1. Open url https://mesosphere.herokuapp.com/ (You will have to wait several seconds, heroku freezes server if it's inactive)
2. Or install application and run a server locally:
  1. `npm install`
  2. `npm run dev`

## Tech Stack
1. React
2. Mobx
3. TypeScript
4. Jest
5. Sass + Autoprefixer
6. uuid — to generate uniq ids
7. Custom Next.js configuration I use for side projects

I decided to go with this stack because I've been working with it for the last 2 years and I feel pretty confident and productive with it.
I was very sceptic about MobX when I first time tried it after Redux. Soon I realised that it's very powerful tool when it comes to speed of development and performance.

## Implementation
The code reflects the flow I had in my head. I am pretty sure, some parts could be simplified and rewritten. But the best is enemy of the good :)

I started implementation with business-logic part. I decided to fo with TDD approach, because it allows me to stay focused and get immediate feedback without clicking UI and switching contexts. When business-logic was ready I switched to UI development. Unfortunately, I didn't have enough time to do pixel perfect or add some fancy animations, just bare minimum.
I didn't implement in UI the info how long ago was created application, but every application has `createdAt` property.

During development I realised that ClusterStore is overloaded by methods, which doesn't belong to it. I would create ApplicationsStore and ServersStore and move some functionality there. Also I think it would be much better to have applications and servers not within cluster, but on the same level. So you'll be able to move servers with apps from cluster to cluster without "pain".

- Servers can be destroyed by click on them.
- When server destroys, I try to move apps to capable servers. In case we have 2 apps and only 1 server with 1 free slot, then I move an app to it. Other app will be killed.
