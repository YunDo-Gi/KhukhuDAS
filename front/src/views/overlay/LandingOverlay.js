const Overlay = (p) => {
  return (
    <div id='landing-overlay'>
      <span className='landing-overlay-hello-right'>
        함께 {p.word}을 공유해보세요!
      </span>
    </div>
  );
};

export default Overlay;
