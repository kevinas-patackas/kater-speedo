export function CircularCompass({ heading }: { heading: number }) {
  const rotation = 360 - heading;

  let direction: string;

  if (rotation < 22.5) {
    direction = 'N';
  } else if (rotation > 22.5 && rotation < 67.5) {
    direction = 'NE';
  } else if (rotation > 67.5 && rotation < 112.5) {
    direction = 'W';
  } else if (rotation > 112.5 && rotation < 157.5) {
    direction = 'SW';
  } else if (rotation > 157.5 && rotation < 202.5) {
    direction = 'S';
  } else if (rotation > 202.5 && rotation < 247.5) {
    direction = 'SE';
  } else if (rotation > 247.5 && rotation < 292.5) {
    direction = 'E';
  } else if (rotation > 292.5 && rotation < 337.5) {
    direction = 'NE';
  } else {
    direction = 'N';
  }

  return (
    <div
      style={{
        // border: '2px solid red',
        width: '180px',
        height: '180px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '100%',
          border: '10px solid #7DD3FC',
        }}
      ></div>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
        <div
          key={i}
          style={{
            height: '132px',
            width: '2px',
            position: 'absolute',
            rotate: `${rotation + i * (360 / 16)}deg`,
            background: 'black',
          }}
        ></div>
      ))}
      <div
        style={{
          width: '130px',
          height: '130px',
          border: '3px solid white',
          borderRadius: '100%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      ></div>
      {['N', 'E', 'S', 'W'].map((pole, i) => (
        <div
          key={i}
          style={{
            height: '190px',

            position: 'absolute',
            rotate: `${rotation + i * 90}deg`,
          }}
        >
          <div
            style={{
              height: '20px',
              width: '100%',
              fontFamily: 'digital-clock-font-bold',
              fontSize: '25px',
              lineHeight: '1',
              color: 'white',
              // rotate: `${-rotation - i * 90}deg`,
            }}
          >
            {pole}
          </div>
        </div>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            height: '160px',
            width: '2px',
            position: 'absolute',
            rotate: `${rotation + 45 + i * 90}deg`,
          }}
        >
          <div
            style={{ height: '10px', width: '100%', background: 'white' }}
          ></div>
        </div>
      ))}

      {/* <div
        style={{
          width: '180px',
          height: '180px',
          background: 'black',
          position: 'absolute',
          top: '100px',
          rotate: '45deg',
        }}
      ></div> */}
      <div
        style={{
          width: '100px',
          height: '100px',
          border: '3px solid transparent',
          borderRadius: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          color: 'white',
          lineHeight: '1',
          textAlign: 'center',
          fontFamily: 'digital-clock-font-bold',
          fontSize: '60px',
        }}
      >
        {direction}
      </div>
    </div>
  );
}
