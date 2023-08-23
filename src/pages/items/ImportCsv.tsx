import { useEffect, useRef, useState } from 'react';
import * as Papa from 'papaparse';
import { ItemRecord } from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import { toast } from 'react-hot-toast';
import ImportCsvIcon from '../../components/icons/ImportCsvIcon';
import { toastSettings } from '../../data/toastSettings';
import { createItem } from '../../services/item';
import generateSerialNumber from './utils/generateSerialNumber';
import { increaseRowCount } from './utils/increaseRowCount';

type ItemImport = Required<
  Omit<ItemRecord, 'images' | 'serial_number' | 'is_removed'>
>;

const ImportCsv = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [shouldParseFile, setShouldParseFile] = useState(false);
  const [newData, setNewData] = useState<ItemImport[]>([]);
  const { setShouldUpdateTable } = useDrawer()!;

  // Push data
  useEffect(() => {
    if (file === null) return;
    if (!shouldParseFile) return;

    const pushNewData = async () => {
      try {
        const newSerialNumbers = await generateSerialNumber(newData.length);
        const reqs = newData.map(async (d, index) => {
          const data = {
            ...d,
            is_removed: false,
            serial_number: newSerialNumbers[index],
          };

          await createItem(data);
        });
        await Promise.all(reqs);
        await increaseRowCount('m940ztp5mzi2wlq', reqs.length);

        setShouldUpdateTable(true);
        toast.success(`CSV file imported`, toastSettings);
      } catch (err) {
        toast.error(`CSV file not imported`, toastSettings);
      }
    };

    const config: Papa.ParseLocalConfig<ItemImport, File> = {
      complete: e => {
        setNewData(e.data);
        void pushNewData();
      },
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    };

    Papa.parse(file, config);
    setShouldParseFile(false);
  }, [file, newData, setShouldUpdateTable, shouldParseFile]);

  const handleClick = () => {
    if (fileInput.current !== null) {
      fileInput.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }

    setFile(e.target.files[0]);
    setShouldParseFile(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="btn-secondary btn px-[16px] text-[20px] font-semibold hover:btn-primary"
      >
        <ImportCsvIcon />
        Import CSV
      </button>
      <input
        onChange={handleFileSelect}
        ref={fileInput}
        type="file"
        className="hidden"
      />
    </>
  );
};

export default ImportCsv;
