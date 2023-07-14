import magnifier from '../assets/magnifier.svg';

const SearchBar = () => {
  return (
    <div className="join">
      <input
        type="text"
        placeholder="Search"
        className="join-item input input-bordered w-full max-w-xs text-primary text-[20px] font-semibold bg-secondary font-khula pt-[6px]
    placeholder:text-primary placeholder:text-[20px] placeholder:font-semibold 
    rounded-tr-[0px] rounded-br-[0px]
    border border-secondary
  "
      />
      <button className="btn btn-secondary px-[16px] text-[20px]  font-semibold oin-item rounded-tl-[0px] rounded-bl-[0px]">
        <img className="w-[28px]" src={magnifier} alt="Search" />
      </button>
    </div>
  );
};

export default SearchBar;
