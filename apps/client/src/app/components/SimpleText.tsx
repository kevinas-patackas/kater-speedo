export function SimpleText({
  text,
  postfix,
  align,
}: {
  text: string;
  postfix?: string;
  align: string;
}) {
  return (
    <div
      style={{
        width: '400px',
        display: 'flex',
        justifyContent: align,
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
        color: 'white',
        lineHeight: '1',
        fontFamily: 'digital-clock-font-bold',
        fontSize: '30px',
      }}
    >
      {text}
      <span style={{ fontSize: '15px', marginTop: '14px' }}>{postfix}</span>
    </div>
  );
}
