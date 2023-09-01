# README - the-scene

This Readme contains the features and functionality of the-scene PWA built for the RedwoodJS Build Competition August-Sept 10, 2023

---

## the-scene

the-scene is an ephemeral crowdsourced rock show app. Plenty of events apps let you plan for weeks or months in advance, but the-scene is for live music lovers, scene kids, young couples out for something spontaneous, bored teenagers with a car and a desperate need to know what's going on RIGHT NOW.

Ephemeral: Scenes (events) are posted and voted, and they dissapear in 4 hours. Want to plan your event in advance? Use another app! Stumble across a killer basement show? Make a scene!

Crowdsourced: Let people have fun sharing scene vibes instead of relying on faceless tech giant aggregators to bloat the app. You're already there, what's the-scene?

### the-scene - Features

#### Share the Scene

As a user, I want to post a scene that shows an event including the location, whether it is well attended, and the general vibes.

As a user, I want to broadcast this scene to others to provide information about whether they should attend or not.

As a user, I want credit for being an information source about cool events happening now.

As a user, I want to post media to the scene to as proof of vibes.

    -

#### Rate the Scene

As a user, I want to see scenes around me happening now.

As a user, I want to see information about those scenes such as how well-attended is it, what are the vibes, etc.

As a user, I want to contribute my opinion of the scene.

As a user, I want credit for being an information source about cool events happening now.

As a user, I want to post media to the scene as proof of vibes.

### Feature List

#### PWA

- Hack the planet!!!
- The app will be a progressive web app

#### Profile Features

- Clerk 0auth (google, fb, discord, github, mm)
- Profile Pic
- Username
- Your Scenes
- Your Ratings
- Your Uploads

##### Future Profile Features

- Connect to socials
- Your Points
- Zines
  - Attendees can pool points together to redeem for all attendees to recieve Zine memorabilia from the show mailed to their home address
- Point system
  - If you make a pin you get 100 points
  - If you vote on a pin you get 25 points
- Profile points leaderboard

#### Map

- Built-in javascript for user location
- Address/location search & autocomplete location
- Existing Scenes appear on the map
- Users can click into Scenes to see Event information & votes etc
- Scroll map, expand and contract to refine Scene results

##### Future Map features

- Add bonus items? (like Waze candies) Appear near pins. 3 different "items".
- Past Scenes appear
  - (last longer if more people attended)
- Future Scenes appear
  - (no more than 2 weeks in advance)
- Ability to turn on/off past/future Scenes

#### Share The Scene (placing a new event)

- Scenes can only be placed where the user is physically geolocated
- User provides information about the Scene at creation
  - Title
  - Band/Show links
  - Image upload
  - How many people are there?
    - Emoji slider
  - General rating
    - Emoji slider

#### Rate The Scene - Corroborating existing scene information

- Is the event still going?
- How many people are there?
  - Emoji slider
- General rating
  -Emoji slider
- Image Uploads
- Text content (optional review)

---

## What We Want to Build

The team has three objectives for this build:

1. Use crowdsourced data
2. New Redwood integrations & Testing a PWA
3. Create an experience that's fun to use

### Crowsourced

Crowd or community-sourced information is an opportunity for emergent, unplanned experiences. In the current media ecosystem viral emergence is the adrenaline drug that everyone is looking for. Emergent, novel experiences appear when you give people the right tools int he right situations. They need to be easy, provoke play, and serve a specific audience's needs.

Furthermore, when the call for Build came out specifically stating that there doesn't have to have a clear business case, it prompted us to ask what fun audience needs are served that do better WITHOUT monetization and attentional intrusion. The local, underground, youth, and live music scenes jumped to mind. These scenes typically have vibrant communities that thrive by DIY mentality and word of mouth, bypassing the rails of megatech.

It felt like an opportunity to create a fun, connective social experience based on participant input, not by promoted posts and SEO hacking. Instead, the data that powers events in the app come from the participants and their real-time ephemeral experiences.

### Deeper Into the (Red)Woods

Why we love Redwood: we don't have to write endless boilerplate for a lot of common app-building stuff. Redwood's CLI makes scaffolding out the big parts of the app quick, easy, and robust. When these parts of development are easy it gives us more time to experiment with integrations that we want to test out.

Example, authorization integration to Redwood is top notch, and we're leaning on clerk.dev to handle user management. This is something we wanted to experiment with and now have a fresh app to test it out. We're also going to be leveraging maps functionality in the backend to play with geolocation, and other similar integrations as we find need for them.

We also want to explore what progressive web app (PWA) functionality looks like on Redwood. This gives us a chance to explore what it takes to setup a PWA on Redwood as we move into future phases of Infinity Keys.

### Fun to Build, Fun to Use

It is critical that the app itself is fun to use. Not just the vibes and the narrative, but also the design and responsiveness. The actions the user takes need to be fun on their own, which is why we've stripped out many common event planning features - they're boring, this is more like a dating app.

Responsiveness is also key as people attending an event need to be able to indicate a few important details quickly, then get back to the live vibes. Also, real-time ephemeral events change status quickly, so collecting, computing, and returning aggregate values is critical for this kind of experience to feel organic and live.

Also we're music fans and we generally have a punk rock, anti-establistment vibe. We love local music, hardcore, punk, rap, and generally giving authority the finger. So let's build an app that lets other people do that stuff too!

## Permissive License

MIT License

    Copyright (c) Infinity Keys, Inc.

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE

## Additional Resources
