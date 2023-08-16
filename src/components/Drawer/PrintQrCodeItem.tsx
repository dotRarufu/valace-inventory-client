import { useEffect, useState } from 'react';
import pb from '../../lib/pocketbase';
import { ItemDataRow } from '../../pages/Items';
import { PrintItemRequest } from './PrintQr';

type Props = {
  row: ItemDataRow;
  setPrintItems: React.Dispatch<React.SetStateAction<PrintItemRequest[]>>;
};

const PrintQrCodeItem = ({ row, setPrintItems }: Props) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    setPrintItems(old => {
      const newItems = old.map(i => (i.id === row.id ? { ...i, amount } : i));

      return newItems;
    });
  }, [amount, row.id, setPrintItems]);

  useEffect(() => {
    if (qrCodeUrl !== null) return;

    const getQrCodeUrl = async () => {
      const fileToken = await pb.files.getToken();
      // todo: add check if token is expired
      const fileName = row.qr;
      const url = pb.files.getUrl(row, fileName, { token: fileToken });

      setQrCodeUrl(url);
    };

    void getQrCodeUrl();
  }, [qrCodeUrl, row]);

  const handleInputChange = (value: string) => {
    const re = /^[0-9\b]+$/;

    console.log('val:', value);

    if (value === '') {
      setAmount(0);
      return;
    }

    if (re.test(value)) {
      setAmount(Number(value));
    }
  };

  return (
    <li className="flex gap-3 pr-2">
      <img src={qrCodeUrl || ''} className="w-24 aspect-square bg-red-500" />
      <div className="flex-1 flex flex-col justify-between">
        {row.id}
        <span>anong dapat na makita na dito</span>
        <span className="badge">{row.type}</span>
      </div>
      <div className="join join-vertical">
        <button
          onClick={() => setAmount(old => old + 1)}
          className="join-item btn btn-primary btn-square btn-sm"
        >
          +
        </button>
        <input
          className="input input-sm rounded-none w-8 p-2"
          value={amount}
          onChange={e => handleInputChange(e.target.value)}
        />
        <button
          onClick={() => setAmount(old => (old !== 0 ? old - 1 : 0))}
          className="join-item btn btn-error btn-square btn-sm"
        >
          -
        </button>
      </div>
    </li>
  );
};

export default PrintQrCodeItem;
