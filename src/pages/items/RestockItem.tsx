import { useEffect, useState } from 'react';
import { ItemDataRow } from '.';
import { PrintItemRequest } from './PrintQrSidebar';
import { getImageUrlTokenized } from '../../services/item';
import { toast } from 'react-hot-toast';
import { toastSettings } from '../../data/toastSettings';
import { PocketbaseError } from '../../types/PocketbaseError';

type Props = {
  row: ItemDataRow;
  setPrintItems: React.Dispatch<React.SetStateAction<PrintItemRequest[]>>;
};

const RestockItem = ({ row, setPrintItems }: Props) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [amount, setAmount] = useState(1);

  // Update print items
  useEffect(() => {
    setPrintItems(old => {
      const newItems = old.map(i => (i.id === row.id ? { ...i, amount } : i));

      return newItems;
    });
  }, [amount, row.id, setPrintItems]);

  // Set QR Code URL
  useEffect(() => {
    if (qrCodeUrl !== null) return;

    const fileName = row.qr;
    // todo: add check if token is expired
    getImageUrlTokenized(row, fileName)
      .then(url => {
        setQrCodeUrl(url);
      })
      .catch(err => {
        const error = err as PocketbaseError;
        const errorFields = Object.keys(error.data.data);
        const field =
          errorFields[0].charAt(0).toUpperCase() + errorFields[0].slice(1);
        const message = `${field} - ${error.data.data[errorFields[0]].message}`;

        toast.error(message, toastSettings);
      });
  }, [qrCodeUrl, row]);

  const handleInputChange = (value: string) => {
    const re = /^[0-9\b]+$/;

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
      <img
        src={qrCodeUrl || ''}
        className="aspect-square w-24 bg-base-100"
        alt="qr code"
      />
      <div className="flex flex-1 flex-col justify-between">
        <span className="font-bold">{row.name}</span>
        <span>Stock: {row.quantity}</span>
      
      </div>
      <div className="join-vertical join">
        <button
          onClick={() => setAmount(old => old + 1)}
          className="btn-primary btn-square btn-sm join-item btn"
        >
          +
        </button>
        <input
          className="input input-sm w-8 rounded-none p-2"
          value={amount}
          onChange={e => handleInputChange(e.target.value)}
        />
        <button
          onClick={() => setAmount(old => (old !== 0 ? old - 1 : 0))}
          className="btn-error btn-square btn-sm join-item btn"
        >
          -
        </button>
      </div>
    </li>
  );
};

export default RestockItem;
