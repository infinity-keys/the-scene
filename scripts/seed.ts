import { CreateSeedSceneInput, CreateUserInput } from '$web/types/graphql'
import { db } from 'api/src/lib/db'

export default async () => {
  try {
    const userData: CreateUserInput[] = [
      {
        authId: 'user_2VaRUjEjc1zr7nvP66EGZASAooQ',
        username: 'rick.a.burd',
        avatar:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yVlJHZGIyN3hNQnAyNUdzUXlQckoxWksxSE8uanBlZyJ9',
      },
      {
        authId: 'user_2VRUWMtO4h0ljPqlfn59q2807xG',
        username: 'itsmekori',
        avatar:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yVjg5UHpRRTdKNmlaSjFudzRPQ2M3N1UwbzMucG5nIn0',
      },
      {
        authId: 'user_2V8Jafr3nblxmIX163YHXh3NUeH',
        username: 'bloomcb',
        avatar:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yVjhKYXJpQXRHZDF2M2I2N2hFcU9jcVJlRDQuanBlZyJ9',
      },
      {
        authId: 'user_2V7l94z3GtmHjzyvjmRSRji88cn',
        username: '__shax__',
        avatar:
          'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZGlzY29yZC9pbWdfMlY3bDk5YkhCTWhlbXBrdkgzTWZleGJDR1YwLnBuZyJ9',
      },
    ]

    const users = await db.user.createMany({ data: userData })

    console.log(`👍 - created ${users.count} users`)

    const sceneData: CreateSeedSceneInput[] = [
      {
        latitude: 34.052235,
        longitude: -118.243683,
        title: 'Sunset Vibes',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: 'Catch live music by the beach.',
        link: 'https://bandcamp.com',
        userId: userData[0].authId,
      },
      {
        latitude: 40.712776,
        longitude: -74.005974,
        title: 'City Groove',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: 'Urban beats in the heart of NYC.',
        link: 'https://bandcamp.com',
        userId: userData[0].authId,
      },
      {
        latitude: 41.878113,
        longitude: -87.629799,
        title: 'Windy City Jams',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: "Chicago's finest musical talents.",
        link: 'https://bandcamp.com',
        userId: userData[0].authId,
      },
      {
        latitude: 29.760427,
        longitude: -95.369804,
        title: 'Bayou Blues',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: 'Soulful tunes from the Deep South.',
        link: 'https://bandcamp.com',
        userId: userData[1].authId,
      },
      {
        latitude: 37.774929,
        longitude: -122.419416,
        title: 'Fog City Soundscapes',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: '',
        link: '',
        userId: userData[1].authId,
      },
      {
        latitude: 39.952583,
        longitude: -75.165222,
        title: 'Philly Groove',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: '',
        link: 'https://bandcamp.com',
        userId: userData[1].authId,
      },
      {
        latitude: 33.748997,
        longitude: -84.387985,
        title: 'Southern Soul',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: "Atlanta's rhythm and blues revival.",
        link: '',
        userId: userData[2].authId,
      },
      {
        latitude: 35.682839,
        longitude: -105.937931,
        title: 'Desert Harmony',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: 'Music under the New Mexico stars.',
        link: 'https://bandcamp.com',
        userId: userData[2].authId,
      },
      {
        latitude: 32.715736,
        longitude: -117.161087,
        title: 'SoCal Beats',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: 'Sunny tunes in Southern California.',
        link: 'https://bandcamp.com',
        userId: userData[3].authId,
      },
      {
        latitude: 47.606209,
        longitude: -122.332069,
        title: 'Emerald City Grooves',
        coverImageId: 'the-scene/ezmo6zfqocjzabg6f82u',
        info: "Seattle's indie music scene.",
        link: 'https://bandcamp.com',
        userId: userData[3].authId,
      },
    ]

    const scenes = await db.scene.createMany({ data: sceneData })

    console.log(`👍 - created ${scenes.count} scenes`)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
