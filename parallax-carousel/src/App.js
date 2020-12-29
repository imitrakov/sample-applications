import { useState } from "react";
import { animated, interpolate, useSpring } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./App.css";

const imgData = [
  {
    name: "James Eades",
    detail:
      "Feel free to visit my website or Instagram (@jmeeades) for more shots! Please contact me if you wish to use images for prints/commercial use.",
    url:
      "https://images.unsplash.com/photo-1550757750-4ce187a65014?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    profile:
      "https://images.unsplash.com/profile-1588608105476-bb7b8341a8cdimage?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
  },
  {
    name: "Miro Dozo",
    detail: "Download free, beautiful high-quality photos curated by Miro.",
    url:
      "https://images.unsplash.com/photo-1442410519123-a33d5dc262b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    profile:
      "https://images.unsplash.com/profile-fb-1442410481-1615103c9d59.jpg?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
  },
  {
    name: "Theresa Panag",
    detail: "I don't consider myself a photographer. I just love taking pictures! :).",
    url:
      "https://images.unsplash.com/photo-1589999562311-56254e87db45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80",
    profile:
      "https://images.unsplash.com/profile-1587492395889-d9a9921b3e79image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
  },
  {
    name: "Nika Akin",
    detail: "I am self-taught artist, do photos for fun ;-).",
    url:
      "https://images.unsplash.com/photo-1579329974377-10c2d3458e44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80",
    profile:
      "https://images.unsplash.com/profile-1575179715509-30b19b831167image?dpr=2&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff",
  },
];
const HEIGHT_OFFSET = 40;

const Head = () => (
  <>
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <h1>Home</h1>
      <div className="user" />
    </div>
    <div className="nav">
      <div className="el" style={{ color: "#000" }}>
        Top picks
      </div>
      <div className="el">Recent</div>
      <div className="el">Collections</div>
      <div className="el">Explore</div>
    </div>
  </>
);

const Card = ({ _x, _y, num, activeNum, data, active, setActive }) => {
  const cardIndex = num - activeNum;
  const offset = cardIndex * 276 + 80;
  const [{ x, y, scale }, set] = useSpring(() => ({
    x: _x + offset,
    y: _y,
    scale: active ? 2.4 : 1,
  }));
  const [{ posX, posY, proScale, blur }, setPro] = useSpring(() => ({
    posX: 0,
    posY: 0,
    proScale: 1.2,
    config: { mass: 2 },
    blur: 0,
  }));

  set({ x: _x + offset, y: _y });
  if (num === activeNum) {
    if (!active) {
      set({ scale: 1 });
      setPro({ posX: 0, posY: 0, proScale: 1, blur: 0 });
    }
  }

  function handleClick() {
    if (num === activeNum) {
      if (!active) {
        set({ scale: 2.2 });
        setPro({ posX: -53, posY: -337, proScale: 2.5, blur: 4 });
        setActive(true);
      }
    }
  }

  return (
    <animated.div
      className="card"
      style={{
        transform: interpolate(
          [x.interpolate((x) => `translateX(${x}px)`), y.interpolate((y) => `translateY(${y}px)`)],
          (translateX, translateY) => `${translateX} ${translateY}`
        ),
        zIndex: num === activeNum ? 10 : 1,
      }}
    >
      <animated.div
        className="imgContainer"
        style={{
          transform: scale.interpolate((s) => `scale(${s})`),
        }}
      >
        <animated.img
          src={data.url}
          style={{
            width: "300%",
            userSelect: "none",
            transform: x
              .interpolate({ range: [-196, 356], output: [-380, -20] })
              .interpolate((x) => `translate3d(${x}px, 0px, 0px)`),
          }}
        />
        <animated.div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            backdropFilter: blur.interpolate((x) => ` blur(${x}px)`),
            backgroundColor: blur
              .interpolate({ range: [0, 4], output: [0, 0.3] })
              .interpolate((x) => `rgba(0, 0, 0, ${x})`),
          }}
        />
      </animated.div>
      <animated.img
        className="profile"
        style={{
          transform: interpolate(
            [
              posX.interpolate((x) => `translateX(${x}px)`),
              posY.interpolate((y) => `translateY(${y}px)`),
              proScale.interpolate((y) => `scale(${y})`),
            ],
            (translateX, translateY, proScale) => `${translateX} ${translateY} ${proScale}`
          ),
          border: proScale
            .interpolate({ range: [1, 2.5], output: [6, 4] })
            .interpolate((x) => `${x}px solid #fff`),
        }}
        src={data.profile}
        onClick={handleClick}
      />
    </animated.div>
  );
};

const Info = (props) => {
  const { active, index, setActive } = props;
  const [{ y }, set] = useSpring(() => ({ y: !active ? -40 : 0 }));
  set({ y: !active ? -40 : 0 });

  return (
    <>
      <animated.div
        className="cross"
        onClick={() => {
          setActive(false);
        }}
        style={{
          transform: y
            .interpolate({ range: [-40, 0], output: [0, 1] })
            .interpolate((y) => `scale(${y})`),
        }}
      >
        <div className="close" />
      </animated.div>
      <animated.div style={{ bottom: y.interpolate((y) => `${y}vh`) }} className="infocontainer">
        <div className="detailName">{imgData[index].name}</div>
        <div className="detailPro">{imgData[index].detail}</div>
        <button className="follow">Follow</button>
        <button className="message">Message</button>
      </animated.div>
    </>
  );
};

export function App() {
  const [{ x, y }, set] = useState(() => ({ x: 0, y: HEIGHT_OFFSET }));
  const [activeNum, setActiveNum] = useState(0);
  const [active, setActive] = useState(false);
  const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
    const trigget = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;

    if (!active) {
      if (trigget && !down) {
        if (!(activeNum + dir * -1 >= imgData.length || activeNum + dir * -1 < 0)) {
          setActiveNum(activeNum + dir * -1);
        }
        set({ x: 0, y: HEIGHT_OFFSET });
      } else {
        set({ x: down ? mx : 0, y: HEIGHT_OFFSET });
      }
    }
  });

  return (
    <div className="app">
      <Head />
      <div {...bind()}>
        {imgData.map((data, i) => {
          return (
            <Card
              key={i}
              _x={x}
              _y={y}
              num={i}
              activeNum={activeNum}
              data={data}
              active={active}
              setActive={setActive}
            />
          );
        })}
        <Info active={active} index={activeNum} setActive={setActive} />
      </div>
    </div>
  );
}
