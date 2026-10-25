/**
 * BE SOOCIAL — Centralized Media Architecture (Single Source of Truth)
 * Remote Google Drive CDN streaming architecture for ultra-lightweight deployments.
 * Keeps repo bundle < 50MB for free 1-click deployments on Vercel/Netlify.
 */

export const getDriveVideoUrl = (fileId: string) =>
  `/api/media/${fileId}`;

export const getDriveImageUrl = (fileId: string) =>
  `https://lh3.googleusercontent.com/d/${fileId}`;

export const PORTFOLIO_MEDIA = {
  breakingFinancialCycle: {
    id: 'breaking-financial-cycle',
    video: getDriveVideoUrl('1ES1uf2zK36ZfXlmG4xf8hAbNfOuFI1xR'),
    poster: getDriveImageUrl('1ES1uf2zK36ZfXlmG4xf8hAbNfOuFI1xR'),
    aspectRatio: '9/16' as const,
  },
  starbucksBrandReveal: {
    id: 'starbucks-brand-reveal',
    video: getDriveVideoUrl('1fNguufzbEDEedUUy1oNdiI6Qsc0PnPgt'),
    poster: getDriveImageUrl('1fNguufzbEDEedUUy1oNdiI6Qsc0PnPgt'),
    aspectRatio: '16/9' as const,
  },
  blinkpic: {
    id: 'blinkpic',
    video: getDriveVideoUrl('1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM'),
    poster: getDriveImageUrl('1DWX9xRXXtXC-VZZ6hXhMUdjerw4LgNoM'),
    aspectRatio: '16/9' as const,
  },
  pioneerAirSystems: {
    id: 'pioneer-air-systems',
    video: getDriveVideoUrl('1QU5RFDDwyb-ZfcvU_BKhk-P0-bXYIiuD'),
    poster: getDriveImageUrl('1QU5RFDDwyb-ZfcvU_BKhk-P0-bXYIiuD'),
    aspectRatio: '16/9' as const,
  },
  livzo: {
    id: 'livzo',
    video: getDriveVideoUrl('18NX6d4OgaqvKLFY6PybhRL48B7p-6ebj'),
    poster: getDriveImageUrl('18NX6d4OgaqvKLFY6PybhRL48B7p-6ebj'),
    aspectRatio: '9/16' as const,
  },
  ultimateEditors: {
    id: 'ultimate-editors',
    video: getDriveVideoUrl('1pSLndbQTyouR9nLzGigh2hFbldgzYp9r'),
    poster: getDriveImageUrl('1pSLndbQTyouR9nLzGigh2hFbldgzYp9r'),
    aspectRatio: '16/9' as const,
  },
  specDrivenDevelopment: {
    id: 'spec-driven-development',
    video: getDriveVideoUrl('1bQpM551mibB8o4_6vh5PrJ-Z2VlZQR7L'),
    poster: getDriveImageUrl('1bQpM551mibB8o4_6vh5PrJ-Z2VlZQR7L'),
    aspectRatio: '16/9' as const,
  },
  aiEssentials: {
    id: 'ai-essentials',
    video: getDriveVideoUrl('1mQoLmx1AGCzwWvsBlE3JEUrJlTI0FaiL'),
    poster: getDriveImageUrl('1mQoLmx1AGCzwWvsBlE3JEUrJlTI0FaiL'),
    aspectRatio: '16/9' as const,
  },
  agentvoice: {
    id: 'agentvoice',
    video: getDriveVideoUrl('1Ia2czIgX13_19U5hLoq1eWTMOe4DRHp4'),
    poster: getDriveImageUrl('1Ia2czIgX13_19U5hLoq1eWTMOe4DRHp4'),
    aspectRatio: '16/9' as const,
  },
  nexl: {
    id: 'nexl',
    video: getDriveVideoUrl('1dhcCerRy9nEFTRcn6ntKfRMXyZkTJmvd'),
    poster: getDriveImageUrl('1dhcCerRy9nEFTRcn6ntKfRMXyZkTJmvd'),
    aspectRatio: '16/9' as const,
  },
} as const;

