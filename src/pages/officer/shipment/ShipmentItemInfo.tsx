import { useParams } from 'react-router-dom';

const ShipmentItemInfo = () => {
  const { id } = useParams();

  return <div>shipment item info | id: {id}</div>;
};

export default ShipmentItemInfo;
