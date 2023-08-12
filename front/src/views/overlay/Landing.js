const Overlay = (p) => {
  return (
    <div id="landing-overlay">
      {/* <img src={camera} /> */}
      <span className="landing-overlay-hello-left">{p.word}</span>
      <span className="landing-overlay-hello-right">
        당신의 방을 공유해보세요!
      </span>
    </div>
  );
};

export default Overlay;
