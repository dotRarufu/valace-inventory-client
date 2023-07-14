import valAceLogo from '../../assets/valace-logo.png';
import inventorySystemIcon from '../../assets/inventory-system.svg';

const Logo = () => {
  return (
    <div className="py-[28px] justify-center items-center flex flex-col gap-[32px]">
      <img className="w-[206px] h-[120px]" src={valAceLogo} alt="ValACE Logo" />

      <div className="text-primary flex w-[206px] py-[8px] justify-between items-center border-y-[1px] border-primary font-khula font-semibold text-[20px]">
        Inventory System
        <img src={inventorySystemIcon} alt="Inventory System Icon" />
      </div>
    </div>
  );
};

export default Logo;
