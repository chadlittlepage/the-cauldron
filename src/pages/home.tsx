import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Music,
  TrendingUp,
  ArrowRight,
  Play,
  Star,
  Zap,
  Headphones,
  BarChart3,
  Shield,
  Sparkles,
  Heart,
  ThumbsDown,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const trackPool = [
  // ── Previously verified (18) ──
  {
    title: 'Sailor Song',
    artist: 'Gigi Perez',
    genres: ['Indie', 'Pop'],
    spotifyId: '0UYnhUfnUj5adChuAXvLUB',
    votes: 127,
  },
  {
    title: 'Automatic',
    artist: 'half·alive',
    genres: ['Alternative', 'Indie'],
    spotifyId: '4WDzpyln8Ac9JbElIEv2bl',
    votes: 98,
  },
  {
    title: 'Pushing It Down and Praying',
    artist: 'Lizzy McAlpine',
    genres: ['Singer-Songwriter', 'Folk'],
    spotifyId: '4wO2JlPZw72Xlu6dGUW4Ce',
    votes: 84,
  },
  {
    title: 'Pink Pony Club',
    artist: 'Chappell Roan',
    genres: ['Pop', 'Indie'],
    spotifyId: '1k2pQc5i348DCHwbn5KTdc',
    votes: 142,
  },
  {
    title: 'Motion Sickness',
    artist: 'Phoebe Bridgers',
    genres: ['Indie', 'Rock'],
    spotifyId: '5xo8RrjJ9CVNrtRg2S3B1R',
    votes: 115,
  },
  {
    title: 'Heat Waves',
    artist: 'Glass Animals',
    genres: ['Alternative', 'Pop'],
    spotifyId: '02MWAaffLxlfxAUY7c5dvx',
    votes: 108,
  },
  {
    title: 'Glimpse of Us',
    artist: 'Joji',
    genres: ['R&B', 'Pop'],
    spotifyId: '6xGruZOHLs39ZbVccQTuPZ',
    votes: 91,
  },
  {
    title: 'Kyoto',
    artist: 'Phoebe Bridgers',
    genres: ['Indie', 'Rock'],
    spotifyId: '4vjvx7Zxkb4AltGcZ0BBvI',
    votes: 103,
  },
  {
    title: 'Mystery of Love',
    artist: 'Sufjan Stevens',
    genres: ['Indie', 'Folk'],
    spotifyId: '0MNNKSUU9OOQ8DSGWduw79',
    votes: 76,
  },
  {
    title: 'Bags',
    artist: 'Clairo',
    genres: ['Indie', 'Pop'],
    spotifyId: '6UFivO2zqqPFPoQYsEMuCc',
    votes: 89,
  },
  {
    title: 'Nobody',
    artist: 'Mitski',
    genres: ['Indie', 'Pop'],
    spotifyId: '6bTn1ovliI0OkjUNkiMBJq',
    votes: 95,
  },
  {
    title: 'Something Comforting',
    artist: 'Porter Robinson',
    genres: ['Electronic', 'Pop'],
    spotifyId: '6iZVQLI9gs9kFRnmbQLzHO',
    votes: 110,
  },
  {
    title: 'Line Without a Hook',
    artist: 'Ricky Montgomery',
    genres: ['Indie', 'Pop'],
    spotifyId: '5jvgec3P4jyoZUPTy2pWDR',
    votes: 88,
  },
  {
    title: 'Apocalypse',
    artist: 'Cigarettes After Sex',
    genres: ['Dream Pop', 'Indie'],
    spotifyId: '0yc6Gst2xkRu0eMLeRMGCX',
    votes: 101,
  },
  {
    title: 'Not Strong Enough',
    artist: 'boygenius',
    genres: ['Indie', 'Rock'],
    spotifyId: '09DR0sHnQUhHOiSNttc1mv',
    votes: 119,
  },
  {
    title: 'Be Sweet',
    artist: 'Japanese Breakfast',
    genres: ['Indie', 'Pop'],
    spotifyId: '0dpyzcT3RMNNSd2xKBf35I',
    votes: 94,
  },
  {
    title: 'The Less I Know The Better',
    artist: 'Tame Impala',
    genres: ['Psychedelic', 'Pop'],
    spotifyId: '6K4t31amVTZDgR3sKmwUJJ',
    votes: 136,
  },
  {
    title: 'Skinny Love',
    artist: 'Bon Iver',
    genres: ['Indie', 'Folk'],
    spotifyId: '3B3eOgLJSqPEA0RfboIQVM',
    votes: 112,
  },
  // ── Indie Pop ──
  {
    title: 'Dreams Tonite',
    artist: 'Alvvays',
    genres: ['Indie Pop', 'Dream Pop'],
    spotifyId: '3xiMFRYBQL1zxdxbgUmBKI',
    votes: 134,
  },
  {
    title: 'Archie, Marry Me',
    artist: 'Alvvays',
    genres: ['Indie Pop', 'Jangle Pop'],
    spotifyId: '5HLes17mwCwKt81mi0Tk35',
    votes: 112,
  },
  {
    title: 'Sofia',
    artist: 'Clairo',
    genres: ['Indie Pop', 'Bedroom Pop'],
    spotifyId: '7B3z0ySL9Rr0XvZEAjWZzM',
    votes: 97,
  },
  {
    title: 'we fell in love in october',
    artist: 'girl in red',
    genres: ['Indie Pop', 'Bedroom Pop'],
    spotifyId: '6IPwKM3fUUzlElbvKw2sKl',
    votes: 143,
  },
  {
    title: 'Are You Bored Yet?',
    artist: 'Wallows',
    genres: ['Indie Pop', 'Indie Rock'],
    spotifyId: '57RA3JGafJm5zRtKJiKPIm',
    votes: 109,
  },
  {
    title: 'Alrighty Aphrodite',
    artist: 'Peach Pit',
    genres: ['Indie Pop', 'Jangle Pop'],
    spotifyId: '6OiRh4kttAs1YWglvTcYkB',
    votes: 76,
  },
  {
    title: 'Loving Is Easy',
    artist: 'Rex Orange County',
    genres: ['Indie Pop', 'Bedroom Pop'],
    spotifyId: '7ASFZh1D0DPZro7UXUKGmd',
    votes: 138,
  },
  {
    title: 'Somebody Else',
    artist: 'The 1975',
    genres: ['Indie Pop', 'Synth Pop'],
    spotifyId: '5hc71nKsUgtwQ3z52KEKQk',
    votes: 131,
  },
  {
    title: 'The Sound',
    artist: 'The 1975',
    genres: ['Indie Pop', 'New Wave'],
    spotifyId: '316r1KLN0bcmpr7TZcMCXT',
    votes: 85,
  },
  {
    title: 'Sweater Weather',
    artist: 'The Neighbourhood',
    genres: ['Indie Pop', 'Alternative'],
    spotifyId: '2QjOHCTQ1Jl3zawyYOpxh6',
    votes: 149,
  },
  {
    title: 'Goodie Bag',
    artist: 'Still Woozy',
    genres: ['Indie Pop', 'Bedroom Pop'],
    spotifyId: '4vHNeBWDQpVCmGbaccrRzi',
    votes: 93,
  },
  {
    title: 'Green Light',
    artist: 'Lorde',
    genres: ['Indie Pop', 'Electropop'],
    spotifyId: '6ie2Bw3xLj2JcGowOlcMhb',
    votes: 118,
  },
  {
    title: 'Ribs',
    artist: 'Lorde',
    genres: ['Indie Pop', 'Art Pop'],
    spotifyId: '2MvvoeRt8NcOXWESkxWn3g',
    votes: 127,
  },
  {
    title: 'ocean eyes',
    artist: 'Billie Eilish',
    genres: ['Indie Pop', 'Electropop'],
    spotifyId: '7hDVYcQq6MxkdJGweuCtl9',
    votes: 141,
  },
  {
    title: "when the party's over",
    artist: 'Billie Eilish',
    genres: ['Indie Pop', 'Art Pop'],
    spotifyId: '7zetOpCz7NjJn4QEDo4p7D',
    votes: 103,
  },
  // ── Indie Rock ──
  {
    title: 'Do I Wanna Know?',
    artist: 'Arctic Monkeys',
    genres: ['Indie Rock', 'Alternative'],
    spotifyId: '5FVd6KXrgO9B3JPmC8OPst',
    votes: 148,
  },
  {
    title: '505',
    artist: 'Arctic Monkeys',
    genres: ['Indie Rock', 'Alternative'],
    spotifyId: '58ge6dfP91o9oXMzq3XkIS',
    votes: 137,
  },
  {
    title: 'Reptilia',
    artist: 'The Strokes',
    genres: ['Indie Rock', 'Garage Rock'],
    spotifyId: '57Xjny5yNzAcsxnusKmAfA',
    votes: 115,
  },
  {
    title: 'Last Nite',
    artist: 'The Strokes',
    genres: ['Indie Rock', 'Garage Rock'],
    spotifyId: '03ev8WBPzDr9KJDdNhSHz9',
    votes: 98,
  },
  {
    title: 'A-Punk',
    artist: 'Vampire Weekend',
    genres: ['Indie Rock', 'Baroque Pop'],
    spotifyId: '3AydAydLzyyZutA0375XIz',
    votes: 107,
  },
  {
    title: 'Oxford Comma',
    artist: 'Vampire Weekend',
    genres: ['Indie Rock', 'Baroque Pop'],
    spotifyId: '2Ml0l8YWJLQhPrRDLpQaDM',
    votes: 82,
  },
  {
    title: 'Wake Up',
    artist: 'Arcade Fire',
    genres: ['Indie Rock', 'Art Rock'],
    spotifyId: '6Hmj7SrLRbreLVfVS7mV1S',
    votes: 126,
  },
  {
    title: 'Red Eyes',
    artist: 'The War on Drugs',
    genres: ['Indie Rock', 'Heartland Rock'],
    spotifyId: '0rUIff1QHd5zlOBtlHVqd9',
    votes: 91,
  },
  {
    title: 'Not',
    artist: 'Big Thief',
    genres: ['Indie Rock', 'Folk Rock'],
    spotifyId: '7lrhugjSbiImrNSLIFIq0c',
    votes: 78,
  },
  {
    title: 'Cigarette Daydreams',
    artist: 'Cage the Elephant',
    genres: ['Indie Rock', 'Alternative'],
    spotifyId: '3FTCocdobxNcXlabhqkSyW',
    votes: 133,
  },
  {
    title: 'What You Know',
    artist: 'Two Door Cinema Club',
    genres: ['Indie Rock', 'Dance-Punk'],
    spotifyId: '3UjtIALeg72qmJiKPWBvM3',
    votes: 102,
  },
  {
    title: 'Pumped Up Kicks',
    artist: 'Foster the People',
    genres: ['Indie Rock', 'Indie Pop'],
    spotifyId: '6xyWmzLDVSJcYBWidQ38Fi',
    votes: 144,
  },
  {
    title: '1901',
    artist: 'Phoenix',
    genres: ['Indie Rock', 'Synth Rock'],
    spotifyId: '1Ug5wxoHthwxctyWTUMGta',
    votes: 113,
  },
  {
    title: 'Evil',
    artist: 'Interpol',
    genres: ['Indie Rock', 'Post-Punk'],
    spotifyId: '4absiGHMelB8eH976ytjBj',
    votes: 87,
  },
  {
    title: 'Drunk Drivers/Killer Whales',
    artist: 'Car Seat Headrest',
    genres: ['Indie Rock', 'Lo-Fi'],
    spotifyId: '75hwtYcghca6YKW4i6C6fP',
    votes: 73,
  },
  {
    title: 'Avant Gardener',
    artist: 'Courtney Barnett',
    genres: ['Indie Rock', 'Slacker Rock'],
    spotifyId: '0U49QcRHyGfbmhhbNl92Q4',
    votes: 68,
  },
  {
    title: 'In the Aeroplane Over the Sea',
    artist: 'Neutral Milk Hotel',
    genres: ['Indie Rock', 'Lo-Fi'],
    spotifyId: '1NiAMp0CzUdG6e97VYRB1a',
    votes: 119,
  },
  // ── Alternative / Dream Pop ──
  {
    title: 'Space Song',
    artist: 'Beach House',
    genres: ['Dream Pop', 'Shoegaze'],
    spotifyId: '7H0ya83CMmgFcOhw0UB6ow',
    votes: 146,
  },
  {
    title: 'Myth',
    artist: 'Beach House',
    genres: ['Dream Pop', 'Indie Rock'],
    spotifyId: '2NfxtzCIrpCmJX5Z2KMdD5',
    votes: 95,
  },
  {
    title: 'Karma Police',
    artist: 'Radiohead',
    genres: ['Alternative', 'Art Rock'],
    spotifyId: '07DvRMhMBY2ue8gMoWZdRP',
    votes: 139,
  },
  {
    title: 'Everything In Its Right Place',
    artist: 'Radiohead',
    genres: ['Alternative', 'Electronic'],
    spotifyId: '7fMj7R1ysji3tQnlc0pOks',
    votes: 108,
  },
  {
    title: 'Just Like Heaven',
    artist: 'The Cure',
    genres: ['Alternative', 'New Wave'],
    spotifyId: '76GlO5H5RT6g7y0gev86Nk',
    votes: 136,
  },
  {
    title: 'There Is a Light That Never Goes Out',
    artist: 'The Smiths',
    genres: ['Alternative', 'Jangle Pop'],
    spotifyId: '0WQiDwKJclirSYG9v5tayI',
    votes: 129,
  },
  {
    title: 'Love Will Tear Us Apart',
    artist: 'Joy Division',
    genres: ['Post-Punk', 'Alternative'],
    spotifyId: '34iOH7LY3vme5rQxsVILZ4',
    votes: 117,
  },
  {
    title: 'Chinatown',
    artist: 'Wild Nothing',
    genres: ['Dream Pop', 'Indie Pop'],
    spotifyId: '3BRfgsKjcakny2wCYfZrvz',
    votes: 71,
  },
  {
    title: 'Desire Lines',
    artist: 'Deerhunter',
    genres: ['Dream Pop', 'Noise Pop'],
    spotifyId: '3jZ0GKAZiDMya0dZPrw8zq',
    votes: 67,
  },
  {
    title: 'Two Weeks',
    artist: 'Grizzly Bear',
    genres: ['Alternative', 'Art Rock'],
    spotifyId: '0iTpQYzJnYgh7kIxyq8A2O',
    votes: 84,
  },
  {
    title: 'Darling',
    artist: 'Real Estate',
    genres: ['Dream Pop', 'Jangle Pop'],
    spotifyId: '36PQh1G6h7n9VWB799fXpI',
    votes: 72,
  },
  {
    title: 'MYSTERY',
    artist: 'Turnstile',
    genres: ['Alternative', 'Post-Hardcore'],
    spotifyId: '1QlGmLx0IWNZq8Dm4N94xm',
    votes: 99,
  },
  // ── Singer-Songwriter / Folk ──
  {
    title: 'Holocene',
    artist: 'Bon Iver',
    genres: ['Indie Folk', 'Art Pop'],
    spotifyId: '4fbvXwMTXPWaFyaMWUm9CR',
    votes: 104,
  },
  {
    title: 'anything',
    artist: 'Adrianne Lenker',
    genres: ['Singer-Songwriter', 'Folk'],
    spotifyId: '4PwWESSlTwzvw9B7bmtTLS',
    votes: 79,
  },
  {
    title: 'Between the Bars',
    artist: 'Elliott Smith',
    genres: ['Singer-Songwriter', 'Folk'],
    spotifyId: '52Bg6oaos7twR7IUtEpqcE',
    votes: 111,
  },
  {
    title: 'Flightless Bird, American Mouth',
    artist: 'Iron & Wine',
    genres: ['Indie Folk', 'Singer-Songwriter'],
    spotifyId: '1fEGtTZjrjJW8eUeewnNJR',
    votes: 96,
  },
  {
    title: 'Chicago',
    artist: 'Sufjan Stevens',
    genres: ['Indie Folk', 'Baroque Pop'],
    spotifyId: '1yupbrI7ROhigIHpQBevPh',
    votes: 122,
  },
  {
    title: 'Mykonos',
    artist: 'Fleet Foxes',
    genres: ['Indie Folk', 'Baroque Pop'],
    spotifyId: '7H71gZwWs3xPWnHM30NDUp',
    votes: 89,
  },
  {
    title: 'Dreams',
    artist: 'Fleetwood Mac',
    genres: ['Soft Rock', 'Singer-Songwriter'],
    spotifyId: '0ofHAoxe9vBkTCp2UQIavz',
    votes: 150,
  },
  {
    title: 'Cherry Wine',
    artist: 'Hozier',
    genres: ['Singer-Songwriter', 'Folk'],
    spotifyId: '1C042FLYy7rP3MfnkOcnha',
    votes: 132,
  },
  {
    title: 'circle the drain',
    artist: 'Soccer Mommy',
    genres: ['Singer-Songwriter', 'Indie Rock'],
    spotifyId: '5Fxqn2kr6NBio3EDfaMi45',
    votes: 74,
  },
  // ── R&B / Soul ──
  {
    title: 'Nights',
    artist: 'Frank Ocean',
    genres: ['R&B', 'Alternative R&B'],
    spotifyId: '7eqoqGkKwgOaWNNHx90uEZ',
    votes: 145,
  },
  {
    title: 'Thinkin Bout You',
    artist: 'Frank Ocean',
    genres: ['R&B', 'Neo Soul'],
    spotifyId: '7DfFc7a6Rwfi3YQMRbDMau',
    votes: 128,
  },
  {
    title: 'The Weekend',
    artist: 'SZA',
    genres: ['R&B', 'Alternative R&B'],
    spotifyId: '6l8i9PBJ440VR1zmspfDpA',
    votes: 114,
  },
  {
    title: 'Good Days',
    artist: 'SZA',
    genres: ['R&B', 'Neo Soul'],
    spotifyId: '3YJJjQPAbDT7mGpX3WtQ9A',
    votes: 101,
  },
  {
    title: 'Best Part',
    artist: 'Daniel Caesar',
    genres: ['R&B', 'Neo Soul'],
    spotifyId: '1Q7EgiMOuwDcB0PJC6AzON',
    votes: 135,
  },
  {
    title: 'Get You',
    artist: 'Daniel Caesar',
    genres: ['R&B', 'Neo Soul'],
    spotifyId: '7zFXmv6vqI4qOt4yGf3jYZ',
    votes: 90,
  },
  {
    title: 'Bad Habit',
    artist: 'Steve Lacy',
    genres: ['R&B', 'Indie Pop'],
    spotifyId: '4k6Uh1HXdhtusDW5y8Gbvy',
    votes: 148,
  },
  {
    title: 'Dark Red',
    artist: 'Steve Lacy',
    genres: ['R&B', 'Bedroom Pop'],
    spotifyId: '3EaJDYHA0KnX88JvDhL9oa',
    votes: 94,
  },
  {
    title: 'Cranes in the Sky',
    artist: 'Solange',
    genres: ['R&B', 'Art Pop'],
    spotifyId: '48EjSdYh8wz2gBxxqzrsLe',
    votes: 106,
  },
  {
    title: 'Many Times',
    artist: 'Dijon',
    genres: ['R&B', 'Indie Soul'],
    spotifyId: '63EUqnpcphhZh8SbXagArw',
    votes: 69,
  },
  // ── Electronic / Synth Pop ──
  {
    title: 'Let It Happen',
    artist: 'Tame Impala',
    genres: ['Psychedelic', 'Electronic'],
    spotifyId: '2X485T9Z5Ly0xyaghN73ed',
    votes: 123,
  },
  {
    title: 'Electric Feel',
    artist: 'MGMT',
    genres: ['Synth Pop', 'Psychedelic'],
    spotifyId: '3FtYbEfBqAlGO46NUDQSAt',
    votes: 130,
  },
  {
    title: 'Kids',
    artist: 'MGMT',
    genres: ['Synth Pop', 'Indie Rock'],
    spotifyId: '1jJci4qxiYcOHhQR247rEU',
    votes: 120,
  },
  {
    title: 'Midnight City',
    artist: 'M83',
    genres: ['Synth Pop', 'Shoegaze'],
    spotifyId: '1eyzqe2QqGZUmfcPZtrIyt',
    votes: 143,
  },
  {
    title: 'All My Friends',
    artist: 'LCD Soundsystem',
    genres: ['Dance-Punk', 'Electronic'],
    spotifyId: '2Ud3deeqLAG988pfW0Kwcl',
    votes: 110,
  },
  {
    title: 'This Must Be the Place',
    artist: 'Talking Heads',
    genres: ['New Wave', 'Post-Punk'],
    spotifyId: '6aBUnkXuCEQQHAlTokv9or',
    votes: 137,
  },
  {
    title: 'Intro',
    artist: 'The xx',
    genres: ['Electronic', 'Indie Pop'],
    spotifyId: '5LVVFcXX3lxllggVbAMtBe',
    votes: 100,
  },
  {
    title: 'Feel It All Around',
    artist: 'Washed Out',
    genres: ['Chillwave', 'Synth Pop'],
    spotifyId: '6IE47jpPeatF2Iay7GZtEc',
    votes: 75,
  },
  {
    title: 'Multi-Love',
    artist: 'Unknown Mortal Orchestra',
    genres: ['Psychedelic', 'Synth Pop'],
    spotifyId: '0PEXp5yk0sx9dJ8JzwvjJb',
    votes: 83,
  },
  // ── Hip-Hop / Crossover ──
  {
    title: 'See You Again',
    artist: 'Tyler, The Creator',
    genres: ['Hip-Hop', 'Neo Soul'],
    spotifyId: '7KA4W4McWYRpgf0fWsJZWB',
    votes: 139,
  },
  {
    title: 'EARFQUAKE',
    artist: 'Tyler, The Creator',
    genres: ['Hip-Hop', 'Synth Pop'],
    spotifyId: '5hVghJ4KaYES3BFUATCYn0',
    votes: 146,
  },
  {
    title: 'Redbone',
    artist: 'Childish Gambino',
    genres: ['Funk', 'Psychedelic Soul'],
    spotifyId: '0wXuerDYiBnERgIpbb3JBR',
    votes: 142,
  },
  {
    title: 'PRIDE.',
    artist: 'Kendrick Lamar',
    genres: ['Hip-Hop', 'Alternative'],
    spotifyId: '6IZvVAP7VPPnsGX6bvgkqg',
    votes: 105,
  },
  {
    title: 'Come Down',
    artist: 'Anderson .Paak',
    genres: ['Hip-Hop', 'Funk'],
    spotifyId: '276zciJ7Fg7Jk6Ta6QuLkp',
    votes: 92,
  },
  {
    title: 'SUGAR',
    artist: 'BROCKHAMPTON',
    genres: ['Hip-Hop', 'Indie Pop'],
    spotifyId: '6U0FIYXCQ3TGrk4tFpLrEA',
    votes: 124,
  },
  {
    title: 'Feel Good Inc.',
    artist: 'Gorillaz',
    genres: ['Hip-Hop', 'Alternative'],
    spotifyId: '0d28khcov6AiegSCpG5TuT',
    votes: 147,
  },
  {
    title: 'Them Changes',
    artist: 'Thundercat',
    genres: ['Funk', 'Jazz Fusion'],
    spotifyId: '7taHgaFioQRfTuJVqaj31b',
    votes: 86,
  },
  {
    title: 'Chamakay',
    artist: 'Blood Orange',
    genres: ['R&B', 'Indie Pop'],
    spotifyId: '2iR4oHXi5qsb17b0KHVpon',
    votes: 70,
  },
  {
    title: 'cellophane',
    artist: 'FKA twigs',
    genres: ['Art Pop', 'Electronic'],
    spotifyId: '3VwZqgfrM3xb1usuLprkTu',
    votes: 81,
  },
  // ── Genre-Spanning ──
  {
    title: 'Chamber of Reflection',
    artist: 'Mac DeMarco',
    genres: ['Indie Rock', 'Lo-Fi'],
    spotifyId: '2VfCH6BZ8cqDU1dBjjrxA5',
    votes: 133,
  },
  {
    title: 'My Kind of Woman',
    artist: 'Mac DeMarco',
    genres: ['Indie Rock', 'Jangle Pop'],
    spotifyId: '6jgkEbmQ2F2onEqsEhiliL',
    votes: 116,
  },
  {
    title: 'Tailwhip',
    artist: 'Men I Trust',
    genres: ['Indie Pop', 'Dream Pop'],
    spotifyId: '7fax7NlxOq2X9kMZw8QLE2',
    votes: 80,
  },
  {
    title: 'Evan Finds the Third Room',
    artist: 'Khruangbin',
    genres: ['Psychedelic', 'Funk'],
    spotifyId: '1MheNNJZYdcOTKwZyM8alC',
    votes: 77,
  },
  {
    title: 'Pristine',
    artist: 'Snail Mail',
    genres: ['Indie Rock', 'Singer-Songwriter'],
    spotifyId: '5JX6gZ5mOASumPrU1JbfbV',
    votes: 88,
  },
  {
    title: 'Superbike',
    artist: 'Jay Som',
    genres: ['Indie Rock', 'Dream Pop'],
    spotifyId: '2bVGZZxrkTDmm3UgduHNyh',
    votes: 65,
  },
  {
    title: 'Slow Show',
    artist: 'The National',
    genres: ['Indie Rock', 'Post-Punk'],
    spotifyId: '3jJhAd1RoImIx5KJRfh6Rf',
    votes: 90,
  },
  {
    title: '3 Nights',
    artist: 'Dominic Fike',
    genres: ['Indie Pop', 'Alternative'],
    spotifyId: '7FM7t6FPN3JafXyLkANjFy',
    votes: 113,
  },
  {
    title: 'So Many Details',
    artist: 'Toro y Moi',
    genres: ['Chillwave', 'Synth Pop'],
    spotifyId: '5Z7cI9glyUTDTRtWSs8K9I',
    votes: 76,
  },
  {
    title: 'Freelance',
    artist: 'Toro y Moi',
    genres: ['Synth Funk', 'Electronic'],
    spotifyId: '1zbLpabwKzj404PWNEKtjL',
    votes: 87,
  },
  {
    title: 'Girl',
    artist: 'The Internet',
    genres: ['R&B', 'Funk'],
    spotifyId: '3PFaFVWq5wucLu6s4baj9D',
    votes: 82,
  },
  {
    title: "Busy Earnin'",
    artist: 'Jungle',
    genres: ['Electronic', 'Funk'],
    spotifyId: '6J8SONJwAIizCJm0QhEi4Y',
    votes: 95,
  },
  {
    title: 'Easy Easy',
    artist: 'King Krule',
    genres: ['Indie Rock', 'Post-Punk'],
    spotifyId: '35rf8iduzQ7vd8hFbDlv0o',
    votes: 73,
  },
  {
    title: "You're Not Good Enough",
    artist: 'Blood Orange',
    genres: ['Indie Pop', 'Synth Pop'],
    spotifyId: '7vcNp4cj4uF4AyX5aKY4Ps',
    votes: 71,
  },
];

