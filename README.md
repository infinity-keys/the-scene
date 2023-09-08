# README - the-scene

This README contains the features, functionality, and background of The Scene application built by Infinity Keys for the RedwoodJS Build Competition August-Sept 10, 2023.
---
The Scene is an ephemeral crowdsourced rock show app. Plenty of events apps let you plan for weeks or months in advance, but the-scene is for live music lovers, scene kids, young couples out for something spontaneous, bored teenagers with a car and a desperate need to know what's going on RIGHT NOW.

Ephemeral: Scenes (events) are posted and voted, and they dissapear in 4 hours. Want to plan your event in advance? Use another app! Stumble across a killer basement show? Make a scene!

Crowdsourced: Let people have fun sharing scene vibes instead of relying on faceless tech giant aggregators to bloat the app. You're already there, what's the-scene?

## Features
### Share a Scene
As a user, I want to post a scene that shows an event including the location, whether it is well attended, and the general vibes.

As a user, I want to broadcast this scene to others to provide information about whether they should attend or not.

As a user, I want credit for being an information source about cool events happening now.

As a user, I want to post media to the scene to as proof of vibes.
### Find a Scene
As a user, I want to see scenes around me happening now.

As a user, I want to see information about those scenes such as how well-attended is it, what are the vibes, etc.

As a user, I want to contribute my opinion of the scene.

As a user, I want credit for being an information source about cool events happening now.

As a user, I want to post media to the scene as proof of vibes.

## Feature List

### PWA
- The app will be a progressive web app
- Hack the planet!!!

### Profile Features
- Clerk 0auth (google, discord, github)
- Profile Pic
- Username


#### Future Profile Features
 - Connect to socials
 - Your Scenes
 - Your Ratings
 - Your Uploads
 - Your Points
 - Zines
	- Attendees can pool points together to redeem for all attendees to recieve Zine memorabilia from the show mailed to their home address
- Point system
	- If you make a pin you get 100 points
	- If you vote on a pin you get 25 points
- Profile points leaderboard

### Map
- Built-in javascript for user location
- Address/location search & Directions
- Existing Scenes appear on the map
- Users can click into Scenes to see Event information & votes etc
- Scroll map, expand and contract to refine Scene results

#### Future Map features
- Add bonus items? (like Waze candies) Appear near pins. 3 different "items".
- Past Scenes appear
	- (last longer if more people attended)
- Future Scenes appear
	- (no more than 2 weeks in advance)
- Ability to turn on/off past/future Scenes

### Share a Scene - Placing a new event
- Scenes can only be placed where the user is physically geolocated
- User provides information about the Scene at creation
	- Title
	- Band/Show links
	- Image upload
	- How many people are there?
		- Emoji slider
	- General rating
		- Emoji slider

### Find a Scene + Rate a Scene
- Is the event still going?
- How many people are there?
	- Emoji slider
- General rating
	-Emoji slider
- Text content (optional review)
- Image uploads (next version)
---

## What We Want to Build
The team has three objectives for this build:
1. Use crowdsourced data
2. New Redwood integrations & Testing a PWA
3. Create an experience that's fun to use

### Crowsourced
Crowd or community-sourced information is an opportunity for emergent, unplanned experiences. In the current media ecosystem viral emergence is the adrenaline drug that everyone is looking for. Emergent, novel experiences appear when people play with media tools together. They need to be easy, provoke play, and serve a specific audience's needs (not always the intended needs haha!).

When the call for RedwoodBuild came out specifically stating that there doesn't have to have a clear business case, it prompted us to ask what fun audience needs are served that do better WITHOUT monetization and attentional intrusion. The local, underground, youth, and live music scenes jumped to mind. These scenes typically have vibrant communities that thrive by DIY mentality and word of mouth, bypassing the rails of megatech.

It felt like an opportunity to create a fun, connective social experience based on participant input, not by promoted posts and SEO hacking. Instead, the data that powers events in the app come from the participants and their real-time ephemeral experiences.

### Deeper Into the (Red)Woods
Why we love Redwood: we don't have to write endless boilerplate for a lot of common app-building stuff. Redwood's CLI makes scaffolding out the big parts of the app quick, easy, and robust. When these parts of development are easy it gives us more time to experiment with integrations that we want to test out.

Example, authorization integration to Redwood is top notch, and we're leaning on clerk.dev to handle user management. This is something we wanted to experiment with and now have a fresh app to test it out. We're also going to be leveraging maps functionality in the backend to play with geolocation, and other similar integrations as we find need for them.

We also want to explore what progressive web app (PWA) functionality looks like on Redwood. This gives us a chance to explore what it takes to setup a PWA on Redwood as we move into future phases of Infinity Keys.

### Fun to Build, Fun to Use
Creating, sharing, finding, and rating events should be a delightful experience, which is why we've stripped out many common event planning features - they're boring, The Scene is more like a dating app. We anticipate that responsiveness and simple tasks will generate more delight by asking less of the user. We tried to provide delight by adding sliders, funky design, customization, and simple flows through the basic app features. People attending shows don't need to be on The Scene app the whole time, they hsould be able to pop on, share, and head back into the PIT!

Responsiveness is also a key for fun as people attending an event need to be able to indicate a few important details quickly, then get back to the live vibes. Also, real-time ephemeral events change status quickly, so collecting, computing, and returning aggregate values is critical for this kind of experience to feel organic and live.

Also we're music fans and we generally have a punk rock, anti-establistment vibe. We love local music, metal, punk, rap, and generally giving authority the finger. So let's build an app that lets other people do that stuff too!

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

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORP
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE


## Additional Resources

## Running Locally

To run this locally you will need accounts at [Map Box](https://www.mapbox.com/), [Clerk](https://clerk.com/), and [Cloudinary](https://cloudinary.com/), and Docker installed.

1. Copy the contents of `.env.defaults` to `.env` and update the values with your API keys from the accounts above.

2. Create a webhook in your Clerk project pointing to your site's API url `/user`. You can install [ngrok](https://ngrok.com/) for locally testing.

3. `docker-compose up -d`

4. `yarn rw dev`
