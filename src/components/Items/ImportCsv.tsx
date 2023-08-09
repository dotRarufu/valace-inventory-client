import { useEffect, useRef, useState } from 'react';
import ImportCsvIcon from '../Icons/ImportCsvIcon';
import { CsvParser } from 'csv-parser';
import neatCsv from 'neat-csv';
import * as Papa from 'papaparse';
import {
  Collections,
  ItemRecord,
  ItemTypeOptions,
} from '../../../pocketbase-types';
import { useDrawer } from '../../hooks/useDrawer';
import pb from '../../lib/pocketbase';
import { generateSerialNumber } from '../../utils/generateSerialNumber';
import { toast } from 'react-hot-toast';

interface Props {
  label?: string;
}

type ItemImport = Required<
  Omit<ItemRecord, 'images' | 'serial_number' | 'is_removed'>
>;

const ImportCsv = ({ label }: Props) => {
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
      const totalCount = (await pb.collection(Collections.Item).getList(1, 1))
        .totalItems;

      const reqs = newData.map(async (d, index) => {
        const data = {
          ...d,
          is_removed: false,
          serial_number: generateSerialNumber(totalCount + index + 1),
        };
        console.log('push | data:', data);
        await pb.collection(Collections.Item).create(data);
      });
      await Promise.all(reqs);
     
      setShouldUpdateTable(true);
      toast.success(`CSV file imported`, {
        duration: 7000,
        position: 'bottom-center',
        className: 'font-semibold',
      });
    } catch (err) {
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
        className="btn btn-secondary hover:btn-primary px-[16px] text-[20px] font-semibold"
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
