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

I decided to go with this tech stach because I've been working with it for the last 2 years and it makes me super productive.
I was very sceptic about MobX when I first time tried MobX after Redux. Soon I realised that it's very powerful tool when it comes to speed of development and performance.

## Implementation
The code reflects the flow I had in my head. I am pretty sure, some parts could be simplified and rewritten. But the best is enemy of the good :)

I started implementation with business-logic part. I decided to fo with TDD approach, because it allows me to stay focused and get immediate feedback without clicking UI and switching contexts. When business-logic was ready I switched to UI development. Unfortunately, I didn't have enough time to do pixel perfect or add some fancy animations, just bare minimum.
I didn't implement in UI the info how long ago was created application, but every application has `createdAt` property.

During development I realised that ClusterStore is overloaded by methods, which doesn't belong to it. I would create ApplicationsStore and ServersStore and move some functionality there. Also I think it would be much better to have applications and servers not within cluster, but on the same level. So you'll be able to move servers with apps from cluster to cluster without "pain".