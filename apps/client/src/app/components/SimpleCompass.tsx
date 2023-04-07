export function SimpleCompass({ heading }: { heading: number }) {
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
        width: '100px',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
        color: 'white',
        lineHeight: '1',
        fontFamily: 'digital-clock-font-bold',
        fontSize: '40px',
      }}
    >
      {direction}
    </div>
  );
}
