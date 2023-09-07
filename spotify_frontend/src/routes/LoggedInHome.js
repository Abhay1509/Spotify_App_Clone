import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { useState } from "react";
import { Howl, Howler } from "howler";

const focusCardsData = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    imgUrl:
      "https://images.unsplash.com/photo-1470019693664-1d202d2c0907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlYWNlJTIwcGlhbm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    imgUrl:
      "https://images.unsplash.com/photo-1502710655568-ee441b74b0b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Zm9jdXMlMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Instrumental Study",
    description: "Focus with soft study music in the background.",
    imgUrl:
      "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGluc3RydW1lbnRhbCUyMG11c2ljfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    imgUrl:
      "https://images.unsplash.com/uploads/1411160110892ab555b6f/80b0d25e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9jdXMlMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    imgUrl:
      "https://images.unsplash.com/photo-1530352865347-3c2e277abefe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVhdHMlMjBtdXNpY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
];

const Home = () => {
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);

  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlayed(sound);
    sound.play();
  };

  const pauseSoud = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound(
        "https://res.cloudinary.com/dhmw0mdeh/video/upload/v1692786323/btzccacb3vzwl357wokp.mp3"
      );
      setIsPaused(false);
    } else {
      pauseSoud();
      setIsPaused(true);
    }
  };

  return (
    <div className="h-full w-full bg-app-black">
      <div className="h-9/10 w-full flex">
        {/* This div is for the left panel */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div>
            {/* This div is for the logo */}
            <div className="logoDiv p-6">
              <img src={spotify_logo} alt="spotify_logo" width={125} />
            </div>
            <div className="py-5">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                active
              />

              <IconText
                iconName={"material-symbols:search-rounded"}
                displayText={"Search"}
              />

              <IconText
                iconName={"icomoon-free:books"}
                displayText={"Library"}
              />
              <IconText
                iconName={"material-symbols:library-music-sharp"}
                displayText={"My Music"}
              />
            </div>
            <div className="pt-5">
              <IconText
                iconName={"material-symbols:add-box"}
                displayText={"Create Playlist"}
              />
              <IconText
                iconName={"mdi:cards-heart"}
                displayText={"Liked Songs"}
              />
            </div>
          </div>
          <div className="px-5">
            <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
              <Icon icon="carbon:earth-europe-africa" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        {/* This div is for the right panel...main content */}
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-2/3 flex justify-around items-center">
                <TextWithHover displayText="Premium" />
                <TextWithHover displayText="Support" />
                <TextWithHover displayText="Download" />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-1/3 flex justify-around h-full items-center">
                <TextWithHover displayText="Upload Song" />
                <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                  AB
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0 overflow-auto">
            <PlaylistView titleText="Focus" cardsData={focusCardsData} />
            <PlaylistView
              titleText="Spotify Playlists"
              cardsData={focusCardsData}
            />
            <PlaylistView
              titleText="Sound of India"
              cardsData={focusCardsData}
            />
          </div>
        </div>
      </div>
      {/* This div is for the current playing song */}
      <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
        <div className="w-1/4 flex items-center">
          <img
            src="data:image/jpeg;base64,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"
            alt="currentSongThumbnail"
            className="h-14 w-14 rounded"
          />
          <div className="pl-4">
            <div className="text-sm hover:underline cursor-pointer">
              Curtains
            </div>
            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
              Ed Sheeran
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center h-full flex-col items-center">
          <div className="flex w-1/3 justify-between items-center">
            {/* controls for the song */}
            <Icon
              icon="ph:shuffle-fill"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
            <Icon
              icon="mdi:skip-previous-outline"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
            <Icon
              icon={
                isPaused
                  ? "ic:baseline-play-circle"
                  : "ic-baseline-pause-circle"
              }
              fontSize={50}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={togglePlayPause}
            />
            <Icon
              icon="mdi:skip-next-outline"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
            <Icon
              icon="ic:twotone-repeat"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
            />
          </div>
          {/* <div>Progress Bar Here</div> */}
        </div>
        <div className="w-1/4 flex justify-end">2</div>
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardsData }) => {
  return (
    <div className="text-white mt-8">
      <div className="text-2xl font-semibold mb-5">{titleText}</div>
      <div className="w-full flex justify-between space-x-4">
        {cardsData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
      <div className="pb-4 pt-2">
        <img className="w-full rounded-md" src={imgUrl} alt="label" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Home;
