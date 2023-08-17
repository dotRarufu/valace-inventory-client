import { useContext, useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import pb from '../../lib/pocketbase';
import { ActivityActionOptions, Collections } from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import { recordActivity } from '../../utils/recordActivity';
import { UserContext } from '../../contexts/UserContext';
import Add from '../../components/icons/Add';
import XIcon from '../../components/icons/X';

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
    <details ref={detailsRef} className="dropdown-end dropdown   ">
      {/* //todo: remove outline on clicked state  */}
      <summary className="btn-outline btn  px-[16px] text-[20px] font-semibold  hover:btn-primary">
        <Add />
      </summary>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] w-fit  rounded-[5px] "
      >
        <div className="flex w-[346px] flex-col gap-[8px] rounded-[5px] border border-primary/50 bg-secondary p-[24px] shadow">
          <div className="text-[28px] text-primary">Confirmation</div>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            multiple={true}
          >
            <div className="fontk-khula flex items-center justify-center rounded-[5px] border-[2px] border-dashed border-secondary-content/50 bg-secondary p-[16px] font-semibold">
              <span className="h-[16px]   text-[18px] leading-none  ">
                Drop or
              </span>
              <span className="btn-link btn-primary btn-sm btn p-[4px] text-[18px]  lowercase leading-none ">
                browse
              </span>
            </div>
          </FileUploader>

          <div className=" font-khula">
            <span className="h-[13px] text-[18px] font-semibold leading-none">
              Files to be uploaded:
            </span>

            <ul className="text-[18px] text-primary ">
              {files.map(f => (
                <li key={f.name} className="flex items-center justify-between ">
                  {f.name}

                  <button
                    onClick={() => handleRemoveFile(f.name)}
                    className="btn-ghost btn-sm btn h-[20px] min-h-[20px] "
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
                className="btn-outline btn flex-1 font-khula text-[20px] hover:btn-error "
              >
                <span className="h-[13px]">Clear</span>
              </label>
            )}
            <button
              onClick={handleAddClick}
              className="btn-primary btn flex-1 font-khula text-[20px]"
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
