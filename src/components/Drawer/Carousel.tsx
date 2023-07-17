import Add from '../Icons/Add';
import Trash from '../Icons/Trash';

type Props = {
  isUpdate: boolean;
};

const Carousel = ({ isUpdate }: Props) => {
  return (
    <div className=" flex flex-col gap-[8px]">
      <div className="text-[24px] text-primary/50 flex justify-between items-center">
        Images:
        <div className="flex gap-[8px] ">
          {isUpdate && (
            <>
              <button className="btn  btn-outline hover:btn-primary px-[16px] text-[20px]  font-semibold">
                <Add />
              </button>

              <div className="dropdown dropdown-end   ">
                <label tabIndex={0}>
                  <button className="btn  btn-outline hover:btn-error px-[16px] text-[20px]  font-semibold">
                    <Trash />
                  </button>
                </label>
                <div
                  tabIndex={0}
                  className="dropdown-content z-[1] rounded-[5px]  w-fit "
                >
                  <div className="bg-secondary w-[346px] p-[24px] rounded-[5px] border border-primary/50 shadow">
                    <div className="text-[28px] text-primary">Confirmation</div>
                    <div className="text-[20px] text-primary leading-[24px]">
                      Are you sure you want to delete this image?
                    </div>
                    <div className=" flex w-full gap-[16px] pt-[16px]">
                      <button className="btn btn-primary flex-1 font-khula text-[20px]">
                        <span className="h-[13px]">Yes</span>
                      </button>
                      <label className="btn btn-outline hover:btn-error flex-1 font-khula text-[20px] ">
                        <span className="h-[13px]">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
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
