const Overlay = (p) => {
  return (
    <div id='landing-overlay'>
      <span className='landing-overlay-hello-left'>안녕하세요</span>
      <span className='landing-overlay-hello-right'>
        당신의 {p.word}을 공유해보세요!
      </span>
    </div>
  );
};

export default Overlay;
