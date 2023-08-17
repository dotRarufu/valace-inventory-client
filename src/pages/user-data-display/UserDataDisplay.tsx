import valAceLogo from '../../assets/valace-logo.png';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Collections, ItemResponse } from '../../../pocketbase-types';
import pb from '../../lib/pocketbase';
import Inventory from '../../components/icons/Inventory';
import ArrowLeft from '../../components/icons/ArrowLeft';

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
    <div className="mx-auto h-screen w-full max-w-[480px] bg-secondary">
      <div className="h-fit-content mb-[16px] flex  w-full items-center justify-between px-[32px] py-[8px] text-primary">
        <span className="flex items-center gap-[8px]">
          <Inventory />
          <span className="h-[16px] font-khula text-[24px] font-semibold leading-none">
            Inventory System
          </span>
        </span>
        <img className="w-[56px]" src={valAceLogo} alt="" />
      </div>

      <div className="flex h-full w-full flex-col  gap-[32px] overflow-y-scroll px-[32px] pt-0 font-khula text-secondary-content">
        <Carousel
          emulateTouch={true}
          showThumbs={false}
          showIndicators={false}
          showStatus={false}
          className="rounded-[5px] bg-primary/30 "
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <div className=" absolute left-[8px] top-0 z-[99999] flex h-full flex-col justify-center ">
                <button
                  className="btn-secondary btn-sm btn-circle btn left-[16px] "
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
              <div className=" absolute right-[8px] top-0 z-[99999] flex h-full flex-col justify-center ">
                <button
                  className="btn-secondary btn-sm btn-circle btn  "
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

        <ul className=" inline-grid auto-rows-auto grid-cols-[auto_1fr] gap-x-[8px] gap-y-[16px] text-base">
          <span className=" h-[16px] text-primary/50 ">Property Number:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.property_number}
          </div>
          <span className=" h-[16px] text-primary/50 ">Name:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.name}
          </div>
          <span className=" h-[16px] text-primary/50 ">Quantity:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.quantity}
          </div>
          <span className=" h-[16px] text-primary/50 ">Type:</span>

          <span
            className={`badge h-fit text-base  ${getBackgroundColor(
              data?.type || ''
            )} mt-[3px] -translate-y-[12.5%] px-[14px] pb-[3px] text-secondary`}
          >
            <span className="h-[13px] uppercase leading-[22px]">
              {data?.type}
            </span>
          </span>
          <span className=" h-[16px] text-primary/50 ">Status:</span>

          <a
            className={`${
              data?.is_available ? 'text-success' : 'text-error'
            } h-[16px] text-base font-semibold uppercase leading-[22px]`}
          >
            {data?.is_available ? 'AVAILABLE' : 'UNAVAILABLE'}
          </a>

          <span className=" h-[16px] text-primary/50 ">Location:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.location}
          </div>
          <span className=" h-[16px] text-primary/50 ">Supplier:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.supplier}
          </div>
          <span className=" h-[16px] text-primary/50 ">Date Added:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.created}
          </div>
          <span className=" h-[16px] text-primary/50 ">Serial Number:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.serial_number}
          </div>
          <span className=" h-[16px] text-primary/50 ">Remarks:</span>

          <div className="h-[16px] w-full max-w-[345px] font-semibold text-primary ">
            {data?.remarks}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default UserDataDisplay;
