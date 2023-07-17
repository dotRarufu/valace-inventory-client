const Carousel = () => {
  return (
    <div className=" flex flex-col gap-[8px]">
      <span className="text-[24px] text-primary/50 ">Images</span>
      <div className="carousel w-full h-[267px]">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://ronixtools.com/en/blog/wp-content/uploads/2021/03/Learn-how-to-make-a-simple-wooden-table-at-home1.jpg"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle btn-secondary">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle btn-secondary">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1OD-Vz5Zj-2zg3yoebww-D3f1_KIX9QgbUaRKcMTXZQ&s"
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle btn-secondary">
              ❮
            </a>
            <a href="#slide3" className="btn btn-circle btn-secondary">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
