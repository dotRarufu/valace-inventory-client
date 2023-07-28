import NumberInputField from '../Field/NumberInputField';
import SelectField from '../Field/SelectField';
import TextAreaField from '../Field/TextAreaField';
import TextInputField from '../Field/TextInputField';
import ToggleField from '../Field/ToggleField';
import Inventory from '../Icons/Inventory';
import valAceLogo from '../../assets/valace-logo.png';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Collections, ItemResponse } from '../../../pocketbase-types';
import pb from '../../lib/pocketbase';
import { Carousel } from 'react-responsive-carousel';
import sample1 from '../../assets/valace-logo.png';
import sample2 from '../../assets/qr.png';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowLeft from '../Icons/ArrowLeft';

const getBackgroundColor = (value: string) => {
  switch (value) {
    case 'Admin':
      return 'bg-[#4A000D]';

    default:
      return 'bg-primary';
  }
};

const UserDataDisplay = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<ItemResponse | null>(null);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const itemId = searchParams.get('id');

    if (itemId === null) return;

    const getData = async () => {
      const res = await pb
        .collection(Collections.Item)
        .getOne<ItemResponse>(itemId);

      setData(res);
    };

    void getData();
  }, [searchParams]);

  useEffect(() => {
    if (data === null) return;

    const getImages = () => {
      const urls = data.images.map(image => pb.files.getUrl(data, image));

      setImages(urls);
    };

    void getImages();
  }, [data]);

  return (
    <div className="max-w-[480px] w-full border bg-secondary  border-red-500 mx-auto h-screen">
      <div className="w-full px-[32px] py-[8px]  h-fit-content text-primary flex justify-between items-center mb-[16px]">
        <span className="flex gap-[8px] items-center">
          <Inventory />
          <span className="h-[16px] leading-none font-khula font-semibold text-[24px]">
            Inventory System
          </span>
        </span>
        <img className="w-[56px]" src={valAceLogo} alt="" />
      </div>

      <div className="px-[32px] w-full pt-0 h-full  text-secondary-content font-khula flex flex-col gap-[32px] overflow-y-scroll">
        <Carousel
          emulateTouch={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          className="rounded-[5px] bg-primary/30 "
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <div className=" flex flex-col justify-center top-0 absolute left-[8px] z-[99999] h-full ">
                <button
                  className="btn btn-sm btn-secondary btn-circle left-[16px] "
                  onClick={onClickHandler}
                  title={label}
                >
                  <ArrowLeft />
                </button>
              </div>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <div className=" flex flex-col justify-center top-0 absolute right-[8px] z-[99999] h-full ">
                <button
                  className="btn btn-sm btn-secondary btn-circle  "
                  onClick={onClickHandler}
                  title={label}
                >
                  <span className="rotate-180">
                    <ArrowLeft />
                  </span>
                </button>
              </div>
            )
          }
        >
          {images.map(i => (
            <div key={i} className="h-[179px]">
              <img className="h-full object-contain" src={i} />
            </div>
          ))}
        </Carousel>

        <ul className=" text-base inline-grid grid-cols-[auto_1fr] auto-rows-auto gap-x-[8px] gap-y-[16px]">
          <span className=" h-[16px] text-primary/50 ">Property Number:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.property_number}
          </div>
          <span className=" h-[16px] text-primary/50 ">Name:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.name}
          </div>
          <span className=" h-[16px] text-primary/50 ">Quantity:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.quantity}
          </div>
          <span className=" h-[16px] text-primary/50 ">Type:</span>

          <span
            className={`badge h-fit text-base  ${getBackgroundColor(
              data?.type || ''
            )} text-secondary pb-[3px] mt-[3px] px-[14px] -translate-y-[12.5%]`}
          >
            <span className="h-[13px] leading-[22px] uppercase">
              {data?.type}
            </span>
          </span>
          <span className=" h-[16px] text-primary/50 ">Status:</span>

          <a
            className={`${
              data?.is_available ? 'text-success' : 'text-error'
            } text-base font-semibold uppercase h-[16px] leading-[22px]`}
          >
            {data?.is_available ? 'AVAILABLE' : 'UNAVAILABLE'}
          </a>

          <span className=" h-[16px] text-primary/50 ">Location:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.location}
          </div>
          <span className=" h-[16px] text-primary/50 ">Supplier:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.supplier}
          </div>
          <span className=" h-[16px] text-primary/50 ">Date Added:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.created}
          </div>
          <span className=" h-[16px] text-primary/50 ">Serial Number:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.serial_number}
          </div>
          <span className=" h-[16px] text-primary/50 ">Remarks:</span>

          <div className="h-[16px] max-w-[345px] w-full text-primary font-semibold ">
            {data?.remarks}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserDataDisplay;
