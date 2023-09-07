import magnifier from '../../assets/magnifier.svg';

type Props = {
  handleOnChange: (text: string) => void;
  searchTerm: string;
};

const SearchBar = ({ handleOnChange, searchTerm }: Props) => {
  return (
    <div className="join">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm ?? ''}
        onChange={e => handleOnChange(e.target.value)}
        className="input-bordered input join-item w-full max-w-xs rounded-br-[0px] rounded-tr-[0px] border border-secondary bg-secondary pt-[6px]
    font-khula text-[20px] font-semibold 
    text-primary placeholder:text-[20px]
    placeholder:font-semibold placeholder:text-primary
  "
      />
      <button className="oin-item btn-secondary btn rounded-bl-[0px]  rounded-tl-[0px] px-[16px] text-[20px] font-semibold">
        <img className="w-[28px]" src={magnifier} alt="Search" />
      </button>
    </div>
  );
};

export default SearchBar;