export const AI_FILMMAKING_MEDIA = {
  meVsDooms: {
    video: getDriveVideoUrl('11poiwi6HvSDJSAZ73-oolsNfSecV84iw'),
    poster: getDriveImageUrl('14w00hpw4UNZk84FgUerS7NwmoCjlsW5u'),
  },
  hodSampleRender: {
    video: getDriveVideoUrl('1OCtmevynqH8c-EZwUw1XrX05Pp0W8wDK'),
    poster: getDriveImageUrl('1W0uJnMWqRbg0JIMf7DRUFdAX50G3x3X8'),
  },
  sample: {
    video: getDriveVideoUrl('19_kr2sCuf8wbmjpv6-3BCGO9znDmum2e'),
    poster: getDriveImageUrl('1bq-QLb2ep3COXkwq16Vi-j3RfjFyvzZT'),
  },
  julian: {
    video: getDriveVideoUrl('18t1zrQzxrycIHZRoAtNwM5DwpddROSA3'),
    poster: getDriveImageUrl('1L2PA2mGloTJxcFqz4MeWWEK6yPvDADYQ'),
  },
  geekgod: {
    video: getDriveVideoUrl('1rZ3l_8J8nGMqM1Fz2kgKSfFzsXNoLqOR'),
    poster: getDriveImageUrl('1MOHiFt8dXoL9SzHOSsRN-2uZzArHkhXe'),
  },
  marage: {
    video: getDriveVideoUrl('1lbJQ-DKikHlMEKbNfkIpWksI4odxbwgo'),
    poster: getDriveImageUrl('19p6y1J6B7XHLUGKdp-YJiTB2SISY2hww'),
  },
  tabV: {
    video: getDriveVideoUrl('1gZXJ7_qpKDiFwDIGW2S1E8-sAXX7zBbk'),
    poster: getDriveImageUrl('1CN7Towa3ygsoccE4U6DmrCudlKp8q31A'),
  },
  wbmUberRender: {
    video: getDriveVideoUrl('1Pt2Slp2dQT_3lH60guOa-Yy7KFUvmC4J'),
    poster: getDriveImageUrl('1KmaK4mNXw8wlcjtkElj9Dp1Y-dNkmqja'),
  },
} as const;

export const POSTERS_MEDIA = {
  violetCyberpunk: getDriveImageUrl('14w00hpw4UNZk84FgUerS7NwmoCjlsW5u'),
  hod: getDriveImageUrl('1W0uJnMWqRbg0JIMf7DRUFdAX50G3x3X8'),
  sample: getDriveImageUrl('1bq-QLb2ep3COXkwq16Vi-j3RfjFyvzZT'),
  dungeonConfrontation: getDriveImageUrl('1Ypx3Rd5cYf020wR6pOFNgh-g-sqVtiwq'),
  hotelLobbyDrama: getDriveImageUrl('1FrK7GfC9YM1brb_mTOVWjenV3H_jelLb'),
  weddingBeachSunset: getDriveImageUrl('1iXceoKCU6WXl3zCV9Y0tJ53EzCq7_8OH'),
  mountOlympusNymph: getDriveImageUrl('18MhBN9Eldn5A59Tym-1uzpo1jZtB0a8Y'),
  julianCover: getDriveImageUrl('1L2PA2mGloTJxcFqz4MeWWEK6yPvDADYQ'),
  geekgodCover: getDriveImageUrl('1MOHiFt8dXoL9SzHOSsRN-2uZzArHkhXe'),
  marageCover: getDriveImageUrl('19p6y1J6B7XHLUGKdp-YJiTB2SISY2hww'),
  tabVCover: getDriveImageUrl('1CN7Towa3ygsoccE4U6DmrCudlKp8q31A'),
  wbmUberCover: getDriveImageUrl('1KmaK4mNXw8wlcjtkElj9Dp1Y-dNkmqja'),
} as const;
