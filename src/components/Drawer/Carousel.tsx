import { useContext, useEffect, useState } from 'react';
import {
  ActivityActionOptions,
  Collections,
  ItemResponse,
} from '../../../pocketbase-types';
import pb from '../../lib/pocketbase';
import Add from '../Icons/Add';
import Trash from '../Icons/Trash';
import AddImage from '../Items/AddImage';
import { useDrawer } from '../../hooks/useDrawer';
import { recordActivity } from '../../utils/recordActivity';
import { UserContext } from '../../contexts/userContext';

type Props = {
  isUpdate: boolean;
  data: ItemResponse | null;
  setShouldUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
};

const Carousel = ({ isUpdate, data, setShouldUpdateData }: Props) => {
  const { user } = useContext(UserContext)!;
  const [images, setImages] = useState<string[]>([]);
  const [currentImageFileName, setCurrentImageFileName] = useState<
    string | undefined
  >();
  const [shouldDeleteCurrentImage, setShouldDeleteCurrentImage] =
    useState(false);
  const { activeRowId } = useDrawer()!;

  // Set initial image filename
  useEffect(() => {
    const fileName = data ? data.images[0] : undefined;

    setCurrentImageFileName(fileName);
  }, [data]);

  // Get images url
  useEffect(() => {
    if (data === null) return;

    const getImagesUrl = async () => {
      const imagesUrl = await Promise.all(
        data.images.map(async fileName => {
          const fileToken = await pb.files.getToken();
          // todo: add check if token is expired
          const url = pb.files.getUrl(data, fileName, { token: fileToken });

          return url;
        })
      );

      setImages(imagesUrl);
    };

    void getImagesUrl();
  }, [data]);

  // Delete current image
  useEffect(() => {
    if (!shouldDeleteCurrentImage) return;

    const deleteCurrentImage = async () => {
      const data = {
        'images-': [currentImageFileName],
      };
      await pb.collection(Collections.Item).update(activeRowId, data);
      await recordActivity(ActivityActionOptions['DELETE ITEM IMAGE'], {
        userId: user!.id,
        itemId: activeRowId,
      });
      setShouldDeleteCurrentImage(false);
      setShouldUpdateData(true);
    };

    void deleteCurrentImage();
  }, [
    activeRowId,
    currentImageFileName,
    setShouldUpdateData,
    shouldDeleteCurrentImage,
    user,
  ]);

  useEffect(() => {}, [currentImageFileName, data?.images]);

  return (
    <div className=" flex flex-col gap-[8px]">
      <div className="text-[24px] text-primary/50 flex justify-between items-center">
        Images:
        <div className="flex gap-[8px] ">
          {isUpdate && (
            <>
              <AddImage setShouldUpdateData={setShouldUpdateData} />

              <button
                onClick={() => setShouldDeleteCurrentImage(true)}
                className="btn btn-outline hover:btn-error px-[16px] text-[20px]  font-semibold"
              >
                <Trash />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="carousel w-full h-[267px] bg-base-100 rounded-[5px]">
        {images.map((url, index, arr) => (
          <div
            key={url}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
          >
            <img src={url} className="w-full object-contain" />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                onClick={() =>
                  setCurrentImageFileName(
                    data?.images[
                      index + 1 === 1 ? arr.length - 1 : index - 1
                    ] || undefined
                  )
                }
                href={`#slide${index + 1 === 1 ? arr.length : index + 1 - 1}`}
                className="btn btn-circle btn-secondary"
              >
                ❮
              </a>
              <a
                onClick={() =>
                  setCurrentImageFileName(
                    data?.images[index + 1 === arr.length ? 0 : index + 1] ||
                      undefined
                  )
                }
                href={`#slide${index + 1 === arr.length ? 1 : index + 1 + 1}`}
                className="btn btn-circle btn-secondary"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
        {/* <div id="slide2" className="carousel-item relative w-full">
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
        </div> */}
      </div>
    </div>
  );
};

export default Carousel;
