import { useContext, useEffect, useRef, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { ActivityActionOptions } from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import { UserContext } from '../../contexts/UserContext';
import Add from '../../components/icons/Add';
import XIcon from '../../components/icons/X';
import { addItemImages } from '../../services/item';
import { toastSettings } from '../../data/toastSettings';
import { toast } from 'react-hot-toast';
import { recordActivity } from '../../services/logger';
import { PocketbaseError } from '../../types/PocketbaseError';

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

  const handleChange = (newFiles: FileList) => {
    const addedFiles = Array.from(newFiles).filter(file => {
      const fileNames = files.map(f => f.name);
      const isNotInFiles = !fileNames.includes(file.name);

      return isNotInFiles;
    });

    setFiles(old => [...old, ...addedFiles]);
  };

  // Add file to form data
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

  const addImages = async () => {
    try {
      await addItemImages(activeRowId, formData);
      toast.success('Images added successfully', toastSettings);

      setShouldUpdateData(true);
      setFiles([]);

      await recordActivity(ActivityActionOptions['ADD ITEM IMAGE'], {
        userId: user!.id,
        itemId: activeRowId,
      });
    } catch (err) {
      const error = err as PocketbaseError;
      const errorFields = Object.keys(error.data.data);
      const field =
        errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
      const message = `${field} - ${error.data.data[errorFields[0]].message}`;

      toast.error(message, toastSettings);
    }
  };

  const handleAddClick = () => {
    void addImages();
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
