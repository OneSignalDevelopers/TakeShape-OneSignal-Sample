# TakeShape-OneSignal-Sample

Hi, Jaden here. I reached out to my bud Pato at [OneSignal](onesignal.com) about working on a project together back in mid-August. Since then, we've been cooking up a little sample project that experiments with the combination of OneSignal's push notifications tech with [TakeShape](https://www.takeshape.io/)'s powerful API mesh, and boy, we had a blast. In this article, Pato and I will go back and forth explaining a bit about what we accomplished and why we went about it that way. If you want to follow along, check out the [blog post](https://www.takeshape.io/articles/with-the-power-vested-in-me-by-onesignal-and-takeshape/). Here's the plan:

- Build an app that will look up a country based on its abbreviation and send the user a push notification
- Use OneSignal's SDK to do the subscription registration for push notifications
- Send the actual notification with OneSignal using an API call from TakeShape
- Use TakeShape to set up a pipeline for the data that can be triggered with a single GraphQL API call instead of multiple separate callsIt'll be our app → TakeShape API mesh → Countries API → TakeShape API mesh → OneSignal API → return to our app. All in one request.
- Turn this into a starter project to help people get going with TakeShape and OneSignal
- Try to make it look pretty so that people don't ridicule us for making something cool without it looking the part


