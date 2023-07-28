import { useContext, useEffect, useRef, useState } from 'react';
import Add from '../Icons/Add';
import { FileUploader } from 'react-drag-drop-files';
import XIcon from '../Icons/X';
import pb from '../../lib/pocketbase';
import { Collection } from 'pocketbase';
import {
  ActivityActionOptions,
  Collections,
  ItemRecord,
} from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import { recordActivity } from '../../utils/recordActivity';
import { UserContext } from '../../contexts/userContext';

const fileTypes = ['JPG', 'PNG', 'GIF'];

type Props = {
  setShouldUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddImage = ({ setShouldUpdateData }: Props) => {
  const { user } = useContext(UserContext)!;
  const { activeRowId } = useDrawer()!;
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState(new FormData());
  const [shouldAddImages, setShouldAddImage] = useState(false);

  const handleChange = (newFiles: FileList) => {
    const addedFiles = Array.from(newFiles).filter(file => {
      const fileNames = files.map(f => f.name);
      const isNotInFiles = !fileNames.includes(file.name);

      return isNotInFiles;
    });

    console.log('handlechange:', newFiles);
    setFiles(old => [...old, ...addedFiles]);
  };

  // Add image
  useEffect(() => {
    const newFormData = new FormData();

    for (const file of files) {
      newFormData.append('images', file);
    }

    setFormData(newFormData);
  }, [files]);

  const handleRemoveFile = (fileName: string) => {
    const newFiles = files.filter(f => f.name !== fileName);

    setFiles(newFiles);
  };

  useEffect(() => {
    if (!shouldAddImages) return;

    const addImages = async () => {
      const res = await pb
        .collection(Collections.Item)
        .update(activeRowId, formData);

      console.log('add imaege res:', res);
      await recordActivity(ActivityActionOptions['ADD ITEM IMAGE'], {
        userId: user!.id,
        itemId: activeRowId,
      });
      setShouldAddImage(false);
      setShouldUpdateData(true);
      setFiles([]);
    };

    void addImages();
  }, [activeRowId, files, formData, setShouldUpdateData, shouldAddImages]);

  const handleAddClick = () => {
    setShouldAddImage(true);
    detailsRef.current?.removeAttribute('open');
  };

  return (
    <details ref={detailsRef} className="dropdown dropdown-end   ">
      {/* //todo: remove outline on clicked state  */}
      <summary className="btn btn-outline  hover:btn-primary px-[16px] text-[20px]  font-semibold">
        <Add />
      </summary>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] rounded-[5px]  w-fit "
      >
        <div className="bg-secondary w-[346px] p-[24px] rounded-[5px] border border-primary/50 shadow flex flex-col gap-[8px]">
          <div className="text-[28px] text-primary">Confirmation</div>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={true}
          >
            <div className="rounded-[5px] bg-secondary border-dashed border-[2px] border-secondary-content/50 p-[16px] flex justify-center items-center font-semibold fontk-khula">
              <span className="text-[18px]   h-[16px] leading-none  ">
                Drop or
              </span>
              <span className="btn btn-link btn-sm btn-primary text-[18px] leading-none  lowercase p-[4px] ">
                browse
              </span>
            </div>
          </FileUploader>

          <div className=" font-khula">
            <span className="font-semibold text-[18px] h-[13px] leading-none">
              Files to be uploaded:
            </span>

            <ul className="text-primary text-[18px] ">
              {files.map(f => (
                <li key={f.name} className="flex justify-between items-center ">
                  {f.name}

                  <button
                    onClick={() => handleRemoveFile(f.name)}
                    className="btn btn-sm btn-ghost min-h-[20px] h-[20px] "
                  >
                    <XIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className=" flex w-full gap-[16px] pt-[16px]">
            {files.length > 0 && (
              <label
                onClick={() => setFiles([])}
                className="btn btn-outline hover:btn-error flex-1 font-khula text-[20px] "
              >
                <span className="h-[13px]">Clear</span>
              </label>
            )}
            <button
              onClick={handleAddClick}
              className="btn btn-primary flex-1 font-khula text-[20px]"
            >
              <span className="h-[13px]">Add</span>
            </button>
          </div>
        </div>
      </div>
    </details>
  );
};

export default AddImage;