/** Fisher-Yates shuffle, returns a new array. */
function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FEATURED_COUNT = 3;

const pillStats = [
  { label: 'Submit Music', icon: Music, desc: 'Share your tracks' },
  { label: 'Get Reviewed', icon: Star, desc: 'Expert curators listen' },
  { label: 'Earn Votes', icon: Heart, desc: 'Community decides' },
  { label: 'Chart', icon: TrendingUp, desc: 'Rise to the top' },
];

const features = [
  {
    icon: Music,
    title: 'Submit Your Music',
    description:
      'Share your tracks with a passionate community for just $2. Get real feedback from verified curators.',
    color: 'text-accent-purple',
    bg: 'bg-accent-purple/10',
    glow: 'group-hover:shadow-accent-purple/10',
  },
  {
    icon: Headphones,
    title: 'Expert Curation',
    description:
      'Curators with 1,000+ listeners review every track. Genuine feedback, not algorithms.',
    color: 'text-accent-pink',
    bg: 'bg-accent-pink/10',
    glow: 'group-hover:shadow-accent-pink/10',
  },
  {
    icon: BarChart3,
    title: 'Climb the Charts',
    description: 'Community votes drive monthly charts. The best music rises naturally.',
    color: 'text-accent-cyan',
    bg: 'bg-accent-cyan/10',
    glow: 'group-hover:shadow-accent-cyan/10',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Upload',
    description: 'Submit your Spotify, SoundCloud, or Bandcamp link',
    icon: Play,
  },
  {
    step: '02',
    title: 'Review',
    description: 'Expert curators listen and provide detailed feedback',
    icon: Star,
  },
  {
    step: '03',
    title: 'Vote',
    description: 'The community discovers and votes for the best tracks',
    icon: Zap,
  },
  {
    step: '04',
    title: 'Chart',
    description: 'Top tracks land on monthly and yearly charts',
    icon: TrendingUp,
  },
];

