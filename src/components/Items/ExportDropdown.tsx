import 'react-calendar/dist/Calendar.css';
import { ReactNode, useEffect, useRef, useState } from 'react';
import TableExport from '../Icons/TableExport';
import Button from '../Button';
import csvIcon from '../../assets/csv.svg';
import pdfIcon from '../../assets/pdf.svg';
import { Parser } from '@json2csv/plainjs';
import { ItemDataRow } from '../../pages/Items';
import { toCsvFormat } from '../../utils/toCsvFormat';

type Props = {
  data: ItemDataRow[];
};

const ExportDropdown = ({ data }: Props) => {
  const [csvFileName, setCsvFileName] = useState('csv_test');
  const csvAnchor = useRef<HTMLAnchorElement>(null);
  const pdfAnchor = useRef<HTMLAnchorElement>(null);
  const [shouldDownloadCsv, setShouldDownloadCsv] = useState(false);

  useEffect(() => {
    if (!shouldDownloadCsv) return;
    // 1. export object to csv
    // 2. read csv to object

    // todo: use stream parser instead
    const parser = new Parser();
    const formattedData = data.map(d => toCsvFormat(d));
    const csv = parser.parse(formattedData);
    const file = new Blob([csv], { type: 'text/plain' });
    console.log(csv);

    if (csvAnchor.current === null) {
      console.log('still null');
      return;
    }

    csvAnchor.current.href = URL.createObjectURL(file);
    csvAnchor.current.download = 'csv_test.csv';
    // todo: transform csv, remove unnecessary columns
    setShouldDownloadCsv(false);
  }, [data, shouldDownloadCsv]);

  const handleCsvClick = () => {
    console.log('csv download click');
    setShouldDownloadCsv(true);
  };

  const handlePdfClick = () => {
    console.log('pdf download click');
  };

  return (
    <div className="dropdown ">
      <label tabIndex={0}>
        <Button label="Export" icon={<TableExport />} />
      </label>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] rounded-[5px]  w-fit "
      >
        <ul className="menu w-56 bg-secondary rounded-[5px] shadow text-[24px] font-khula px-0 gap-[16px] ">
          <li>
            <a
              onClick={handleCsvClick}
              ref={csvAnchor}
              className="justify-between rounded-none px-[24px]"
            >
              <span className="h-[16px]">CSV</span> <img src={csvIcon} />
            </a>
          </li>
          <li>
            <a
              onClick={handlePdfClick}
              ref={pdfAnchor}
              className="justify-between rounded-none px-[24px]"
            >
              <span className="h-[16px]">PDF</span> <img src={pdfIcon} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExportDropdown;
