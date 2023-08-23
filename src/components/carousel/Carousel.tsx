import { useContext, useEffect, useState } from 'react';
import { ActivityActionOptions, ItemResponse } from '../../../pocketbase-types';
import Trash from '../icons/Trash';
import { useDrawer } from '../../hooks/useDrawer';
import { UserContext } from '../../contexts/UserContext';
import AddImage from '../../pages/items/AddImage';
import { recordActivity } from '../../services/logger';
import { deleteImage, getImageUrlTokenized } from '../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';

type Props = {
  isUpdate: boolean;
  data: ItemResponse | null;
  setShouldUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
};

const Carousel = ({ isUpdate, data, setShouldUpdateData }: Props) => {
  // todo: use useUser instead
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

    Promise.all(
      // todo: add check if token is expired
      data.images.map(async fileName => getImageUrlTokenized(data, fileName))
    )
      .then(res => {
        setImages(res);
      })
      .catch(() => {
        toast.error('Failed to get images', toastSettings);
      });
  }, [data]);

  // Delete current image
  useEffect(() => {
    if (!shouldDeleteCurrentImage) return;
    if (currentImageFileName === undefined) return;

    const deleteCurrentImage = async () => {
      await deleteImage(activeRowId, [currentImageFileName]);
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

  return (
    <div className=" flex flex-col gap-[8px]">
      <div className="flex items-center justify-between text-[24px] text-primary/50">
        Images:
        <div className="flex gap-[8px] ">
          {isUpdate && (
            <>
              <AddImage setShouldUpdateData={setShouldUpdateData} />

              <button
                onClick={() => setShouldDeleteCurrentImage(true)}
                className="btn-outline btn px-[16px] text-[20px] font-semibold  hover:btn-error"
              >
                <Trash />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="carousel h-[267px] w-full rounded-[5px] bg-base-100">
        {images.map((url, index, arr) => (
          <div
            key={url}
            id={`slide${index + 1}`}
            className="carousel-item relative w-full"
          >
            <img src={url} className="w-full object-contain" />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <a
                onClick={() =>
                  setCurrentImageFileName(
                    data?.images[
                      index + 1 === 1 ? arr.length - 1 : index - 1
                    ] || undefined
                  )
                }
                href={`#slide${index + 1 === 1 ? arr.length : index + 1 - 1}`}
                className="btn-secondary btn-circle btn"
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
                className="btn-secondary btn-circle btn"
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