export function HomePage() {
  const featuredTracks = useMemo(() => shuffle(trackPool).slice(0, FEATURED_COUNT), []);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Reset loaded state when switching tracks
  function handleTrackChange(getNext: (i: number) => number) {
    setIframeLoaded(false);
    setCurrentTrack(getNext);
  }

  function nextTrack() {
    handleTrackChange((i) => (i + 1) % featuredTracks.length);
  }

  function prevTrack() {
    handleTrackChange((i) => (i - 1 + featuredTracks.length) % featuredTracks.length);
  }

  return (
    <div className="relative">
      {/* ── Hero ── */}
      <section className="relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-accent-purple/8 blur-[120px] animate-pulse-glow" />
          <div className="absolute top-[200px] right-0 w-[400px] h-[400px] rounded-full bg-accent-pink/5 blur-[100px] animate-pulse-glow" />
          <div className="absolute top-[100px] left-0 w-[300px] h-[300px] rounded-full bg-accent-cyan/5 blur-[80px] animate-pulse-glow" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/10 px-4 py-1.5 text-sm text-accent-purple mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Community-powered music curation</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Discover Music
              <br />
              <span className="gradient-text">Worth Hearing</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-hex-muted leading-relaxed">
              Submit tracks for $2, get reviewed by expert curators, and let the community decide
              what rises to the top.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/dashboard/submit">
                <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                  Submit Your Track
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button variant="glass" size="xl" className="w-full sm:w-auto">
                  <Play className="h-4 w-4" />
                  Explore Music
                </Button>
              </Link>
            </div>
          </div>

          {/* Process pills */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {pillStats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-card rounded-xl px-5 py-4 text-center transition-all duration-300"
                >
                  <stat.icon className="mx-auto h-5 w-5 text-accent-purple mb-2" />
                  <div className="text-sm font-bold text-hex-text">{stat.label}</div>
                  <div className="text-xs text-hex-muted mt-1">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Track / Now Playing ── */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent-purple/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold">
              <span className="gradient-text">Now Playing</span>
            </h2>
            <p className="mt-3 text-hex-muted">Listen, vote, and help great music rise.</p>
          </div>

          {/* Track counter */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              type="button"
              onClick={prevTrack}
              className="p-2 rounded-lg text-hex-muted hover:text-hex-text hover:bg-white/5 transition-colors"
              aria-label="Previous track"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-hex-muted">
              Song {currentTrack + 1} of {featuredTracks.length}
            </span>
            <button
              type="button"
              onClick={nextTrack}
              className="p-2 rounded-lg text-hex-muted hover:text-hex-text hover:bg-white/5 transition-colors"
              aria-label="Next track"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Active track card — only one iframe mounted at a time */}
          {(() => {
            const t = featuredTracks[currentTrack];
            return (
              <div key={t.spotifyId} className="glass-card rounded-2xl p-6 glow-purple">
                {/* Track header */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="text-xl font-bold">{t.title}</h3>
                    <p className="text-hex-muted">{t.artist}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {t.genres.map((g) => (
                      <Badge key={g} variant="outline">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Spotify Embed — single iframe, skeleton while loading */}
                <div
                  className="relative rounded-xl overflow-hidden mb-5 bg-[#121212]"
                  style={{ height: 152 }}
                >
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-hex-muted border-t-accent-purple" />
                        <span className="text-sm text-hex-muted">Loading track...</span>
                      </div>
                    </div>
                  )}
                  <iframe
                    src={`https://open.spotify.com/embed/track/${t.spotifyId}?theme=0`}
                    width="100%"
                    height="152"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="eager"
                    title={`${t.title} by ${t.artist}`}
                    className={`rounded-xl transition-opacity duration-300 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIframeLoaded(true)}
                  />
                </div>

                {/* Open in Spotify link */}
                <div className="flex justify-end mb-5">
                  <a
                    href={`https://open.spotify.com/track/${t.spotifyId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-accent-purple hover:text-accent-purple/80 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open in Spotify
                  </a>
                </div>

                {/* Vote / Pass buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/signup">
                    <Button variant="accent" size="lg" className="w-full gap-2">
                      <Heart className="h-4 w-4" />
                      Vote ({t.votes})
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="w-full gap-2" onClick={nextTrack}>
                    <ThumbsDown className="h-4 w-4" />
                    Pass
                  </Button>
                </div>

                <p className="text-center text-xs text-hex-muted mt-4">
                  <Link to="/signup" className="text-accent-purple hover:underline">
                    Sign up
                  </Link>{' '}
                  to hear full songs and vote.
                </p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Why <span className="gradient-text">hexwave</span>?
            </h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              A fair, transparent platform where great music gets the recognition it deserves.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`group glass-card rounded-2xl p-8 transition-all duration-300 hover:shadow-xl ${feature.glow}`}
              >
                <div
                  className={`inline-flex items-center justify-center rounded-xl ${feature.bg} p-3 mb-5`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-hex-text mb-3">{feature.title}</h3>
                <p className="text-sm text-hex-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">How It Works</h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto">
              From submission to chart placement in four simple steps.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, idx) => (
              <div key={step.step} className="relative text-center group">
                {/* Connector line (desktop) */}
                {idx < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+32px)] w-[calc(100%-64px)] h-px bg-gradient-to-r from-hex-border to-transparent" />
                )}
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-hex-card border border-hex-border mb-5 group-hover:border-accent-purple/30 transition-colors">
                  <step.icon className="h-8 w-8 text-accent-purple" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full gradient-primary text-[10px] font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-hex-text mb-2">{step.title}</h3>
                <p className="text-sm text-hex-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent-purple/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center rounded-xl bg-accent-purple/10 p-3 mb-6">
              <Shield className="h-7 w-7 text-accent-purple" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Ready to share your music?</h2>
            <p className="mt-4 text-hex-muted max-w-lg mx-auto leading-relaxed">
              Join independent artists getting real feedback and community recognition on hexwave.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                  Create Free Account
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/become-curator">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Become a Curator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
