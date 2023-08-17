import { useEffect, useRef, useState } from 'react';
import * as Papa from 'papaparse';
import { Collections, ItemRecord } from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import pb from '../../lib/pocketbase';
import generateSerialNumber from '../../utils/generateSerialNumber';
import { toast } from 'react-hot-toast';
import { increaseRowCount } from '../../utils/increaseRowCount';
import ImportCsvIcon from '../../components/icons/ImportCsvIcon';

type ItemImport = Required<
  Omit<ItemRecord, 'images' | 'serial_number' | 'is_removed'>
>;

const ImportCsv = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [shouldParseFile, setShouldParseFile] = useState(false);
  const [newData, setNewData] = useState<ItemImport[]>([]);
  const [shouldPushNewData, setShouldPushNewData] = useState(false);
  const { setShouldUpdateTable } = useDrawer()!;

  const handleClick = () => {
    console.log('import csv clicked');

    if (fileInput.current !== null) {
      fileInput.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      console.log('no file selected');
      return;
    }

    setFile(e.target.files[0]);
    setShouldParseFile(true);
  };

  useEffect(() => {
    if (!shouldPushNewData) return;

    const pushNewData = async () => {
      try {
        const newSerialNumbers = await generateSerialNumber(newData.length);

        console.log('newSerialNumbers:', newSerialNumbers);
        const reqs = newData.map(async (d, index) => {
          console.log('current:', newSerialNumbers[index]);

          const data = {
            ...d,
            is_removed: false,
            serial_number: newSerialNumbers[index],
          };
          console.log('push | data:', data);
          await pb.collection(Collections.Item).create(data);
        });
        await Promise.all(reqs);
        await increaseRowCount('m940ztp5mzi2wlq', reqs.length);

        setShouldUpdateTable(true);
        toast.success(`CSV file imported`, {
          duration: 7000,
          position: 'bottom-center',
          className: 'font-semibold',
        });
      } catch (err) {
        console.log('error:', err);
        toast.error(`CSV file not imported`, {
          duration: 7000,
          position: 'bottom-center',
          className: 'font-semibold',
        });
      }
    };

    void pushNewData();
  }, [newData, setShouldUpdateTable, shouldPushNewData]);

  useEffect(() => {
    if (file === null) return;
    if (!shouldParseFile) return;

    const csv = 'type,part\nunicorn,horn\nrainbow,pink';

    const config: Papa.ParseLocalConfig<ItemImport, File> = {
      complete: e => {
        setNewData(e.data);
        setShouldPushNewData(true);
      },
      header: true,
      skipEmptyLines: true,
      // transform: (value, columnOrHeader) => {
      //   console.log('====================');
      //   console.log('value:', value);
      //   console.log('header:', columnOrHeader);
      //   console.log('====================');
      //   return 1;
      // },
      dynamicTyping: true,
    };

    Papa.parse(file, config);
    setShouldParseFile(false);
  }, [file, shouldParseFile]);

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
